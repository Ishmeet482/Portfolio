
import { useEffect, useRef, useState } from "react";
import Container from "./ui-components/Container";
import { Code, Database, Server, TerminalSquare, PenTool, Layers } from "lucide-react";
import { Toggle } from "./ui/toggle";

interface Technology {
  name: string;
  proficiency: number; // 1-5 scale
  icon: React.ReactNode;
  isLearning?: boolean;
}

const languages: Technology[] = [
  { name: "Python", proficiency: 5, icon: <Code className="w-5 h-5 mr-2" /> },
  { name: "Java", proficiency: 4, icon: <Code className="w-5 h-5 mr-2" /> },
  { name: "C++", proficiency: 3, icon: <TerminalSquare className="w-5 h-5 mr-2" /> },
  { name: "HTML", proficiency: 5, icon: <Code className="w-5 h-5 mr-2" /> },
  { name: "CSS", proficiency: 4, icon: <PenTool className="w-5 h-5 mr-2" /> },
  { name: "JavaScript", proficiency: 5, icon: <Code className="w-5 h-5 mr-2" /> },
];

const frameworks: Technology[] = [
  { name: "React", proficiency: 5, icon: <Layers className="w-5 h-5 mr-2" /> },
  { name: "Node.js", proficiency: 4, icon: <Server className="w-5 h-5 mr-2" /> },
  { name: "Express", proficiency: 4, icon: <Server className="w-5 h-5 mr-2" /> },
  { name: "MongoDB", proficiency: 3, icon: <Database className="w-5 h-5 mr-2" /> },
  { name: "Tailwind CSS", proficiency: 4, icon: <PenTool className="w-5 h-5 mr-2" /> },
  { name: "NextJS", proficiency: 3, icon: <Layers className="w-5 h-5 mr-2" />, isLearning: true },
];

const learningTech: Technology[] = [
  { name: "Rust", proficiency: 2, icon: <Code className="w-5 h-5 mr-2" />, isLearning: true },
  { name: "GraphQL", proficiency: 2, icon: <Database className="w-5 h-5 mr-2" />, isLearning: true },
  { name: "Flutter", proficiency: 1, icon: <Layers className="w-5 h-5 mr-2" />, isLearning: true },
];

const StackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [showLearning, setShowLearning] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-enter-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  // Function to render proficiency bars
  const renderProficiency = (level: number) => {
    const bars = [];
    for (let i = 1; i <= 5; i++) {
      bars.push(
        <div 
          key={i} 
          className={`h-1.5 w-6 rounded-full ${i <= level ? 'bg-yellow-accent' : 'bg-gray-200'}`}
        />
      );
    }
    return (
      <div className="flex space-x-1">
        {bars}
      </div>
    );
  };
  
  const renderTechItem = (tech: Technology) => {
    if (showLearning || !tech.isLearning) {
      return (
        <li key={tech.name} className="flex items-center justify-between p-2 hover:bg-yellow-light/50 rounded-lg transition-colors">
          <div className="flex items-center">
            {tech.icon}
            <span className={tech.isLearning ? 'text-charcoal/70' : ''}>{tech.name}</span>
            {tech.isLearning && <span className="ml-2 text-xs text-yellow-accent font-medium">Learning</span>}
          </div>
          {renderProficiency(tech.proficiency)}
        </li>
      );
    }
    return null;
  };
  
  return (
    <section id="stack" className="py-20">
      <Container size="large">
        <div ref={titleRef} className="section-enter mb-6">
          <p className="text-charcoal/60 text-sm mb-2">tools & technologies</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Stack I Use</h2>
        </div>
        
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center space-x-2">
            <span className={!showLearning ? "font-medium" : "text-charcoal/60"}>Proficient</span>
            <Toggle 
              pressed={showLearning}
              onPressedChange={setShowLearning}
              className="bg-yellow-light data-[state=on]:bg-yellow-accent"
            />
            <span className={showLearning ? "font-medium" : "text-charcoal/60"}>Learning</span>
          </div>
        </div>
        
        <div ref={sectionRef} className="section-enter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Languages */}
            <div className="stack-card">
              <h3 className="text-2xl font-semibold mb-6">Languages</h3>
              <ul className="space-y-3">
                {languages.map(renderTechItem)}
                {showLearning && learningTech.filter(t => !frameworks.some(f => f.name === t.name)).map(renderTechItem)}
              </ul>
            </div>
            
            {/* Frameworks */}
            <div className="stack-card">
              <h3 className="text-2xl font-semibold mb-6">Frameworks & Tools</h3>
              <ul className="space-y-3">
                {frameworks.map(renderTechItem)}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StackSection;
