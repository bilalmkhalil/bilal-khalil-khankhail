"use client";

import Image from "next/image";
import profile from "@/public/profile.png";
import { WordRotate } from "../magicui/word-rotate";
import { BorderBeam } from "../magicui/border-beam";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { MAIN_TECH_STACK, CODE_SNIPPETS, WORD_ROTATION_TITLES } from "@/lib/constants";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const HomeSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-[#07070A]">
      {/* Floating code blocks with improved positioning */}
      <div className="absolute top-20 left-8 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="text-xs text-white/70 font-mono">
            {CODE_SNIPPETS.skills}
          </pre>
        </div>
      </div>
      
      <div className="absolute right-8 top-1/3 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="text-xs text-white/70 font-mono">
            {CODE_SNIPPETS.passion}
          </pre>
        </div>
      </div>

      <div className="absolute left-8 bottom-32 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="text-xs text-white/70 font-mono">
            {CODE_SNIPPETS.future}
          </pre>
        </div>
      </div>

      {/* Main content with consistent width */}
      <div className="relative m-auto w-10/12 flex items-center justify-center h-screen">
        <div className={`relative z-10 flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Left content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm border border-white/10">
              <span className="relative">
                <span className="absolute -left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white animate-pulse"></span>
                Available for exciting projects
              </span>
            </div>

            <h2 className="text-2xl text-white/90 sm:text-3xl mb-4" role="heading" aria-level={2}>
              Hi there!, I&apos;m
            </h2>
            
            <WordRotate
              className="h-20 sm:h-24 lg:h-28 bg-gradient-to-r from-white via-white/90 to-gray-300 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl lg:text-7xl mb-6 flex items-center min-w-0"
              words={[...WORD_ROTATION_TITLES]}
            />
            
            <p className="text-lg leading-relaxed text-white/80 mb-8 max-w-xl">
              A passionate Frontend Engineer from Pakistan crafting exceptional digital
              experiences. Transforming complex problems into elegant, user-centric solutions
              with cutting-edge technologies. Let&apos;s build the future of web together!
            </p>

            {/* Enhanced tech stack */}
            <div className="mb-8">
              <p className="text-sm text-white/60 mb-3">Tech Stack</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {MAIN_TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="relative rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Enhanced buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative rounded-full bg-white/15 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 hover:border-white/30 overflow-hidden"
                aria-label="View my projects"
              >
                <span className="relative z-10">View Projects</span>
                <BorderBeam size={60} duration={8} colorFrom="#ffffff30" colorTo="#ffffff10" />
              </button>
              
              <button
                onClick={() => scrollToSection("contact")}
                className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                aria-label="Contact me"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right content - Enhanced image section */}
          <div className="relative flex-shrink-0">
            {/* Improved background effects */}
            <div className="absolute -inset-8 rounded-full bg-white/5 blur-2xl animate-pulse" />
            
            <div className="relative group">
              
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-sm">
                <Image
                  src={profile}
                  alt="Developer - Frontend Engineer"
                  width={350}
                  height={350}
                  className="relative rounded-xl transition-all duration-500 group-hover:scale-[1.02] object-cover"
                  priority
                />
                <BorderBeam size={150} duration={12} colorFrom="#ffffff20" colorTo="#ffffff05" />
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -left-6 h-12 w-12 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="h-6 w-6 rounded bg-white"></div>
              </div>
              
              <div className="absolute -top-3 -right-8 h-8 w-8 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>
              
              <div className="absolute -bottom-4 -right-6 h-10 w-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-white"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-4 h-6 w-6 rounded border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="h-3 w-3 rounded bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-16 left-16 h-24 w-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-pulse hidden lg:block"></div>
      <div className="absolute top-16 right-24 h-32 w-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-32 right-8 h-16 w-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm rotate-45 hidden lg:block"></div>
    </section>
  );
};

export default HomeSection;
