import Container from "./ui-components/Container";
import { DoodleCheckmark, DoodleComputer } from "./Doodles";
import { motion } from "framer-motion";

interface TechItem {
  name: string;
  logo: string;
  logoDark?: string;
}

interface TechCategory {
  label: string;
  items: TechItem[];
}

const si = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

const N  = "403E43"; // charcoal – light-mode forced
const ND = "fbfbfa"; // offwhite – dark-mode forced

const categories: TechCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "Python",     logo: si("python") },
      { name: "JavaScript", logo: si("javascript") },
      { name: "TypeScript", logo: si("typescript") },
      { name: "Java",       logo: si("openjdk") },
      { name: "C++",        logo: si("cplusplus") },
      { name: "HTML5",      logo: si("html5") },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React",        logo: si("react") },
      { name: "Spring Boot",  logo: si("springboot", N),  logoDark: si("springboot", ND) },
      { name: "Node.js",      logo: si("nodedotjs") },
      { name: "Express",      logo: si("express", N),    logoDark: si("express", ND) },
      { name: "Tailwind CSS", logo: si("tailwindcss") },
      { name: "Vite",         logo: si("vite") },
    ],
  },
  {
    label: "Cloud & Infra",
    items: [
      { name: "Docker",   logo: si("docker") },
      { name: "Vercel",   logo: si("vercel", N),   logoDark: si("vercel", ND) },
      { name: "Git",      logo: si("git") },
      { name: "Airflow",  logo: si("apacheairflow") },
      { name: "GitHub",   logo: si("github", N),   logoDark: si("github", ND) },
    ],
  },
  {
    label: "Databases & Tools",
    items: [
      { name: "PostgreSQL", logo: si("postgresql") },
      { name: "MongoDB",    logo: si("mongodb") },
      { name: "Redis",      logo: si("redis") },
      { name: "MySQL",      logo: si("mysql") },
      { name: "VS Code",    logo: si("visualstudiocode") },
      { name: "Postman",    logo: si("postman") },
    ],
  },
  {
    label: "Currently Learning",
    items: [
      { name: "GraphQL",  logo: si("graphql") },
      { name: "Flutter",  logo: si("flutter") },
      { name: "Elastic Search", logo: si("elasticsearch", N), logoDark: si("elasticsearch", ND) },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const pillsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};

const StackSection = () => {
  return (
    <section id="stack" className="py-20 relative">
      {/* Right margin doodle */}
      <DoodleComputer className="absolute right-5 top-20 h-11 w-14 rotate-3 hidden 2xl:block" />
      
      <Container size="large">
        <motion.div
          className="mb-10 relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-2 text-sm text-charcoal/60 dark:text-offwhite/55">tools & technologies</p>
          <h2 className="text-5xl font-bold tracking-tight text-charcoal dark:text-offwhite md:text-6xl inline-flex items-center gap-3">
            Stack I Use
            {/* Checkmark doodle */}
            <DoodleCheckmark className="h-8 w-8 doodle-wiggle hidden sm:block" />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Outer container — rounded frame, shadow, light overlay */}
          <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.08] dark:border-offwhite/10 shadow-[0_28px_72px_-44px_rgba(15,23,42,0.16)] dark:shadow-[0_28px_72px_-44px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.52),transparent_44%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(245,225,80,0.07),transparent_44%)]" />

            {/* gap-px + bg fill = 1 px divider lines between every cell */}
            <motion.div
              className="relative grid grid-cols-1 gap-px bg-black/[0.06] dark:bg-offwhite/[0.07] sm:grid-cols-2 lg:grid-cols-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {categories.map((category) => (
                <motion.div
                  key={category.label}
                  variants={cellVariants}
                  className="bg-[linear-gradient(160deg,rgba(255,255,255,0.86),rgba(255,249,229,0.74))] dark:bg-[linear-gradient(160deg,rgba(42,38,47,0.92),rgba(32,29,37,0.88))] p-6 md:p-7"
                >
                  <p className="mb-5 text-[0.58rem] font-semibold uppercase tracking-[0.30em] text-charcoal/36 dark:text-offwhite/40">
                    {category.label}
                  </p>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={pillsContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {category.items.map((tech) => (
                      <motion.div
                        key={tech.name}
                        variants={pillVariants}
                        whileHover={{
                          y: -3,
                          scale: 1.06,
                          boxShadow: "0 8px 20px -6px rgba(15,23,42,0.14)",
                          transition: { type: "spring", stiffness: 400, damping: 22 },
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="flex cursor-default items-center gap-1.5 rounded-xl border border-black/[0.07] dark:border-offwhite/10 bg-white/62 dark:bg-white/[0.06] px-2.5 py-[0.36rem] shadow-[0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.72)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]"
                      >
                        <img
                          src={tech.logo}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className={`h-[0.88rem] w-[0.88rem] shrink-0 object-contain${tech.logoDark ? " dark:hidden" : ""}`}
                        />
                        {tech.logoDark && (
                          <img
                            src={tech.logoDark}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="hidden h-[0.88rem] w-[0.88rem] shrink-0 object-contain dark:block"
                          />
                        )}
                        <span className="whitespace-nowrap text-[0.73rem] font-medium leading-none text-charcoal/72 dark:text-offwhite/75">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default StackSection;
