"use client"

import { Content, IsEditable } from "@/app/store/atom";
import { useAtom } from "jotai";
import React from "react";
import { toast } from "@/hooks/use-toast";

export const NoteContent = () => {
    const MAX_CONTENT_LENGTH = 100000;
    const [isEditable] = useAtom(IsEditable);
    const [newContent,setNewContent] = useAtom(Content);
    const handleNotesContent = (e: React.FocusEvent<HTMLDivElement>) => {
        const content = e.currentTarget.innerText;
        if (content.length <= MAX_CONTENT_LENGTH) {
          setNewContent(content);
        } else {
          toast({
            title: "Character Limit Exceeded",
            description: `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`,
            variant: "destructive",
          });
        }
      };
  return (
    <>
      <div
        contentEditable={isEditable}
        onBlur={handleNotesContent}
        className="w-full h-[45vh] px-3 py-2 mt-1 border rounded-md outline-none border-none overflow-y-scroll"
        style={{ whiteSpace: "pre-wrap" }}
        suppressContentEditableWarning={true}
      >
        {newContent}
      </div>
    </>
  );
};
