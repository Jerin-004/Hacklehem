"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ContributionCalendar } from 'react-contribution-calendar';
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GlassCard } from "@/components/ui/glass-card";
import { TrendIndicator } from "@/components/ui/trend-indicator";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { FullPageLoader } from "@/components/ui/professional-loader";
import { useSession } from 'next-auth/react';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Clock, 
  Award,
  BookOpen,
  BarChart3,
  Activity,
  Brain,
  Zap
} from 'lucide-react';

interface StudySession {
  duration: number;
  startTime: string;
  endTime: string;
  mode: string;
}

interface DailySession {
  count: number;
  totalDuration: number;
  sessions: StudySession[];
}

interface StudyStats {
  currentStreak: number;
  bestStreak: number;
  totalDays: number;
  studySessions: {
    [key: string]: DailySession;
  };
}

interface CalendarDataPoint {
  level: number;
  data: {
    count: number;
    duration: number;
    details: string;
  };
}

interface SessionData {
  studySessions: {
    [key: string]: DailySession;
  };
  totalStudyHours: number;
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: string;
}



export default function DashboardHome() {
  const { data: session } = useSession();
  const [studyData, setStudyData] = useState<Array<Record<string, CalendarDataPoint>>>([{}]);
  const [stats, setStats] = useState<StudyStats>({
    currentStreak: 0,
    bestStreak: 0,
    totalDays: 0,
    studySessions: {}
  });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStudyData = async () => {
      if (!session?.user?.id) return;
      
      try {
        const response = await fetch('/api/users/stats');
        if (!response.ok) throw new Error('Failed to fetch study data');
        
        const data: SessionData = await response.json();
        
        // Transform data for calendar
        const calendarData: Record<string, CalendarDataPoint> = {};
        
        // Process each study session
        Object.entries(data.studySessions || {}).forEach(([date, sessionData]) => {
          if (sessionData) {
            calendarData[date] = {
              level: Math.min(Math.floor((sessionData.count || 0) / 2), 4),
              data: {
                count: sessionData.count,
                duration: sessionData.totalDuration,
                details: `${sessionData.count} study sessions (${Math.round(sessionData.totalDuration / 60)} minutes)`
              }
            };
          }
        });

        setStudyData([calendarData]);
        setStats({
          currentStreak: data.currentStreak || 0,
          bestStreak: data.bestStreak || 0,
          totalDays: Object.keys(data.studySessions || {}).length,
          studySessions: data.studySessions || {}
        });
      } catch (error) {
        console.error('Error fetching study data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();

    // Listen for session completion events
    const handleSessionComplete = () => {
      setTimeout(fetchStudyData, 1000); // Slight delay to ensure server has processed the update
    };

    window.addEventListener('study-session-completed', handleSessionComplete);
    return () => {
      window.removeEventListener('study-session-completed', handleSessionComplete);
    };
  }, [session?.user?.id]);

  if (loading) {
    return <FullPageLoader message="Loading your study dashboard..." />;
  }

  const totalStudyHours = Object.values(stats.studySessions).reduce(
    (total, session) => total + (session.totalDuration || 0),
    0
  ) / 3600; // Convert to hours

  const weeklyGoal = 25; // hours per week
  const weeklyProgress = (totalStudyHours / weeklyGoal) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 space-y-6 px-4 py-6 sm:px-6 md:space-y-8 md:px-8 lg:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl tracking-tight">
              Welcome back{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Here's your learning journey overview
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground sm:text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </motion.div>
        </motion.div>

        {/* Quick Stats Overview */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Current Streak"
            value={<AnimatedCounter value={stats.currentStreak} />}
            subtitle="days"
            icon={Target}
            gradient="from-orange-500/20 to-orange-600/20"
            trend={{
              value: stats.currentStreak > 0 ? 15 : 0,
              label: "vs last week",
              isPositive: stats.currentStreak > 0
            }}
            delay={0.1}
          />

          <StatCard
            title="Total Hours"
            value={<AnimatedCounter value={Math.round(totalStudyHours)} />}
            subtitle="hours studied"
            icon={Clock}
            gradient="from-blue-500/20 to-blue-600/20"
            trend={{
              value: 8,
              label: "this month",
              isPositive: true
            }}
            delay={0.2}
          />

          <StatCard
            title="Study Days"
            value={<AnimatedCounter value={stats.totalDays} />}
            subtitle="total days"
            icon={Calendar}
            gradient="from-green-500/20 to-green-600/20"
            trend={{
              value: 12,
              label: "active days",
              isPositive: true
            }}
            delay={0.3}
          />

          <StatCard
            title="Best Streak"
            value={<AnimatedCounter value={stats.bestStreak} />}
            subtitle="days"
            icon={Award}
            gradient="from-purple-500/20 to-purple-600/20"
            trend={{
              value: stats.bestStreak > stats.currentStreak ? 0 : 5,
              label: "personal best",
              isPositive: stats.bestStreak <= stats.currentStreak
            }}
            delay={0.4}
          />
        </div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          <GlassCard className="lg:col-span-2 backdrop-blur-xl">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Study Activity Heatmap
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Last 365 days
                  </Badge>
                  <TrendIndicator value={8} label="consistency" size="sm" />
                </div>
              </div>

              {/* Activity Summary */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Most Active</p>
                  <p className="text-sm font-semibold">Monday</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Longest Streak</p>
                  <p className="text-sm font-semibold">{stats.bestStreak} days</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Total Sessions</p>
                  <p className="text-sm font-semibold">
                    {Object.values(stats.studySessions).reduce((total: number, session: DailySession) => total + (session.count || 0), 0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Avg/Week</p>
                  <p className="text-sm font-semibold">{Math.round(totalStudyHours / 52 * 10) / 10}h</p>
                </div>
              </div>

              <div className="w-full overflow-x-auto bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl p-4">
                <div className="min-w-[280px] md:min-w-full">
                  <ContributionCalendar
                    data={studyData}
                    dateOptions={{
                      start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                      end: new Date().toISOString().split('T')[0],
                      daysOfTheWeek: isMobile ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : isTablet ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                      startsOnSunday: true,
                      includeBoundary: true,
                    }}
                    styleOptions={{
                      theme: {
                        level0: 'rgba(163, 211, 205, 0.1)',
                        level1: 'rgba(163, 211, 205, 0.3)',
                        level2: 'rgba(83, 139, 129, 0.6)',
                        level3: 'rgba(73, 125, 116, 0.8)',
                        level4: 'rgba(39, 68, 93, 1)',
                      },
                      cx: isMobile ? 8 : isTablet ? 12 : 18,
                      cy: isMobile ? 10 : isTablet ? 14 : 20,
                      cr: isMobile ? 2.5 : isTablet ? 3.5 : 4,
                      textColor: 'var(--foreground)'
                    }}
                    visibilityOptions={{
                      hideDescription: isMobile || isTablet,
                      hideMonthLabels: isMobile,
                      hideDayLabels: isMobile,
                    }}
                    onCellClick={(e: React.MouseEvent<HTMLElement>) => {
                      const cellData = JSON.parse(e.currentTarget.getAttribute('data-cell') || '{}');
                      if (cellData?.data?.count) {
                        console.log(`${cellData.data.details}`);
                      }
                    }}
                    scroll={false}
                  />
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Less</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(163, 211, 205, 0.1)' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(163, 211, 205, 0.3)' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(83, 139, 129, 0.6)' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(73, 125, 116, 0.8)' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(39, 68, 93, 1)' }}></div>
                </div>
                <span className="text-muted-foreground">More</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="backdrop-blur-xl">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Weekly Goal
                </h3>
                <TrendIndicator value={12} label="vs last week" size="sm" />
              </div>

              {/* Progress Ring */}
              <div className="flex items-center justify-center">
                <ProgressRing
                  progress={Math.min(weeklyProgress, 100)}
                  size={140}
                  strokeWidth={12}
                  color="var(--color-teal-600)"
                  backgroundColor="var(--color-cream-200)"
                >
                  <div className="text-center">
                    <AnimatedCounter
                      value={Math.round(weeklyProgress)}
                      suffix="%"
                      className="text-2xl font-bold text-card-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-1">complete</p>
                  </div>
                </ProgressRing>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  <AnimatedCounter value={Math.round(totalStudyHours)} className="font-semibold text-card-foreground" /> 
                  {' '}of {weeklyGoal} hours this week
                </p>
                <div className="flex justify-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                    Completed
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted"></div>
                    Remaining
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                  <BookOpen className="h-4 w-4 text-blue-600 mb-1" />
                  <span className="text-xs text-muted-foreground">Sessions</span>
                  <AnimatedCounter
                    value={Object.values(stats.studySessions).reduce((total: number, session: any) => total + (session.count || 0), 0)}
                    className="text-sm font-bold text-card-foreground"
                  />
                </div>

                <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                  <Activity className="h-4 w-4 text-green-600 mb-1" />
                  <span className="text-xs text-muted-foreground">Active Days</span>
                  <AnimatedCounter
                    value={stats.totalDays}
                    className="text-sm font-bold text-card-foreground"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlassCard className="backdrop-blur-xl">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Recent Achievements
                </h3>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {[
                    stats.currentStreak >= 7,
                    totalStudyHours >= 50,
                    stats.totalDays >= 30,
                    stats.bestStreak >= 14
                  ].filter(Boolean).length} earned
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.currentStreak >= 7 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="group relative overflow-hidden"
                  >
                    <GlassCard className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <Award className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Week Warrior</p>
                          <p className="text-xs text-muted-foreground">7+ day streak achieved</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
                
                {totalStudyHours >= 50 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="group relative overflow-hidden"
                  >
                    <GlassCard className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Time Master</p>
                          <p className="text-xs text-muted-foreground">50+ hours completed</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {stats.totalDays >= 30 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="group relative overflow-hidden"
                  >
                    <GlassCard className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Monthly Champion</p>
                          <p className="text-xs text-muted-foreground">30+ active study days</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {stats.bestStreak >= 14 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    className="group relative overflow-hidden"
                  >
                    <GlassCard className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <Zap className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Streak Legend</p>
                          <p className="text-xs text-muted-foreground">14+ day streak mastery</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {/* Add motivational empty state */}
                {[stats.currentStreak >= 7, totalStudyHours >= 50, stats.totalDays >= 30, stats.bestStreak >= 14].filter(Boolean).length === 0 && (
                  <div className="col-span-full">
                    <GlassCard className="p-8 text-center">
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/20 rounded-full w-fit mx-auto">
                          <Brain className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Start Your Journey</p>
                          <p className="text-xs text-muted-foreground">Complete study sessions to unlock achievements</p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </motion.div>
  );
}