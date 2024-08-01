import Image from "next/image";
import profile from "@/public/profile.png";
import WordRotate from "@/components/magicui/word-rotate";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import Meteors from "../magicui/meteors";
import { BorderBeam } from "../magicui/border-beam";

const HomeSection = () => {
  return (
    <section className="relative h-screen">
      <Meteors number={50} />
      <div className="z-1 absolute left-[20%] flex h-screen w-7/12 flex-row items-center gap-4 overflow-hidden dark:text-white">
        <Image src={profile} alt="bilal" width={300} className="rounded-xl" />

        <div>
          <h1 className="text-2xl">Hi there!, I'm</h1>
          <WordRotate
            className="text-4xl font-bold text-[#595959] dark:text-white"
            words={[
              "Bilal Khalil Khankhail,",
              "Full-Stack Developer,",
              "Freelancer,",
            ]}
          />
          <h1 className="text-2xl">
            A full-stack developer from Pakistan. I love bringing ideas to life
            through clean and elegant websites. Let's create something amazing
            together!
          </h1>
          <Button className="relative mt-4 bg-[#1f1f1f] text-lg font-medium hover:bg-[#1f1f1f] dark:text-white">
            Resume
            <Download className="ml-2" size={18} />
            <BorderBeam size={65} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
