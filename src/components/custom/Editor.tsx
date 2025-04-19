import React from "react";
import { Button } from "../ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "../ui/drawer";
import { useAtom } from "jotai";
import {
  Content,
  EIndex,
  Error,
  Header,
  IsEditable,
  IsGenerating,
  ShowDrawer,
} from "@/app/store/atom";
import { Note } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import { getNoteContent } from "@/lib/useAi";
import { useNotes } from "@/app/Context/NotesContext";
import { NoteContent } from "./NoteContent";

const Editor = () => {
  const MAX_CONTENT_LENGTH = 100000;
  const [editIndex, setEditIndex] = useAtom(EIndex);
  const [error, setError] = useAtom(Error);
  const [newHeader, setNewHeader] = useAtom(Header);
  const [isEditable, setEditable] = useAtom(IsEditable);
  const [newContent, setNewContent] = useAtom(Content);
  const [isGenerating, setGenerating] = useAtom(IsGenerating);
  const [, setShowDrawer] = useAtom(ShowDrawer);
  const { addNote, updateNote } = useNotes();

  const validateInputs = () => {
    if (!newHeader.trim()) return "Header cannot be empty.";
    if (!newContent.trim()) return "Content cannot be empty.";
    if (newContent.trim().length > MAX_CONTENT_LENGTH)
      return `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`;
    return "";
  };

  const resetForm = () => {
    setEditIndex(null);
    setError("");
  };

  const handleAddOrUpdateNote = () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const noteData: Note = {
      header: newHeader.replace(/\b\w/g, (char) => char.toUpperCase()),
      sentence: newContent,
      date: new Date().toISOString(),
    };

    if (editIndex !== null) {
      updateNote(editIndex, noteData);
    } else {
      addNote(noteData);
    }

    setShowDrawer(false);
    resetForm();
    toast({
      title: `${editIndex !== null ? "Saved" : "Created"}`,
      description: `Note has been successfully ${
        editIndex !== null ? "Saved" : "Created"
      }`,
    });
    toggleEditChane();
    setNewHeader("");
    setNewContent("");
  };


  const toggleEditChane = () => {
    setEditable(true);
  };

  const handleGenerateNoteContent = async () => {
    if (!newHeader.trim()) {
      setError("Header cannot be empty to generate content.");
      return;
    }

    setGenerating(true);
    try {
      const generatedResponse = await getNoteContent(newContent);
      // Set the newContent as HTML
      setNewContent(newContent + "\n" + generatedResponse);
    } catch (err) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const removeLocalData = () => {
    localStorage.removeItem("Header");
    localStorage.removeItem("Content");
    setNewHeader("");
    setNewContent("");
    setEditable(false);
  };

  return (
    <>
      <DrawerContent className="rounded-t-3xl">
        <DrawerHeader>
          <DrawerTitle>
            {editIndex !== null ? "View Note" : "Create New Note"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="drawer-section">
            <input
              type="text"
              value={newHeader}
              onChange={(e) => setNewHeader(e.target.value)}
              placeholder="Enter note header"
              className="w-full px-3 py-2 mt-1 border rounded-md border-none outline-none text-2xl"
              maxLength={50}
            />
          </div>
          {/* main content start here */}
            <NoteContent/>
          <p className="text-sm text-gray-500">
            {newContent.length}/{MAX_CONTENT_LENGTH} characters
          </p>
        </div>
        <DrawerFooter className="flex gap-2 flex-row md:flex-col justify-center">
          <Button
            onClick={handleAddOrUpdateNote}
            className="rounded-3xl bg-green-500 text-black "
          >
            {editIndex !== null ? "Save" : "Add Note"}
          </Button>
          <Button
            className="rounded-3xl bg-red-400 text-white"
            variant="secondary"
            onClick={() => {
              setShowDrawer(false), removeLocalData();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateNoteContent}
            disabled={isGenerating}
            className="rounded-3xl "
          >
            {isGenerating ? "Generating..." : "Auto-Generate Content"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
};

export default Editor;
