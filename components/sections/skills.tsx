"use client";

import Image from "next/image";
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

import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { BorderBeam } from "../magicui/border-beam";
import { useInView } from "@/lib/hooks";
import { SkillCategory } from "@/types/types";

const spaceGrostek = Space_Grotesk({
  subsets: ["latin"],
});

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const SkillsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const skillsData: SkillCategory[] = [
    {
      title: "Frontend",
      skills: [
        {
          name: "React",
          icon: reactIcon,
          alt: "React",
          size: 30,
          bgcolor: "bg-[#53c1de42]",
        },
        {
          name: "NextJS",
          icon: nextIcon,
          alt: "Next.js",
          size: 30,
          bgcolor: "bg-[#f3f4f694]",
        },
        {
          name: "HTML",
          icon: htmlIcon,
          alt: "HTML",
          size: 30,
          bgcolor: "bg-[#f1652942]",
        },
        {
          name: "CSS",
          icon: cssIcon,
          alt: "CSS",
          size: 30,
          bgcolor: "bg-[#33aadd6b]",
        },
        {
          name: "JavaScript",
          icon: jsIcon,
          alt: "JavaScript",
          size: 30,
          bgcolor: "bg-[#e9b9256b]",
        },
        {
          name: "TypeScript",
          icon: tsIcon,
          alt: "TypeScript",
          size: 30,
          bgcolor: "bg-[#007acc6b]",
        },
        {
          name: "TailwindCSS",
          icon: tailwindIcon,
          alt: "TailwindCSS",
          size: 30,
          bgcolor: "bg-[#1baeba6b]",
        },
        {
          name: "Zustand",
          icon: zustandIcon,
          alt: "Zustand",
          size: 30,
          bgcolor: "bg-[#6d6c6c6b]",
        },
        {
          name: "Redux",
          icon: reduxIcon,
          alt: "Redux",
          size: 30,
          bgcolor: "bg-[#764abc6b]",
        },
        {
          name: "React Query",
          icon: reactQueryIcon,
          alt: "React Query",
          size: 30,
          bgcolor: "bg-[#ff48857e]",
        },
        {
          name: "Axios",
          icon: axiosIcon,
          alt: "Axios",
          size: 30,
          bgcolor: "bg-[#5a29e47e]",
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
          bgcolor: "bg-[#68a0633b]",
        },
        {
          name: "Bun",
          icon: bunIcon,
          alt: "Bun",
          size: 30,
          bgcolor: "bg-[#f3f4f694]",
        },
        {
          name: "PostgreSQL",
          icon: postgresqlIcon,
          alt: "PostgreSQL",
          size: 30,
          bgcolor: "bg-[#3367916b]",
        },
        {
          name: "MongoDB",
          icon: mongodbIcon,
          alt: "MongoDB",
          size: 30,
          bgcolor: "bg-[#13aa526b]",
        },
        {
          name: "Supabase",
          icon: supabase,
          alt: "Supabase",
          size: 30,
          bgcolor: "bg-[#3ecf8e6b]",
        },
        {
          name: "Prisma",
          icon: prisma,
          alt: "Prisma",
          size: 30,
          bgcolor: "bg-[#f3f4f694]",
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
          bgcolor: "bg-[#0089d96b]",
        },
        {
          name: "Azure DevOps",
          icon: azureDevopsIcon,
          alt: "Azure DevOps",
          size: 30,
          bgcolor: "bg-[#0089d96b]",
        },
        {
          name: "AWS",
          icon: awsIcon,
          alt: "AWS",
          size: 30,
          bgcolor: "bg-[#ff99006b]",
        },
        {
          name: "GitHub Actions",
          icon: githubActionsIcon,
          alt: "GitHub Actions",
          size: 30,
          bgcolor: "bg-[#f3f4f694]",
        },
        {
          name: "Vercel",
          icon: vercelIcon,
          alt: "Vercel",
          size: 30,
          bgcolor: "bg-[#f3f4f694]",
        },
        {
          name: "Nginx",
          icon: nginxIcon,
          alt: "Nginx",
          size: 30,
          bgcolor: "bg-[#00965e6b]",
        },
        {
          name: "Ubuntu",
          icon: ubuntuIcon,
          alt: "Ubuntu",
          size: 30,
          bgcolor: "bg-[#dd4814ab]",
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
          bgcolor: "bg-[#0061a36b]",
        },
        {
          name: "Git",
          icon: gitIcon,
          alt: "Git",
          size: 30,
          bgcolor: "bg-[#ee513b6b]",
        },
        {
          name: "GitHub",
          icon: githubIcon,
          alt: "GitHub",
          size: 30,
          bgcolor: "bg-[#f3f4f694]",
        },
        {
          name: "GitLab",
          icon: gitlabIcon,
          alt: "GitLab",
          size: 30,
          bgcolor: "bg-[#fc6d266b]",
        },
        {
          name: "Postman",
          icon: postmanIcon,
          alt: "Postman",
          size: 30,
          bgcolor: "bg-[#ff68006b]",
        }
      ],
    },
  ];

  return (
    <div
      ref={ref}
      id="skills"
      className="relative m-auto w-10/12 pb-20 text-white md:h-screen md:pb-0"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-white sm:text-6xl">Skills</h1>
        <h1
          className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
        >
          مہارت
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        {skillsData.map((data, index) => (
          <div key={index} className="mt-4 flex flex-col gap-1">
            <h2 className="text-3xl text-white">{data.title}</h2>
            <div className="grid gap-2 md:grid-cols-5">
              {data.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className={`relative flex flex-row items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10 ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: inView
                      ? `${(index * data.skills.length + skillIndex) * 100}ms`
                      : "0ms",
                  }}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.alt}
                    width={skill.size}
                    height={skill.size}
                    className={`${skill.bgcolor} rounded p-1.25`}
                  />
                  <h3
                    className={`text-xl text-white ${spaceGrostek.className}`}
                  >
                    {skill.name}
                  </h3>
                  <BorderBeam
                    size={40}
                    duration={10}
                    delay={5}
                    colorFrom={skill.bgcolor.split("[")[1].split("]")[0]}
                    colorTo={skill.bgcolor.split("[")[1].split("]")[0]}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
