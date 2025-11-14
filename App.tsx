
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { Editor } from './components/Editor';
import { AIAssistant } from './components/AIAssistant';
import { Header } from './components/Header';
import { Resizer } from './components/Resizer';
import { Toast } from './components/Toast';
import { FileNode } from './types';
import { initialFiles } from './constants';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);
  const [aiPanelHeight, setAiPanelHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeFile = useMemo(() => files.find(f => f.id === activeFileId), [files, activeFileId]);

  const handleFileContentChange = useCallback((fileId: string, newContent: string) => {
    setFiles(currentFiles =>
      currentFiles.map(file =>
        file.id === fileId ? { ...file, content: newContent } : file
      )
    );
  }, []);
  
  const handleSelectFile = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    const newHeight = window.innerHeight - e.clientY;
    // Set constraints for resizing
    if (newHeight > 150 && newHeight < window.innerHeight * 0.8) {
      setAiPanelHeight(newHeight);
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex flex-col h-screen bg-primary font-sans overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <FileExplorer files={files} activeFileId={activeFileId} onSelectFile={handleSelectFile} />
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex-1 overflow-auto">
            <Editor file={activeFile} onContentChange={handleFileContentChange} />
          </div>
          <Resizer onMouseDown={handleMouseDown} />
          <AIAssistant
            style={{ height: `${aiPanelHeight}px` }}
            activeFile={activeFile}
            onContentChange={handleFileContentChange}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setToastMessage={setToastMessage}
          />
        </div>
      </main>
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default App;
