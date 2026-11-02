import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { ExerciseAttempt, SqlExercise } from "../types";
import { Award, CheckCircle2, RotateCcw, Terminal, ArrowRight } from "lucide-react";

interface SessionSummaryModalProps {
  attempts: Record<string, ExerciseAttempt>;
  exercises: SqlExercise[];
  onRestart: () => void;
  onOpenSandbox: () => void;
  onClose: () => void;
  isDarkTheme: boolean;
}

export const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({
  attempts,
  exercises,
  onRestart,
  onOpenSandbox,
  onClose,
  isDarkTheme,
}) => {
  const total = exercises.length;
  const correctCount = exercises.filter((e) => attempts[e.id]?.isCorrect).length;
  const accuracy = Math.round((correctCount / total) * 100);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  }, []);

  const facileCorrect = exercises.filter((e) => e.difficulty === "facile" && attempts[e.id]?.isCorrect).length;
  const facileTotal = exercises.filter((e) => e.difficulty === "facile").length;

  const medioCorrect = exercises.filter((e) => e.difficulty === "medio" && attempts[e.id]?.isCorrect).length;
  const medioTotal = exercises.filter((e) => e.difficulty === "medio").length;

  const difficileCorrect = exercises.filter((e) => e.difficulty === "difficile" && attempts[e.id]?.isCorrect).length;
  const difficileTotal = exercises.filter((e) => e.difficulty === "difficile").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl p-6 sm:p-8 flex flex-col text-center transition-colors ${
          isDarkTheme
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8" />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Sessione Completata, Giovane Padawan!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
          La Forza delle query SQL scorre potente in te. Ecco il resoconto del tuo addestramento.
        </p>

        {/* Big Score Card */}
        <div
          className={`my-6 p-5 rounded-xl border flex items-center justify-around ${
            isDarkTheme
              ? "bg-slate-950/60 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div>
            <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono tabular-nums">
              {correctCount}/{total}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold mt-1">
              Quesiti Risolti
            </div>
          </div>

          <div className="h-10 w-px bg-slate-300 dark:bg-slate-800" />

          <div>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              {accuracy}%
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold mt-1">
              Accuratezza
            </div>
          </div>
        </div>

        {/* Breakdown by difficulty */}
        <div className="space-y-2 mb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Dettaglio per Livello di Difficoltà
          </span>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            {facileTotal > 0 && (
              <div
                className={`p-2.5 rounded-lg border ${
                  isDarkTheme ? "bg-slate-800/40 border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className="text-emerald-700 dark:text-emerald-400 font-bold uppercase text-[10px]">Facile</div>
                <div className="text-sm font-bold mt-0.5 text-slate-900 dark:text-slate-100">
                  {facileCorrect} / {facileTotal}
                </div>
              </div>
            )}

            {medioTotal > 0 && (
              <div
                className={`p-2.5 rounded-lg border ${
                  isDarkTheme ? "bg-slate-800/40 border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className="text-amber-700 dark:text-amber-400 font-bold uppercase text-[10px]">Medio</div>
                <div className="text-sm font-bold mt-0.5 text-slate-900 dark:text-slate-100">
                  {medioCorrect} / {medioTotal}
                </div>
              </div>
            )}

            {difficileTotal > 0 && (
              <div
                className={`p-2.5 rounded-lg border ${
                  isDarkTheme ? "bg-slate-800/40 border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className="text-red-700 dark:text-red-400 font-bold uppercase text-[10px]">Difficile</div>
                <div className="text-sm font-bold mt-0.5 text-slate-900 dark:text-slate-100">
                  {difficileCorrect} / {difficileTotal}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={onRestart}
            className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              isDarkTheme
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
                : "bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nuova Sessione</span>
          </button>

          <button
            onClick={onOpenSandbox}
            className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              isDarkTheme
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
                : "bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Sandbox Libera</span>
          </button>

          <button
            onClick={onClose}
            className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white shadow-md transition-all ${
              isDarkTheme ? "bg-red-600 hover:bg-red-500" : "bg-cyan-600 hover:bg-cyan-500"
            }`}
          >
            <span>Rivedi Esercizi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
