import { atom } from "jotai";

// For the notes header
export const Header = atom<string>("");
// For the notes Content
export const Content = atom<string[]>([])
// for the editing index
export const EIndex = atom<number | null>(null);
// For the error
export const Error = atom<string>("")
// For the editing state
export const isEditable = atom<boolean>(false)
// for the ai content generating or not
export const isGenerating = atom<boolean>(false)
// For the new Note or not
export const isNewNote = atom<boolean>(false);
