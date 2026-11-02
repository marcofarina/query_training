import React, { useState } from "react";
import { EXERCISES_BANK } from "../data/exercises";
import { SqlExercise, DifficultyLevel } from "../types";
import { BookOpen, Search, Play, CheckCircle2 } from "lucide-react";

interface BankCatalogViewProps {
  isDarkTheme: boolean;
  onSelectExercise: (exercise: SqlExercise) => void;
  solvedIds?: Set<string>;
}

export const BankCatalogView: React.FC<BankCatalogViewProps> = ({
  isDarkTheme,
  onSelectExercise,
  solvedIds = new Set(),
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = EXERCISES_BANK.filter((e) => {
    if (difficultyFilter !== "all" && e.difficulty !== difficultyFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = e.title.toLowerCase().includes(q);
      const matchDesc = e.description.toLowerCase().includes(q);
      const matchTables = e.relevantTables.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTables) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div
        className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
          isDarkTheme
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDarkTheme
                ? "bg-red-500/10 text-red-400 border border-red-500/30"
                : "bg-cyan-500/10 text-cyan-600 border border-cyan-500/30"
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Archivio Completo Esercizi (105 Quesiti)</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Consulta l'intera banca dati di esercizi SQL, filtra per livello e avvia qualsiasi quesito.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty filter tabs */}
          <div
            className={`flex items-center p-1 rounded-lg border ${
              isDarkTheme ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}
          >
            {[
              { id: "all" as const, label: "Tutti (105)" },
              { id: "facile" as const, label: "Facili (35)" },
              { id: "medio" as const, label: "Medi (40)" },
              { id: "difficile" as const, label: "Difficili (30)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDifficultyFilter(tab.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  difficultyFilter === tab.id
                    ? isDarkTheme
                      ? "bg-slate-800 text-white shadow-sm"
                      : "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cerca per testo, obiettivo o tabella..."
          className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border outline-none transition-colors ${
            isDarkTheme
              ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-red-500"
              : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600"
          }`}
        />
      </div>

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((ex) => {
          const isSolved = solvedIds.has(ex.id);
          const diffColor =
            ex.difficulty === "facile"
              ? isDarkTheme
                ? "text-emerald-300 border-emerald-700/60 bg-emerald-950/60"
                : "text-emerald-800 border-emerald-300 bg-emerald-50 font-bold"
              : ex.difficulty === "medio"
              ? isDarkTheme
                ? "text-amber-300 border-amber-700/60 bg-amber-950/60"
                : "text-amber-800 border-amber-300 bg-amber-50 font-bold"
              : isDarkTheme
              ? "text-red-300 border-red-700/60 bg-red-950/60"
              : "text-red-800 border-red-300 bg-red-50 font-bold";

          return (
            <div
              key={ex.id}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                isDarkTheme
                  ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200"
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${diffColor}`}>
                    {ex.difficulty}
                  </span>
                  {isSolved && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Risolto
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm leading-snug text-slate-900 dark:text-slate-100">{ex.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {ex.description}
                </p>
              </div>

              <div className="pt-2 border-t border-inherit flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium">
                  Tabelle: {ex.relevantTables.join(", ")}
                </span>
                <button
                  onClick={() => onSelectExercise(ex)}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all shadow-sm ${
                    isDarkTheme ? "bg-red-600 hover:bg-red-500" : "bg-cyan-600 hover:bg-cyan-500"
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Avvia</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
