import React, { useRef } from "react";
import { Play, RotateCcw, Sparkles, Terminal } from "lucide-react";

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onExecute: () => void;
  isExecuting?: boolean;
  isDarkTheme: boolean;
  placeholder?: string;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  value,
  onChange,
  onExecute,
  isExecuting = false,
  isDarkTheme,
  placeholder = "Scrivi la tua query SQL qui... es: SELECT * FROM personaggi;",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle Tab key for 2-space indentation and Ctrl+Enter for execution
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onExecute();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Capitalize SQL keywords on click or format
  const formatSql = () => {
    if (!value.trim()) return;
    const keywords = [
      "SELECT", "FROM", "WHERE", "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN",
      "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "DISTINCT", "AS", "AND", "OR",
      "NOT", "IN", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "COUNT", "SUM",
      "AVG", "MIN", "MAX", "ASC", "DESC"
    ];

    let formatted = value;
    // Replace standalone keywords case-insensitively
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      formatted = formatted.replace(regex, kw);
    });

    onChange(formatted);
  };

  const insertSnippet = (snippet: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const newValue = value.substring(0, start) + snippet + value.substring(end);
    onChange(newValue);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + snippet.length;
      }
    }, 0);
  };

  const linesCount = Math.max(value.split("\n").length, 4);

  return (
    <div
      className={`rounded-xl border flex flex-col overflow-hidden transition-colors shadow-sm ${
        isDarkTheme
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {/* Editor Toolbar */}
      <div className="px-4 py-2 border-b border-inherit flex flex-wrap items-center justify-between gap-2 bg-slate-500/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Terminale Query SQL
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">
            (Scorciatoia: Ctrl+Invio)
          </span>
        </div>

        {/* Quick Keywords Helper Chips */}
        <div className="hidden lg:flex items-center gap-1">
          {["SELECT", "FROM", "WHERE", "JOIN", "GROUP BY", "ORDER BY"].map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => insertSnippet(kw + " ")}
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                isDarkTheme
                  ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm"
              }`}
            >
              +{kw}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={formatSql}
            title="Formatta maiuscole parole chiave SQL"
            className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded border transition-colors ${
              isDarkTheme
                ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
                : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm"
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="hidden sm:inline">Formatta</span>
          </button>

          <button
            type="button"
            onClick={() => onChange("")}
            title="Pulisci terminale"
            className={`p-1.5 rounded border transition-colors ${
              isDarkTheme
                ? "border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                : "border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Textarea with line numbers */}
      <div className="relative flex flex-1 min-h-[140px] font-mono text-xs">
        {/* Line numbers gutter */}
        <div
          className={`select-none py-3 px-2.5 text-right font-mono font-semibold border-r border-inherit ${
            isDarkTheme ? "bg-slate-950/80 text-slate-500" : "bg-slate-100/80 text-slate-600"
          }`}
          style={{ width: "38px" }}
        >
          {Array.from({ length: linesCount }, (_, i) => (
            <div key={i + 1} className="leading-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck={false}
          className={`w-full py-3 px-3.5 leading-5 outline-none resize-none bg-transparent font-mono text-xs font-medium ${
            isDarkTheme
              ? "text-slate-100 placeholder-slate-500"
              : "text-slate-950 placeholder-slate-500"
          }`}
          rows={Math.max(linesCount, 6)}
        />
      </div>

      {/* Footer with Execute button */}
      <div className="px-4 py-2.5 border-t border-inherit flex items-center justify-between gap-3 bg-slate-500/5">
        <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
          Usa <code className="font-mono font-bold text-cyan-700 dark:text-cyan-300">;</code> a fine query
        </div>

        <button
          type="button"
          onClick={onExecute}
          disabled={isExecuting || !value.trim()}
          className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
            isDarkTheme
              ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]"
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isExecuting ? "Esecuzione in corso..." : "Esegui Query"}</span>
        </button>
      </div>
    </div>
  );
};
