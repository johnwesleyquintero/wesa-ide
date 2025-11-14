
import React from 'react';
import { FileNode } from '../types';

interface EditorProps {
  file: FileNode | undefined;
  onContentChange: (fileId: string, newContent: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ file, onContentChange }) => {
  if (!file) {
    return <div className="flex-1 bg-editor p-4">Select a file to start editing.</div>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(file.id, event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.currentTarget;
      const newValue =
        value.substring(0, selectionStart) +
        "  " +
        value.substring(selectionEnd);
      
      onContentChange(file.id, newValue);
      
      // We need to wait for the state update to be reflected in the textarea's value
      // before we can set the cursor position. A simple timeout suffices.
      setTimeout(() => {
        event.currentTarget.selectionStart = event.currentTarget.selectionEnd = selectionStart + 2;
      }, 0);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-editor overflow-hidden">
      <div className="bg-secondary px-4 py-2 border-b border-border-color">
        <h3 className="text-sm font-medium text-text-primary">{file.name}</h3>
      </div>
      <textarea
        value={file.content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full h-full bg-editor text-text-primary font-mono p-4 resize-none focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
};