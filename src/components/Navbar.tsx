import React from "react";
import { Terminal, Database, Sparkles, Sun, Moon, PlayCircle, BookOpen } from "lucide-react";

interface NavbarProps {
  currentTab: "session" | "sandbox" | "schema" | "bank";
  onSelectTab: (tab: "session" | "sandbox" | "schema" | "bank") => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onOpenNewSession: () => void;
  sessionProgress?: {
    current: number;
    total: number;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isDarkTheme,
  onToggleTheme,
  onOpenNewSession,
  sessionProgress,
}) => {
  return (
    <header
      className={`border-b transition-colors px-4 lg:px-8 py-3.5 flex items-center justify-between gap-6 select-none ${
        isDarkTheme
          ? "bg-slate-950/90 border-slate-800 text-slate-100"
          : "bg-white/95 border-slate-200 text-slate-900"
      } backdrop-blur-md sticky top-0 z-40`}
    >
      {/* Zone 1: Brand wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectTab("session")}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
              isDarkTheme
                ? "bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                : "bg-cyan-500/10 text-cyan-600 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            }`}
          >
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight font-sans">
                JEDI SQL ACADEMY
              </span>
              <span
                className={`text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                  isDarkTheme
                    ? "bg-red-950/80 text-red-300 border border-red-800/60"
                    : "bg-cyan-100 text-cyan-800 border border-cyan-200"
                }`}
              >
                Star Wars DB
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 hidden sm:block">
              Archivi Dati dell'Impero & dell'Ordine Jedi
            </p>
          </div>
        </button>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
        <button
          onClick={() => onSelectTab("session")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
            currentTab === "session"
              ? isDarkTheme
                ? "bg-slate-800 text-white font-semibold shadow-sm"
                : "bg-slate-100 text-slate-900 font-semibold shadow-sm"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Esercitazione Guidata</span>
          {sessionProgress && (
            <span className="text-xs px-1.5 py-0.2 rounded font-mono tabular-nums opacity-80">
              {sessionProgress.current}/{sessionProgress.total}
            </span>
          )}
        </button>

        <button
          onClick={() => onSelectTab("sandbox")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
            currentTab === "sandbox"
              ? isDarkTheme
                ? "bg-slate-800 text-white font-semibold shadow-sm"
                : "bg-slate-100 text-slate-900 font-semibold shadow-sm"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Sandbox Libera</span>
        </button>

        <button
          onClick={() => onSelectTab("schema")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
            currentTab === "schema"
              ? isDarkTheme
                ? "bg-slate-800 text-white font-semibold shadow-sm"
                : "bg-slate-100 text-slate-900 font-semibold shadow-sm"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Schema Database</span>
        </button>

        <button
          onClick={() => onSelectTab("bank")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
            currentTab === "bank"
              ? isDarkTheme
                ? "bg-slate-800 text-white font-semibold shadow-sm"
                : "bg-slate-100 text-slate-900 font-semibold shadow-sm"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Banca Esercizi (105)</span>
        </button>
      </nav>

      {/* Zone 3: Actions (Theme Toggle + Nuova Sessione) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleTheme}
          title={isDarkTheme ? "Passa al Lato Chiaro (Jedi)" : "Passa al Lato Oscuro (Sith)"}
          className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
            isDarkTheme
              ? "bg-slate-900 border-slate-700 hover:bg-slate-800 text-amber-300"
              : "bg-slate-50 border-slate-300 hover:bg-slate-100 text-slate-800"
          }`}
        >
          {isDarkTheme ? (
            <>
              <Sun className="w-4 h-4" />
              <span className="hidden xl:inline text-slate-200">Lato Chiaro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span className="hidden xl:inline text-slate-800">Lato Oscuro</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenNewSession}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap ${
            isDarkTheme
              ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_14px_rgba(239,68,68,0.35)]"
              : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_14px_rgba(6,182,212,0.3)]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nuova Sessione</span>
        </button>
      </div>
    </header>
  );
};
