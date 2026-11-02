import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ExerciseWorkspace } from "./components/ExerciseWorkspace";
import { SandboxView } from "./components/SandboxView";
import { SchemaViewer } from "./components/SchemaViewerModal";
import { BankCatalogView } from "./components/BankCatalogView";
import { SessionConfigModal } from "./components/SessionConfigModal";
import { SessionSummaryModal } from "./components/SessionSummaryModal";
import { generateExerciseSession } from "./services/sessionGenerator";
import { initializeDatabase } from "./services/sqlEngine";
import { SessionSettings, ExerciseAttempt, SqlExercise } from "./types";
import { AVAILABLE_KEYWORDS } from "./data/exercises";

export default function App() {
  // Theme state: dark side (default for Star Wars Sith aesthetic) vs light side (Jedi Holocron)
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Tab navigation
  const [currentTab, setCurrentTab] = useState<"session" | "sandbox" | "schema" | "bank">("session");

  // Session configuration state
  const [sessionSettings, setSessionSettings] = useState<SessionSettings>({
    length: 10,
    difficultyMode: "bilanciato",
    enabledKeywords: AVAILABLE_KEYWORDS.filter((k) => k.isDefault).map((k) => k.id),
  });

  // Current session exercises
  const [exercises, setExercises] = useState<SqlExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, ExerciseAttempt>>({});

  // Modals state
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // Initialize DB and first session
  useEffect(() => {
    initializeDatabase();
    startNewSession(sessionSettings);
  }, []);

  // Sync dark theme class to html element for Tailwind dark variant
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const startNewSession = (settings: SessionSettings) => {
    setSessionSettings(settings);
    const generated = generateExerciseSession(settings);
    setExercises(generated);
    setCurrentIndex(0);
    setAttempts({});
    setCurrentTab("session");
    setIsConfigModalOpen(false);
    setIsSummaryModalOpen(false);
  };

  const handleRecordAttempt = (attempt: ExerciseAttempt) => {
    setAttempts((prev) => {
      const updated = { ...prev, [attempt.exerciseId]: attempt };

      // Check if all exercises are now correct!
      const allCorrect = exercises.length > 0 && exercises.every((e) => updated[e.id]?.isCorrect);
      if (allCorrect) {
        setTimeout(() => setIsSummaryModalOpen(true), 600);
      }

      return updated;
    });
  };

  const currentExercise = exercises[currentIndex];
  const solvedCount = Object.values(attempts).filter((a) => a.isCorrect).length;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDarkTheme
          ? "dark bg-slate-950 text-slate-100 selection:bg-red-500/30 selection:text-red-200"
          : "bg-slate-50 text-slate-900 selection:bg-cyan-500/30 selection:text-cyan-900"
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        onOpenNewSession={() => setIsConfigModalOpen(true)}
        sessionProgress={
          exercises.length > 0
            ? {
                current: solvedCount,
                total: exercises.length,
              }
            : undefined
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === "session" && currentExercise && (
          <ExerciseWorkspace
            key={currentExercise.id}
            exercise={currentExercise}
            exerciseIndex={currentIndex}
            totalExercises={exercises.length}
            isDarkTheme={isDarkTheme}
            onNext={() => {
              if (currentIndex < exercises.length - 1) {
                setCurrentIndex(currentIndex + 1);
              } else if (solvedCount === exercises.length) {
                setIsSummaryModalOpen(true);
              }
            }}
            onPrev={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
              }
            }}
            hasNext={currentIndex < exercises.length - 1}
            hasPrev={currentIndex > 0}
            onRecordAttempt={handleRecordAttempt}
            currentAttempt={attempts[currentExercise.id]}
            onOpenFullSchema={() => setCurrentTab("schema")}
          />
        )}

        {currentTab === "sandbox" && (
          <SandboxView
            isDarkTheme={isDarkTheme}
            onOpenSchema={() => setCurrentTab("schema")}
          />
        )}

        {currentTab === "schema" && (
          <div className="h-[750px]">
            <SchemaViewer
              isDarkTheme={isDarkTheme}
              onClose={() => setCurrentTab("session")}
            />
          </div>
        )}

        {currentTab === "bank" && (
          <BankCatalogView
            isDarkTheme={isDarkTheme}
            onSelectExercise={(ex) => {
              // Create custom 1-item or target session
              setExercises([ex]);
              setCurrentIndex(0);
              setCurrentTab("session");
            }}
            solvedIds={new Set(Object.keys(attempts).filter((id) => attempts[id].isCorrect))}
          />
        )}
      </main>

      {/* Session Configuration Modal */}
      {isConfigModalOpen && (
        <SessionConfigModal
          currentSettings={sessionSettings}
          onApplyAndStart={startNewSession}
          onClose={() => setIsConfigModalOpen(false)}
          isDarkTheme={isDarkTheme}
        />
      )}

      {/* Session Summary Modal */}
      {isSummaryModalOpen && (
        <SessionSummaryModal
          attempts={attempts}
          exercises={exercises}
          onRestart={() => setIsConfigModalOpen(true)}
          onOpenSandbox={() => {
            setIsSummaryModalOpen(false);
            setCurrentTab("sandbox");
          }}
          onClose={() => setIsSummaryModalOpen(false)}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  );
}
