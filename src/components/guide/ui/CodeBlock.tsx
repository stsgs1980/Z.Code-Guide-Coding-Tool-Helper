"use client";

import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}

function highlightSyntax(code: string, lang: string): string {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (lang === "json") {
    html = html
      .replace(/"([^"]+)"(?=\s*:)/g, '<span class="token-property">"$1"</span>')
      .replace(/:\s*"([^"]+)"/g, ': <span class="token-string">"$1"</span>')
      .replace(/:\s*(\d+)/g, ': <span class="token-number">$1</span>')
      .replace(/:\s*(true|false|null)/g, ': <span class="token-boolean">$1</span>');
  } else if (lang === "bash" || lang === "yaml") {
    html = html
      .replace(/(#.*$)/gm, '<span class="token-comment">$1</span>')
      .replace(/(\$\w+)/g, '<span class="token-variable">$1</span>');
  } else if (lang === "typescript" || lang === "javascript") {
    html = html
      .replace(/(\/\/.*$)/gm, '<span class="token-comment">$1</span>')
      .replace(/\b(import|from|export|const|let|var|function|return|if|else|async|await)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/"([^"]+)"/g, '<span class="token-string">"$1"</span>')
      .replace(/'([^']+)'/g, "<span class=\"token-string\">'$1'</span>");
  }

  return html;
}

export function CodeBlock({ code, lang = "bash", title, className = "" }: CodeBlockProps) {
  const lines = code.split("\n");
  const highlighted = highlightSyntax(code, lang);

  return (
    <div className={`code-block code-block-hover-glow relative overflow-hidden ${className}`}>
      {/* macOS title bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
          {title && (
            <span className="ml-3 text-xs text-white/40 font-mono">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30 font-mono uppercase">{lang}</span>
          <CopyButton text={code} />
        </div>
      </div>
      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 pl-12 text-sm leading-relaxed font-mono">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
      {/* Line numbers (subtle) */}
      <div className="absolute left-0 top-[40px] bottom-0 w-10 flex flex-col pt-4 text-[10px] text-white/15 font-mono pointer-events-none select-none">
        {lines.map((_, i) => (
          <div key={i} className="leading-relaxed text-right pr-2">{i + 1}</div>
        ))}
      </div>
    </div>
  );
}
