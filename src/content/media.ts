// Photos from Unsplash (free to use under the Unsplash License). Replace with your own project photos when available.
import aboutTeam from "@/assets/images/about-team.jpg";
import avatar1 from "@/assets/images/avatar-1.jpg";
import avatar2 from "@/assets/images/avatar-2.jpg";
import avatar3 from "@/assets/images/avatar-3.jpg";
import contactOffice from "@/assets/images/contact-office.jpg";
import serviceApp from "@/assets/images/service-app.jpg";
import serviceBusiness from "@/assets/images/service-business.jpg";
import serviceWeb from "@/assets/images/service-web.jpg";
import workAnalytics from "@/assets/images/work-analytics.jpg";
import workBrandLaunch from "@/assets/images/work-brand-launch.jpg";
import workCorporateSite from "@/assets/images/work-corporate-site.jpg";
import workFintechUx from "@/assets/images/work-fintech-ux.jpg";
import workGrowthWorkshop from "@/assets/images/work-growth-workshop.jpg";
import workShopApp from "@/assets/images/work-shop-app.jpg";

export const media = {
  aboutTeam,
  contactOffice,
  /** Same order as dictionary `services.items` */
  services: [serviceWeb, serviceApp, serviceBusiness],
  /** Same order as dictionary `portfolio.items` */
  portfolio: [workCorporateSite, workAnalytics, workShopApp, workFintechUx, workBrandLaunch, workGrowthWorkshop],
  /** Same order as dictionary `testimonials.items` */
  avatars: [avatar1, avatar2, avatar3],
};
