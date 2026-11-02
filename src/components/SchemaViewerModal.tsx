import React, { useState } from "react";
import { STAR_WARS_SCHEMA } from "../data/starWarsDatabase";
import { executeQuery } from "../services/sqlEngine";
import { Database, Key, Link2, Eye, X, Search, ChevronRight } from "lucide-react";

interface SchemaViewerProps {
  isDarkTheme: boolean;
  onClose?: () => void;
  selectedTableName?: string;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({
  isDarkTheme,
  onClose,
  selectedTableName,
}) => {
  const [activeTable, setActiveTable] = useState<string>(
    selectedTableName || STAR_WARS_SCHEMA[0].name
  );
  const [searchFilter, setSearchFilter] = useState("");
  const [previewData, setPreviewData] = useState<{
    tableName: string;
    columns: string[];
    rows: any[];
  } | null>(null);

  const currentTableObj =
    STAR_WARS_SCHEMA.find((t) => t.name === activeTable) || STAR_WARS_SCHEMA[0];

  const filteredTables = STAR_WARS_SCHEMA.filter(
    (t) =>
      t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.columns.some((c) => c.name.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const handlePreviewTable = (tableName: string) => {
    const res = executeQuery(`SELECT * FROM ${tableName} LIMIT 6;`);
    if (res.success) {
      setPreviewData({
        tableName,
        columns: res.columns,
        rows: res.rows,
      });
    }
  };

  return (
    <div
      className={`rounded-xl border transition-colors flex flex-col h-full overflow-hidden ${
        isDarkTheme
          ? "bg-slate-900/90 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-inherit flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Database
            className={`w-5 h-5 ${
              isDarkTheme ? "text-red-400" : "text-cyan-600"
            }`}
          />
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Schema Logico Galattico
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              7 tabelle relazionali dell'Universo Star Wars
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2.5 border-b border-inherit bg-slate-500/5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Cerca tabella o attributo..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border outline-none transition-colors ${
              isDarkTheme
                ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-red-500/60"
                : "bg-white border-slate-300 text-slate-900 focus:border-cyan-600"
            }`}
          />
        </div>
      </div>

      {/* Main split: Sidebar tables list + Table details */}
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-inherit">
        {/* Left Column: Table Tabs */}
        <div className="md:col-span-4 p-3 overflow-y-auto space-y-1.5 max-h-56 md:max-h-full">
          {filteredTables.map((table) => {
            const isSelected = table.name === currentTableObj.name;
            return (
              <button
                key={table.name}
                onClick={() => setActiveTable(table.name)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                  isSelected
                    ? isDarkTheme
                      ? "bg-red-500/15 border border-red-500/40 text-red-200 font-semibold"
                      : "bg-cyan-50 border border-cyan-200 text-cyan-900 font-semibold"
                    : isDarkTheme
                    ? "hover:bg-slate-800/60 text-slate-300"
                    : "hover:bg-slate-100 text-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span>{table.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans truncate max-w-[170px]">
                    {table.label} · {table.columns.length} colonne
                  </div>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isSelected ? "translate-x-0.5 opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Table Details & Columns */}
        <div className="md:col-span-8 p-4 overflow-y-auto flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-inherit">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-cyan-700 dark:text-cyan-400">
                  {currentTableObj.name}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">({currentTableObj.label})</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-sans">
                {currentTableObj.description}
              </p>
            </div>

            <button
              onClick={() => handlePreviewTable(currentTableObj.name)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border transition-colors ${
                isDarkTheme
                  ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Anteprima Record</span>
            </button>
          </div>

          {/* Columns Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-inherit text-slate-700 dark:text-slate-300 font-bold">
                  <th className="py-2.5 px-2.5">Nome Colonna</th>
                  <th className="py-2.5 px-2.5">Tipo Dati</th>
                  <th className="py-2.5 px-2.5">Chiavi</th>
                  <th className="py-2.5 px-2.5">Descrizione</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit font-mono">
                {currentTableObj.columns.map((col) => (
                  <tr
                    key={col.name}
                    className={
                      isDarkTheme
                        ? "hover:bg-slate-800/40 transition-colors"
                        : "hover:bg-slate-50 transition-colors"
                    }
                  >
                    <td className="py-2 px-2.5 font-bold text-slate-900 dark:text-slate-100">
                      {col.name}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600 dark:text-slate-400 text-[11px] font-medium">
                      {col.type}
                    </td>
                    <td className="py-2 px-2.5 font-sans">
                      {col.isPrimaryKey && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-700/60">
                          <Key className="w-2.5 h-2.5" /> PK
                        </span>
                      )}
                      {col.isForeignKey && col.references && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-300 dark:border-indigo-700/60">
                          <Link2 className="w-2.5 h-2.5" /> FK → {col.references.table}.{col.references.column}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700 dark:text-slate-300 text-[11px]">
                      {col.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Preview drawer if active */}
          {previewData && previewData.tableName === currentTableObj.name && (
            <div className="mt-4 pt-3 border-t border-inherit">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Anteprima Primi 6 Record di "{previewData.tableName}"
                </span>
                <button
                  onClick={() => setPreviewData(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Chiudi anteprima
                </button>
              </div>

              <div className="overflow-x-auto max-h-48 border border-inherit rounded-lg">
                <table className="w-full text-xs font-mono tabular-nums border-collapse">
                  <thead
                    className={
                      isDarkTheme ? "bg-slate-950 text-slate-300" : "bg-slate-100 text-slate-700"
                    }
                  >
                    <tr>
                      {previewData.columns.map((c) => (
                        <th key={c} className="py-1.5 px-2 text-left font-semibold border-b border-inherit">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    {previewData.rows.map((row, idx) => (
                      <tr key={idx} className={isDarkTheme ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}>
                        {previewData.columns.map((col) => (
                          <td key={col} className="py-1 px-2 whitespace-nowrap">
                            {row[col] !== null && row[col] !== undefined ? String(row[col]) : (
                              <span className="italic text-slate-400">NULL</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
