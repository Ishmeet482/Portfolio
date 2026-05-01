import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Container from "./ui-components/Container";
import ProjectCard, { ProjectProps } from "./ProjectCard";
import { DoodleUnderline, DoodleArrowDown, DoodleSmiley, DoodleLightbulb } from "./Doodles";

const projects: ProjectProps[] = [
  {
    id: "Web3-AMM",
    title: "Decentralized AMM with NFT LP Positions",
    description: "An advanced AMM for the Sui blockchain featuring NFT-based liquidity tracking, dual pool types (StableSwap & constant product), and built-in slippage protection. Each liquidity deposit issues a non-fungible position NFT, enabling composable DeFi strategies on-chain.",
    image: ["/images/SUI.png", "/images/SUI-2.png"],
    tags: ["SUI", "Move", "Web3", "Blockchain"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ishmeet482/Constant-Product-AMM",
    type: "Personal",
    date: "2025",
    learned: [
      "Applied Move’s resource model to create non-transferable LP NFTs that store position metadata such as share ratios and entry price directly on-chain.",
      "Designed a dual-pool router that routes swaps to StableSwap or constant-product pools based on token pair classification.",
      "Added on-chain slippage checks using invariant validation and transaction aborts.",
    ],
    challenges: [
      "Move's strict ownership semantics required careful borrow-and-return patterns when reading LP NFT fields across both pool modules without consuming the object.",
      "Ensured consistency in atomic add/remove liquidity flows on Sui by controlling execution order and preventing intermediate state inconsistencies.",
    ],
  },
  {
    id: "weather-etl",
    title: "Weather ETL Pipeline",
    description: "A production-grade ETL pipeline orchestrated with Apache Airflow that fetches real-time weather data from Open-Meteo, applies multi-step transformations, and loads normalized records into PostgreSQL — fully containerized with Docker Compose for repeatable local and cloud deployments.",
    image: ["/images/ETL_1.png", "/images/ETL_2.jpg"],
    tags: ["Apache Airflow", "PostgreSQL", "Docker", "Python"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ishmeet482/ETL-Pipeline",
    type: "Personal",
    date: "2024",
    learned: [
      "Orchestrated multi-step Airflow DAGs using sensors and XCom to pass transformed data between tasks without relying on external state stores.",
      "Containerized the pipeline with Docker Compose, configuring PostgreSQL with persistent storage and enabling parallel execution via Airflow’s CeleryExecutor.",
      "Added idempotent retries with exponential backoff to handle API failures without data duplication.",
    ],
    challenges: [
      "Handled API schema changes using dynamic column mapping during transformation.",
      "Debugging Airflow task state transitions inside Docker with limited log streaming forced building a custom log-forwarding sidecar container.",
    ],
  },
  {
    id: "finance-backend",
    title: "Finance Data Processing & Access Control Backend",
    description: "A scalable FastAPI backend for a multi-role finance dashboard, enabling secure JWT-based RBAC, financial record management, and real-time analytics queries via RESTful APIs — documented with Swagger UI and stress-tested for sub-10ms response times under concurrent load.",
    image: ["/images/Finance_1.png"],
    tags: ["Python", "FastAPI", "SQLite", "JWT", "Swagger"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ishmeet482/Finance-Data-Processing-and-Access-Control-Backend",
    type: "Personal",
    date: "2024",
    learned: [
      "Implemented JWT-based RBAC middleware in FastAPI using dependency injection chains for granular, endpoint-level permission enforcement.",
      "Structured a normalized SQLite schema supporting multi-role analytics queries while maintaining sub-10ms median response times under concurrent load.",
      "Integrated Pydantic response models with Swagger UI to auto-generate interactive API documentation, dramatically reducing manual testing overhead.",
    ],
    challenges: [
      "Designing a role hierarchy supporting nested permissions without circular dependency in the middleware chain required a graph-based resolution pass at startup.",
      "Handling concurrent SQLite writes safely under FastAPI's async context demanded WAL-mode configuration and explicit connection-pool sizing.",
    ],
  },
  {
    id: "user-success-ml",
    title: "User Success Prediction System",
    description: "A machine learning analytics system that predicts user success and segments behavioral patterns using engineered engagement features and a Random Forest model, surfacing key product growth drivers through SHAP explainability.",
    image: ["/images/User Success.png"],
    tags: ["Python", "scikit-learn", "pandas", "matplotlib"],
    liveUrl: "https://colab.research.google.com/drive/1wozbz1pMo_j-EL4VZugymkWlycKgf1QG#scrollTo=SOhkontmOfo8",
    githubUrl: "https://github.com/Ishmeet482/User-Success-Prediction",
    type: "Personal",
    date: "2026",
    learned: [
      "Engineered domain-specific features (engagement decay scores, retention curves) that improved Random Forest accuracy by 18% over raw feature baselines.",
      "Applied SHAP TreeExplainer to quantify per-feature contributions and identified the top 3 behavioral drivers for product roadmap prioritization.",
      "Addressed class imbalance using SMOTE oversampling within cross-validation folds to prevent data leakage from synthetic minority samples.",
    ],
    challenges: [
      "High feature correlation required iterative PCA analysis to reduce multicollinearity without discarding predictive signal from correlated engagement metrics.",
      "Translating probabilistic model outputs into actionable binary thresholds demanded calibration curves and precision-recall trade-off analysis with stakeholders.",
    ],
  },
  {
    id: "media",
    title: "Media Database Showcase",
    description: "A media tracker that showcases my watched movies and series with real-time API integration, built to explore and learn frontend development.",
    image: ["/images/MEDIA.png"],
    tags: ["Vite", "Typescript", "API"],
    liveUrl: "https://media-database.vercel.app/",
    githubUrl: "https://github.com/Ishmeet482/Media-database",
    type: "Personal",
    date: "2026",
    learned: [
      "Engineered domain-specific features (engagement decay scores, retention curves) that improved Random Forest accuracy by 18% over raw feature baselines.",
      "Applied SHAP TreeExplainer to quantify per-feature contributions and identified the top 3 behavioral drivers for product roadmap prioritization.",
      "Addressed class imbalance using SMOTE oversampling within cross-validation folds to prevent data leakage from synthetic minority samples.",
    ],
    challenges: [
      "High feature correlation required iterative PCA analysis to reduce multicollinearity without discarding predictive signal from correlated engagement metrics.",
      "Translating probabilistic model outputs into actionable binary thresholds demanded calibration curves and precision-recall trade-off analysis with stakeholders.",
    ],
  },
  {
    id: "sui-lootbox",
    title: "Sui Loot Box System",
    description: "A blockchain-based loot box platform on Sui Move enabling secure, verifiable NFT reward distribution using on-chain randomness and configurable rarity tiers — with a React frontend integrating Sui wallet adapters for seamless user interactions.",
    image: ["/images/Loot_Box.png"],
    tags: ["SUI", "Move", "Web3", "React", "TypeScript"],
    liveUrl: "https://sui-lootbox-system.vercel.app/",
    githubUrl: "https://github.com/Ishmeet482/SUI-Lootbox-System",
    type: "Personal",
    date: "2026",
    learned: [
      "Leveraged Sui Move's on-chain randomness beacon for tamper-proof rarity draws, eliminating the need for an off-chain oracle.",
      "Designed configurable rarity tiers as Move constants, enabling tier probabilities to be updated via admin-only transactions without redeploying the module.",
    ],
    challenges: [
      "Ensuring fairness without exposing the randomness seed to front-running required consuming the beacon in a single atomic transaction.",
      "Managing Move object ownership transfers during loot reveal required careful sequencing to prevent double-claim exploits on concurrent opens.",
    ],
  },
  {
    id: "url-shortener",
    title: "URL Shortener with FastAPI & SQLite",
    description: "A FastAPI-based URL shortener that generates collision-resistant short codes, tracks per-link click analytics, and exposes an admin management API — backed by SQLite with composite indexes for fast redirect lookups.",
    image: ["/images/Shortener.png"],
    tags: ["Python", "FastAPI", "SQLite"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ishmeet482/URL-shortener-with-FastAPI",
    type: "Personal",
    date: "2024",
    learned: [
      "Generated collision-resistant short codes using base62 encoding of ULID timestamps, enabling lexicographic ordering without a separate counter column.",
      "Implemented click analytics with SQLite aggregation queries optimized via composite (short_code, created_at) indexes for sub-millisecond redirect resolution.",
    ],
    challenges: [
      "Handling concurrent redirect writes safely under FastAPI's async context required enabling SQLite WAL mode and tuning the connection pool size.",
    ],
  },
  {
    id: "llm-chatbot",
    title: "Intent-Based Chatbot with LLM Fallback",
    description: "A hybrid chatbot that routes standard queries through a fast local TF-IDF intent classifier and falls back to a HuggingFace LLM for complex or out-of-vocabulary inputs — deployed on a VM with a FastAPI inference server to decouple bot logic from model serving.",
    image: ["/images/Chatbot-1.png", "/images/Chatbot-2.png"],
    tags: ["Python", "HuggingFace", "FastAPI", "TF-IDF", "VM"],
    liveUrl: "#",
    githubUrl: "https://github.com/Ishmeet482/Intent-Based-Chatbot-with-LLM-Fallback",
    type: "Personal",
    date: "2025",
    learned: [
      "Built a two-stage pipeline: TF-IDF cosine similarity for sub-5ms local matching, with automatic escalation to the remote HuggingFace LLM when confidence dropped below threshold.",
      "Deployed the inference server on a cloud VM using FastAPI, isolating model memory from the bot process and enabling independent scaling.",
    ],
    challenges: [
      "Tuning the confidence threshold for LLM fallback required collecting 500+ labeled examples to balance response quality against median latency increase.",
    ],
  },
  {
    id: "avocado-dashboard",
    title: "Avocado Price Data Visualization",
    description: "An interactive Dash dashboard analyzing avocado price trends and consumption volumes across U.S. regions — featuring synchronized multi-chart filtering, responsive layouts, and a custom Figma-designed color palette translated directly into Plotly theme configurations.",
    image: ["/images/Avacado_Dashboard.png"],
    tags: ["Python", "Dash", "Plotly", "Figma", "pandas"],
    liveUrl: "https://avocados-dashboard.onrender.com/",
    githubUrl: "https://github.com/Ishmeet482/AvocadoDashboard",
    type: "Personal",
    date: "2022",
    learned: [
      "Built Dash callback chains that synchronize region, date-range, and variety filters across four linked charts without redundant data fetches.",
      "Translated a Figma color system into Plotly template configurations, ensuring visual consistency between design mockups and production charts.",
    ],
    challenges: [
      "Optimizing Pandas groupby aggregations for real-time callback responses required pre-computing summary tables and caching them at app startup.",
    ],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const featuredProjects = projects.slice(0, 3);
  
  useEffect(() => {
    const sectionElement = sectionRef.current;
    const titleElement = titleRef.current;
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
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    if (titleElement) {
      observer.observe(titleElement);
    }
    
    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
      
      if (titleElement) {
        observer.unobserve(titleElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOverlayOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOverlayOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOverlayOpen]);
  
  return (
    <section id="projects" className="py-20 relative">
      {/* Left margin doodle */}
      <DoodleLightbulb className="absolute left-4 top-40 h-10 w-8 hidden 2xl:block" />
      
      {/* Right margin doodle */}
      <DoodleSmiley className="absolute right-6 top-1/3 h-10 w-10 hidden 2xl:block" />
      
      <Container size="large">
        <div ref={titleRef} className="section-enter mb-12 relative">
          <p className="text-charcoal/60 text-sm mb-2 dark:text-offwhite/55">from 2020 'til today</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight relative inline-block">
            My latest work
            {/* Hand-drawn underline */}
            <DoodleUnderline className="absolute -bottom-2 left-0 w-[85%] h-3" />
          </h2>
          {/* Arrow pointing down to projects */}
          <DoodleArrowDown className="absolute -right-4 top-8 h-12 w-6 rotate-12 doodle-float hidden lg:block" />
        </div>

        <div ref={sectionRef} className="section-enter w-full">
          <div className="flex w-full flex-col gap-10 md:gap-12">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} {...project} index={idx} />
            ))}

            {/* Explore More CTA */}
            <button
              type="button"
              onClick={() => setIsOverlayOpen(true)}
              className="group w-full overflow-hidden rounded-[1.75rem] border border-black/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,249,229,0.64))] p-5 text-left shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-[2px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_76px_-36px_rgba(15,23,42,0.3),inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-offwhite/10 dark:bg-[linear-gradient(145deg,rgba(42,38,47,0.92),rgba(32,29,37,0.86))] dark:shadow-[0_30px_70px_-44px_rgba(0,0,0,0.62)] dark:hover:shadow-[0_38px_82px_-40px_rgba(0,0,0,0.72)]"
            >
              <div className="flex items-center justify-between gap-6 rounded-2xl border border-black/8 bg-white/40 px-6 py-8 transition-all duration-500 group-hover:border-black/12 group-hover:bg-white/50 dark:border-offwhite/10 dark:bg-white/5 dark:group-hover:border-offwhite/15 dark:group-hover:bg-white/8">
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-charcoal/45 dark:text-offwhite/45">
                    Project Archive
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-charcoal dark:text-offwhite md:text-[1.75rem]">
                    Explore More Projects
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-[1.65] text-charcoal/62 dark:text-offwhite/62">
                    {projects.length - featuredProjects.length} more projects in the archive.
                  </p>
                </div>
                <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/60 text-charcoal shadow-[0_10px_22px_-14px_rgba(15,23,42,0.2)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white dark:border-offwhite/10 dark:bg-white/8 dark:text-offwhite dark:group-hover:bg-white/14">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </Container>

      {isOverlayOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-lg"
          onClick={() => setIsOverlayOpen(false)}
        >
          <div
            className="mx-auto flex h-full max-w-6xl flex-col px-4 py-4 sm:px-8 sm:py-8 lg:px-12"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(145deg,rgba(255,249,229,0.96),rgba(255,255,255,0.9))] shadow-[0_38px_90px_-42px_rgba(15,23,42,0.38)] backdrop-blur-xl dark:border-offwhite/10 dark:bg-[linear-gradient(145deg,rgba(40,36,46,0.97),rgba(30,28,34,0.95))] dark:shadow-[0_38px_90px_-40px_rgba(0,0,0,0.72)]">
              <div className="flex items-start justify-between gap-6 border-b border-black/8 px-8 py-6 dark:border-offwhite/10 sm:px-10">
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-charcoal/45 dark:text-offwhite/45">
                    Project Archive
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-charcoal dark:text-offwhite">
                    All Projects
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOverlayOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/55 text-charcoal shadow-[0_16px_30px_-22px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-offwhite/10 dark:bg-white/8 dark:text-offwhite dark:hover:bg-white/14"
                  aria-label="Close project archive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-8 py-8 sm:px-10 sm:py-10">
                <div className="flex flex-col gap-10">
                  {projects.map((project, idx) => (
                    <ProjectCard key={project.id} {...project} index={idx} compact />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
