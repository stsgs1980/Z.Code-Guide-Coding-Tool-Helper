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
  } else if (lang === "bash" || lang === "shell" || lang === "yaml") {
    // Bash/shell syntax highlighting — order matters!
    // 1. Comments (must be first to avoid conflicts)
    html = html.replace(/(#.*$)/gm, '<span class="token-comment">$1</span>');

    // 2. Strings in double quotes (skip if already inside a span)
    html = html.replace(/(?<!class=)&quot;([^&]*)&quot;/g, '<span class="token-string">"$1"</span>');
    html = html.replace(/"([^"]*?)"/g, '<span class="token-string">"$1"</span>');

    // 3. Common commands at start of line or after && / | / ;
    const bashCommands = [
      'npm', 'npx', 'yarn', 'pnpm', 'bun', 'sudo', 'curl', 'wget',
      'git', 'docker', 'node', 'python', 'pip', 'coding-helper', 'chelper',
      'cd', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'echo', 'export',
      'source', 'chmod', 'chown', 'grep', 'sed', 'awk', 'find', 'tar',
      'ssh', 'scp', 'kill', 'ps', 'top', 'htop', 'which', 'whereis',
    ];
    const cmdPattern = new RegExp(`\\b(${bashCommands.join('|')})\\b`, 'g');
    html = html.replace(cmdPattern, (match, cmd, offset, str) => {
      // Don't highlight inside already-created spans
      const before = str.substring(Math.max(0, offset - 30), offset);
      if (before.includes('class="token-')) return match;
      return `<span class="token-function">${cmd}</span>`;
    });

    // 4. Flags and options: --word, -w
    html = html.replace(/(?<!class="token-\w+"[^>]*)(\s)(-{1,2}[\w-]+)/g, '$1<span class="token-attr-value">$2</span>');

    // 5. Variables: $VAR or ${VAR}
    html = html.replace(/(\$\{[^}]+\}|\$\w+)/g, '<span class="token-variable">$1</span>');

    // 6. Numbers
    html = html.replace(/\b(\d+)\b/g, (match, num, offset, str) => {
      const before = str.substring(Math.max(0, offset - 30), offset);
      if (before.includes('class="token-')) return match;
      return `<span class="token-number">${num}</span>`;
    });

    // 7. Sub-commands after main command: auth, init, lang, etc.
    const subCommands = ['install', 'init', 'auth', 'lang', 'show', 'set', 'revoke', 'reload', 'doctor', 'run', 'start', 'build', 'dev', 'test', 'global', 'local'];
    const subPattern = new RegExp(`\\b(${subCommands.join('|')})\\b`, 'g');
    html = html.replace(subPattern, (match, cmd, offset, str) => {
      const before = str.substring(Math.max(0, offset - 50), offset);
      if (before.includes('class="token-')) return match;
      return `<span class="token-keyword">${cmd}</span>`;
    });

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
