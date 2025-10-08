"use client"

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, File } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import NoteEditor from '@/components/notes/NoteEditor';
import NotesList from '@/components/notes/NotesList';
import PacmanLoader from 'react-spinners/PacmanLoader';

interface Note {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
  parentId: string | null;
}

interface NoteData {
  _id: string;
  title: string;
  content: Array<{ type: string; content: string }>;
  updatedAt: string;
  parentId: string | null;
}

export default function NotesPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      // Convert content array to string
      const formattedNotes = data.map((note: NoteData) => ({
        ...note,
        content: Array.isArray(note.content) ? note.content[0]?.content || '' : note.content || ''
      }));
      setNotes(formattedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to load notes",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes, session]);

  const createNewNote = async () => {
    setIsCreating(true);
    setSelectedNote(null);
    setShowSidebar(false);
  };

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center">
      <PacmanLoader color="#538B81" />
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/50">
      {/* Professional Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/90 to-purple-700/90" />
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <File className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Smart Notes
                  </h1>
                  <p className="text-violet-100 text-lg mt-2">
                    Intelligent note-taking with rich formatting
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{notes.length}</p>
                  <p className="text-sm text-violet-100">Notes</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">Rich</p>
                  <p className="text-sm text-violet-100">Editor</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">Smart</p>
                  <p className="text-sm text-violet-100">Search</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">Sync</p>
                  <p className="text-sm text-violet-100">Cloud</p>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-8 flex gap-3">
              <Button 
                className="md:hidden bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                onClick={() => setShowSidebar(!showSidebar)}
                variant="outline"
              >
                {showSidebar ? 'Hide Notes' : 'Show Notes'}
              </Button>
              <Button 
                onClick={createNewNote}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-6 py-3"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Note
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative p-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Notes List Sidebar */}
          <div className={`${showSidebar ? 'block' : 'hidden'} md:block md:col-span-4`}>
            <Card className="h-[calc(100vh-12rem)] bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
              <CardHeader className="p-6 border-b border-gray-200/50 bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                    <File className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Your Notes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 overflow-y-auto">
                <NotesList
                  notes={notes}
                  selectedNote={selectedNote}
                  onSelectNote={(note: Note) => {
                    setSelectedNote(note);
                    setShowSidebar(false);
                  }}
                  onRefresh={fetchNotes}
                />
              </CardContent>
            </Card>
          </div>

          {/* Editor Area */}
          <div className={`${showSidebar ? 'hidden' : 'block'} md:block md:col-span-8`}>
            <Card className="h-[calc(100vh-12rem)] bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
              <CardContent className="p-6 h-full">
                {isCreating || selectedNote ? (
                  <NoteEditor
                    note={selectedNote}
                    onSave={async () => {
                      await fetchNotes();
                      setIsCreating(false);
                    }}
                    onCancel={() => {
                      setIsCreating(false);
                      setSelectedNote(null);
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                      <File className="h-16 w-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      Start Writing
                    </h3>
                    <p className="text-gray-600 text-center max-w-md mb-6">
                      Select an existing note from the sidebar or create a new one to begin 
                      writing with our powerful rich text editor.
                    </p>
                    <Button 
                      onClick={createNewNote}
                      className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-3"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Note
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}