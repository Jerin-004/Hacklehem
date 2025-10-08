"use client"

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from "react";
import StudyPlanForm from '@/components/StudyPlanForm';
import { StoredPlan } from "@/components/study-plan/StoredPlan";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StudyPlan } from "@/components/study-plan/StoredPlan";
import { FullPageLoader } from "@/components/ui/professional-loader";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { PaginationNav } from "@/components/ui/pagination-nav";
import { 
  Target, 
  Brain, 
  Calendar, 
  Clock, 
  BookOpen, 
  Plus,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export default function StudyPlanPage() {
  const { data: session } = useSession();
  const [storedPlans, setStoredPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchPlans = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      setLoading(true);
      const data = await apiClient.getStudyPlan(session.user.id);
      if (data.error) {
        console.error("API returned error:", data.error);
        toast({
          variant: "error",
          title: "Error",
          description: "Failed to fetch study plans. Please try again."
        });
        setStoredPlans([]);
        return;
      }
      
      if (data.plans && Array.isArray(data.plans)) {
        // Sort plans by _id as a fallback for creation time
        const sortedPlans = data.plans.sort((a: StudyPlan, b: StudyPlan) => 
          b._id.localeCompare(a._id)
        );
        setStoredPlans(sortedPlans);
      } else {
        console.error("Invalid plans data structure:", data);
        setStoredPlans([]);
      }
    } catch (error) {
      console.error("Error fetching stored plans:", error);
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to fetch study plans. Please try again."
      });
      setStoredPlans([]);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, toast]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handlePlanGenerated = () => {
    // Refresh the plans list after a short delay
    setTimeout(() => {
      fetchPlans();
    }, 500);
  };

  const handlePlanDelete = async (planId: string) => {
    try {
      const response = await apiClient.deleteStudyPlan(planId);
      if (response.success) {
        // Update the local state to remove the deactivated plan
        setStoredPlans(plans => plans.filter(plan => plan._id !== planId));
        toast({
          variant: "success",
          title: "Success",
          description: response.message || "Study plan deactivated successfully."
        });
      } else {
        throw new Error(response.message || 'Failed to deactivate plan');
      }
    } catch (error: unknown) {
      console.error("Error deactivating plan:", error);
      toast({
        variant: "error",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to deactivate study plan. Please try again."
      });
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(storedPlans.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlans = storedPlans.slice(startIndex, endIndex);

  if (loading) {
    return <FullPageLoader message="Loading your study plans..." />;
  }

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
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground md:text-4xl tracking-tight">
                  Study Plan Generator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Create AI-powered personalized study plans tailored to your goals
                </p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              {storedPlans.length} Plans
            </Badge>
          </motion.div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-muted-foreground font-medium text-sm">Total Plans</p>
                <p className="text-2xl font-bold text-card-foreground">{storedPlans.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-muted-foreground font-medium text-sm">Active Goals</p>
                <p className="text-2xl font-bold text-card-foreground">{storedPlans.filter(plan => plan.isActive).length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-muted-foreground font-medium text-sm">This Week</p>
                <p className="text-2xl font-bold text-card-foreground">5</p>
                <p className="text-xs text-muted-foreground">study sessions</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-muted-foreground font-medium text-sm">Avg. Time</p>
                <p className="text-2xl font-bold text-card-foreground">2.5h</p>
                <p className="text-xs text-muted-foreground">per session</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Study Plan Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <GlassCard className="p-8 backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-card-foreground flex items-center gap-2 mb-2">
                <Plus className="h-5 w-5 text-primary" />
                Create New Study Plan
              </h2>
              <p className="text-muted-foreground text-sm">
                Let our AI analyze your goals and create a personalized study roadmap
              </p>
            </div>
            <StudyPlanForm onPlanGenerated={handlePlanGenerated} />
          </GlassCard>
        </motion.div>

        {/* Stored Plans Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          id="stored-plans"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Your Study Plans
            </h2>
            {storedPlans.length > 0 && (
              <Button variant="outline" size="sm">
                Export All
              </Button>
            )}
          </div>
          
          {storedPlans.length > 0 ? (
            <>
              <div className="grid gap-6 lg:grid-cols-2">
                {currentPlans.map((plan, index) => (
                  <motion.div
                    key={plan._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  >
                    <StoredPlan
                      plan={plan}
                      onDelete={handlePlanDelete}
                    />
                  </motion.div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8">
                  <PaginationNav
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <GlassCard className="p-12 text-center">
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-full w-fit mx-auto">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">No Study Plans Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your learning journey by creating your first AI-powered study plan above.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Our intelligent system will analyze your goals and create a personalized roadmap for success.
                  </p>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  );
}