import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendIndicatorProps {
  value: number;
  label?: string;
  showIcon?: boolean;
  showPercentage?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TrendIndicator({
  value,
  label,
  showIcon = true,
  showPercentage = true,
  className,
  size = 'md'
}: TrendIndicatorProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const sizeClasses = {
    sm: {
      text: 'text-xs',
      icon: 'h-3 w-3'
    },
    md: {
      text: 'text-sm',
      icon: 'h-4 w-4'
    },
    lg: {
      text: 'text-base',
      icon: 'h-5 w-5'
    }
  };

  const getColor = () => {
    if (isNeutral) return 'text-muted-foreground';
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  const getBgColor = () => {
    if (isNeutral) return 'bg-muted';
    return isPositive ? 'bg-green-100' : 'bg-red-100';
  };

  const getIcon = () => {
    if (isNeutral) return Minus;
    return isPositive ? TrendingUp : TrendingDown;
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full",
        getBgColor(),
        className
      )}
    >
      {showIcon && (
        <Icon 
          className={cn(
            sizeClasses[size].icon,
            getColor()
          )} 
        />
      )}
      <span className={cn(
        'font-medium',
        sizeClasses[size].text,
        getColor()
      )}>
        {isPositive && '+'}
        {showPercentage ? `${value}%` : value}
      </span>
      {label && (
        <span className={cn(
          'font-normal text-muted-foreground',
          sizeClasses[size].text
        )}>
          {label}
        </span>
      )}
    </motion.div>
  );
}

// Simplified version for inline use
export function TrendBadge({
  value,
  className
}: {
  value: number;
  className?: string;
}) {
  const isPositive = value > 0;
  const isNeutral = value === 0;

  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-xs font-medium',
      isNeutral ? 'text-muted-foreground' : 
      isPositive ? 'text-green-600' : 'text-red-600',
      className
    )}>
      {isPositive ? '↗' : isNeutral ? '→' : '↘'}
      {isPositive && '+'}
      {value}%
    </span>
  );
}