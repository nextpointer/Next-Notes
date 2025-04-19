"use client";

import { Content, IsEditable } from "@/app/store/atom";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import Quill from "quill";
import 'quill/dist/quill.snow.css'; 

export const NoteContent = () => {
  const MAX_CONTENT_LENGTH = 100000;
  const [isEditable] = useAtom(IsEditable);
  const [newContent, setNewContent] = useAtom(Content);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const isInitialized = useRef(false); // Add this flag

  useEffect(() => {
    if (isInitialized.current || !editorRef.current) return;
    
    isInitialized.current = true;
    
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
      placeholder: 'Write your notes.',
    });

    // Set initial content
    if (newContent) {
      quill.root.innerHTML = newContent;
    }

    quill.on('text-change', () => {
      const content = quill.root.innerHTML;
      if (content.length <= MAX_CONTENT_LENGTH) {
        setNewContent(content);
      } else {
        toast({
          title: "Character Limit Exceeded",
          description: `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`,
          variant: "destructive",
        });
        quill.history.undo();
      }
    });

    quillInstance.current = quill;

    return () => {
      quill.off('text-change');
      quillInstance.current = null;
    };
  }, []);

  // Sync external content changes
  useEffect(() => {
    if (quillInstance.current && newContent !== quillInstance.current.root.innerHTML) {
      quillInstance.current.root.innerHTML = newContent;
    }
  }, [newContent]);

  return (
    <div
      ref={editorRef}
      className="h-72 w-full"
    />
  );
};