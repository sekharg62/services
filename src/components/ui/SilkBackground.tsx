"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 aPos; void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

// Draped gold silk: a height field of radiating folds, lit with a warm key light + specular sheen.
// The mouse pushes a gentle ripple through the fabric.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseStrength;

float height(vec2 p) {
  float t = uTime * 0.15;
  // folds radiate from a point above the screen, like fabric hanging from the centre
  vec2 q = p - vec2(0.0, 0.95);
  float r = length(q);
  float a = atan(q.x, -q.y);
  float h = sin(a * 26.0 + sin(r * 3.0 - t) * 1.1 + t * 0.4) * 0.5;
  h += sin(a * 53.0 + r * 5.0 - t * 0.9) * 0.10;
  h += sin(a * 8.0 + sin(r * 2.0 + t * 0.6)) * 0.45;
  h *= smoothstep(0.25, 1.1, r);
  // the cursor sends a soft ripple through the cloth
  float d = distance(p, uMouse);
  h += uMouseStrength * 0.10 * exp(-d * d * 5.0) * sin(d * 10.0 - uTime * 1.6);
  return h;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float e = 0.001;
  float c = height(p);
  vec3 n = normalize(vec3(-(height(p + vec2(e, 0.0)) - c) / e * 0.05,
                          -(height(p + vec2(0.0, e)) - c) / e * 0.05, 1.0));

  vec3 light = normalize(vec3(-0.35, 0.45, 0.8));
  float diff = max(dot(n, light), 0.0);
  float spec = pow(max(dot(n, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 50.0);
  vec3 col = vec3(0.03, 0.02, 0.008) + vec3(0.50, 0.35, 0.17) * pow(diff, 3.0) + vec3(1.0, 0.86, 0.6) * spec * 0.85;

  // fabric lives in the lower part of the screen; fade to black above it so text stays readable
  float edge = 0.62 + 0.05 * sin(p.x * 3.0 + uTime * 0.2);
  col *= smoothstep(edge, edge - 0.45, uv.y);
  col *= 1.0 - 0.55 * pow(length(uv - vec2(0.5, 0.35)), 2.0);
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
  return s;
}

/** Full-bleed animated gold silk (WebGL). Falls back to the parent's CSS background if WebGL is unavailable. */
export function SilkBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      gl.useProgram(program);
    } catch {
      return; // keep CSS fallback
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uMouseStrength = gl.getUniformLocation(program, "uMouseStrength");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: -0.2, tx: 0, ty: -0.2, s: 0, ts: 0 };
    let visible = true;
    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.s += (mouse.ts - mouse.s) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduceMotion ? 8 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseStrength, mouse.s);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduceMotion) draw(performance.now());
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left - r.width / 2) / r.height;
      mouse.ty = -(e.clientY - r.top - r.height / 2) / r.height;
      mouse.ts = 1;
    };
    const onLeave = () => (mouse.ts = 0);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }
    canvas.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none size-full opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100 ${className}`}
    />
  );
}
