import Image from "next/image";
import profile from "@/public/profile.png";
import WordRotate from "@/components/magicui/word-rotate";

const HomeSection = () => {
  return (
    <section className="m-auto grid h-screen w-6/12 grid-cols-2 items-center text-white">
      <Image src={profile} alt="bilal" width={300} className="rounded-full" />

      <div>
        <h2>Hi there!, i'm</h2>
        <WordRotate
          className="text-4xl font-bold text-[#595959] dark:text-white"
          words={[
            "Bilal Khalil Khankhail",
            "Frontend Developer",
            "Next.js Developer",
            "Freelancer",
          ]}
        />
      </div>
    </section>
  );
};

export default HomeSection;
