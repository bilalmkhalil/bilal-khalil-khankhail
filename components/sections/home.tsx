"use client";

import Image from "next/image";
import profile from "@/public/profile.png";
import { WordRotate } from "../magicui/word-rotate";
import { useEffect, useState } from "react";

const HomeSection = () => {
  // For fallback animation if Tailwind animations aren't available
  const [animationStyles, setAnimationStyles] = useState({
    slow: {},
    medium: {},
    fast: {},
  });

  useEffect(() => {
    // Set up the animation styles
    setAnimationStyles({
      slow: {
        animation: "fall 15s linear infinite",
        animationFillMode: "both",
      },
      medium: {
        animation: "fall 10s linear infinite",
        animationFillMode: "both",
      },
      fast: {
        animation: "fall 7s linear infinite",
        animationFillMode: "both",
      },
    });

    // Create the keyframe animation for fall if needed
    const styleSheet = document.styleSheets.length > 0 ? document.styleSheets[0] : null;
    if (!styleSheet) return;
    let fallAnimationExists = false;

    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i];
      if (rule instanceof CSSKeyframesRule && rule.name === "fall") {
        fallAnimationExists = true;
        break;
      }
    }

    if (!fallAnimationExists) {
      styleSheet.insertRule(
        `
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `,
        styleSheet.cssRules.length,
      );
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-[#07070A]">
      {/* Tech-themed background layers */}
      {/* <div className="bg-grid-white/[0.02] absolute inset-0 bg-[length:50px_50px]" /> */}
      {/* <div className="absolute -top-20 -right-20 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-[100px]" /> */}
      {/* <div className="absolute -bottom-32 -left-20 h-[30rem] w-[30rem] rounded-full bg-gray-500/5 blur-[100px]" /> */}

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
              A passionate full-stack developer from Pakistan crafting digital
              experiences. Transforming complex problems into elegant solutions
              with modern technologies. Let&apos;s build the future of web
              together!
            </p>

            {/* Tech stack section
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {["React", "Next.js", "Node.js", "TypeScript", "MongoDB"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/15"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div> */}

            {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <button className="group relative rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                View Projects
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </button>
              <button className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Contact Me
              </button>
            </div> */}

            {/* Social links */}
            {/* <div className="mt-6 flex items-center justify-center gap-4 sm:justify-start">
              {["github", "twitter", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:border-white/40 hover:bg-white/10"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-5 w-5" />
                </a>
              ))} */}
            {/* </div> */}
          </div>

          {/* Enhanced profile image */}
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

      {/* Matrix-like code rain effect with fallback inline styles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-fall-slow absolute top-0 left-[10%] font-mono text-xs text-white opacity-10"
          style={animationStyles.slow}
        >
          10100111
        </div>
        <div
          className="animate-fall-medium absolute top-0 left-[20%] font-mono text-xs text-white opacity-10"
          style={animationStyles.medium}
        >
          01101001
        </div>
        <div
          className="animate-fall-fast absolute top-0 left-[30%] font-mono text-xs text-white opacity-10"
          style={animationStyles.fast}
        >
          11001010
        </div>
        <div
          className="animate-fall-slow absolute top-0 left-[70%] font-mono text-xs text-white opacity-10"
          style={animationStyles.slow}
        >
          01010011
        </div>
        <div
          className="animate-fall-medium absolute top-0 left-[85%] font-mono text-xs text-white opacity-10"
          style={animationStyles.medium}
        >
          10101100
        </div>
        {/* Add more code rain elements */}
        <div
          className="animate-fall-medium absolute top-0 left-[5%] font-mono text-xs text-white opacity-10"
          style={animationStyles.medium}
        >
          11101010
        </div>
        <div
          className="animate-fall-slow absolute top-0 left-[40%] font-mono text-xs text-white opacity-10"
          style={animationStyles.slow}
        >
          00010111
        </div>
        <div
          className="animate-fall-fast absolute top-0 left-[55%] font-mono text-xs text-white opacity-10"
          style={animationStyles.fast}
        >
          01011001
        </div>
        <div
          className="animate-fall-medium absolute top-0 left-[75%] font-mono text-xs text-white opacity-10"
          style={animationStyles.medium}
        >
          11100101
        </div>
        <div
          className="animate-fall-fast absolute top-0 left-[92%] font-mono text-xs text-white opacity-10"
          style={animationStyles.fast}
        >
          10101011
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 h-20 w-20 rounded-full border border-white/10"></div>
      <div className="absolute top-10 right-20 h-32 w-32 rounded-full border border-white/10"></div>
    </section>
  );
};

export default HomeSection;
