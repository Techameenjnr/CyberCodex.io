"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface AccordionProps {
  items: readonly AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const isOpen = (id: string) => openItems.includes(id);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-cyber-border rounded-lg overflow-hidden bg-cyber-dark-secondary"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cyber-dark transition-colors duration-200"
          >
            <span className="text-lg font-semibold text-cyber-text-primary">
              {item.question}
            </span>
            <motion.svg
              animate={{ rotate: isOpen(item.id) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 text-cyber-primary flex-shrink-0 ml-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {isOpen(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-4 text-cyber-text-secondary leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
