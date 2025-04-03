
import { useEffect, useRef } from "react";
import Container from "./ui-components/Container";
import ProjectCard, { ProjectProps } from "./ProjectCard";

// Sample projects data
const projects: ProjectProps[] = [
  {
    title: "Weather ETL Pipeline",
    description: "ETL pipeline project using Apache Airflow to fetch, transform, and store real-time weather data from Open-Meteo API into PostgreSQL.",
    image: ["/images/ETL_1.jpg", "/images/ETL_2.jpg"],
    tags: ["Apache Airflow", "PostgreSQL", "Docker"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ishmeet482/ETL-Pipeline", // This will be replaced later
    icon: "diamond",
    featured: true,
  },
  {
    title: "Deepengine",
    description: "Designing a new website style and a set of illustrations for a cybersecurity platform targeting enterprises and SMBs.",
    image: ["/images/DE1.jpg", "/images/DE2.jpg"],
    tags: ["UI/UX", "Web Design", "Illustrations"],
    liveUrl: "#",
    githubUrl: "#", // This will be replaced later
    icon: "tiktok",
    team: "Work Under Progress",
  },
  {
    title: "Data Visualization",
    description: "A dashboard to analyze the behavior of avocado prices and the number of avocados consumed",
    image: ["/images/DV1.jpg", "/images/DV2.jpg"],
    tags: ["Python", "Dash", "Figma"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ishmeet482/AvocadoDashboard", // This will be replaced later
    icon: "Dashboard",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <section id="projects" className="py-20">
      <Container size="large">
        <div ref={titleRef} className="section-enter mb-12">
          <p className="text-charcoal/60 text-sm mb-2">from 2020 'til today</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">My latest work</h2>
        </div>
        
        <div ref={sectionRef} className="section-enter w-full">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 w-full">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSection;
