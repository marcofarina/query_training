import alasql from "alasql";
import { STAR_WARS_SEED_SQL, STAR_WARS_SCHEMA } from "../data/starWarsDatabase";
import { QueryExecutionResult, ValidationResult } from "../types";

let isDbInitialized = false;

export function initializeDatabase(forceReset = false): void {
  if (isDbInitialized && !forceReset) return;

  try {
    // Strip all single-line SQL comments before parsing
    const cleanSql = STAR_WARS_SEED_SQL.replace(/--.*$/gm, "").trim();

    const statements = cleanSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      try {
        alasql(statement);
      } catch (err) {
        console.warn("Statement execution warning:", statement.slice(0, 40), err);
      }
    }

    isDbInitialized = true;
    console.log("Star Wars database initialized successfully with 7 relational tables and data.");
  } catch (error) {
    console.error("Failed to initialize Star Wars database:", error);
  }
}

export function executeQuery(query: string): QueryExecutionResult {
  initializeDatabase();

  const startTime = performance.now();
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: 0,
      error: "La query SQL è vuota. Digita una query SELECT per procedere.",
    };
  }

  // Prevent destructive statements in student sandbox/quiz
  const upper = trimmed.toUpperCase();
  if (
    upper.startsWith("DROP") ||
    upper.startsWith("DELETE") ||
    upper.startsWith("ALTER") ||
    upper.startsWith("TRUNCATE")
  ) {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: 0,
      error: "Comando non consentito: in questa accademia sono permesse solo query di interrogazione (SELECT).",
    };
  }

  try {
    const rawResult = alasql(trimmed);
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

    // AlaSQL might return an array of objects for SELECT
    if (Array.isArray(rawResult)) {
      if (rawResult.length === 0) {
        return {
          success: true,
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs,
        };
      }

      // Extract columns from first row (and combine in case of nulls)
      const columnSet = new Set<string>();
      rawResult.forEach((row) => {
        if (typeof row === "object" && row !== null) {
          Object.keys(row).forEach((k) => columnSet.add(k));
        }
      });

      const columns = Array.from(columnSet);

      return {
        success: true,
        columns,
        rows: rawResult,
        rowCount: rawResult.length,
        executionTimeMs,
      };
    }

    return {
      success: true,
      columns: ["Risultato"],
      rows: [{ Risultato: String(rawResult) }],
      rowCount: 1,
      executionTimeMs,
    };
  } catch (error: any) {
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    let message = error.message || "Errore sconosciuto durante l'esecuzione della query.";
    
    // Make errors more educational
    if (message.includes("Parse error")) {
      message = `Errore di sintassi SQL: controlla la punteggiatura, le virgole tra le colonne e l'ordine delle clausole.\n(${message})`;
    } else if (message.includes("Cannot read property") || message.includes("undefined")) {
      message = `Colonna o tabella inesistente. Controlla i nomi esatti delle tabelle nello schema a sinistra.`;
    }

    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs,
      error: message,
    };
  }
}

/**
 * Compare student query result against expected query result.
 */
export function validateStudentQuery(
  userQuery: string,
  expectedQuery: string,
  checkOrder = false
): ValidationResult {
  const userResult = executeQuery(userQuery);
  const expectedResult = executeQuery(expectedQuery);

  if (!userResult.success) {
    return {
      isCorrect: false,
      message: userResult.error || "Errore nella query dello studente.",
      userResult,
      expectedResult,
    };
  }

  if (!expectedResult.success) {
    console.error("Critical: Expected query failed!", expectedResult.error, expectedQuery);
    return {
      isCorrect: false,
      message: "Errore interno nella query attesa di riferimento.",
      userResult,
      expectedResult,
    };
  }

  // Normalize column names for comparison (lowercased, trimmed)
  const userCols = userResult.columns.map((c) => c.toLowerCase().trim());
  const expCols = expectedResult.columns.map((c) => c.toLowerCase().trim());

  // Check column count
  if (userCols.length !== expCols.length) {
    const message = `Numero di colonne non corrispondente: la tua query ha restituito ${userCols.length} colonne (${userResult.columns.join(", ")}), mentre ne sono attese ${expCols.length} (${expectedResult.columns.join(", ")}).`;
    return {
      isCorrect: false,
      message,
      userResult,
      expectedResult,
      differences: {
        rowCountMatch: userResult.rowCount === expectedResult.rowCount,
        columnsMatch: false,
        missingColumns: expectedResult.columns.filter(
          (c) => !userCols.includes(c.toLowerCase().trim())
        ),
        extraColumns: userResult.columns.filter(
          (c) => !expCols.includes(c.toLowerCase().trim())
        ),
        userCount: userResult.rowCount,
        expectedCount: expectedResult.rowCount,
      },
    };
  }

  // Check row count
  if (userResult.rowCount !== expectedResult.rowCount) {
    const diff = userResult.rowCount > expectedResult.rowCount ? "troppe" : "troppo poche";
    const message = `Numero di righe errato: la tua query ha restituito ${userResult.rowCount} righe (${diff}), ma ne sono attese esattamente ${expectedResult.rowCount}. Verifica le condizioni nel filtro WHERE o le clausole JOIN.`;
    return {
      isCorrect: false,
      message,
      userResult,
      expectedResult,
      differences: {
        rowCountMatch: false,
        columnsMatch: true,
        missingColumns: [],
        extraColumns: [],
        userCount: userResult.rowCount,
        expectedCount: expectedResult.rowCount,
      },
    };
  }

  // Helper to serialize a row by values regardless of column key names
  const serializeRowValues = (row: Record<string, any>, colKeys: string[]) => {
    return colKeys
      .map((k) => {
        const val = row[k];
        if (val === null || val === undefined) return "NULL";
        if (typeof val === "number") return Math.round(val * 100) / 100;
        return String(val).trim().toLowerCase();
      })
      .join(" | ");
  };

  if (checkOrder) {
    // Exact row order matching
    for (let i = 0; i < expectedResult.rowCount; i++) {
      const uRowStr = serializeRowValues(userResult.rows[i], userResult.columns);
      const eRowStr = serializeRowValues(expectedResult.rows[i], expectedResult.columns);

      if (uRowStr !== eRowStr) {
        return {
          isCorrect: false,
          message: `L'ordinamento dei risultati non corrisponde a quello richiesto. Riga ${i + 1} attesa: [${eRowStr}], ottenuta: [${uRowStr}]. Controlla la clausola ORDER BY (ASC / DESC).`,
          userResult,
          expectedResult,
          differences: {
            rowCountMatch: true,
            columnsMatch: true,
            missingColumns: [],
            extraColumns: [],
            userCount: userResult.rowCount,
            expectedCount: expectedResult.rowCount,
            firstDifference: `Riga ${i + 1}`,
          },
        };
      }
    }
  } else {
    // Unordered comparison: compare multisets
    const userRowStrs = userResult.rows.map((r) =>
      serializeRowValues(r, userResult.columns)
    );
    const expRowStrs = expectedResult.rows.map((r) =>
      serializeRowValues(r, expectedResult.columns)
    );

    userRowStrs.sort();
    expRowStrs.sort();

    for (let i = 0; i < expRowStrs.length; i++) {
      if (userRowStrs[i] !== expRowStrs[i]) {
        return {
          isCorrect: false,
          message: `I valori estratti non corrispondono a quelli attesi. Controlla le condizioni di filtro e le espressioni di proiezione.`,
          userResult,
          expectedResult,
          differences: {
            rowCountMatch: true,
            columnsMatch: true,
            missingColumns: [],
            extraColumns: [],
            userCount: userResult.rowCount,
            expectedCount: expectedResult.rowCount,
            firstDifference: `Discrepanza nei valori: atteso "${expRowStrs[i]}", ma non trovato nel tuo set.`,
          },
        };
      }
    }
  }

  // All checks passed!
  return {
    isCorrect: true,
    message: "Ottimo lavoro! La query è corretta e produce esattamente il dataset atteso.",
    userResult,
    expectedResult,
  };
}
