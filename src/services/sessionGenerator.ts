import { EXERCISES_BANK } from "../data/exercises";
import { SessionSettings, SqlExercise, DifficultyLevel } from "../types";

export function generateExerciseSession(settings: SessionSettings): SqlExercise[] {
  const { length, difficultyMode, enabledKeywords } = settings;

  // Filter pool by enabled keywords
  // An exercise is eligible if all its required keywords (or at least its major ones) are in enabledKeywords
  const enabledSet = new Set(enabledKeywords.map((k) => k.toUpperCase()));

  const filteredPool = EXERCISES_BANK.filter((exercise) => {
    // If the exercise requires a keyword that is NOT enabled, exclude it
    return exercise.keywords.every((kw) => enabledSet.has(kw.toUpperCase()));
  });

  // Fallback if user disabled too many keywords
  const finalPool = filteredPool.length >= length ? filteredPool : EXERCISES_BANK;

  // Determine proportion of difficulties
  let pFacile = 0.3;
  let pMedio = 0.3;
  let pDifficile = 0.4;

  if (difficultyMode === "facile") {
    pFacile = 0.6;
    pMedio = 0.3;
    pDifficile = 0.1;
  } else if (difficultyMode === "medio") {
    pFacile = 0.2;
    pMedio = 0.6;
    pDifficile = 0.2;
  } else if (difficultyMode === "difficile") {
    pFacile = 0.1;
    pMedio = 0.3;
    pDifficile = 0.6;
  }

  // Calculate target counts based on total length
  let countFacile = Math.round(length * pFacile);
  let countMedio = Math.round(length * pMedio);
  let countDifficile = length - countFacile - countMedio;

  if (countDifficile < 0) {
    countDifficile = 0;
    countMedio = length - countFacile;
  }

  // Separate pools by difficulty
  const facileList = shuffle(finalPool.filter((e) => e.difficulty === "facile"));
  const medioList = shuffle(finalPool.filter((e) => e.difficulty === "medio"));
  const difficileList = shuffle(finalPool.filter((e) => e.difficulty === "difficile"));

  const selected: SqlExercise[] = [];

  // Pick facile
  selected.push(...facileList.slice(0, countFacile));
  // Pick medio
  selected.push(...medioList.slice(0, countMedio));
  // Pick difficile
  selected.push(...difficileList.slice(0, countDifficile));

  // If we couldn't fulfill the exact target due to keyword restrictions, fill from remaining
  if (selected.length < length) {
    const selectedIds = new Set(selected.map((e) => e.id));
    const remaining = shuffle(finalPool.filter((e) => !selectedIds.has(e.id)));
    selected.push(...remaining.slice(0, length - selected.length));
  }

  // Sort exercises by progressive difficulty: facile first, then medio, then difficile
  const difficultyOrder: Record<DifficultyLevel, number> = {
    facile: 1,
    medio: 2,
    difficile: 3,
  };

  selected.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

  return selected.slice(0, length);
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
