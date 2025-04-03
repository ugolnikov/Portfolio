import ThemeToggle from "./ui/theme-toggle";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Маппинг пунктов меню на русский язык
  const menuItems = [
    { id: "experience", emoji: "💼", text: "Опыт" },
    { id: "skills", emoji: "🛠️", text: "Навыки" },
    { id: "projects", emoji: "🚀", text: "Проекты" },
    { id: "awards", emoji: "🏆", text: "Награды" },
    { id: "education", emoji: "🎓", text: "Образование" }
  ];

  return (
    <header className="sticky z-50 w-full backdrop-blur-md backdrop-filter bg-background/70 dark:bg-background/40 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto p-4 flex justify-between items-center">
        <motion.a
          className="flex items-center text-lg font-medium"
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ {personalInfo.name}
        </motion.a>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item.emoji} {item.text}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {/* Кнопка мобильного меню */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Переключить меню"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 px-4 border-t border-border/10 backdrop-blur-md backdrop-filter bg-background/80 dark:bg-background/40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="transition-colors hover:text-foreground/80 text-foreground/60 py-2"
                  onClick={toggleMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  {item.emoji} {item.text}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}