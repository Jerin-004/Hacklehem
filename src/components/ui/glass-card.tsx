import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  border?: boolean;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  blur = 'md',
  opacity = 0.1,
  border = true,
  hover = true,
  delay = 0
}: GlassCardProps) {
  const blurMap = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        blurMap[blur],
        border && "border border-white/20",
        hover && "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`
      }}
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
    </motion.div>
  );
}

// Dark mode variant
export function GlassCardDark({
  children,
  className,
  blur = 'md',
  opacity = 0.1,
  border = true,
  hover = true,
  delay = 0
}: GlassCardProps) {
  const blurMap = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        blurMap[blur],
        border && "border border-white/10",
        hover && "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
      style={{
        background: `rgba(45, 77, 105, ${opacity})`
      }}
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
    </motion.div>
  );
}