import React from 'react';

interface CodeBlockProps {
  code: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  showLineNumbers = true,
  highlightLines = [],
  className = '',
}) => {
  const lines = code.trim().split('\n');

  // Simple token highlight regex helper for Python
  const renderHighlightedLine = (line: string) => {
    // Comments
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    // Tokenizer matching strings, keywords, numbers, builtins
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // String literals: "..." or '...'
      const strMatch = remaining.match(/^("[^"]*"|'[^']*')/);
      if (strMatch) {
        parts.push(
          <span key={keyIdx++} className="text-emerald-400 font-medium">
            {strMatch[0]}
          </span>
        );
        remaining = remaining.slice(strMatch[0].length);
        continue;
      }

      // Inline comments: # ...
      const commentMatch = remaining.match(/^#.*$/);
      if (commentMatch) {
        parts.push(
          <span key={keyIdx++} className="text-slate-500 italic">
            {commentMatch[0]}
          </span>
        );
        remaining = '';
        continue;
      }

      // Python Keywords: if, else, elif, for, in, while, def, return, and, or, not
      const kwMatch = remaining.match(/^(if|else|elif|for|in|while|def|return|and|or|not|is|import|from)\b/);
      if (kwMatch) {
        parts.push(
          <span key={keyIdx++} className="text-pink-400 font-bold">
            {kwMatch[0]}
          </span>
        );
        remaining = remaining.slice(kwMatch[0].length);
        continue;
      }

      // Built-in functions & values: print, input, len, range, int, float, str, type, sum, round, append, True, False, None
      const builtinMatch = remaining.match(/^(print|input|len|range|int|float|str|type|sum|round|append|True|False|None)\b/);
      if (builtinMatch) {
        const isBool = builtinMatch[0] === 'True' || builtinMatch[0] === 'False' || builtinMatch[0] === 'None';
        parts.push(
          <span key={keyIdx++} className={isBool ? 'text-amber-400 font-bold' : 'text-cyan-400 font-semibold'}>
            {builtinMatch[0]}
          </span>
        );
        remaining = remaining.slice(builtinMatch[0].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^\b\d+(\.\d+)?\b/);
      if (numMatch) {
        parts.push(
          <span key={keyIdx++} className="text-amber-300">
            {numMatch[0]}
          </span>
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Operators
      const opMatch = remaining.match(/^(\+|\-|\*|\/|\/\/|\%|\*\*|\=\=|\!\=|\<\=|\>\=|\<|\>|\=)/);
      if (opMatch) {
        parts.push(
          <span key={keyIdx++} className="text-purple-400 font-bold">
            {opMatch[0]}
          </span>
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      // Default character / words
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    }

    return parts;
  };

  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 font-mono text-sm leading-relaxed shadow-xl code-glow ${className}`}>
      {/* Header bar of Code Block */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="ml-2 font-mono text-[11px] text-slate-300 font-bold tracking-wider">python_main.py</span>
        </div>
        <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
          Python 3
        </span>
      </div>

      {/* Code contents */}
      <div className="p-4 overflow-x-auto text-slate-200">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightLines.includes(lineNum);
              return (
                <tr
                  key={idx}
                  className={`transition-colors ${isHighlighted ? 'bg-amber-500/15 text-amber-200' : 'hover:bg-slate-900/40'}`}
                >
                  {showLineNumbers && (
                    <td className="w-8 pr-4 text-right text-slate-600 select-none font-mono text-xs align-top">
                      {lineNum}
                    </td>
                  )}
                  <td className="whitespace-pre font-mono font-medium text-sm">
                    {renderHighlightedLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
