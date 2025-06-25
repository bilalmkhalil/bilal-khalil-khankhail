"use client";

import Image from "next/image";
import profile from "@/public/profile.png";
import { WordRotate } from "../magicui/word-rotate";
import { BorderBeam } from "../magicui/border-beam";
import { useEffect, useState } from "react";
import { CODE_SNIPPETS, WORD_ROTATION_TITLES } from "@/lib/constants";

const HomeSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden bg-[#07070A]"
    >
      {/* Floating code blocks with improved positioning */}
      <div className="absolute top-20 left-8 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="font-mono text-xs text-white/70">
            {CODE_SNIPPETS.skills}
          </pre>
        </div>
      </div>

      <div className="absolute top-1/3 right-8 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="font-mono text-xs text-white/70">
            {CODE_SNIPPETS.passion}
          </pre>
        </div>
      </div>

      <div className="absolute bottom-32 left-8 hidden opacity-15 lg:block">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <pre className="font-mono text-xs text-white/70">
            {CODE_SNIPPETS.future}
          </pre>
        </div>
      </div>

      {/* Main content with consistent width */}
      <div className="relative m-auto flex h-screen w-10/12 items-center justify-center">
        <div
          className={`relative z-10 flex flex-col-reverse items-center gap-12 transition-all duration-1000 lg:flex-row lg:gap-16 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Left content */}
          <div className="max-w-2xl flex-1 text-center lg:text-left">
            <div className="mb-6 inline-block rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              <span className="relative pl-1.5">
                <span className="absolute top-1/2 -left-2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-red-500"></span>
                Available for exciting projects
              </span>
            </div>

            <h2
              className="mb-4 text-2xl text-white/90 sm:text-3xl"
              role="heading"
              aria-level={2}
            >
              Hi there!, I&apos;m
            </h2>

            <WordRotate
              className="mb-6 flex h-20 min-w-0 items-center text-white bg-clip-text text-4xl font-bold sm:h-24 sm:text-6xl lg:h-[18px] lg:text-5xl"
              words={[...WORD_ROTATION_TITLES]}
            />

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/80">
              A passionate Frontend Engineer from Pakistan crafting exceptional
              digital experiences. Transforming complex problems into elegant,
              user-centric solutions with cutting-edge technologies. Let&apos;s
              build the future of web together!
            </p>
          </div>

          {/* Right content - Enhanced image section */}
          <div className="relative flex-shrink-0">
            {/* Improved background effects */}
            <div className="absolute -inset-8 animate-pulse rounded-full bg-white/5 blur-2xl" />

            <div className="group relative">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-sm">
                <Image
                  src={profile}
                  alt="Developer - Frontend Engineer"
                  width={350}
                  height={350}
                  className="relative rounded-xl object-cover transition-all duration-500 group-hover:scale-[1.02]"
                  priority
                />
                <BorderBeam
                  size={150}
                  duration={12}
                  colorFrom="#ffffff20"
                  colorTo="#ffffff05"
                />
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -left-6 flex h-12 w-12 items-center justify-center rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm">
                <div className="h-6 w-6 rounded bg-white"></div>
              </div>

              <div className="absolute -top-3 -right-8 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>

              <div className="absolute -right-6 -bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                <div className="h-5 w-5 rounded-full bg-white"></div>
              </div>

              <div className="absolute -bottom-6 -left-4 flex h-6 w-6 items-center justify-center rounded border border-white/30 bg-white/10 backdrop-blur-sm">
                <div className="h-3 w-3 rounded bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-16 left-16 hidden h-24 w-24 animate-pulse rounded-full border border-white/10 bg-white/5 backdrop-blur-sm lg:block"></div>
      <div className="absolute top-16 right-24 hidden h-32 w-32 animate-pulse rounded-full border border-white/10 bg-white/5 backdrop-blur-sm lg:block"></div>
      <div className="absolute right-8 bottom-32 hidden h-16 w-16 rotate-45 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm lg:block"></div>
    </section>
  );
};

export default HomeSection;
