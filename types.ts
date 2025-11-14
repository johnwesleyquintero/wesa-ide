
export interface FileNode {
  id: string;
  name: string;
  content: string;
  language: 'typescript' | 'javascript' | 'json' | 'html';
}

export enum AITask {
    EXPLAIN = "Explain this code",
    REFACTOR = "Refactor this code",
    DOCUMENT = "Add documentation",
    FIND_BUGS = "Find bugs in this code"
}
