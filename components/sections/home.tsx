"use client";

import Image from "next/image";
import profile from "@/public/profile.png";
import { WordRotate } from "../magicui/word-rotate";

const HomeSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#07070A]">
      {/* Animated code blocks */}
      <div className="absolute top-20 left-4 hidden opacity-20 sm:block">
        <pre className="text-xs text-white/70">
          {`function develop() {
  const skills = ['React', 'Next JS', 'Node.js'];
  return skills.map(skill => 
    createAmazing(skill));
}`}
        </pre>
      </div>
      <div className="absolute right-4 bottom-20 hidden opacity-20 sm:block">
        <pre className="text-xs text-white/70">
          {`const future = async () => {
  await buildProjects();
  return innovation;
}`}
        </pre>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 container flex flex-col-reverse items-center gap-8 px-4 sm:flex-row sm:gap-12">
          <div className="max-w-2xl text-center sm:text-left">
            <div className="mb-4 inline-block rounded-lg bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm">
              Available for exciting projects
            </div>
            <h1 className="text-xl text-white sm:text-2xl">
              Hi there!, I&apos;m
            </h1>
            <WordRotate
              className="h-14 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
              words={[
                "Bilal Khalil Khankhail,",
                "Frontend Engineer,",
                "Freelancer,",
              ]}
            />
            <p className="mt-4 text-xl leading-relaxed text-white/90">
              A passionate Frontend Engineer from Pakistan crafting digital
              experiences. Transforming complex problems into elegant solutions
              with modern technologies. Let&apos;s build the future of web
              together!
            </p>

            {/* Tech stack section */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {["React", "Next.js", "TailwindCSS", "JavaScript"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/15"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:cursor-pointer hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                View Projects
                {/* <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" /> */}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:cursor-pointer hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -z-10 h-full w-full rounded-full bg-white/10 blur-xl" />
            <div className="relative">
              <Image
                src={profile}
                alt="bilal"
                width={300}
                className="relative rounded-xl transition-all duration-300 hover:scale-[1.02]"
              />

              {/* Tech decoration elements */}
              <div className="absolute top-1/2 -left-3 h-6 w-6 -translate-y-1/2 rounded border border-white/20 bg-white/5"></div>
              <div className="absolute top-1/3 -right-3 h-4 w-4 rounded-full border border-white/20 bg-white/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 h-20 w-20 rounded-full border border-white/10"></div>
      <div className="absolute top-10 right-20 h-32 w-32 rounded-full border border-white/10"></div>
    </section>
  );
};

export default HomeSection;
