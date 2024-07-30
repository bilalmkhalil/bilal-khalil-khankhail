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

const SkillsSection = () => {
  const skillsData = [
    {
      title: "Framework",
      skills: [
        { icon: reactIcon, alt: "React" },
        { icon: nextIcon, alt: "Next.js" },
      ],
    },
    {
      title: "Languages",
      skills: [
        { icon: htmlIcon, alt: "HTML" },
        { icon: cssIcon, alt: "CSS" },
        { icon: jsIcon, alt: "JavaScript" },
        { icon: tsIcon, alt: "TypeScript" },
      ],
    },
    {
      title: "Tools",
      skills: [
        { icon: vscodeIcon, alt: "VSCode" },
        { icon: gitIcon, alt: "Git" },
        { icon: githubIcon, alt: "GitHub" },
      ],
    },
    {
      title: "Databases",
      skills: [
        { icon: postgresqlIcon, alt: "PostgreSQL" },
        { icon: supabase, alt: "Supabase" },
        { icon: prisma, alt: "Prisma" },
      ],
    },
    {
      title: "CSS Frameworks",
      skills: [{ icon: tailwindIcon, alt: "Tailwind CSS" }],
    },
  ];

  return (
    <div className="m-auto flex h-screen w-8/12 flex-row text-3xl text-white">
      <h1>Skill</h1>
      {skillsData.map((data, index) => (
        <div key={index}>
          <h2>{data.title}</h2>
          {data.skills.map((skill, index) => (
            <div key={index}>
              <Image src={skill.icon} alt={skill.alt} width={50} height={50} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
