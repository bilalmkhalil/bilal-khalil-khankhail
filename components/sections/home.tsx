"use client";

import Image from "next/image";
import profile from "@/public/profile.png";
import { WordRotate } from "../magicui/word-rotate";
import { BorderBeam } from "../magicui/border-beam";
import { useEffect, useState } from "react";
import { CODE_SNIPPETS, WORD_ROTATION_TITLES } from "@/lib/constants";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

const HomeSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="bg-background relative overflow-hidden md:h-screen"
    >
      {/* Main content with consistent width */}
      <div className="relative m-auto flex w-10/12 items-center justify-center px-1 pt-24 pb-10 md:h-screen md:px-0 md:py-0">
        <div
          className={`relative z-10 flex flex-col-reverse items-center gap-12 transition-all duration-1000 lg:flex-row lg:gap-16 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Left content */}
          <div className="max-w-2xl flex-1 text-center lg:text-left">
            <div className="border-ink/10 bg-ink/10 text-ink mb-6 inline-block rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
              <span className="relative pl-1.5">
                <span className="absolute top-1/2 -left-2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-red-500"></span>
                Available for exciting projects
              </span>
            </div>

            <h2
              className="text-ink/90 mb-4 text-2xl sm:text-3xl"
              role="heading"
              aria-level={2}
            >
              Hi there!, I&apos;m
            </h2>

            <WordRotate
              className="text-ink mb-6 flex h-20 min-w-0 items-center bg-clip-text text-4xl font-bold sm:h-24 sm:text-6xl lg:h-[18px] lg:text-5xl"
              words={[...WORD_ROTATION_TITLES]}
            />

            <p className="text-ink/80 mb-8 max-w-xl text-lg leading-relaxed">
              A passionate Software Engineer from Pakistan crafting exceptional
              digital experiences. Transforming complex problems into elegant,
              user-centric solutions with cutting-edge technologies. Let&apos;s
              build the future of web together!
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-ink text-background hover:bg-ink/90"
              >
                <Link href="#contact">Hire Me</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-ink/20 bg-ink/10 text-ink hover:bg-ink hover:text-background"
              >
                <a href="/Bilal.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Right content - Enhanced image section */}
          <div className="relative shrink-0">
            {/* Improved background effects */}
            <div className="bg-ink/5 absolute -inset-8 animate-pulse rounded-full blur-2xl" />

            <div className="group relative">
              <div className="border-ink/20 bg-ink/5 relative overflow-hidden rounded-2xl border p-2 backdrop-blur-sm">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
