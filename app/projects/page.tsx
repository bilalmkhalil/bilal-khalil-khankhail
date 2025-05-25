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
      <div className="m-auto w-10/12 max-w-7xl">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-16 flex justify-between gap-4 border-b-2 pb-4">
          <h1 className="text-4xl text-white sm:text-6xl">All Projects</h1>
          <h1
            className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
          >
            تمام منصوبے
          </h1>
        </div>

        {/* Tech Filter Section */}
        <div className="mb-12">
          <h2 className="text-2xl text-white mb-6">Filter by Technology</h2>
          <div className="flex flex-wrap gap-3">
            {ALL_TECH_STACK.map((tech) => (
              <button
                key={tech}
                onClick={() =>
                  setSelectedTech(tech === selectedTech ? null : tech)
                }
                className={`relative flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10 ${
                  tech === selectedTech
                    ? "bg-white/15 border-white/20"
                    : ""
                }`}
              >
                <span>{tech}</span>
                {tech === selectedTech && (
                  <X
                    className="h-4 w-4 cursor-pointer rounded-full bg-white/20 p-0.5 text-white hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTech(null);
                    }}
                    aria-label="Clear filter"
                  />
                )}
              </button>
            ))}
          </div>
          {selectedTech && (
            <p className="mt-4 text-white/60 text-sm">
              Showing {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""} with {selectedTech}
            </p>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((data, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isLoaded ? `${index * 100}ms` : "0ms",
              }}
            >
              <ProjectCard
                title={data.title}
                description={data.description}
                stack={data.stack}
                image={data.image}
              />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">
              No projects found with the selected technology.
            </p>
            <button
              onClick={() => setSelectedTech(null)}
              className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filter to see all projects
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectsPage;
