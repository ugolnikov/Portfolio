import { education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { Award } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Тип для образования
type Education = {
  institution: string;        // Название учебного заведения
  degree: string;            // Полученная степень/специальность
  period: ReactNode;         // Период обучения (может быть JSX)
  location: string;          // Местоположение
  achievements?: string[];   // Достижения (необязательное поле)
};

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-12 bg-gradient-to-b from-muted/10 to-background"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            🎓 Образование
          </h2>
        </MotionWrapper>

        <div className="mb-8">
          {education.map((edu: Education, index: number) => (
            <TimelineItem
              key={edu.institution}
              title={`🎓 ${edu.degree}`}
              subtitle={`🏛️ ${edu.institution}`}
              date={`📅 ${edu.period}`}
              isLast={index === education.length - 1}
              index={index}
            >
              <p className="text-sm text-muted-foreground mb-3">
                📍 {edu.location}
              </p>

              {/* Блок достижений - показывается только если они есть */}
              {edu.achievements && edu.achievements.length > 0 && (
                <motion.div
                  className="mt-3 p-4 bg-background/80 backdrop-blur-sm backdrop-filter rounded-lg border border-purple-500/20 dark:bg-card/10 dark:border-purple-500/10 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 flex items-center justify-center rounded-full bg-purple-500/10 mr-2">
                      <Award className="h-4 w-4 text-purple-500" />
                    </div>
                    <h4 className="text-sm font-medium">
                      ✨ Достижения и активность
                    </h4>
                  </div>
                  <ul className="list-none ml-4 space-y-2 text-sm">
                    {edu.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="text-muted-foreground relative pl-6"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}