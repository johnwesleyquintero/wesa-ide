
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

  return (
    <div className="flex-1 flex flex-col bg-editor overflow-hidden">
      <div className="bg-secondary px-4 py-2 border-b border-border-color">
        <h3 className="text-sm font-medium text-text-primary">{file.name}</h3>
      </div>
      <textarea
        value={file.content}
        onChange={handleChange}
        className="flex-1 w-full h-full bg-editor text-text-primary font-mono p-4 resize-none focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
};
