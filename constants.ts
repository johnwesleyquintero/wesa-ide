
import { FileNode } from './types';

export const initialFiles: FileNode[] = [
  {
    id: '1',
    name: 'index.tsx',
    language: 'typescript',
    content: `import React, { useState } from 'react';

const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  return <button onClick={onClick} style={{ padding: 10, margin: 5 }}>{children}</button>;
}

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(c => c + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Current count: {count}</p>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
    </div>
  );
}

export default App;
`,
  },
  {
    id: '2',
    name: 'package.json',
    language: 'json',
    content: `{
  "name": "wesai-ide",
  "version": "1.0.0",
  "description": "AI-powered IDE",
  "main": "index.js",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
`,
  },
  {
    id: '3',
    name: 'utils.js',
    language: 'javascript',
    content: `// Utility functions will go here
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
`,
  },
];
