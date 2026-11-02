import React, { useState } from "react";
import { executeQuery } from "../services/sqlEngine";
import { QueryExecutionResult } from "../types";
import { SqlEditor } from "./SqlEditor";
import { ResultsViewer } from "./ResultsViewer";
import { Terminal, Database, Sparkles, Download, History, Play } from "lucide-react";

interface SandboxViewProps {
  isDarkTheme: boolean;
  onOpenSchema: () => void;
}

const TEMPLATE_QUERIES = [
  {
    label: "Personaggi e Fazioni",
    query: "SELECT p.nome AS personaggio, p.ruolo, f.nome AS fazione\nFROM personaggi p\nJOIN fazioni f ON p.fazione_id = f.id\nLIMIT 10;",
  },
  {
    label: "Spade Laser e Guerrieri",
    query: "SELECT p.nome AS proprietario, s.colore_lama, s.tipo_cristallo\nFROM spade_laser s\nJOIN personaggi p ON s.personaggio_id = p.id;",
  },
  {
    label: "Top 5 Astronavi per Lunghezza",
    query: "SELECT nome, modello, lunghezza_metri, costruttore\nFROM astronavi\nORDER BY lunghezza_metri DESC\nLIMIT 5;",
  },
  {
    label: "Pianeti e Popolazione",
    query: "SELECT nome, clima, settore_galattico, popolazione\nFROM pianeti\nWHERE popolazione > 0\nORDER BY popolazione DESC\nLIMIT 8;",
  },
  {
    label: "Battaglie Galattiche e Pianeti",
    query: "SELECT b.nome AS battaglia, b.anno_bby, p.nome AS pianeta, b.perdite_stimate\nFROM battaglie b\nJOIN pianeti p ON b.pianeta_id = p.id\nORDER BY b.anno_bby DESC;",
  },
];

export const SandboxView: React.FC<SandboxViewProps> = ({
  isDarkTheme,
  onOpenSchema,
}) => {
  const [query, setQuery] = useState(
    "SELECT p.nome, p.ruolo, f.nome AS fazione\nFROM personaggi p\nJOIN fazioni f ON p.fazione_id = f.id\nWHERE p.sensibile_alla_forza = 1;"
  );
  const [result, setResult] = useState<QueryExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "SELECT * FROM personaggi LIMIT 5;",
    "SELECT * FROM pianeti;",
  ]);

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = executeQuery(query);
      setResult(res);
      setIsExecuting(false);

      if (res.success && !history.includes(query.trim())) {
        setHistory((prev) => [query.trim(), ...prev.slice(0, 8)]);
      }
    }, 50);
  };

  const exportCsv = () => {
    if (!result || result.rows.length === 0) return;
    const headers = result.columns.join(",");
    const rows = result.rows.map((row) =>
      result.columns.map((col) => `"${String(row[col] ?? "").replace(/"/g, '""')}"`).join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "starwars_query_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Sandbox Header Strip */}
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
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Sandbox Galattica Libera</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Scrivi qualsiasi query SELECT sul database Star Wars. Latenza zero e feedback immediato.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSchema}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isDarkTheme
                ? "border-slate-700 hover:bg-slate-800 text-slate-200"
                : "border-slate-300 hover:bg-slate-100 text-slate-800 shadow-sm"
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Consulta Schema Relazionale</span>
          </button>

          {result && result.rows.length > 0 && (
            <button
              onClick={exportCsv}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                isDarkTheme
                  ? "border-slate-700 hover:bg-slate-800 text-slate-200"
                  : "border-slate-300 hover:bg-slate-100 text-slate-800 shadow-sm"
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Esporta CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Query Templates Pill Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-700 dark:text-slate-300 uppercase font-bold text-[10px] tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Esempi rapidi:
        </span>
        {TEMPLATE_QUERIES.map((tpl, i) => (
          <button
            key={i}
            onClick={() => setQuery(tpl.query)}
            className={`px-3 py-1 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors ${
              isDarkTheme
                ? "bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200"
                : "bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-sm"
            }`}
          >
            {tpl.label}
          </button>
        ))}
      </div>

      {/* Editor & Results layout */}
      <div className="space-y-4">
        <SqlEditor
          value={query}
          onChange={setQuery}
          onExecute={handleRunQuery}
          isExecuting={isExecuting}
          isDarkTheme={isDarkTheme}
        />

        <ResultsViewer
          validationResult={null}
          rawExecutionResult={result}
          isDarkTheme={isDarkTheme}
          showExpectedTab={false}
        />
      </div>

      {/* Query History */}
      {history.length > 0 && (
        <div
          className={`p-4 rounded-xl border transition-colors ${
            isDarkTheme ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Cronologia Query Recenti</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => setQuery(h)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded border truncate max-w-xs transition-colors ${
                  isDarkTheme
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                    : "bg-white border-slate-300 text-slate-800 hover:border-slate-500 shadow-sm"
                }`}
              >
                {h.replace(/\n/g, " ")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
