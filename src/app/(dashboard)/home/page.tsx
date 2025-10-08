"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ContributionCalendar } from 'react-contribution-calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GlassCard } from "@/components/ui/glass-card";
import { TrendIndicator } from "@/components/ui/trend-indicator";
import { useSession } from 'next-auth/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
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

// Custom theme for the calendar using our color scheme
const customTheme = {
  level0: 'var(--color-cream-900)',
  level1: 'var(--color-aqua-100)',
  level2: 'var(--color-aqua-500)',
  level3: 'var(--color-teal-800)',
  level4: 'var(--color-navy-900)',
};

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
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <PacmanLoader color="#538B81" size={20} />
          <p className="text-muted-foreground font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const totalStudyHours = Object.values(stats.studySessions).reduce(
    (total, session) => total + (session.totalDuration || 0),
    0
  ) / 3600; // Convert to hours

  const weeklyGoal = 25; // hours per week
  const weeklyProgress = (totalStudyHours / weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="space-y-6 px-4 py-6 sm:px-6 md:space-y-8 md:px-8 lg:px-12">
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
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/80 border border-border/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Study Activity
                </CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Last 365 days
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[280px] p-4 md:min-w-full">
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
                      theme: customTheme,
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
                    onCellClick={(e: any) => {
                      const cellData = JSON.parse(e.currentTarget.getAttribute('data-cell') || '{}');
                      if (cellData?.data?.count) {
                        console.log(`${cellData.data.details}`);
                      }
                    }}
                    scroll={false}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{Math.round(weeklyProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(totalStudyHours)} of {weeklyGoal} hours this week
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Study Sessions</span>
                  </div>
                  <span className="text-sm font-bold">
                    {Object.values(stats.studySessions).reduce((total: number, session: any) => total + (session.count || 0), 0)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Active Days</span>
                  </div>
                  <span className="text-sm font-bold">{stats.totalDays}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {stats.currentStreak >= 7 && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                    <div className="p-2 bg-yellow-500/20 rounded-full">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Week Warrior</p>
                      <p className="text-xs text-muted-foreground">7+ day streak</p>
                    </div>
                  </div>
                )}
                
                {totalStudyHours >= 50 && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Time Master</p>
                      <p className="text-xs text-muted-foreground">50+ hours studied</p>
                    </div>
                  </div>
                )}

                {stats.totalDays >= 30 && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <div className="p-2 bg-green-500/20 rounded-full">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Monthly Champion</p>
                      <p className="text-xs text-muted-foreground">30+ study days</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}