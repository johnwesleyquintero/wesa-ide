
import React, { useState } from 'react';
import { FileNode, AITask } from '../types';
import { getAIResponse } from '../services/geminiService';

interface AIAssistantProps {
  activeFile: FileNode | undefined;
  onContentChange: (fileId: string, newContent: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setToastMessage: (message: string) => void;
  style: React.CSSProperties;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-text-secondary">WesAI is thinking...</span>
    </div>
);

const TaskButton: React.FC<{ onClick: () => void, disabled: boolean, children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="flex-1 px-4 py-2 text-sm font-medium text-text-primary bg-secondary border border-border-color rounded-md hover:bg-border-color disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
    >
        {children}
    </button>
);

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const segments = text.split(/(```(?:\w+)?\n[\s\S]*?\n```)/g);

  return (
    <div className="text-sm text-text-primary whitespace-pre-wrap font-mono">
      {segments.map((segment, index) => {
        if (segment.startsWith('```')) {
          const code = segment.replace(/```\w*\n/,'').replace(/\n```/, '');
          return (
            <pre key={index} className="bg-editor p-3 my-2 rounded-md overflow-x-auto">
              <code>{code}</code>
            </pre>
          );
        }
        return <span key={index}>{segment}</span>;
      })}
    </div>
  );
};


export const AIAssistant: React.FC<AIAssistantProps> = ({ activeFile, onContentChange, isLoading, setIsLoading, setToastMessage, style }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleAITask = async (task: AITask | string) => {
    if (!activeFile) return;

    setIsLoading(true);
    setAiResponse('');
    try {
      const responseText = await getAIResponse(task, activeFile.content);
      
      if (task === AITask.REFACTOR || task === AITask.DOCUMENT) {
         onContentChange(activeFile.id, responseText);
         setToastMessage(`Code in '${activeFile.name}' was updated successfully.`);
         setAiResponse(`// Code in '${activeFile.name}' updated.\n// You can ask follow-up questions here or select another action.`);
      } else {
        setAiResponse(responseText);
      }

    } catch (error) {
      console.error('Error with AI task:', error);
      setAiResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(customPrompt.trim()) {
          handleAITask(customPrompt);
      }
  }

  return (
    <div style={style} className="flex flex-col bg-secondary border-t border-border-color">
      <div className="px-4 py-2 border-b border-border-color">
        <h3 className="text-sm font-bold text-text-primary">WesAI Assistant</h3>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <MarkdownRenderer text={aiResponse || 'Select an action or ask me anything about the current file.'} />
        )}
      </div>
      <div className="p-4 border-t border-border-color bg-primary">
        <div className="flex gap-2 mb-2">
            {Object.values(AITask).map(task => (
                <TaskButton key={task} onClick={() => handleAITask(task)} disabled={!activeFile || isLoading}>{task}</TaskButton>
            ))}
        </div>
        <form onSubmit={handleCustomPromptSubmit} className="flex gap-2">
            <input 
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Or type a custom request..."
                disabled={!activeFile || isLoading}
                className="flex-1 bg-editor border border-border-color rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
                type="submit"
                disabled={!activeFile || isLoading || !customPrompt.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Send
            </button>
        </form>
      </div>
    </div>
  );
};