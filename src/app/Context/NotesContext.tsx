"use client";

import React, { createContext, useContext, useState } from 'react';
import { Note } from "@/utils/types";
import { useToast } from '@/hooks/use-toast';

interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (index: number) => void;
  updateNote: (index: number, updatedNote: Note) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { toast } = useToast(); // Access toast function here

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const deleteNote = (index: number) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    
    // Toast notification on successful deletion
    toast({
      title: "Deleted",
      description: "The note has been successfully deleted.",
    });
  };

  const updateNote = (index: number, updatedNote: Note) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[index] = updatedNote;
      return newNotes;
    });
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
