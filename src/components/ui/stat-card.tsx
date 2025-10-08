import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './card';

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  gradient?: string;
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  gradient = 'from-blue-500/20 to-blue-600/20',
  className,
  delay = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      <Card className="group relative overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-muted-foreground font-medium text-sm">{title}</p>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-card-foreground">{value}</p>
                {subtitle && (
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                )}
                {trend && (
                  <div className="flex items-center gap-1">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        trend.isPositive !== false
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      {trend.isPositive !== false ? "+" : ""}{trend.value}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {trend.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {Icon && (
              <div className={cn(
                "p-3 rounded-xl bg-gradient-to-br",
                gradient
              )}>
                <Icon className="h-6 w-6" />
              </div>
            )}
          </div>
        </CardContent>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </Card>
    </motion.div>
  );
}