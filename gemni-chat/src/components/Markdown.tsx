import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {

  interface CodeProps {
    inline?: boolean;
    className?: string;
    children: React.ReactNode; 
    node?: any; 
    [key: string]: any; 
  }


  const codeRenderer: React.FC<CodeProps> = ({ inline, className, children, node, ...rest }) => {


    const language = /language-(\w+)/.exec(className || '')?.[1] || '';

    if (inline) {
    
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }


    const { ref, ...syntaxHighlighterProps } = rest; // Destructure ref out if it exists

    return (
      <SyntaxHighlighter
  
        style={oneDark as any}
        language={language} // Pass the detected language for highlighting
        PreTag="div" 
       
        {...(syntaxHighlighterProps as any)} 
      >
        {/* Children can be an array of strings/nodes. Convert to string and remove trailing newline. */}
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  };


  const components: Components = {

    code: codeRenderer as Components['code'],

  };

  return (
    <ReactMarkdown components={components}>
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;