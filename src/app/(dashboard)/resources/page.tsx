"use client"

import { useState, useEffect, useCallback } from "react";
import ResourceCurator from '@/components/ResourceCurator';
import { StoredResources } from "@/components/resources/StoredResources";
import { Separator } from "@/components/ui/separator";
import type { CuratedResource } from "@/components/resources/StoredResources";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { PaginationNav } from "@/components/ui/pagination-nav";
import { Search, BookOpen, Sparkles, TrendingUp } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default function ResourcesPage() {
  const { data: session } = useSession();
  const [storedResources, setStoredResources] = useState<CuratedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchResources = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const data = await apiClient.getCuratedResources(session.user.id);
      console.log("Fetched resources data:", data);
      
      if (data.error) {
        console.error("API returned error:", data.error);
        toast({
          variant: "error",
          title: "Error",
          description: "Failed to fetch resources. Please try again."
        });
        setStoredResources([]);
        return;
      }
      
      if (data.resources && Array.isArray(data.resources)) {
        // Validate the structure of each resource
        const validResources = data.resources.filter((resource: CuratedResource) => {
          return resource && 
                 resource._id && 
                 resource.topic && 
                 Array.isArray(resource.resources);
        });
        
        console.log("Valid resources:", validResources);
        setStoredResources(validResources);
      } else {
        console.error("Invalid resources data structure:", data);
        setStoredResources([]);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to fetch resources. Please try again."
      });
      setStoredResources([]);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, toast]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleResourceDelete = (resourceId: string) => {
    setStoredResources(resources => resources.filter(resource => resource._id !== resourceId));
    toast({
      variant: "success",
      title: "Success",
      description: "Resource deleted successfully."
    });
  };

  const handleCreateResources = async (subject: string) => {
    if (!session?.user?.id) return;
    try {
      await apiClient.createCuratedResources(session.user.id, subject);
      toast({
        variant: "success",
        title: "Success",
        description: "Resources created successfully."
      });
      // Refresh resources after creation
      fetchResources();
    } catch (error: unknown) {
      console.error('Error creating resources:', error);
      
      // Type guard to check if error is an object with status property
      if (error && typeof error === 'object' && 'status' in error) {
        const errorObj = error as { status: number; retryAfter?: number };
        // Handle rate limit errors
        if (errorObj.status === 429 || errorObj.status === 413) {
          const retryAfter = errorObj.retryAfter || 60;
          const minutes = Math.ceil(retryAfter / 60);
          toast({
            variant: "error",
            title: "Rate Limit Exceeded",
            description: `Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}. Our AI service has reached its limit.`
          });
          return;
        }
      }

      // Type guard for response error
      if (error && typeof error === 'object' && 'response' in error) {
        const responseError = error as { 
          response?: { 
            data?: { 
              error?: string; 
              message?: string; 
            } 
          };
          message?: string;
        };

        if (responseError.response?.data?.error === 'RESOURCE_EXISTS') {
          toast({
            variant: "default",
            title: "Resources Already Exist",
            description: responseError.response.data.message || "You already have resources for this subject."
          });
          
          // Scroll to existing resources section
          const resourcesSection = document.getElementById('stored-resources');
          if (resourcesSection) {
            resourcesSection.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
      }

      // Default error handling
      toast({
        variant: "error",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create resources. Please try again."
      });
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(storedResources.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResources = storedResources.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Professional Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90" />
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Resource Curator
                  </h1>
                  <p className="text-blue-100 text-lg mt-2">
                    AI-powered learning resource discovery
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{storedResources.length}</p>
                  <p className="text-sm text-blue-100">Resources</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">AI</p>
                  <p className="text-sm text-blue-100">Powered</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">Smart</p>
                  <p className="text-sm text-blue-100">Curation</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">Pro</p>
                  <p className="text-sm text-blue-100">Features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative p-8 -mt-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
          <ResourceCurator onCreateResources={handleCreateResources} />
        </div>
      </div>

      {/* Stored Resources Section */}
      <div className="p-8 mt-8">
        {loading ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <div id="stored-resources" className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Learning Library</h2>
                  <p className="text-gray-600">Curated resources tailored for your success</p>
                </div>
              </div>
              
              {storedResources.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {storedResources.length} Resource{storedResources.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
            
            {storedResources.length > 0 ? (
              <>
                <div className="space-y-6">
                  {currentResources.map((resource, index) => (
                    <div key={resource._id} className="group">
                      <StoredResources
                        resource={resource}
                        onDelete={handleResourceDelete}
                      />
                      {index < currentResources.length - 1 && (
                        <Separator className="mt-6 opacity-30" />
                      )}
                    </div>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <PaginationNav
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="flex justify-center mb-6">
                  <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Resources Yet
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start building your personalized learning library with AI-curated resources 
                  tailored to your study goals.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                  <Sparkles className="h-4 w-4" />
                  <span>Use the curator above to get started</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}