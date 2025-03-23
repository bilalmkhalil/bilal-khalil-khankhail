import localFont from "next/font/local";
import ProjectCard from "../CustomComponents/project-card";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const demoData = [
  {
    title: "E-commerce Platform Revamp",
    description:
      "A complete overhaul of an existing e-commerce website, focusing on improving user experience, implementing a responsive design, and integrating a new payment gateway. The project also included building a custom CMS for easy product management.",
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Styled Components",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe API",
      "Jest",
      "Cypress",
    ],
    image:
      "https://images.unsplash.com/photo-1561997968-aa846c2bf255?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "Real-time Chat Application",
    description:
      "Developed a scalable real-time chat application for a large corporate client. The app supports group chats, direct messaging, file sharing, and video calls. It also includes features like message threading, read receipts, and end-to-end encryption.",
    stack: [
      "Node.js",
      "Express",
      "Socket.io",
      "MongoDB",
      "Redis",
      "React",
      "Redux",
      "WebRTC",
      "Docker",
      "AWS",
    ],
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    title: "AI-powered Content Recommendation Engine",
    description:
      "Built a sophisticated content recommendation system for a streaming platform. The engine uses machine learning algorithms to analyze user behavior and content metadata to provide personalized recommendations. It also includes A/B testing capabilities to continuously improve recommendation accuracy.",
    stack: [
      "Python",
      "Django",
      "PostgreSQL",
      "TensorFlow",
      "Keras",
      "Celery",
      "Redis",
      "Elasticsearch",
      "Docker",
      "Kubernetes",
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative m-auto flex w-10/12 flex-col justify-center gap-10 pb-40"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-white sm:text-6xl">Projects</h1>
        <h1 className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}>
          منصوبے
        </h1>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {demoData.map((data, index) => (
          <ProjectCard
            title={data.title}
            description={data.description}
            stack={data.stack}
            image={data.image}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
