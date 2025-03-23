import Image from "next/image";
import profile from "@/public/profile.png";
// import { Button } from "../ui/button";
// import { Download } from "lucide-react";
// import { BorderBeam } from "../magicui/border-beam";
import { Meteors } from "../magicui/meteors";
import { WordRotate } from "../magicui/word-rotate";

const HomeSection = () => {
  return (
    <section className="relative h-screen">
      <Meteors number={50} />
      <div className="z-1 absolute flex h-screen flex-row flex-wrap items-center justify-center overflow-hidden p-6 text-white sm:left-[20%] sm:w-7/12 sm:flex-nowrap sm:gap-4 sm:p-0">
        <Image src={profile} alt="bilal" width={300} className="rounded-xl" />

        <div>
          <h1 className="text-xl sm:text-2xl">Hi there!, I&apos;m</h1>
          <WordRotate
            className="text-3xl font-bold text-white sm:text-4xl"
            words={[
              "Bilal Khalil Khankhail,",
              "Full-Stack Developer,",
              "Freelancer,",
            ]}
          />
          <h1 className="mb-40 text-xl text-white/90 sm:mb-0 sm:text-2xl">
            A full-stack developer from Pakistan. I love bringing ideas to life
            through clean and elegant websites. Let&apos;s create something amazing
            together!
          </h1>
          {/* <Button className="relative mt-4 bg-[#1C7C54] text-lg font-medium text-white hover:bg-[#25b176]">
            Resume
            <Download className="ml-2" size={18} />
            <BorderBeam size={65} />
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
