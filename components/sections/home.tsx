import Image from "next/image";
import profile from "@/public/profile.png";
import WordRotate from "@/components/magicui/word-rotate";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const HomeSection = () => {
  return (
    <section className="m-auto flex h-screen w-7/12 flex-row items-center gap-4 dark:text-white">
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
        <Button className="mt-4 bg-[#1f1f1f] text-lg font-medium">
          Resume
          <Download className="ml-2" size={18} />
        </Button>
      </div>
    </section>
  );
};

export default HomeSection;
