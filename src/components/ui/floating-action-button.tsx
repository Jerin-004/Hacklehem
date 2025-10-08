import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Timer, BookOpen, Target, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  className?: string;
}

export function FloatingActionButton({ className }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Timer,
      label: 'Start Timer',
      href: '/timer',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BookOpen,
      label: 'New Study Plan',
      href: '/study-plan',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Target,
      label: 'Set Goals',
      href: '/profile',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      label: 'View Stats',
      href: '/analytics',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 20, 
                  y: 20,
                  transition: { delay: (actions.length - index - 1) * 0.05 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-full shadow-lg backdrop-blur-md border border-white/20 transition-all duration-200",
                  "bg-gradient-to-r", action.color,
                  "text-white hover:shadow-xl group"
                )}
              >
                <action.icon className="h-4 w-4" />
                <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-xl backdrop-blur-md border border-white/20 transition-all duration-300",
          "bg-gradient-to-r from-primary to-secondary",
          "flex items-center justify-center text-white",
          "hover:shadow-2xl hover:from-primary/90 hover:to-secondary/90",
          isOpen && "rotate-45"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}