"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";

import { useNotes } from "./Context/NotesContext";
import { Note } from "@/utils/types";
import { useToast } from "@/hooks/use-toast";
import { getNoteContent } from "@/lib/useAi";
import Editor from "@/components/custom/Editor";
import { useAtom } from "jotai";
import {
  EIndex,
  Header,
  IsEditable,
  IsGenerating,
  IsNewNote,
  ShowDrawer,
  Error,
  Content,
} from "./store/atom";

export default function Home() {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [, setEditIndex] = useAtom(EIndex);
  const [, setError] = useAtom(Error);
  const [newHeader, setNewHeader] = useAtom(Header);
  const [, setEditable] = useAtom(IsEditable);
  const [newContent, setNewContent] = useAtom(Content);
  const [isNewNote, setNewNote] = useAtom(IsNewNote);
  const [showDrawer, setShowDrawer] = useAtom(ShowDrawer);

  const { notes, deleteNote } = useNotes();

  useEffect(() => {
    localStorage.clear();
    return () => {
      localStorage.clear();
    };
  }, []);

  const resetForm = () => {
    setEditIndex(null);
    setError("");
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const toggleEditChane = () => {
    setEditable(true);
  };

  const handleRotate = () => {
    setIsRotated(!isRotated);
    setStartAnimation(!startAnimation);
    setShowDrawer(true);
    resetForm();
    toggleEditChane();
    setNewNote(true);
    setNewHeader("");
    setNewContent("");
    setNewHeader(localStorage.getItem("Header") || "");
    setNewContent(localStorage.getItem("Content") || "");
  };

  const handleOpenDrawerForEdit = (index: number) => {
    setEditIndex(index);
    setNewHeader(notes[index].header);
    setNewContent(notes[index].sentence);
    setShowDrawer(true);
    toggleEditChane();
    setNewNote(false);
  };

  // On close the drawer the temp data stored on the local storage
  const setTempToLocal = () => {
    console.log("New Note", isNewNote);

    setNewHeader("");
    setNewContent("");

    if (isNewNote) {
      localStorage.setItem("Header", newHeader);
      localStorage.setItem("Content", newContent);
      setNewHeader(localStorage.getItem("Header") || "");
      setNewContent(localStorage.getItem("Content") || "");
    }
    setEditable(true);
  };

  return (
    <>
      <main className="flex flex-col md:flex-row">
        <div className="create h-[20vh] md:h-screen w-full md:w-72 border-r-2 flex flex-col items-center ">
          <h1 className="text-4xl m-4 font-thin">Next Notes</h1>
          <div className="create-color h-full w-full flex flex-col justify-start items-center p-8 relative">
            <Button
              onClick={handleRotate}
              className={`relative z-10 rounded-full h-[60px] w-[60px] font-thin transition-transform duration-500 ${
                isRotated ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m-8-8h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div className="all-notes h-screen w-full flex flex-col md:flex-row gap-5 justify-start items-start p-4 md:p-8 relative overflow-y-auto ">
          {notes.map((note: Note, index: number) => (
            <div
              key={index}
              className="notes-container border-2 p-4 rounded-3xl bg-green-200 min-w-[300px]"
            >
              <h1 className="text-2xl">{note.header}</h1>
              <p className="mt-1 mb-1">
                {note.sentence.split(" ").slice(0, 10).join(" ")}
              </p>
              <p>{formatDate(note.date)}</p>
              <Button
                className="rounded-2xl mt-1 mb-1"
                onClick={() => handleOpenDrawerForEdit(index)}
              >
                view
              </Button>
              <Button
                className="rounded-2xl m-1"
                variant="destructive"
                onClick={() => deleteNote(index)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>

        <Drawer
          open={showDrawer}
          onOpenChange={setShowDrawer}
          closeThreshold={0.5}
          onAnimationEnd={setTempToLocal}
        >
          <Editor />
        </Drawer>
      </main>
    </>
  );
}
