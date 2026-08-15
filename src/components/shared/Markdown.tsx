import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => <h1 className="text-lg font-semibold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-semibold">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-semibold">{children}</h3>,
  p: ({ children }) => <p className="mt-2 leading-relaxed">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-2 list-disc space-y-1 pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-2 list-decimal space-y-1 pl-5">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-accent">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-3 border-l-2 border-accent/50 pl-4 italic text-muted">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-accent/40 underline-offset-4"
    >
      {children}
    </a>
  ),
};

export default function Markdown({ content }: { content: string }) {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}
