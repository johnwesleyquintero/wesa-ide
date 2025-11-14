
import React from 'react';
import { FileNode } from '../types';

interface FileExplorerProps {
  files: FileNode[];
  activeFileId: string | null;
  onSelectFile: (id: string) => void;
}

const TypescriptIcon = () => (
    <svg viewBox="0 0 128 128" width="16" height="16" className="mr-2">
        <path fill="#294E80" d="M0 0h128v128H0z" />
        <path fill="#fff" d="M29.5 29.5h69.1v69.1H29.5z" />
        <path fill="#294E80" d="M96.7 94.2V65.8h-5.4V56h13.1v38.2zm-22-28.4h5.4v13.1h-5.4v-5.4h-7.7v10.8c0 2.5.4 4.5 1.1 5.9.8 1.4 2 2.5 3.6 3.2 1.6.7 3.6 1.1 6 1.1 2.3 0 4.3-.4 5.9-1.2 1.6-.8 2.9-2 3.9-3.6s1.5-3.6 1.5-5.9h-5.4c0 1.2-.2 2.2-.5 2.9-.3.7-.8 1.3-1.5 1.7s-1.5.6-2.5.6c-1.1 0-2-.2-2.7-.6s-1.3-1-1.7-1.8c-.4-.7-.6-1.7-.6-2.9V65.8h18.5V56H64v38.2h5.4V83.1h5.3z" />
    </svg>
);

const JavascriptIcon = () => (
    <svg viewBox="0 0 128 128" width="16" height="16" className="mr-2">
        <path fill="#F0DB4F" d="M0 0h128v128H0z" />
        <path d="M103.4 103.4c-1.5 2.4-4.2 3.8-7.2 3.8-3.4 0-6.1-1.4-7.9-4.3l-9.9-17.2-13.4 8.2v12.2c0 3.3-2.1 5.5-5.2 5.5-3.4 0-5.3-2.2-5.3-5.5v-30.8c0-3.1 2.2-5.2 5.2-5.2 1.9 0 3.4.7 4.3 2.1s1.4 3.2 1.4 5.2v17.2l12.7-7.6-9.1-15.7c-1.6-2.9-1.2-5.5 1.2-7.5 2.5-2 5.6-2 8.2-.1l12.4 9.1 8.5-4.9c2.5-1.5 4.9-1.4 6.8.3 2 1.8 2.2 4.1.8 6.4L103.4 103.4zM53.1 51.8c-1.5 2.4-4.2 3.8-7.2 3.8-3.4 0-6.1-1.4-7.9-4.3-1.8-2.9-1.8-6.3.1-9.1 1.8-2.8 4.6-4.3 7.8-4.3 3.4 0 6.1 1.4 7.9 4.3 1.8 2.8 1.8 6.2 0 9z" />
    </svg>
);

const JsonIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path d="M14 6v1a1 1 0 01-1 1H8a1 1 0 01-1-1V6a1 1 0 011-1h5a1 1 0 011 1z" fill="#8B949E"/>
        <path d="M17 18v-1a1 1 0 00-1-1h-5a1 1 0 00-1 1v1a1 1 0 001 1h5a1 1 0 001-1z" fill="#8B949E"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm12 1.5a1.5 1.5 0 00-1.5-1.5H7.5a1.5 1.5 0 000 3h9a1.5 1.5 0 001.5-1.5zm-3 12a1.5 1.5 0 00-1.5-1.5h-9a1.5 1.5 0 000 3h9a1.5 1.5 0 001.5-1.5z" fill="#C9D1D9"/>
    </svg>
);


const getIcon = (language: string) => {
    switch (language) {
        case 'typescript':
            return <TypescriptIcon />;
        case 'javascript':
            return <JavascriptIcon />;
        case 'json':
            return <JsonIcon />;
        default:
            return <JsonIcon />;
    }
}


export const FileExplorer: React.FC<FileExplorerProps> = ({ files, activeFileId, onSelectFile }) => {
  return (
    <aside className="w-64 bg-secondary border-r border-border-color p-2">
      <h2 className="text-sm font-bold text-text-secondary px-2 mb-2">EXPLORER</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <button
              onClick={() => onSelectFile(file.id)}
              className={`w-full text-left flex items-center px-2 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                activeFileId === file.id ? 'bg-accent/20 text-text-primary' : 'text-text-secondary hover:bg-white/10'
              }`}
              aria-current={activeFileId === file.id ? 'page' : undefined}
            >
              {getIcon(file.language)}
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
