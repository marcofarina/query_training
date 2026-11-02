import React, { useState, useEffect, useRef } from "react";
import { SqlExercise, ChatMessage } from "../types";
import { Sparkles, Send, X, Bot, User, Loader2, BookOpen, Copy, Check } from "lucide-react";
import { buildDetailedTutorAnalysis } from "../services/tutorService";

interface GeminiTutorModalProps {
  exercise: SqlExercise;
  userQuery: string;
  errorMessage?: string;
  userResultsSummary?: string;
  expectedResultsSummary?: string;
  isDarkTheme: boolean;
  onClose: () => void;
}

export const GeminiTutorModal: React.FC<GeminiTutorModalProps> = ({
  exercise,
  userQuery,
  errorMessage,
  userResultsSummary,
  expectedResultsSummary,
  isDarkTheme,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-fetch the initial explanation when modal is opened
  useEffect(() => {
    let isMounted = true;

    async function fetchInitialExplanation() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/explain-query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionTitle: exercise.title,
            questionGoal: exercise.description,
            difficulty: exercise.difficulty,
            userQuery,
            expectedQuery: exercise.expectedQuery,
            errorMessage,
            userResultsSummary,
            expectedResultsSummary,
            relevantTables: exercise.relevantTables,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          const text =
            data.explanation ||
            data.fallbackExplanation ||
            buildDetailedTutorAnalysis({
              questionTitle: exercise.title,
              questionGoal: exercise.description,
              difficulty: exercise.difficulty,
              userQuery,
              expectedQuery: exercise.expectedQuery,
              errorMessage,
              userResultsSummary,
              expectedResultsSummary,
              relevantTables: exercise.relevantTables,
            });

          setMessages([
            {
              id: "msg-init",
              sender: "gemini",
              text,
              timestamp: Date.now(),
            },
          ]);
        }
      } catch (err: any) {
        if (isMounted) {
          // On static hosting (like GitHub Pages) or offline, use the rich pedagogical tutor engine
          const fallback = buildDetailedTutorAnalysis({
            questionTitle: exercise.title,
            questionGoal: exercise.description,
            difficulty: exercise.difficulty,
            userQuery,
            expectedQuery: exercise.expectedQuery,
            errorMessage,
            userResultsSummary,
            expectedResultsSummary,
            relevantTables: exercise.relevantTables,
          });

          setMessages([
            {
              id: "msg-init",
              sender: "gemini",
              text: fallback,
              timestamp: Date.now(),
            },
          ]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchInitialExplanation();

    return () => {
      isMounted = false;
    };
  }, [exercise.id, userQuery, errorMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/explain-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionTitle: exercise.title,
          questionGoal: exercise.description,
          difficulty: exercise.difficulty,
          userQuery,
          expectedQuery: exercise.expectedQuery,
          errorMessage,
          relevantTables: exercise.relevantTables,
          chatHistory: messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text })),
          userQuestion: userMsg.text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "gemini",
        text: data.explanation || "Padawan, medita attentamente sulle condizioni di join e sui filtri di gruppo.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Fallback on static host / GitHub Pages / offline
      const reply = buildDetailedTutorAnalysis({
        questionTitle: exercise.title,
        questionGoal: exercise.description,
        difficulty: exercise.difficulty,
        userQuery,
        expectedQuery: exercise.expectedQuery,
        errorMessage,
        relevantTables: exercise.relevantTables,
        userQuestion: userMsg.text,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "gemini",
          text: reply,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Helper to render basic markdown with styled code blocks and headers
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const firstLine = lines[0]?.trim();
        const code = (firstLine === "sql" || firstLine === "SQL" ? lines.slice(1) : lines).join("\n");

        return (
          <div
            key={index}
            className="my-3 rounded-xl border border-slate-700/80 bg-slate-950 overflow-hidden font-mono text-xs text-slate-100"
          >
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>SQL</span>
              <button
                type="button"
                onClick={() => copyToClipboard(code)}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                {copiedCode === code ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copia</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-cyan-300 whitespace-pre leading-relaxed">
              {code}
            </pre>
          </div>
        );
      }

      // Format headers, bold and inline code
      const paragraphs = part.split("\n\n");
      return (
        <div key={index} className="space-y-2">
          {paragraphs.map((p, pIdx) => {
            const trimmed = p.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("### ")) {
              return (
                <h4 key={pIdx} className="font-bold text-sm text-cyan-800 dark:text-cyan-300 mt-2">
                  {trimmed.replace(/^### /, "")}
                </h4>
              );
            }
            if (trimmed.startsWith("#### ")) {
              return (
                <h5 key={pIdx} className="font-bold text-xs text-amber-800 dark:text-amber-400 mt-1.5 uppercase tracking-wider">
                  {trimmed.replace(/^#### /, "")}
                </h5>
              );
            }

            // Replace **bold** and `code`
            const formatted = trimmed
              .split(/(\*\*.*?\*\*|`.*?`)/g)
              .map((chunk, cIdx) => {
                if (chunk.startsWith("**") && chunk.endsWith("**")) {
                  return <strong key={cIdx} className="font-bold">{chunk.slice(2, -2)}</strong>;
                }
                if (chunk.startsWith("`") && chunk.endsWith("`")) {
                  return (
                    <code
                      key={cIdx}
                      className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-black/50 font-mono text-[11px] font-bold text-cyan-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-800"
                    >
                      {chunk.slice(1, -1)}
                    </code>
                  );
                }
                return chunk;
              });

            return (
              <p key={pIdx} className="leading-relaxed">
                {formatted}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-3xl rounded-2xl border shadow-2xl flex flex-col h-[85vh] max-h-[750px] overflow-hidden transition-colors ${
          isDarkTheme
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between gap-4 ${
            isDarkTheme
              ? "bg-gradient-to-r from-red-950/40 to-slate-900 border-slate-800"
              : "bg-gradient-to-r from-cyan-50 to-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDarkTheme
                  ? "bg-red-500/15 text-red-400 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                  : "bg-cyan-500/15 text-cyan-600 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight">
                  Tutor Didattico: Maestro Jedi
                </h3>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-300 font-bold">
                  AI SQL Coach
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-md">
                Esercizio: {exercise.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Exercise Quick Context Ribbon */}
        <div className="px-5 py-2.5 bg-slate-500/5 border-b border-inherit text-xs flex items-center justify-between gap-3 font-sans">
          <div className="flex items-center gap-2 truncate text-slate-600 dark:text-slate-300">
            <BookOpen className="w-3.5 h-3.5 shrink-0 text-cyan-700 dark:text-cyan-400" />
            <span className="font-bold text-slate-900 dark:text-slate-200">Obiettivo:</span>
            <span className="truncate">{exercise.description}</span>
          </div>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 uppercase shrink-0">
            {exercise.difficulty}
          </span>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.sender === "user"
                    ? "bg-slate-700 text-white"
                    : isDarkTheme
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-cyan-500/20 text-cyan-700 border border-cyan-500/30"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                  msg.sender === "user"
                    ? isDarkTheme
                      ? "bg-slate-800 text-white rounded-tr-none"
                      : "bg-cyan-600 text-white rounded-tr-none shadow-sm"
                    : isDarkTheme
                    ? "bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-tl-none"
                    : "bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none"
                }`}
              >
                <div className="font-sans text-xs sm:text-sm">
                  {renderFormattedContent(msg.text)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-400 text-xs italic">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
              <span>Il Maestro Jedi sta analizzando la tua query negli archivi galattici...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 border-t border-inherit flex items-center gap-2 bg-slate-500/5"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Chiedi al Maestro AI un chiarimento sulla query..."
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
              isDarkTheme
                ? "bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-red-500"
                : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600"
            }`}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 rounded-xl text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              isDarkTheme ? "bg-red-600 hover:bg-red-500" : "bg-cyan-600 hover:bg-cyan-500"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
