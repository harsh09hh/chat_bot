import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// We need to import the types for the markdown AST nodes if we want to be very precise
// For this specific error, we'll try to refine the renderer signature.
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {

  // Define the interface for the props that react-markdown passes to the 'code' renderer.
  // This is a more robust way to define the type if Components['code'] isn't working as expected.
  interface CodeProps {
    inline?: boolean;
    className?: string;
    children: React.ReactNode; // Can be string or an array of strings/nodes
    node?: any; // The AST node, often includes position, type, etc.
    [key: string]: any; // Allow other miscellaneous props that react-markdown might pass
  }

  // Use our custom CodeProps interface for the codeRenderer
  const codeRenderer: React.FC<CodeProps> = ({ inline, className, children, node, ...rest }) => {
    // Extract the language from the className (e.g., 'language-java')
    const language = /language-(\w+)/.exec(className || '')?.[1] || '';

    if (inline) {
      // For inline code, just render a simple <code> tag
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }

    // For code blocks, use SyntaxHighlighter
    // We explicitly exclude 'node' and 'ref' from 'rest' props as SyntaxHighlighter
    // might not expect them or might expect a different type for 'ref'.
    const { ref, ...syntaxHighlighterProps } = rest; // Destructure ref out if it exists

    return (
      <SyntaxHighlighter
        // Casting 'style' to any is generally needed due to type mismatches
        // between react-syntax-highlighter's internal types and the theme objects.
        style={oneDark as any}
        language={language} // Pass the detected language for highlighting
        PreTag="div" // Use 'div' as the wrapper for the <pre> tag for better styling control
        // Spread the remaining props, ensuring 'node' and 'ref' are not included
        {...(syntaxHighlighterProps as any)} // Cast to any to handle potential remaining type issues if needed
      >
        {/* Children can be an array of strings/nodes. Convert to string and remove trailing newline. */}
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  };

  // Define the custom components to be used by ReactMarkdown
  const components: Components = {
    // Cast codeRenderer to Components['code'] to satisfy ReactMarkdown's type expectations
    code: codeRenderer as Components['code'],
    // Add other custom renderers here if needed
  };

  return (
    <ReactMarkdown components={components}>
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;