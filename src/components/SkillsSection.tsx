// components/SkillsSection.tsx
import React from "react";
import { skills } from "@/lib/data";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

type SkillType = string;

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.05 * index,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-3 py-1 bg-muted/80 backdrop-blur-sm rounded-md text-sm border border-purple-500/10 shadow-sm"
    >
      {skill}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skillCategoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SkillsSection() {
  
  // Деструктурируем с русскими названиями для удобства
  const {
    programming_languages: programmingLanguages,
    frontend_development: frontend,
    backend_development: backend,
    database_and_storage: database,
    cloud_and_devops: devops,
    tools_and_services: toolsAndServices
  } = skills;

  return (
    <section
      id="skills"
      className="py-12 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            🛠️ Навыки и технологии
          </h2>
        </MotionWrapper>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={skillCategoryVariants}>
            <GlassCard className="p-4">
              <h3 className="text-lg font-medium mb-3 text-center md:text-left flex items-center">
                <span className="mr-2 text-xl">💻</span> Языки программирования
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {programmingLanguages.map((skill: SkillType, index: number) => (
                  <SkillTag key={`язык-${index}`} skill={skill} index={index} />
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={skillCategoryVariants}>
            <GlassCard className="p-4">
              <h3 className="text-lg font-medium mb-3 text-center md:text-left flex items-center">
                <span className="mr-2 text-xl">🎨</span> Фронтенд-разработка
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {frontend.map((skill: SkillType, index: number) => (
                  <SkillTag key={`фронт-${index}`} skill={skill} index={index} />
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={skillCategoryVariants}>
            <GlassCard className="p-4">
              <h3 className="text-lg font-medium mb-3 text-center md:text-left flex items-center">
                <span className="mr-2 text-xl">⚙️</span> Бэкенд-разработка
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {backend.map((skill: SkillType, index: number) => (
                  <SkillTag key={`бэк-${index}`} skill={skill} index={index} />
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={skillCategoryVariants}>
            <GlassCard className="p-4">
              <h3 className="text-lg font-medium mb-3 text-center md:text-left flex items-center">
                <span className="mr-2 text-xl">🗄️</span> Базы данных и хранилища
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {database.map((skill: SkillType, index: number) => (
                  <SkillTag key={`бд-${index}`} skill={skill} index={index} />
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={skillCategoryVariants}>
            <GlassCard className="p-4">
              <h3 className="text-lg font-medium mb-3 text-center md:text-left flex items-center">
                <span className="mr-2 text-xl">☁️</span> Облачные технологии и DevOps
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {devops.map((skill: SkillType, index: number) => (
                  <SkillTag key={`облако-${index}`} skill={skill} index={index} />
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={skillCategoryVariants}>
            <GlassCard className="p-4">
              <h3 className="text-lg font-medium mb-3 text-center md:text-left flex items-center">
                <span className="mr-2 text-xl">🧰</span> Инструменты и сервисы
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {toolsAndServices.map((skill: SkillType, index: number) => (
                  <SkillTag key={`инструмент-${index}`} skill={skill} index={index} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}