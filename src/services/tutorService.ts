/**
 * Client & Server compatible pedagogical tutor engine.
 * Provides in-depth, exercise-aware guidance, diagnostic breakdown
 * of SQL queries, common error identification, and Jedi Master explanations.
 * Works 100% offline and in static hosting environments like GitHub Pages.
 */

export interface TutorAnalysisParams {
  questionTitle?: string;
  questionGoal?: string;
  difficulty?: string;
  userQuery?: string;
  expectedQuery?: string;
  errorMessage?: string;
  userResultsSummary?: string;
  expectedResultsSummary?: string;
  relevantTables?: string[];
  userQuestion?: string;
}

export function buildDetailedTutorAnalysis({
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
}: TutorAnalysisParams): string {
  if (userQuestion) {
    const qLower = userQuestion.toLowerCase();
    let reply = `Padawan, hai chiesto: "${userQuestion}"\n\n`;

    if (qLower.includes("where") || qLower.includes("filtro") || qLower.includes("filtrare")) {
      reply += `Nel linguaggio SQL, la clausola **WHERE** serve a selezionare unicamente le righe che soddisfano una data condizione booleana prima di qualunque raggruppamento o proiezione.\n\n`;
      reply += `Nel nostro esercizio "${questionTitle}":\n`;
      reply += `Dobbiamo filtrare i record in base alla richiesta: "${questionGoal}".\n`;
      reply += `Verifica che il valore testuale sia tra apici singoli (es: \`'Valore'\`) e che il nome della colonna coincida esattamente con lo schema.`;
    } else if (qLower.includes("join") || qLower.includes("unire") || qLower.includes("tabelle")) {
      reply += `La clausola **JOIN** permette di combinare record da due o più tabelle sulla base di una colonna comune (chiave primaria e chiave esterna).\n\n`;
      reply += `Sintassi fondamentale:\n\`\`\`sql\nFROM tabella1 JOIN tabella2 ON tabella1.chiave_esterna = tabella2.id\n\`\`\`\n`;
      reply += `Nello schema Star Wars, ad esempio per associare i personaggi alle loro fazioni o pianeti, si unisce \`personaggi.fazione_id = fazioni.id\` o \`personaggi.pianeta_origine_id = pianeti.id\`.`;
    } else if (qLower.includes("having") || qLower.includes("group by")) {
      reply += `**Regola d'oro del Maestro Jedi:**\n`;
      reply += `- **WHERE** filtra le singole righe *prima* del raggruppamento.\n`;
      reply += `- **GROUP BY** raggruppa le righe secondo una o più colonne.\n`;
      reply += `- **HAVING** filtra i gruppi *dopo* l'aggregazione (ad esempio su condizioni come \`COUNT(*) > 2\` o \`AVG(...) >= 50\`). Non puoi usare WHERE per filtrare su funzioni aggregate!`;
    } else if (qLower.includes("order by") || qLower.includes("ordinare") || qLower.includes("asc") || qLower.includes("desc")) {
      reply += `La clausola **ORDER BY** ordina le righe risultanti:\n`;
      reply += `- \`ASC\` (default): ordine crescente (dalla A alla Z, o dal numero più piccolo al più grande).\n`;
      reply += `- \`DESC\`: ordine decrescente (dal più grande al più piccolo).`;
    } else {
      reply += `Per risolvere questo quesito ("${questionTitle}"), ricorda la sequenza logica di composizione:\n`;
      reply += `1. **FROM**: definisce la tabella di partenza (${(relevantTables || []).join(", ")}).\n`;
      reply += `2. **WHERE**: applica i criteri di inclusione.\n`;
      reply += `3. **SELECT**: estrae unicamente gli attributi richiesti.\n\n`;
      reply += `Ecco la soluzione corretta di riferimento:\n\`\`\`sql\n${expectedQuery}\n\`\`\``;
    }

    return reply;
  }

  // Initial comprehensive explanation
  let analysis = `### 🌟 Guida del Maestro Jedi alla Soluzione\n\n`;
  analysis += `**Esercizio:** ${questionTitle || "Quesito SQL"} (Difficoltà: *${difficulty || "N/D"}*)\n`;
  analysis += `**Obiettivo:** ${questionGoal}\n\n`;

  analysis += `#### 🔍 Analisi del tuo codice\n`;
  if (userQuery && userQuery.trim()) {
    analysis += `Hai scritto:\n\`\`\`sql\n${userQuery.trim()}\n\`\`\`\n`;
  } else {
    analysis += `*Non è stata inviata alcuna query nel terminale.*\n\n`;
  }

  if (errorMessage) {
    analysis += `**Esito riscontrato:** \`${errorMessage}\`\n\n`;
  } else if (userResultsSummary || expectedResultsSummary) {
    analysis += `**Esito:** Il risultato ottenuto (${userResultsSummary || "dati diversi"}) non coincide con il dataset atteso (${expectedResultsSummary || "risultato corretto"}).\n\n`;
  }

  // Diagnostic breakdown
  analysis += `#### 🛠️ Dove risiede la differenza?\n`;
  const uUpper = (userQuery || "").toUpperCase();
  const eUpper = (expectedQuery || "").toUpperCase();

  if (eUpper.includes("WHERE") && !uUpper.includes("WHERE")) {
    analysis += `- **Filtro mancante**: La richiesta necessita di una clausola \`WHERE\` per restringere le righe, ma la tua query estrae tutti i record senza filtro.\n`;
  }

  if (eUpper.includes("JOIN") && !uUpper.includes("JOIN")) {
    analysis += `- **Relazione tra tabelle mancante**: I dati richiesti si trovano su più tabelle (${(relevantTables || []).join(" e ")}), quindi è indispensabile una clausola \`JOIN ... ON ...\` per metterle in relazione.\n`;
  }

  if (eUpper.includes("GROUP BY") && !uUpper.includes("GROUP BY")) {
    analysis += `- **Raggruppamento mancante**: L'esercizio richiede un calcolo aggregato per gruppo (\`GROUP BY\`).\n`;
  }

  if (eUpper.includes("ORDER BY") && !uUpper.includes("ORDER BY")) {
    analysis += `- **Ordinamento mancante**: È richiesto ordinare i risultati tramite \`ORDER BY\`.\n`;
  }

  if (eUpper.includes("LIMIT") && !uUpper.includes("LIMIT")) {
    analysis += `- **Limite righe mancante**: La consegna specifica di limitare i record con la clausola \`LIMIT\`.\n`;
  }

  analysis += `\n#### 📚 Procedura Passo-Passo per la Risoluzione\n`;
  analysis += `1. **FROM**: Identifica la tabella corretta negli archivi (${relevantTables?.join(", ") || "tabella richiesta"}).\n`;
  analysis += `2. **WHERE**: Imposta la condizione logica per selezionare solo le righe pertinenti.\n`;
  analysis += `3. **SELECT**: Proietta solo le colonne esplicitamente richieste dalla consegna, evitando colonne aggiuntive o mancanti.\n\n`;

  analysis += `#### ⚔️ Query Canonica Corretta\n`;
  analysis += `\`\`\`sql\n${expectedQuery}\n\`\`\`\n\n`;
  analysis += `*Padawan, puoi copiare o modificare questa query nel tuo terminale ed eseguirla con Ctrl+Invio. Se hai ulteriori dubbi, chiedimelo qui sotto in chat!*`;

  return analysis;
}
