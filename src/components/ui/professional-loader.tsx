import React from 'react';
import { motion } from 'framer-motion';

interface ProfessionalLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProfessionalLoader({ 
  message = "Loading...", 
  size = 'md' 
}: ProfessionalLoaderProps) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', dot: 'w-2 h-2' },
    md: { container: 'w-12 h-12', dot: 'w-3 h-3' },
    lg: { container: 'w-16 h-16', dot: 'w-4 h-4' }
  };

  const { container, dot } = sizeMap[size];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${container}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`absolute ${dot} bg-gradient-to-r from-primary to-secondary rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
            style={{
              left: `${index * 25}%`,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        ))}
      </div>
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground font-medium text-sm"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Skeleton loader for cards
export function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-4 bg-muted rounded w-24"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="h-8 bg-muted rounded w-16"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="h-3 bg-muted rounded w-20"
            />
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            className="w-12 h-12 bg-muted rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

// Full page professional loader
export function FullPageLoader({ message = "Loading your dashboard..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center z-50"
    >
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        {/* Animated logo or icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            🎓
          </motion.span>
        </motion.div>

        <ProfessionalLoader message={message} size="lg" />

        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}