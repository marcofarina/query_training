import React, { useState } from "react";
import { SqlExercise } from "../types";
import { Lightbulb, X, ChevronRight, HelpCircle } from "lucide-react";

interface HintsModalProps {
  exercise: SqlExercise;
  isDarkTheme: boolean;
  onClose: () => void;
}

export const HintsModal: React.FC<HintsModalProps> = ({
  exercise,
  isDarkTheme,
  onClose,
}) => {
  const [revealedCount, setRevealedCount] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl p-6 transition-colors ${
          isDarkTheme
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-inherit">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Suggerimenti dell'Archivista</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Guida strategica per l'esercizio corrente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hints list */}
        <div className="py-5 space-y-3">
          {exercise.hints.map((hint, idx) => {
            const isRevealed = idx < revealedCount;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  isRevealed
                    ? isDarkTheme
                      ? "bg-slate-800/80 border-slate-700 text-slate-100"
                      : "bg-amber-50 border-amber-300 text-slate-900 shadow-sm"
                    : "opacity-40 border-dashed border-inherit"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    Suggerimento {idx + 1} di {exercise.hints.length}
                  </span>
                </div>
                {isRevealed ? (
                  <p className="text-xs leading-relaxed font-sans font-medium">{hint}</p>
                ) : (
                  <p className="text-xs italic text-slate-500 dark:text-slate-400">
                    Suggerimento successivo bloccato.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-inherit">
          {revealedCount < exercise.hints.length ? (
            <button
              onClick={() => setRevealedCount((prev) => prev + 1)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                isDarkTheme
                  ? "bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700"
                  : "bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200"
              }`}
            >
              <span>Sblocca Suggerimento Successivo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Tutti i suggerimenti mostrati
            </span>
          )}

          <button
            onClick={onClose}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isDarkTheme
                ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                : "bg-slate-100 hover:bg-slate-200 text-slate-800"
            }`}
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
};
