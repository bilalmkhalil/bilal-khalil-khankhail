"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import ProjectCard from "@/components/CustomComponents/project-card";
import { X, ArrowLeft } from "lucide-react";
import { Project } from "@/types/types";
import { ALL_TECH_STACK, PROJECT_STACKS } from "@/lib/constants";

const demoData: Project[] = [
  {
    title: "E-commerce Platform Revamp",
    description:
      "A complete overhaul of an existing e-commerce website, focusing on improving user experience, implementing a responsive design, and integrating a new payment gateway. The project also included building a custom CMS for easy product management.",
    stack: PROJECT_STACKS.ecommerce,
    image:
      "https://images.unsplash.com/photo-1561997968-aa846c2bf255?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "Real-time Chat Application",
    description:
      "Developed a scalable real-time chat application for a large corporate client. The app supports group chats, direct messaging, file sharing, and video calls. It also includes features like message threading, read receipts, and end-to-end encryption.",
    stack: PROJECT_STACKS.chatApp,
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    title: "AI-powered Content Recommendation Engine",
    description:
      "Built a sophisticated content recommendation system for a streaming platform. The engine uses machine learning algorithms to analyze user behavior and content metadata to provide personalized recommendations. It also includes A/B testing capabilities to continuously improve recommendation accuracy.",
    stack: PROJECT_STACKS.aiRecommendation,
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const ProjectsPage = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredProjects = selectedTech
    ? demoData.filter((project) => project.stack.includes(selectedTech))
    : demoData;

  return (
    <main className="min-h-screen bg-[#07070A] px-4 py-20">
      <header 
        className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-gradient-to-b from-[#07070A] to-[#07070A]/80 backdrop-blur-md animate-fade-in"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-medium tracking-wider text-white transition-colors duration-300 hover:text-purple-400 md:text-2xl group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="relative">
              Bilal Khalil Khankhail
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/#about"
              className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
            >
              About
            </Link>
            <Link
              href="/#skills"
              className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
            >
              Skills
            </Link>
            <Link
              href="/#experience"
              className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
            >
              Experience
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
            >
              Contact
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-purple-400"
            >
              Projects
            </Link>
          </nav>
        </div>
      </header>
      <div className="m-auto mt-16 w-10/12">
        <div className="mb-10 flex justify-between gap-4 border-b-2 pb-4">
          <h1 className="text-4xl text-white sm:text-6xl">All Projects</h1>
          <h1
            className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
          >
            تمام منصوبے
          </h1>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {ALL_TECH_STACK.map((tech) => (
            <button
              key={tech}
              onClick={() =>
                setSelectedTech(tech === selectedTech ? null : tech)
              }
              className={`relative flex w-fit items-center rounded-full border border-white/10 px-3 py-2 text-sm text-white shadow-lg backdrop-blur-md transition-all hover:cursor-pointer ${
                tech === selectedTech
                  ? "bg-white/10"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <p>{tech}</p>
              {tech === selectedTech && (
                <X
                  className="ml-2 h-4 w-4 cursor-pointer rounded-full bg-gray-600/80 p-0.5 text-white"
                  onClick={() => setSelectedTech(null)}
                  aria-label="Close"
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {filteredProjects.map((data, index) => (
            <ProjectCard
              key={index}
              title={data.title}
              description={data.description}
              stack={data.stack}
              image={data.image}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
