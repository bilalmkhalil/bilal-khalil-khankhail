"use client";

import { useState } from 'react';
import Link from 'next/link';
import localFont from "next/font/local";
import ProjectCard from '@/components/CustomComponents/project-card';
// import { BorderBeam } from '@/components/magicui/border-beam';

interface Project {
  title: string;
  description: string;
  stack: string[];
  image: string;
}

const demoData: Project[] = [
  {
    title: "E-commerce Platform Revamp",
    description:
      "A complete overhaul of an existing e-commerce website, focusing on improving user experience, implementing a responsive design, and integrating a new payment gateway. The project also included building a custom CMS for easy product management.",
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    image: "https://images.unsplash.com/photo-1561997968-aa846c2bf255?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "Real-time Chat Application",
    description:
      "Developed a scalable real-time chat application for a large corporate client. The app supports group chats, direct messaging, file sharing, and video calls. It also includes features like message threading, read receipts, and end-to-end encryption.",
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "React",
      "Docker",
      "AWS",
    ],
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    title: "AI-powered Content Recommendation Engine",
    description:
      "Built a sophisticated content recommendation system for a streaming platform. The engine uses machine learning algorithms to analyze user behavior and content metadata to provide personalized recommendations. It also includes A/B testing capabilities to continuously improve recommendation accuracy.",
    stack: [
      "Python",
      "Django",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const allTechStack = [
  "React", "TypeScript", "Node.js", "Express", "MongoDB", "Redis",
  "Python", "Django", "PostgreSQL", "Docker", "Kubernetes", "AWS"
];

const ProjectsPage = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = selectedTech
    ? demoData.filter(project => project.stack.includes(selectedTech))
    : demoData;

  return (
    <main className="min-h-screen bg-black px-4 py-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link 
            href="/" 
            className="text-white font-medium text-xl md:text-2xl tracking-wider hover:text-purple-400 transition-colors duration-300 flex items-center"
          >
            <span className="relative">
              Bilal Khalil Khankhail
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">
              About
            </Link>
            <Link href="/#skills" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">
              Skills
            </Link>
            <Link href="/#experience" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">
              Experience
            </Link>
            <Link href="/#contact" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">
              Contact
            </Link>
            <Link href="/projects" className="text-purple-400 font-medium text-sm">
              Projects
            </Link>
          </nav>
        </div>
      </header>
      <div className="m-auto w-10/12 mt-16">
        <div className="flex justify-between gap-4 border-b-2 pb-4 mb-10">
          <h1 className="text-4xl text-white sm:text-6xl">All Projects</h1>
          <h1 className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}>
            تمام منصوبے
          </h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {allTechStack.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
              className={`relative flex items-center text-white rounded-full px-4 py-2 text-sm transition-all border border-white/10 shadow-lg backdrop-blur-md ${
                tech === selectedTech
                  ? 'bg-white/10'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {tech}
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
