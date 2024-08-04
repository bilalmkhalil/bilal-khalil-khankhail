import Image from "next/image";

import reactIcon from "@/public/react.svg";
import nextIcon from "@/public/nextjs-icon.svg";
import htmlIcon from "@/public/html-5.svg";
import cssIcon from "@/public/css-3.svg";
import jsIcon from "@/public/js.svg";
import tsIcon from "@/public/typescript-icon.svg";
import vscodeIcon from "@/public/vscode.svg";
import gitIcon from "@/public/git.svg";
import githubIcon from "@/public/github.svg";
import tailwindIcon from "@/public/tailwindcss-icon.svg";
import postgresqlIcon from "@/public/postgresql.svg";
import prisma from "@/public/prisma.svg";
import supabase from "@/public/supabase.svg";

import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { BorderBeam } from "../magicui/border-beam";
import GridPattern from "../magicui/grid-pattern";

const spaceGrostek = Space_Grotesk({
  subsets: ["latin"],
});

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const SkillsSection = () => {
  const skillsData = [
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
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "PostgreSQL",
          icon: postgresqlIcon,
          alt: "PostgreSQL",
          size: 30,
          bgcolor: "bg-[#3367916b]",
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
      ],
    },
  ];

  return (
    <div className="relative m-auto w-10/12 pb-20 dark:text-white md:h-screen md:pb-0">
      <div className="flex justify-between gap-4 overflow-hidden border-b-2 pb-3 sm:justify-start">
        <h1 className="text-4xl sm:text-6xl">Skills</h1>
        <h1 className={`text-4xl sm:text-6xl ${aadilFont.className}`}>مہارت</h1>
      </div>
      <div className="flex flex-col gap-2">
        {skillsData.map((data, index) => (
          <div key={index} className="mt-4 flex flex-col gap-1">
            <h2 className="text-3xl">{data.title}</h2>
            <div className="grid gap-2 md:grid-cols-5">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="relative flex flex-row items-center gap-2 rounded-md bg-[#ffffff0a] px-4 py-3"
                >
                  <Image
                    src={skill.icon}
                    alt={skill.alt}
                    width={skill.size}
                    height={skill.size}
                    className={`${skill.bgcolor} rounded p-[5px]`}
                  />
                  <h3 className={`text-xl ${spaceGrostek.className}`}>
                    {skill.name}
                  </h3>
                  <BorderBeam
                    size={100}
                    duration={10}
                    delay={5}
                    borderWidth={1.5}
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
