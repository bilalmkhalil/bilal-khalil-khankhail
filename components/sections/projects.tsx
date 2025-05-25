import localFont from "next/font/local";
import ProjectCard from "../CustomComponents/project-card";
import Link from 'next/link';
import { PROJECT_STACKS } from "@/lib/constants";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const demoData = [
  {
    title: "E-commerce Platform Revamp",
    description:
      "Complete overhaul of e-commerce website with responsive design, new payment gateway, and custom CMS for product management.",
    stack: PROJECT_STACKS.ecommerce,
    image:
      "https://images.unsplash.com/photo-1561997968-aa846c2bf255?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "Real-time Chat Application",
    description:
      "Scalable chat app with group chats, messaging, file sharing, video calls, and end-to-end encryption for corporate clients.",
    stack: PROJECT_STACKS.chatApp,
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    title: "AI-powered Content Recommendation Engine",
    description:
      "Machine learning recommendation system for streaming platforms with personalized suggestions and A/B testing capabilities.",
    stack: PROJECT_STACKS.aiRecommendation,
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative m-auto flex w-10/12 flex-col justify-center gap-16 pb-40"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-white sm:text-6xl">Projects</h1>
        <h1
          className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
        >
          منصوبے
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demoData.map((data, index) => (
          <ProjectCard
            key={index}
            title={data.title}
            description={data.description}
            stack={data.stack}
            image={data.image}
          />
        ))}
      </div>
      <div className="flex justify-center pt-8">
        <Link 
          href="/projects" 
          className="relative inline-flex items-center px-8 py-3 text-white border border-white/10 bg-white/5 backdrop-blur-md rounded-md hover:bg-white/10 transition-all duration-300 group overflow-hidden"
        >
          <span className="relative z-10 font-medium">View All Projects</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          <svg 
            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
