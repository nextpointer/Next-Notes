import { error } from 'console';
import React from 'react'
import { Button } from '../ui/button';
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '../ui/drawer';

const Editor = () => {
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
              <div
                contentEditable={isEditable}
                onBlur={handleNotesContent}
                className="w-full h-[45vh] px-3 py-2 mt-1 border rounded-md outline-none border-none overflow-y-scroll"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {newContent}
              </div>
              <p className="text-sm text-gray-500">
                {newContent.length}/{MAX_CONTENT_LENGTH} characters
              </p>
            </div>
            <DrawerFooter className="flex gap-2 flex-row md:flex-col justify-center">
              <Button onClick={handleAddOrUpdateNote} className="rounded-3xl bg-green-500 text-black ">
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
  )
}

export default Editor