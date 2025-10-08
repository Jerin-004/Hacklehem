'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Loader2, File, Trash2 } from "lucide-react";
import PacmanLoader from 'react-spinners/PacmanLoader';

interface PdfDocument {
  _id: string;
  title: string;
  pageCount: number;
  createdAt: string;
}

export default function PdfListPage() {
  const [documents, setDocuments] = useState<PdfDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { status } = useSession();

  const fetchDocuments = useCallback(async () => {
    try {
      // Don't fetch if not authenticated
      if (status !== 'authenticated') {
        setDocuments([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const response = await fetch('/api/pdf', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Ensure we're not using cached responses
        cache: 'no-store',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch documents');
      }
      
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load documents",
        variant: "destructive",
      });
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, [status, toast]);

  // Load documents on mount and when auth status changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchDocuments();
    }
  }, [status, fetchDocuments]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "Error",
        description: "File size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('/api/pdf/upload', {
        method: 'POST',
        body: formData
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload PDF');
      }
      
      setDocuments(prev => [...prev, data]);
      
      toast({
        title: "Success",
        description: "PDF uploaded successfully",
      });
    } catch (err) {
      const error = err as Error;
      console.error('Error uploading PDF:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Clear the input
      event.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/pdf?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete document');
      }

      setDocuments(prev => prev.filter(doc => doc._id !== id));
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (err) {
      const error = err as Error;
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
         <PacmanLoader color="#538B81" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-muted-foreground mb-6">Please sign in to access the PDF chat feature.</p>
        <Button onClick={() => router.push('/api/auth/signin')}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
      {/* Professional Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-700/90" />
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <File className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    PDF Chat
                  </h1>
                  <p className="text-emerald-100 text-lg mt-2">
                    Interactive document analysis with AI
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{documents.length}</p>
                  <p className="text-sm text-emerald-100">Documents</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">AI</p>
                  <p className="text-sm text-emerald-100">Powered</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">Smart</p>
                  <p className="text-sm text-emerald-100">Analysis</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">Pro</p>
                  <p className="text-sm text-emerald-100">Features</p>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-8">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload">
                <Button
                  asChild
                  disabled={isUploading}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200 whitespace-nowrap px-6 py-3"
                >
                  <span className="flex items-center gap-3">
                    {isUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <FileUp className="h-5 w-5" />
                    )}
                    Upload PDF
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative p-8 -mt-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl min-h-[calc(100vh-20rem)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)]">
              <PacmanLoader color="#10B981" />
              <p className="mt-4 text-gray-600">Loading your documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)] p-8">
              <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                <File className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No Documents Yet
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                Upload your first PDF to start having intelligent conversations with your documents. 
                Our AI will help you understand, analyze, and extract insights.
              </p>
              <div className="flex items-center gap-2 text-emerald-600">
                <FileUp className="h-4 w-4" />
                <span className="text-sm font-medium">Click &quot;Upload PDF&quot; to get started</span>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Documents</h2>
                  <p className="text-gray-600">Click any document to start chatting</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <File className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">
                    {documents.length} Document{documents.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <Card
                    key={doc._id}
                    className="group relative overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
                    onClick={() => router.push(`/pdf/${doc._id}`)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                          <File className="h-6 w-6 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(doc._id);
                          }}
                          aria-label="Delete document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {doc.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">
                          <File className="h-3 w-3" />
                          {doc.pageCount} page{doc.pageCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <span className="text-xs font-medium">Click to chat with document</span>
                          <svg className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 