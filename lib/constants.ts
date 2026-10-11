import modIcon from "@/public/mod.png";
import sofjectIcon from "@/public/sofject.png";
import { Experience, SkillCategory } from "@/types/types";

import {
  reactIcon,
  nextIcon,
  htmlIcon,
  cssIcon,
  jsIcon,
  tsIcon,
  vscodeIcon,
  gitIcon,
  githubIcon,
  tailwindIcon,
  postgresqlIcon,
  prismaIcon as prisma,
  supabaseIcon as supabase,
  zustandIcon,
  reduxIcon,
  reactQueryIcon,
  axiosIcon,
  githubActionsIcon,
  awsIcon,
  azureIcon,
  azureDevopsIcon,
  mongodbIcon,
  nodejsIcon,
  nginxIcon,
  bunIcon,
  postmanIcon,
  ubuntuIcon,
  vercelIcon,
  gitlabIcon,
} from "@/lib/icons";

// Word rotation data for home section
export const WORD_ROTATION_TITLES = [
  "Bilal",
  "Software Engineer",
] as const;

// Social links
export const SOCIAL_LINKS = {
  email: "bilalkhalilkhankhail@gmail.com",
  github: "https://github.com/bilalmkhalil",
  linkedin: "https://www.linkedin.com/in/bilal-khalil-khankhail",
} as const;

export const experienceData: Experience[] = [
  {
    period: "2025 - 2026",
    title: "Software Engineer",
    company: "Sofject",
    icon: sofjectIcon,
    description: [
      "Led a full migration from Azure to Hetzner for production systems, including backend, frontend, and staging environments serving around 60k users.",
      "Designed and maintained CI/CD pipelines with Azure DevOps and GitHub Actions to automate builds, deployments, and environment parity.",
      "Worked on backend services with Node.js and NestJS, using PostgreSQL and MongoDB for reliable data handling.",
      "Implemented and enforced role-based access control across applications to secure sensitive workflows.",
      "Managed reverse proxies and automated TLS with Caddy, along with VM provisioning, monitoring, and incident debugging.",
      "Built and maintained scalable front-end applications with React.js and Next.js, focusing on production-ready performance and UI accuracy.",
    ],
  },
  {
    period: "2024 - 2025",
    title: "Frontend Engineer",
    company: "MOD Ventures",
    icon: modIcon,
    description: [
      "Built and shipped production-grade web applications using React.js and Next.js, including complex admin dashboards and data-driven SPAs.",
      "Translated Figma designs into pixel-perfect, responsive interfaces with strong attention to UX and accessibility.",
      "Created reusable, scalable UI component systems to improve development speed and consistency across projects.",
      "Integrated REST APIs and handled complex client-side data flows, state management, and async behavior.",
      "Implemented complete authentication flows including OAuth, Google Sign-In, and token-based auth.",
      "Optimized frontend performance through component refactoring, state isolation, and rendering improvements.",
    ],
  },
] as const;

export const skillsTabTitles = ["Frontend", "Backend", "DevOps", "Tools"];
export const skillsData: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      {
        name: "React",
        icon: reactIcon,
        alt: "React",
        size: 30,
        color: "#53c1de42",
      },
      {
        name: "NextJS",
        icon: nextIcon,
        alt: "Next.js",
        size: 30,
        color: "#f3f4f694",
      },
      {
        name: "HTML",
        icon: htmlIcon,
        alt: "HTML",
        size: 30,
        color: "#f1652942",
      },
      {
        name: "CSS",
        icon: cssIcon,
        alt: "CSS",
        size: 30,
        color: "#33aadd6b",
      },
      {
        name: "JavaScript",
        icon: jsIcon,
        alt: "JavaScript",
        size: 30,
        color: "#e9b9256b",
      },
      {
        name: "TypeScript",
        icon: tsIcon,
        alt: "TypeScript",
        size: 30,
        color: "#007acc6b",
      },
      {
        name: "TailwindCSS",
        icon: tailwindIcon,
        alt: "TailwindCSS",
        size: 30,
        color: "#1baeba6b",
      },
      {
        name: "Zustand",
        icon: zustandIcon,
        alt: "Zustand",
        size: 30,
        color: "#6d6c6c6b",
      },
      {
        name: "Redux",
        icon: reduxIcon,
        alt: "Redux",
        size: 30,
        color: "#764abc6b",
      },
      {
        name: "React Query",
        icon: reactQueryIcon,
        alt: "React Query",
        size: 30,
        color: "#ff48857e",
      },
      {
        name: "Axios",
        icon: axiosIcon,
        alt: "Axios",
        size: 30,
        color: "#5a29e47e",
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: nodejsIcon,
        alt: "Node.js",
        size: 30,
        color: "#68a0633b",
      },
      {
        name: "Bun",
        icon: bunIcon,
        alt: "Bun",
        size: 30,
        color: "#f3f4f694",
      },
      {
        name: "PostgreSQL",
        icon: postgresqlIcon,
        alt: "PostgreSQL",
        size: 30,
        color: "#3367916b",
      },
      {
        name: "MongoDB",
        icon: mongodbIcon,
        alt: "MongoDB",
        size: 30,
        color: "#13aa526b",
      },
      {
        name: "Supabase",
        icon: supabase,
        alt: "Supabase",
        size: 30,
        color: "#3ecf8e6b",
      },
      {
        name: "Prisma",
        icon: prisma,
        alt: "Prisma",
        size: 30,
        color: "#f3f4f694",
      },
    ],
  },
  {
    title: "DevOps",
    skills: [
      {
        name: "Azure",
        icon: azureIcon,
        alt: "Azure",
        size: 30,
        color: "#0089d96b",
      },
      {
        name: "Azure DevOps",
        icon: azureDevopsIcon,
        alt: "Azure DevOps",
        size: 30,
        color: "#0089d96b",
      },
      {
        name: "AWS",
        icon: awsIcon,
        alt: "AWS",
        size: 30,
        color: "#ff99006b",
      },
      {
        name: "GitHub Actions",
        icon: githubActionsIcon,
        alt: "GitHub Actions",
        size: 30,
        color: "#f3f4f694",
      },
      {
        name: "Vercel",
        icon: vercelIcon,
        alt: "Vercel",
        size: 30,
        color: "#f3f4f694",
      },
      {
        name: "Nginx",
        icon: nginxIcon,
        alt: "Nginx",
        size: 30,
        color: "#00965e6b",
      },
      {
        name: "Ubuntu",
        icon: ubuntuIcon,
        alt: "Ubuntu",
        size: 30,
        color: "#dd4814ab",
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      {
        name: "VSCode",
        icon: vscodeIcon,
        alt: "VSCode",
        size: 30,
        color: "#0061a36b",
      },
      {
        name: "Git",
        icon: gitIcon,
        alt: "Git",
        size: 30,
        color: "#ee513b6b",
      },
      {
        name: "GitHub",
        icon: githubIcon,
        alt: "GitHub",
        size: 30,
        color: "#f3f4f694",
      },
      {
        name: "GitLab",
        icon: gitlabIcon,
        alt: "GitLab",
        size: 30,
        color: "#fc6d266b",
      },
      {
        name: "Postman",
        icon: postmanIcon,
        alt: "Postman",
        size: 30,
        color: "#ff68006b",
      },
    ],
  },
];
