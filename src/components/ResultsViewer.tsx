import React, { useState } from "react";
import { ValidationResult, QueryExecutionResult } from "../types";
import { CheckCircle2, AlertTriangle, XCircle, Table2, Clock, Layers } from "lucide-react";

interface ResultsViewerProps {
  validationResult: ValidationResult | null;
  rawExecutionResult?: QueryExecutionResult | null;
  isDarkTheme: boolean;
  showExpectedTab?: boolean;
}

export const ResultsViewer: React.FC<ResultsViewerProps> = ({
  validationResult,
  rawExecutionResult,
  isDarkTheme,
  showExpectedTab = true,
}) => {
  const [activeTab, setActiveTab] = useState<"user" | "expected">("user");

  // Determine which dataset to display
  const userResult = validationResult ? validationResult.userResult : rawExecutionResult;
  const expectedResult = validationResult ? validationResult.expectedResult : null;

  const currentResultToDisplay = activeTab === "expected" && expectedResult ? expectedResult : userResult;

  if (!userResult) {
    return (
      <div
        className={`rounded-xl border p-8 flex flex-col items-center justify-center text-center transition-colors min-h-[180px] ${
          isDarkTheme
            ? "bg-slate-900/60 border-slate-800 text-slate-300"
            : "bg-white border-slate-200 text-slate-700 shadow-sm"
        }`}
      >
        <Table2 className="w-8 h-8 mb-2 text-cyan-600 dark:text-cyan-400 opacity-60" />
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Nessuna esecuzione effettuata finora.</p>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
          Scrivi la tua query SQL nel terminale soprastante e premi "Esegui Query" (o Ctrl+Invio) per visualizzare l'output del database.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border flex flex-col overflow-hidden transition-colors shadow-sm ${
        isDarkTheme
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {/* Feedback Banner if ValidationResult is present */}
      {validationResult && (
        <div
          className={`px-4 py-3 border-b flex items-start gap-3 transition-colors ${
            validationResult.isCorrect
              ? isDarkTheme
                ? "bg-emerald-950/60 border-emerald-800/80 text-emerald-200"
                : "bg-emerald-50 border-emerald-200 text-emerald-900"
              : isDarkTheme
              ? "bg-red-950/60 border-red-800/80 text-red-200"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {validationResult.isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                {validationResult.isCorrect ? "Query Corretta!" : "Esito Non Corrispondente"}
              </span>
            </div>
            <p className="text-xs mt-0.5 font-sans whitespace-pre-wrap leading-relaxed">
              {validationResult.message}
            </p>

            {validationResult.differences?.firstDifference && (
              <div className="mt-1.5 text-[11px] font-mono opacity-90">
                Dettaglio: {validationResult.differences.firstDifference}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Raw Error banner if query threw an exception */}
      {userResult.error && !validationResult && (
        <div
          className={`px-4 py-3 border-b flex items-start gap-3 ${
            isDarkTheme
              ? "bg-red-950/60 border-red-800/80 text-red-200"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Errore di Esecuzione SQL
            </span>
            <p className="text-xs mt-0.5 font-mono whitespace-pre-wrap">
              {userResult.error}
            </p>
          </div>
        </div>
      )}

      {/* Table Header Controls */}
      <div className="px-4 py-2 border-b border-inherit flex flex-wrap items-center justify-between gap-3 bg-slate-500/5 text-xs">
        {/* Dataset Tabs if expected is available */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("user")}
            className={`px-3 py-1 font-semibold rounded-md transition-colors ${
              activeTab === "user"
                ? isDarkTheme
                  ? "bg-slate-800 text-white shadow-sm"
                  : "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            }`}
          >
            Tuo Risultato
          </button>

          {showExpectedTab && expectedResult && (
            <button
              type="button"
              onClick={() => setActiveTab("expected")}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                activeTab === "expected"
                  ? isDarkTheme
                    ? "bg-slate-800 text-white shadow-sm"
                    : "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              }`}
            >
              Risultato Atteso
            </button>
          )}
        </div>

        {/* Stats badges */}
        {currentResultToDisplay && (
          <div className="flex items-center gap-3 text-[11px] text-slate-700 dark:text-slate-300 font-mono font-medium">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{currentResultToDisplay.rowCount} righe</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{currentResultToDisplay.executionTimeMs} ms</span>
            </span>
          </div>
        )}
      </div>

      {/* Tabular Output */}
      <div className="flex-1 overflow-x-auto max-h-[300px]">
        {currentResultToDisplay && currentResultToDisplay.columns.length > 0 ? (
          <table className="w-full text-left text-xs border-collapse font-mono tabular-nums">
            <thead
              className={`sticky top-0 z-10 border-b border-inherit ${
                isDarkTheme ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900 shadow-sm"
              }`}
            >
              <tr>
                <th className="py-2.5 px-3 text-slate-600 dark:text-slate-400 w-10 text-center font-bold">#</th>
                {currentResultToDisplay.columns.map((col) => (
                  <th key={col} className="py-2.5 px-3 font-bold whitespace-nowrap text-slate-900 dark:text-slate-100">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {currentResultToDisplay.rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={currentResultToDisplay.columns.length + 1}
                    className="py-6 text-center text-slate-600 dark:text-slate-400 italic"
                  >
                    La query ha restituito 0 righe (nessun record trovato).
                  </td>
                </tr>
              ) : (
                currentResultToDisplay.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={
                      isDarkTheme
                        ? "hover:bg-slate-800/40 transition-colors text-slate-200"
                        : "hover:bg-slate-50 transition-colors text-slate-900"
                    }
                  >
                    <td className="py-1.5 px-3 text-slate-600 dark:text-slate-400 text-center text-[10px] font-semibold">
                      {rIdx + 1}
                    </td>
                    {currentResultToDisplay.columns.map((col) => {
                      const val = row[col];
                      return (
                        <td key={col} className="py-1.5 px-3 whitespace-nowrap">
                          {val === null || val === undefined ? (
                            <span className="italic text-slate-600 dark:text-slate-400 font-sans font-medium">NULL</span>
                          ) : typeof val === "boolean" ? (
                            <span>{val ? "1 (TRUE)" : "0 (FALSE)"}</span>
                          ) : (
                            String(val)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <div className="py-6 text-center text-xs text-slate-600 dark:text-slate-400 italic">
            Nessuna colonna o dato da visualizzare.
          </div>
        )}
      </div>
    </div>
  );
};
