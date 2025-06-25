export const FLOATING_CODE_SKILLS = [
  "React", 
  "Next.js", 
  "Node.js"
] as const;

export const ALL_TECH_STACK = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Express",
  "MongoDB",
  "Redis",
  "TensorFlow",
  "Keras",
  "Celery",
  "Elasticsearch",
  "Kubernetes",
  "Socket.io",
  "Redux",
  "WebRTC",
  "Stripe API",
  "Jest",
  "Cypress",
  "Styled Components"
] as const;

// Common project tech stacks
export const PROJECT_STACKS = {
  ecommerce: [
    "React",
    "TypeScript",
    "Redux",
    "Styled Components",
    "Node.js",
    "Express",
    "MongoDB",
    "Stripe API",
    "Jest",
    "Cypress",
  ] as string[],
  chatApp: [
    "Node.js",
    "Express",
    "Socket.io",
    "MongoDB",
    "Redis",
    "React",
    "Redux",
    "WebRTC",
    "Docker",
    "AWS",
  ] as string[],
  aiRecommendation: [
    "Python",
    "Django",
    "PostgreSQL",
    "TensorFlow",
    "Keras",
    "Celery",
    "Redis",
    "Elasticsearch",
    "Docker",
    "Kubernetes",
  ] as string[],
  dashboardAnalytics: [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
  ] as string[]
} as const;

// Word rotation data for home section
export const WORD_ROTATION_TITLES = [
  "Bilal Khalil Khankhail,",
  "Frontend Engineer,",
  "React Developer,",
] as const;

// Navigation sections
export const NAVIGATION_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

// Social links
export const SOCIAL_LINKS = {
  email: "bilalkhalilkhankhail@gmail.com",
  github: "https://github.com/bilalmkhalil",
  linkedin: "https://www.linkedin.com/in/bilal-khalil-khankhail",
} as const;

// Code snippets for floating elements
export const CODE_SNIPPETS = {
  skills: `function develop() {
  const skills = ['${FLOATING_CODE_SKILLS.join("', '")}'];
  return skills.map(skill => 
    createAmazing(skill));
}`,
  passion: `const passion = {
  frontend: true,
  learning: 'always',
  goal: 'excellence'
};`,
  future: `const future = async () => {
  await buildProjects();
  return innovation;
}`
} as const;

// Experience data
export const EXPERIENCE_DATA = [
  {
    period: "2025 - Present",
    title: "Frontend Developer",
    company: "Softject",
    icon: null, // Will be set as React element in component
    description: [
      "Developed scalable web apps with complex admin panels.",
      "Built custom dashboards, chat widgets, and bot integrations.",
      "Used React, Next.js, Tailwind, ShadCN, Redux, Zustand, Axios, React Query.",
      "Integrated Socket.IO for real-time features.",
      "Ensured pixel-perfect UI and consistent design from Figma.",
      "Worked on RBAC, Stripe payments.",
      "Optimized performance and SEO, achieving 90+ scores.",
      "Focused on clean, maintainable, and efficient code.",
    ],
  },
  {
    period: "2024 - 2025",
    title: "Frontend Engineer",
    company: "MOD Ventures",
    icon: null, // Will be set as image in component
    description: [
      "Developed scalable web apps with complex admin panels.",
      "Built custom dashboards, chat widgets, and bot integrations.",
      "Used React, Next.js, Tailwind, ShadCN, Redux, Zustand, Axios, React Query.",
      "Integrated Socket.IO for real-time features.",
      "Ensured pixel-perfect UI and consistent design from Figma.",
      "Worked on RBAC, Stripe payments.",
      "Optimized performance and SEO, achieving 90+ scores.",
      "Focused on clean, maintainable, and efficient code.",
    ],
  },
  {
    period: "2022 - 2024",
    title: "Web Developer",
    company: "Freelance",
    icon: null,
    description: [
      "Led frontend development for multiple client projects.",
      "Built responsive and performant web applications.",
      "Implemented modern UI/UX designs using React and Next.js.",
      "Utilized TailwindCSS for responsive and maintainable styling.",
      "Integrated RESTful APIs and managed state with Redux/Zustand.",
      "Optimized applications for maximum speed and scalability.",
      "Collaborated with clients to gather requirements and deliver solutions.",
      "Maintained clean and well-documented code bases.",
    ],
  },
] as const;
