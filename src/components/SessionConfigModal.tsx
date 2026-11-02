import React, { useState } from "react";
import { SessionSettings, SessionDifficultyMode } from "../types";
import { AVAILABLE_KEYWORDS, EXERCISES_BANK } from "../data/exercises";
import { Sparkles, X, Check, Sliders, Shield, Zap, Award } from "lucide-react";

interface SessionConfigModalProps {
  currentSettings: SessionSettings;
  onApplyAndStart: (settings: SessionSettings) => void;
  onClose: () => void;
  isDarkTheme: boolean;
}

export const SessionConfigModal: React.FC<SessionConfigModalProps> = ({
  currentSettings,
  onApplyAndStart,
  onClose,
  isDarkTheme,
}) => {
  const [length, setLength] = useState<5 | 10 | 20>(currentSettings.length);
  const [difficultyMode, setDifficultyMode] = useState<SessionDifficultyMode>(
    currentSettings.difficultyMode
  );
  const [enabledKeywords, setEnabledKeywords] = useState<string[]>(
    currentSettings.enabledKeywords
  );

  const toggleKeyword = (kwId: string) => {
    setEnabledKeywords((prev) => {
      if (prev.includes(kwId)) {
        // Prevent removing all
        if (prev.length <= 2) return prev;
        return prev.filter((k) => k !== kwId);
      } else {
        return [...prev, kwId];
      }
    });
  };

  const handleResetKeywords = () => {
    setEnabledKeywords(
      AVAILABLE_KEYWORDS.filter((k) => k.isDefault).map((k) => k.id)
    );
  };

  const handleSelectAllKeywords = () => {
    setEnabledKeywords(AVAILABLE_KEYWORDS.map((k) => k.id));
  };

  // Calculate projected counts
  let pF = 0.3, pM = 0.3, pD = 0.4;
  if (difficultyMode === "facile") { pF = 0.6; pM = 0.3; pD = 0.1; }
  else if (difficultyMode === "medio") { pF = 0.2; pM = 0.6; pD = 0.2; }
  else if (difficultyMode === "difficile") { pF = 0.1; pM = 0.3; pD = 0.6; }

  const countF = Math.round(length * pF);
  const countM = Math.round(length * pM);
  const countD = length - countF - countM;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors ${
          isDarkTheme
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-inherit flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDarkTheme
                  ? "bg-red-500/10 text-red-400 border border-red-500/30"
                  : "bg-cyan-500/10 text-cyan-600 border border-cyan-500/30"
              }`}
            >
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Configura Sessione di Addestramento</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalizza lunghezza, ripartizione difficoltà e costrutti SQL ammessi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Section 1: Session Length */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              1. Lunghezza della Sessione
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { count: 5 as const, label: "Corto", desc: "5 Esercizi rapidi" },
                { count: 10 as const, label: "Standard", desc: "10 Esercizi (consigliato)" },
                { count: 20 as const, label: "Lungo", desc: "20 Esercizi completi" },
              ].map((opt) => (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => setLength(opt.count)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    length === opt.count
                      ? isDarkTheme
                        ? "bg-red-500/15 border-red-500/50 text-white shadow-sm"
                        : "bg-cyan-50 border-cyan-400 text-cyan-950 shadow-sm font-semibold"
                      : isDarkTheme
                      ? "bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300"
                      : "bg-slate-50 border-slate-300 hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{opt.label}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Difficulty Profile */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Profilo di Difficoltà & Proporzioni
              </label>
              <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300">
                Ripartizione: {countF} Facili · {countM} Medi · {countD} Difficili
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: "bilanciato" as SessionDifficultyMode,
                  title: "Bilanciato",
                  desc: "30% Facile · 30% Medio · 40% Difficile",
                  icon: Shield,
                  badge: "Default accademico",
                },
                {
                  id: "facile" as SessionDifficultyMode,
                  title: "Iniziato / Facile",
                  desc: "60% Facile · 30% Medio · 10% Difficile",
                  icon: Zap,
                  badge: "Primi passi SQL",
                },
                {
                  id: "medio" as SessionDifficultyMode,
                  title: "Cavaliere / Intermedio",
                  desc: "20% Facile · 60% Medio · 20% Difficile",
                  icon: Award,
                  badge: "Focus aggregazioni e join",
                },
                {
                  id: "difficile" as SessionDifficultyMode,
                  title: "Maestro / Avanzato",
                  desc: "10% Facile · 30% Medio · 60% Difficile",
                  icon: Sparkles,
                  badge: "Multi-join e sottoquery",
                },
              ].map((mode) => {
                const isSelected = difficultyMode === mode.id;
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setDifficultyMode(mode.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? isDarkTheme
                          ? "bg-red-500/15 border-red-500/50 text-white shadow-sm"
                          : "bg-cyan-50 border-cyan-400 text-cyan-950 shadow-sm"
                        : isDarkTheme
                        ? "bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-300 hover:bg-slate-100 text-slate-800"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        isSelected
                          ? isDarkTheme
                            ? "text-red-400"
                            : "text-cyan-700 font-bold"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{mode.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{mode.desc}</p>
                      <span className="text-[10px] inline-block font-mono mt-1 font-semibold text-slate-500 dark:text-slate-400">
                        {mode.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Enabled SQL Keywords */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                3. Parole Chiave & Costrutti SQL Inclusi
              </label>
              <div className="flex items-center gap-2 font-medium">
                <button
                  type="button"
                  onClick={handleResetKeywords}
                  className="text-[11px] underline text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Solo Base (Default)
                </button>
                <span className="text-slate-400">·</span>
                <button
                  type="button"
                  onClick={handleSelectAllKeywords}
                  className="text-[11px] underline text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Tutte ({AVAILABLE_KEYWORDS.length})
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              Di default sono abilitate le strutture base: <code className="font-mono font-bold text-cyan-700 dark:text-cyan-300">SELECT</code>, <code className="font-mono font-bold text-cyan-700 dark:text-cyan-300">FROM</code>, <code className="font-mono font-bold text-cyan-700 dark:text-cyan-300">WHERE</code>, <code className="font-mono font-bold text-cyan-700 dark:text-cyan-300">GROUP BY</code>, <code className="font-mono font-bold text-cyan-700 dark:text-cyan-300">ORDER BY</code>. Durante l'esercizio il livello di difficoltà sarà visibile, ma non ci sarà indicazione su quali costrutti adoperare.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_KEYWORDS.map((kw) => {
                const isEnabled = enabledKeywords.includes(kw.id);
                return (
                  <button
                    key={kw.id}
                    type="button"
                    onClick={() => toggleKeyword(kw.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                      isEnabled
                        ? isDarkTheme
                          ? "bg-slate-800 border-red-500/50 text-red-200 font-bold shadow-sm"
                          : "bg-cyan-50 border-cyan-400 text-cyan-950 font-bold shadow-sm"
                        : isDarkTheme
                        ? "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200"
                        : "bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                        isEnabled
                          ? isDarkTheme
                            ? "bg-red-500 text-white"
                            : "bg-cyan-700 text-white"
                          : "border border-slate-400"
                      }`}
                    >
                      {isEnabled && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>{kw.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-inherit flex items-center justify-between gap-3 bg-slate-500/5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Pool totale: {EXERCISES_BANK.length} esercizi disponibili
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                isDarkTheme
                  ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                  : "border-slate-300 hover:bg-slate-100 text-slate-700"
              }`}
            >
              Annulla
            </button>

            <button
              type="button"
              onClick={() => {
                onApplyAndStart({
                  length,
                  difficultyMode,
                  enabledKeywords,
                });
              }}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg text-white shadow-md active:scale-95 transition-all ${
                isDarkTheme
                  ? "bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Avvia Sessione ({length} Esercizi)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
