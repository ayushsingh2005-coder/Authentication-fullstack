import React from "react";
import { BookOpen, Code, Database, Cloud, Smartphone, Palette } from "lucide-react";

const categories = [
  {
    name: "Frontend",
    description: "Articles about React, Vue, Angular, and modern UI/UX development.",
    icon: <Palette className="w-8 h-8 text-purple-400" />,
  },
  {
    name: "Backend",
    description: "Dive into Node.js, Express, APIs, authentication, and system design.",
    icon: <Database className="w-8 h-8 text-purple-400" />,
  },
  {
    name: "DevOps & Cloud",
    description: "CI/CD, Docker, Kubernetes, AWS, Azure, and deployment strategies.",
    icon: <Cloud className="w-8 h-8 text-purple-400" />,
  },
  {
    name: "Mobile Development",
    description: "Explore React Native, Flutter, Swift, Kotlin, and mobile-first apps.",
    icon: <Smartphone className="w-8 h-8 text-purple-400" />,
  },
  {
    name: "Programming",
    description: "Core concepts, algorithms, data structures, and language deep dives.",
    icon: <Code className="w-8 h-8 text-purple-400" />,
  },
  {
    name: "Career & Learning",
    description: "Tips, roadmaps, and experiences to grow as a developer.",
    icon: <BookOpen className="w-8 h-8 text-purple-400" />,
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">
        Explore <span className="text-purple-400">Categories</span>
      </h1>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Discover articles across different domains. Whether you’re into frontend,
        backend, or career growth – there’s something for you.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-[#1e293b] rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-[#312e81] rounded-xl">{category.icon}</div>
              <h2 className="ml-4 text-xl font-semibold">{category.name}</h2>
            </div>
            <p className="text-gray-400 text-sm">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
