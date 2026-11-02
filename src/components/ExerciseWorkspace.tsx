import React, { useState, useEffect } from "react";
import { SqlExercise, ValidationResult, ExerciseAttempt } from "../types";
import { validateStudentQuery } from "../services/sqlEngine";
import { SqlEditor } from "./SqlEditor";
import { ResultsViewer } from "./ResultsViewer";
import { HintsModal } from "./HintsModal";
import { GeminiTutorModal } from "./GeminiTutorModal";
import { STAR_WARS_SCHEMA } from "../data/starWarsDatabase";
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Database,
  HelpCircle,
  Eye,
  Key,
  Link2,
} from "lucide-react";

interface ExerciseWorkspaceProps {
  exercise: SqlExercise;
  exerciseIndex: number;
  totalExercises: number;
  isDarkTheme: boolean;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onRecordAttempt: (attempt: ExerciseAttempt) => void;
  currentAttempt?: ExerciseAttempt;
  onOpenFullSchema: () => void;
}

export const ExerciseWorkspace: React.FC<ExerciseWorkspaceProps> = ({
  exercise,
  exerciseIndex,
  totalExercises,
  isDarkTheme,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  onRecordAttempt,
  currentAttempt,
  onOpenFullSchema,
}) => {
  const [userQuery, setUserQuery] = useState(currentAttempt?.userQuery || "");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(
    currentAttempt && !currentAttempt.isCorrect ? currentAttempt.attemptsCount : 0
  );
  const [showHints, setShowHints] = useState(false);
  const [showGeminiTutor, setShowGeminiTutor] = useState(false);
  const [usedHintsCount, setUsedHintsCount] = useState(0);
  const [usedGemini, setUsedGemini] = useState(false);
  const [selectedTableToInspect, setSelectedTableToInspect] = useState<string>(
    exercise.relevantTables[0] || "personaggi"
  );

  // Sync state when exercise changes
  useEffect(() => {
    setUserQuery(currentAttempt?.userQuery || "");
    setValidationResult(null);
    setFailedAttempts(
      currentAttempt && !currentAttempt.isCorrect ? currentAttempt.attemptsCount : 0
    );
    setSelectedTableToInspect(exercise.relevantTables[0] || "personaggi");
  }, [exercise.id]);

  const handleExecute = () => {
    setIsExecuting(true);

    setTimeout(() => {
      const result = validateStudentQuery(
        userQuery,
        exercise.expectedQuery,
        exercise.checkOrder ?? false
      );
      setValidationResult(result);
      setIsExecuting(false);

      const isCorrect = result.isCorrect;
      const newFailedCount = isCorrect ? failedAttempts : failedAttempts + 1;
      if (!isCorrect) {
        setFailedAttempts(newFailedCount);
      }

      onRecordAttempt({
        exerciseId: exercise.id,
        userQuery,
        isCorrect,
        attemptsCount: newFailedCount,
        usedHints: usedHintsCount,
        usedGemini,
        timeSpentSeconds: 0,
      });
    }, 40);
  };

  // Rule: Hint button is enabled ONLY if the query was executed and was incorrect!
  const isQueryAttempted = validationResult !== null;
  const isQueryIncorrect = validationResult !== null && !validationResult.isCorrect;
  const isHintButtonEnabled = isQueryIncorrect;

  // Rule: "Spiegami la soluzione" is enabled after 3 incorrect attempts
  const isGeminiEnabled = failedAttempts >= 3;

  const currentInspectedTableObj =
    STAR_WARS_SCHEMA.find((t) => t.name === selectedTableToInspect) ||
    STAR_WARS_SCHEMA[0];

  const diffBadgeColor =
    exercise.difficulty === "facile"
      ? isDarkTheme
        ? "bg-emerald-950/60 text-emerald-300 border-emerald-700/60"
        : "bg-emerald-50 text-emerald-800 border-emerald-300"
      : exercise.difficulty === "medio"
      ? isDarkTheme
        ? "bg-amber-950/60 text-amber-300 border-amber-700/60"
        : "bg-amber-50 text-amber-800 border-amber-300"
      : isDarkTheme
      ? "bg-red-950/60 text-red-300 border-red-700/60"
      : "bg-red-50 text-red-800 border-red-300";

  return (
    <div className="space-y-4">
      {/* Top Mission Briefing Card */}
      <div
        className={`p-5 rounded-2xl border transition-colors shadow-sm ${
          isDarkTheme
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
              Quesito {exerciseIndex + 1} di {totalExercises}
            </span>
            <span className="text-slate-400">·</span>
            {/* Clearly show difficulty level, WITHOUT revealing which SQL constructs to use */}
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${diffBadgeColor}`}
            >
              Difficoltà: {exercise.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`p-1.5 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                isDarkTheme ? "border-slate-800 hover:bg-slate-800 text-slate-300" : "border-slate-300 hover:bg-slate-100 text-slate-700"
              }`}
              title="Esercizio precedente"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`p-1.5 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                isDarkTheme ? "border-slate-800 hover:bg-slate-800 text-slate-300" : "border-slate-300 hover:bg-slate-100 text-slate-700"
              }`}
              title="Esercizio successivo"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title and assignment goal text */}
        <h1 className="text-lg sm:text-xl font-bold tracking-tight mb-2 text-slate-900 dark:text-slate-100">
          {exercise.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {exercise.description}
        </p>

        {/* Tables hint without giving away syntax keywords */}
        <div className="mt-3 pt-3 border-t border-inherit flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">Tabelle coinvolte:</span>
            <div className="flex items-center gap-1.5 font-mono">
              {exercise.relevantTables.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTableToInspect(t)}
                  className={`px-2 py-0.5 rounded border text-[11px] font-semibold transition-colors ${
                    selectedTableToInspect === t
                      ? isDarkTheme
                        ? "bg-cyan-950/80 border-cyan-700 text-cyan-300"
                        : "bg-cyan-50 border-cyan-300 text-cyan-900"
                      : isDarkTheme
                      ? "bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300"
                      : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenFullSchema}
            className="text-xs text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Apri Schema Completo (7 tabelle)</span>
          </button>
        </div>
      </div>

      {/* Main 2-column layout: Left Schema Quick Reference, Right SQL Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Quick Schema Inspector for Relevant Tables */}
        <div
          className={`lg:col-span-4 rounded-xl border p-4 flex flex-col transition-colors ${
            isDarkTheme
              ? "bg-slate-900 border-slate-800 text-slate-100"
              : "bg-white border-slate-200 text-slate-900 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-inherit mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Schema: <code className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">{currentInspectedTableObj.name}</code>
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {currentInspectedTableObj.columns.length} col.
            </span>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-3 font-sans">
            {currentInspectedTableObj.description}
          </p>

          <div className="overflow-y-auto max-h-[360px] space-y-1.5 font-mono text-xs pr-1">
            {currentInspectedTableObj.columns.map((c) => (
              <div
                key={c.name}
                className={`p-2 rounded-lg border flex flex-col gap-0.5 ${
                  isDarkTheme ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{c.type}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-sans text-slate-600 dark:text-slate-300">
                  <span className="truncate max-w-[180px]">{c.description}</span>
                  {c.isPrimaryKey && (
                    <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-0.5">
                      <Key className="w-2.5 h-2.5" /> PK
                    </span>
                  )}
                  {c.isForeignKey && c.references && (
                    <span className="text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-0.5">
                      <Link2 className="w-2.5 h-2.5" /> FK → {c.references.table}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Code Editor + Dynamic Action Bar + Realtime Results */}
        <div className="lg:col-span-8 space-y-4">
          {/* SQL Editor */}
          <SqlEditor
            value={userQuery}
            onChange={setUserQuery}
            onExecute={handleExecute}
            isExecuting={isExecuting}
            isDarkTheme={isDarkTheme}
          />

          {/* Dynamic Pedagogical Action Bar */}
          <div
            className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 transition-colors ${
              isDarkTheme
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            {/* Left side: Hints button (active only if query attempted and incorrect) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowHints(true);
                  setUsedHintsCount((c) => c + 1);
                }}
                disabled={!isHintButtonEnabled}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  isHintButtonEnabled
                    ? isDarkTheme
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                      : "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    : "opacity-40 border-inherit cursor-not-allowed text-slate-400"
                }`}
                title={
                  isHintButtonEnabled
                    ? "Apri i suggerimenti per questa query"
                    : "I suggerimenti si attivano solo se la query eseguita non è corretta."
                }
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Suggerimento</span>
                {!isQueryAttempted && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                    (su errore)
                  </span>
                )}
              </button>
            </div>

            {/* Right side: Gemini Tutor Button (enabled after 3 failed attempts) */}
            <div className="flex items-center gap-2">
              {failedAttempts > 0 && failedAttempts < 3 && !validationResult?.isCorrect && (
                <span className="text-[11px] text-slate-700 dark:text-slate-300 font-mono font-medium hidden sm:inline">
                  Tentativi errati: {failedAttempts}/3 per sbloccare Gemini
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowGeminiTutor(true);
                  setUsedGemini(true);
                }}
                disabled={!isGeminiEnabled}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                  isGeminiEnabled
                    ? isDarkTheme
                      ? "bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse"
                      : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)] animate-pulse"
                    : "opacity-45 border-inherit cursor-not-allowed text-slate-500 dark:text-slate-400 bg-slate-500/5"
                }`}
                title={
                  isGeminiEnabled
                    ? "Apri chat con Gemini per farti spiegare la query passo passo"
                    : "Pulsante abilitato dopo 3 tentativi errati."
                }
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Spiegami la soluzione</span>
                {isGeminiEnabled && (
                  <span className="text-[10px] font-mono px-1 rounded bg-black/30">
                    AI
                  </span>
                )}
              </button>

              {/* Next Question CTA button if query succeeded */}
              {validationResult?.isCorrect && hasNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg text-white shadow-md transition-all ${
                    isDarkTheme
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                      : "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  }`}
                >
                  <span>Prossimo Quesito</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Real-time Results Viewer */}
          <ResultsViewer
            validationResult={validationResult}
            isDarkTheme={isDarkTheme}
            showExpectedTab={true}
          />
        </div>
      </div>

      {/* Hints Modal */}
      {showHints && (
        <HintsModal
          exercise={exercise}
          isDarkTheme={isDarkTheme}
          onClose={() => setShowHints(false)}
        />
      )}

      {/* Gemini AI Tutor Modal */}
      {showGeminiTutor && (
        <GeminiTutorModal
          exercise={exercise}
          userQuery={userQuery}
          errorMessage={validationResult?.userResult.error}
          userResultsSummary={
            validationResult
              ? `${validationResult.userResult.rowCount} righe restituite, colonne: ${validationResult.userResult.columns.join(", ")}`
              : undefined
          }
          expectedResultsSummary={
            validationResult
              ? `${validationResult.expectedResult.rowCount} righe attese, colonne: ${validationResult.expectedResult.columns.join(", ")}`
              : undefined
          }
          isDarkTheme={isDarkTheme}
          onClose={() => setShowGeminiTutor(false)}
        />
      )}
    </div>
  );
};
