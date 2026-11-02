import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { buildDetailedTutorAnalysis } from "./src/services/tutorService";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Endpoint for Gemini Query Tutor & Error Explanation
app.post("/api/explain-query", async (req, res) => {
  const {
    questionTitle,
    questionGoal,
    difficulty,
    userQuery,
    expectedQuery,
    errorMessage,
    userResultsSummary,
    expectedResultsSummary,
    relevantTables,
    chatHistory,
    userQuestion,
  } = req.body;

  // Build the intelligent, exercise-aware baseline tutorial
  const fallbackText = buildDetailedTutorAnalysis({
    questionTitle,
    questionGoal,
    difficulty,
    userQuery,
    expectedQuery,
    errorMessage,
    userResultsSummary,
    expectedResultsSummary,
    relevantTables,
    userQuestion,
  });

  try {
    const systemInstruction = `Sei il Maestro Jedi dell'Archivio Dati Galattico, un tutor didattico esperto di SQL e della saga di Star Wars.
Il tuo compito è aiutare uno studente (un giovane Padawan) che si sta esercitando a scrivere query SQL.
Lo studente sta esaminando l'esercizio intitolato "${questionTitle || "Esercizio"}".

Linee guida per la risposta:
1. Spiega in modo chiaro, incoraggiante, pedagogico e passo-passo la logica per risolvere la richiesta.
2. Identifica con precisione dov'è l'errore nella query dello studente confrontandola con la query canonica attesa.
3. Mostra la query corretta con commenti esplicativi e spiega la sequenza di esecuzione logica di SQL (FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT).
4. Rispondi SEMPRE in lingua italiana, mantenendo un tono amichevole e appassionato ma rigoroso e scientificamente accurato per SQL.
5. Se lo studente fa domande aggiuntive nella chat, rispondi con pertinenza rispetto al contesto dell'esercizio.`;

    let prompt = `Contesto dell'Esercizio:
- Titolo: ${questionTitle || "Esercizio SQL"}
- Obiettivo Richiesto: ${questionGoal}
- Difficoltà: ${difficulty}
- Tabelle coinvolte: ${JSON.stringify(relevantTables || [])}

Tentativo dello studente:
\`\`\`sql
${userQuery || "-- Nessuna query inviata"}
\`\`\`

Query canonica attesa:
\`\`\`sql
${expectedQuery}
\`\`\`

Dettagli esecuzione studente:
- Errore di sintassi / esecuzione: ${errorMessage || "Nessun errore di sintassi, ma il set di dati non corrisponde"}
- Risultato ottenuto: ${userResultsSummary || "Dataset non corrispondente"}
- Risultato atteso: ${expectedResultsSummary || "Dataset atteso"}
`;

    if (userQuestion) {
      prompt += `\nDomanda specifica dello studente in chat:\n"${userQuestion}"\n`;
    } else {
      prompt += `\nSpiega passo-passo perché la query dello studente non produce il risultato desiderato e come andava strutturata la soluzione corretta.`;
    }

    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      prompt += `\nCronologia conversazione precedente:\n${chatHistory
        .map((m: { sender: string; text: string }) => `${m.sender}: ${m.text}`)
        .join("\n")}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const explanation = response.text || fallbackText;

    return res.json({
      success: true,
      explanation,
    });
  } catch (error: any) {
    console.warn("Avviso chiamata Gemini (utilizzato fallback pedagogico contestuale):", error?.message || error);
    // Return the intelligent, exercise-aware tutorial directly with HTTP 200
    return res.json({
      success: true,
      explanation: fallbackText,
      isFallback: true,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
