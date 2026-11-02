import { SqlExercise } from "../types";

export const EXERCISES_BANK: SqlExercise[] = [
  // ==========================================
  // LIVELLO: FACILE (35 ESERCIZI)
  // SELECT, FROM, WHERE, ORDER BY, LIMIT, IN, BETWEEN, LIKE
  // ==========================================
  {
    id: "ex-001",
    title: "Tutti i Pianeti della Galassia",
    description: "Recupera tutti i dati e tutte le colonne della tabella 'pianeti'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM"],
    expectedQuery: "SELECT * FROM pianeti;",
    hints: [
      "Per selezionare tutte le colonne senza elencarle una ad una, usa l'asterisco *.",
      "Specifica la tabella corretta con la clausola FROM."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-002",
    title: "Nomi e Clima dei Pianeti",
    description: "Seleziona solamente il nome e il clima di tutti i pianeti presenti negli archivi.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM"],
    expectedQuery: "SELECT nome, clima FROM pianeti;",
    hints: [
      "Elenca le colonne richieste separate da una virgola dopo la parola chiave SELECT.",
      "Le colonne da proiettare sono 'nome' e 'clima'."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-003",
    title: "Personaggi Sensibili alla Forza",
    description: "Mostra il nome e il ruolo di tutti i personaggi che sono sensibili alla Forza (sensibile_alla_forza = 1).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, ruolo FROM personaggi WHERE sensibile_alla_forza = 1;",
    hints: [
      "Usa la clausola WHERE per filtrare i record.",
      "Imposta la condizione: sensibile_alla_forza = 1."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-004",
    title: "Pianeti del Settore Orlo Esterno",
    description: "Estrai il nome, il terreno e la popolazione di tutti i pianeti che appartengono al settore 'Orlo Esterno'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, terreno, popolazione FROM pianeti WHERE settore_galattico = 'Orlo Esterno';",
    hints: [
      "I valori di tipo testo devono essere racchiusi tra apici singoli, es: 'Orlo Esterno'.",
      "La colonna su cui filtrare è settore_galattico."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-005",
    title: "Astronavi di Grandi Dimensioni",
    description: "Trova il nome, il modello e la lunghezza delle astronavi con una lunghezza superiore a 100 metri.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, modello, lunghezza_metri FROM astronavi WHERE lunghezza_metri > 100;",
    hints: [
      "Usa l'operatore di confronto maggiore (>).",
      "Il campo da verificare è lunghezza_metri."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-006",
    title: "Pianeti Ordinati per Popolazione",
    description: "Mostra il nome e la popolazione di tutti i pianeti, ordinandoli in ordine decrescente di popolazione (dai più popolati ai meno popolati).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "ORDER BY"],
    expectedQuery: "SELECT nome, popolazione FROM pianeti ORDER BY popolazione DESC;",
    hints: [
      "Aggiungi la clausola ORDER BY alla fine della query.",
      "Per l'ordine decrescente usa la parola chiave DESC."
    ],
    relevantTables: ["pianeti"],
    checkOrder: true
  },
  {
    id: "ex-007",
    title: "Le 3 Astronavi più Veloci nell'Iperguida",
    description: "Seleziona il nome, il modello e la velocità nell'iperguida delle prime 3 astronavi con il valore di velocita_iperguida più basso (in Star Wars, valore più basso indica astronave più rapida).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "ORDER BY", "LIMIT"],
    expectedQuery: "SELECT nome, modello, velocita_iperguida FROM astronavi ORDER BY velocita_iperguida ASC LIMIT 3;",
    hints: [
      "Ordina per velocita_iperguida in ordine crescente (ASC).",
      "Limita il numero di righe restituite a 3 usando la clausola LIMIT 3."
    ],
    relevantTables: ["astronavi"],
    checkOrder: true
  },
  {
    id: "ex-008",
    title: "Personaggi Nati Prima di 50 BBY",
    description: "Recupera il nome e l'anno di nascita (anno_nascita_bby) dei personaggi nati prima di 50 BBY (ovvero con anno_nascita_bby > 50).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, anno_nascita_bby FROM personaggi WHERE anno_nascita_bby > 50;",
    hints: [
      "Filtra usando la colonna anno_nascita_bby.",
      "La condizione è: anno_nascita_bby > 50."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-009",
    title: "Pianeti dal Clima Arido o Ghiacciato",
    description: "Mostra il nome e il clima dei pianeti il cui clima è 'arido' oppure 'ghiacciato'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, clima FROM pianeti WHERE clima = 'arido' OR clima = 'ghiacciato';",
    hints: [
      "Puoi usare l'operatore logico OR, oppure la clausola IN ('arido', 'ghiacciato').",
      "Verifica la sintassi del confronto di stringhe."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-010",
    title: "Spade Laser Verdi",
    description: "Estrai l'identificativo e il tipo di cristallo di tutte le spade laser che hanno una lama di colore 'Verde'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT id, tipo_cristallo FROM spade_laser WHERE colore_lama = 'Verde';",
    hints: [
      "La tabella da interrogare è spade_laser.",
      "La condizione sul colore è: colore_lama = 'Verde'."
    ],
    relevantTables: ["spade_laser"]
  },
  {
    id: "ex-011",
    title: "Tipi Distinti di Clima",
    description: "Elenca tutti i tipi distinti di clima presenti nella tabella dei pianeti, senza ripetizioni.",
    difficulty: "facile",
    keywords: ["SELECT", "DISTINCT", "FROM"],
    expectedQuery: "SELECT DISTINCT clima FROM pianeti;",
    hints: [
      "Usa la parola chiave DISTINCT subito dopo SELECT per eliminare i duplicati.",
      "La colonna da selezionare è clima."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-012",
    title: "Caccia e Navi Monoposto",
    description: "Trova il nome e il costruttore delle astronavi che hanno una capacità di equipaggio esattamente pari a 1.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, costruttore FROM astronavi WHERE capacita_equipaggio = 1;",
    hints: [
      "La colonna da verificare è capacita_equipaggio.",
      "La condizione è capacita_equipaggio = 1."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-013",
    title: "Personaggi con Nome che Inizia per 'Darth'",
    description: "Seleziona il nome e il ruolo di tutti i personaggi il cui nome inizia con il titolo 'Darth'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE", "LIKE"],
    expectedQuery: "SELECT nome, ruolo FROM personaggi WHERE nome LIKE 'Darth%';",
    hints: [
      "Usa l'operatore LIKE con il carattere jolly percentuale %.",
      "Il pattern di ricerca è 'Darth%'."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-014",
    title: "Pianeti con Popolazione Compresa tra 1 Milione e 10 Miliardi",
    description: "Estrai il nome e la popolazione dei pianeti la cui popolazione è compresa tra 1.000.000 e 10.000.000.000 (estremi inclusi).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, popolazione FROM pianeti WHERE popolazione BETWEEN 1000000 AND 10000000000;",
    hints: [
      "Puoi usare l'operatore BETWEEN ... AND ... oppure due confronti uniti da AND.",
      "Fai attenzione al numero di zeri: 1000000 e 10000000000."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-015",
    title: "Fazioni Governative",
    description: "Mostra il nome, il leader e il motto di tutte le fazioni che sono classificate come 'Governo'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, leader, motto FROM fazioni WHERE tipo = 'Governo';",
    hints: [
      "La tabella di riferimento è fazioni.",
      "Filtra con tipo = 'Governo'."
    ],
    relevantTables: ["fazioni"]
  },
  {
    id: "ex-016",
    title: "Battaglie con Perdite Elevate",
    description: "Seleziona il nome della battaglia, l'anno e le perdite stimate per tutti gli scontri che hanno causato più di 10.000 perdite.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, anno_bby, perdite_stimate FROM battaglie WHERE perdite_stimate > 10000;",
    hints: [
      "Interroga la tabella battaglie.",
      "Filtra dove perdite_stimate > 10000."
    ],
    relevantTables: ["battaglie"]
  },
  {
    id: "ex-017",
    title: "Specie con Aspettativa di Vita Alta",
    description: "Trova il nome e l'aspettativa di vita media delle specie con una vita media superiore a 100 anni.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, aspettativa_vita_media FROM specie WHERE aspettativa_vita_media > 100;",
    hints: [
      "Tabella da utilizzare: specie.",
      "Condizione: aspettativa_vita_media > 100."
    ],
    relevantTables: ["specie"]
  },
  {
    id: "ex-018",
    title: "Personaggi Senza sensibilità alla Forza",
    description: "Mostra il nome e il ruolo di tutti i personaggi non sensibili alla Forza (sensibile_alla_forza = 0).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, ruolo FROM personaggi WHERE sensibile_alla_forza = 0;",
    hints: [
      "Imposta il filtro sensibile_alla_forza = 0.",
      "Le colonne richieste sono nome e ruolo."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-019",
    title: "Spade Laser con Impugnatura Curva",
    description: "Recupera tutte le colonne delle spade laser che possiedono una impugnatura curva ('Impugnatura curva da duello' o contenente 'curva').",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE", "LIKE"],
    expectedQuery: "SELECT * FROM spade_laser WHERE impugnatura LIKE '%curva%';",
    hints: [
      "Usa l'operatore LIKE con '%curva%'.",
      "Seleziona tutte le colonne con *."
    ],
    relevantTables: ["spade_laser"]
  },
  {
    id: "ex-020",
    title: "Costruttori di Astronavi Distinti",
    description: "Seleziona i nomi univoci (senza duplicati) di tutti i costruttori navali registrati nella tabella delle astronavi.",
    difficulty: "facile",
    keywords: ["SELECT", "DISTINCT", "FROM"],
    expectedQuery: "SELECT DISTINCT costruttore FROM astronavi;",
    hints: [
      "Usa la parola chiave DISTINCT per scartare i duplicati.",
      "La colonna è costruttore."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-021",
    title: "Pianeti Disabitati o Quasi Disabitati",
    description: "Trova il nome, il clima e la popolazione dei pianeti con una popolazione inferiore o uguale a 1.000 abitanti.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, clima, popolazione FROM pianeti WHERE popolazione <= 1000;",
    hints: [
      "Usa l'operatore minore o uguale (<=).",
      "Il valore numerico di riferimento è 1000."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-022",
    title: "Personaggi in Ordine Alfabetico",
    description: "Estrai il nome e il ruolo di tutti i personaggi, ordinandoli alfabeticamente per nome in ordine crescente.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "ORDER BY"],
    expectedQuery: "SELECT nome, ruolo FROM personaggi ORDER BY nome ASC;",
    hints: [
      "Usa ORDER BY nome ASC.",
      "ASC indica l'ordine alfabetico dalla A alla Z."
    ],
    relevantTables: ["personaggi"],
    checkOrder: true
  },
  {
    id: "ex-023",
    title: "I 5 Personaggi Più Anziani",
    description: "Seleziona il nome e l'anno di nascita dei 5 personaggi con il valore di anno_nascita_bby più alto (i più anziani).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "ORDER BY", "LIMIT"],
    expectedQuery: "SELECT nome, anno_nascita_bby FROM personaggi ORDER BY anno_nascita_bby DESC LIMIT 5;",
    hints: [
      "Ordina in ordine decrescente (DESC) per anno_nascita_bby.",
      "Limita a 5 righe con LIMIT 5."
    ],
    relevantTables: ["personaggi"],
    checkOrder: true
  },
  {
    id: "ex-024",
    title: "Astronavi Costruite da Corellian Engineering",
    description: "Mostra il nome, il modello e la lunghezza delle astronavi fabbricate da 'Corellian Engineering'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, modello, lunghezza_metri FROM astronavi WHERE costruttore = 'Corellian Engineering';",
    hints: [
      "Filtra la colonna costruttore.",
      "Usa costruttore = 'Corellian Engineering'."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-025",
    title: "Pianeti con Terreno Forestale o Paludoso",
    description: "Recupera il nome e il terreno dei pianeti il cui terreno contiene la parola 'foreste' oppure 'paludi'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE", "LIKE"],
    expectedQuery: "SELECT nome, terreno FROM pianeti WHERE terreno LIKE '%foreste%' OR terreno LIKE '%paludi%';",
    hints: [
      "Combina due condizioni LIKE con l'operatore logico OR.",
      "Usa i caratteri jolly '%foreste%' e '%paludi%'."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-026",
    title: "Battaglie Avvenute nel Periodo Ante-Impero",
    description: "Trova il nome e l'anno delle battaglie svoltesi con anno_bby maggiore di 10 (durante le Guerre dei Cloni o prima).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, anno_bby FROM battaglie WHERE anno_bby > 10;",
    hints: [
      "Tabella di destinazione: battaglie.",
      "Condizione: anno_bby > 10."
    ],
    relevantTables: ["battaglie"]
  },
  {
    id: "ex-027",
    title: "Spade Laser Rosse dei Guerrieri Oscuri",
    description: "Mostra l'identificativo, il tipo di cristallo e l'impugnatura di tutte le spade laser con lama 'Rosso'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT id, tipo_cristallo, impugnatura FROM spade_laser WHERE colore_lama = 'Rosso';",
    hints: [
      "Filtra con colore_lama = 'Rosso'.",
      "Le colonne da proiettare sono id, tipo_cristallo, impugnatura."
    ],
    relevantTables: ["spade_laser"]
  },
  {
    id: "ex-028",
    title: "Leader delle Fazioni Religiose",
    description: "Seleziona il nome della fazione e il leader per tutte le fazioni di tipo 'Ordine Religioso'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, leader FROM fazioni WHERE tipo = 'Ordine Religioso';",
    hints: [
      "Verifica la tabella fazioni.",
      "Condizione: tipo = 'Ordine Religioso'."
    ],
    relevantTables: ["fazioni"]
  },
  {
    id: "ex-029",
    title: "Personaggi con Fazione Non Assegnata o Specifica",
    description: "Trova il nome e il ruolo dei personaggi che appartengono alla fazione con ID pari a 1 (Alleanza Ribelle).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, ruolo FROM personaggi WHERE fazione_id = 1;",
    hints: [
      "Filtra su fazione_id = 1.",
      "Proietta le colonne nome e ruolo."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-030",
    title: "Specie e Lingue Parlate",
    description: "Estrai il nome della specie e il rispettivo linguaggio per tutte le specie registrate.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM"],
    expectedQuery: "SELECT nome, linguaggio FROM specie;",
    hints: [
      "La query richiede semplicemente una proiezione su due colonne dalla tabella specie.",
      "Nessun filtro WHERE è richiesto."
    ],
    relevantTables: ["specie"]
  },
  {
    id: "ex-031",
    title: "Le 3 Astronavi Più Lunghe",
    description: "Mostra il nome, il modello e la lunghezza delle 3 astronavi più lunghe dell'archivio in ordine decrescente.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "ORDER BY", "LIMIT"],
    expectedQuery: "SELECT nome, modello, lunghezza_metri FROM astronavi ORDER BY lunghezza_metri DESC LIMIT 3;",
    hints: [
      "Ordina per lunghezza_metri DESC.",
      "Usa la clausola LIMIT 3."
    ],
    relevantTables: ["astronavi"],
    checkOrder: true
  },
  {
    id: "ex-032",
    title: "Pianeti il cui Nome Termina con 'ine'",
    description: "Trova il nome e il clima di tutti i pianeti il cui nome termina con le lettere 'ine' (come Tatooine).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE", "LIKE"],
    expectedQuery: "SELECT nome, clima FROM pianeti WHERE nome LIKE '%ine';",
    hints: [
      "Usa la clausola LIKE '%ine'.",
      "Il carattere % posto all'inizio cattura qualsiasi sequenza di caratteri che precede 'ine'."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-033",
    title: "Personaggi Senza Ruolo di Droide",
    description: "Mostra il nome e il ruolo dei personaggi appartenenti alla specie droide (specie_id = 3).",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, ruolo FROM personaggi WHERE specie_id = 3;",
    hints: [
      "Filtra i record dove specie_id è uguale a 3.",
      "Le colonne da visualizzare sono nome e ruolo."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-034",
    title: "Fazioni con Nomi in Ordine Decrescente",
    description: "Seleziona tutti i campi della tabella fazioni ordinando i record in ordine alfabetico decrescente (da Z ad A) per nome.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "ORDER BY"],
    expectedQuery: "SELECT * FROM fazioni ORDER BY nome DESC;",
    hints: [
      "Usa ORDER BY nome DESC.",
      "Seleziona tutte le colonne con *."
    ],
    relevantTables: ["fazioni"],
    checkOrder: true
  },
  {
    id: "ex-035",
    title: "Pianeti nel Nucleo Profondo",
    description: "Estrai il nome e la popolazione dei pianeti situati nel settore galattico 'Nucleo Profondo'.",
    difficulty: "facile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, popolazione FROM pianeti WHERE settore_galattico = 'Nucleo Profondo';",
    hints: [
      "Filtra con settore_galattico = 'Nucleo Profondo'.",
      "Proietta nome e popolazione."
    ],
    relevantTables: ["pianeti"]
  },

  // ==========================================
  // LIVELLO: MEDIO (40 ESERCIZI)
  // GROUP BY, COUNT, SUM, AVG, MIN, MAX, HAVING, JOIN tra 2 tabelle
  // ==========================================
  {
    id: "ex-036",
    title: "Conteggio Totale dei Personaggi",
    description: "Calcola il numero totale di personaggi registrati negli archivi, rinominando la colonna di conteggio come 'totale_personaggi'.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "COUNT"],
    expectedQuery: "SELECT COUNT(*) AS totale_personaggi FROM personaggi;",
    hints: [
      "Usa la funzione di aggregazione COUNT(*).",
      "Assegna l'alias con AS totale_personaggi."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-037",
    title: "Numero di Personaggi per Fazione",
    description: "Raggruppa i personaggi in base alla loro fazione (fazione_id) e calcola quanti personaggi appartengono a ciascuna fazione. Mostra fazione_id e il conteggio.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT fazione_id, COUNT(*) AS numero_personaggi FROM personaggi GROUP BY fazione_id;",
    hints: [
      "Usa la clausola GROUP BY su fazione_id.",
      "Includi COUNT(*) nella lista delle colonne da selezionare."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-038",
    title: "Personaggi e Nome della loro Fazione",
    description: "Esegui una JOIN tra la tabella 'personaggi' e la tabella 'fazioni' per mostrare il nome del personaggio e il nome della sua fazione.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome AS nome_personaggio, fazioni.nome AS nome_fazione FROM personaggi JOIN fazioni ON personaggi.fazione_id = fazioni.id;",
    hints: [
      "Collega le tabelle tramite la condizione di uguaglianza tra chiavi: personaggi.fazione_id = fazioni.id.",
      "Usa prefissi di tabella o alias per evitare ambiguità sul campo 'nome'."
    ],
    relevantTables: ["personaggi", "fazioni"]
  },
  {
    id: "ex-039",
    title: "Popolazione Totale per Settore Galattico",
    description: "Calcola la somma complessiva della popolazione dei pianeti per ciascun settore galattico. Mostra settore_galattico e la somma della popolazione.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "SUM"],
    expectedQuery: "SELECT settore_galattico, SUM(popolazione) AS popolazione_totale FROM pianeti GROUP BY settore_galattico;",
    hints: [
      "Usa la funzione aggregata SUM(popolazione).",
      "Raggruppa le righe tramite GROUP BY settore_galattico."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-040",
    title: "Personaggi con la Rispettiva Spada Laser",
    description: "Mostra il nome del personaggio, il colore della lama e il tipo di cristallo per tutti i personaggi che possiedono una spada laser.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome, spade_laser.colore_lama, spade_laser.tipo_cristallo FROM personaggi JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id;",
    hints: [
      "Unisci la tabella personaggi e la tabella spade_laser sulla chiave personaggio_id.",
      "Seleziona nome, colore_lama e tipo_cristallo."
    ],
    relevantTables: ["personaggi", "spade_laser"]
  },
  {
    id: "ex-041",
    title: "Fazioni con Almeno 3 Personaggi",
    description: "Trova gli ID delle fazioni (fazione_id) che contano almeno 3 personaggi registrati, insieme al numero di personaggi.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "HAVING", "COUNT"],
    expectedQuery: "SELECT fazione_id, COUNT(*) AS totale FROM personaggi GROUP BY fazione_id HAVING COUNT(*) >= 3;",
    hints: [
      "Per filtrare i risultati aggregati non puoi usare WHERE, devi usare la clausola HAVING.",
      "La condizione dopo GROUP BY è: HAVING COUNT(*) >= 3."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-042",
    title: "Lunghezza Media delle Astronavi",
    description: "Calcola la lunghezza media in metri delle astronavi registrate, arrotondata o mostrata come valore medio.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "AVG"],
    expectedQuery: "SELECT AVG(lunghezza_metri) AS lunghezza_media FROM astronavi;",
    hints: [
      "Usa la funzione aggregata AVG(lunghezza_metri).",
      "Assegna un alias alla colonna risultante."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-043",
    title: "Personaggi e Nome del Pianeta di Origine",
    description: "Mostra il nome del personaggio e il nome del pianeta natale, unendo la tabella personaggi con la tabella pianeti.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome AS personaggio, pianeti.nome AS pianeta FROM personaggi JOIN pianeti ON personaggi.pianeta_origine_id = pianeti.id;",
    hints: [
      "Collega personaggi.pianeta_origine_id con pianeti.id.",
      "Proietta i due nomi con alias chiarificatori."
    ],
    relevantTables: ["personaggi", "pianeti"]
  },
  {
    id: "ex-044",
    title: "Astronavi per Fazione Proprietaria",
    description: "Mostra il nome dell'astronave, il modello e il nome della fazione a cui appartiene, unendo astronavi e fazioni.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT astronavi.nome AS nome_nave, astronavi.modello, fazioni.nome AS nome_fazione FROM astronavi JOIN fazioni ON astronavi.fazione_id = fazioni.id;",
    hints: [
      "Unisci la tabella astronavi con fazioni tramite astronavi.fazione_id = fazioni.id.",
      "Seleziona i campi richiesti."
    ],
    relevantTables: ["astronavi", "fazioni"]
  },
  {
    id: "ex-045",
    title: "Numero di Spade Laser per Colore",
    description: "Calcola quante spade laser esistono per ciascun colore di lama. Mostra il colore della lama e il conteggio, ordinati per conteggio decrescente.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "ORDER BY", "COUNT"],
    expectedQuery: "SELECT colore_lama, COUNT(*) AS quantita FROM spade_laser GROUP BY colore_lama ORDER BY quantita DESC;",
    hints: [
      "Raggruppa con GROUP BY colore_lama.",
      "Ordina il risultato per quantita DESC."
    ],
    relevantTables: ["spade_laser"],
    checkOrder: true
  },
  {
    id: "ex-046",
    title: "Battaglie e Pianeta Teatro dello Scontro",
    description: "Estrai il nome della battaglia, l'anno_bby e il nome del pianeta su cui si è svolta la battaglia.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT battaglie.nome AS battaglia, battaglie.anno_bby, pianeti.nome AS pianeta FROM battaglie JOIN pianeti ON battaglie.pianeta_id = pianeti.id;",
    hints: [
      "Unisci battaglie con pianeti collegando battaglie.pianeta_id = pianeti.id.",
      "Seleziona il nome della battaglia, anno e nome del pianeta."
    ],
    relevantTables: ["battaglie", "pianeti"]
  },
  {
    id: "ex-047",
    title: "Perdite Medie per Battaglia",
    description: "Calcola le perdite stimate minime, massime e medie tra tutte le battaglie registrate.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "MIN", "MAX", "AVG"],
    expectedQuery: "SELECT MIN(perdite_stimate) AS perdite_minime, MAX(perdite_stimate) AS perdite_massime, AVG(perdite_stimate) AS perdite_medie FROM battaglie;",
    hints: [
      "Usa le tre funzioni MIN, MAX e AVG sulla colonna perdite_stimate.",
      "Assegna alias leggibili."
    ],
    relevantTables: ["battaglie"]
  },
  {
    id: "ex-048",
    title: "Pianeti con più di 2 Personaggi Nativi",
    description: "Trova gli ID dei pianeti di origine (pianeta_origine_id) da cui provengono più di 2 personaggi registrati, insieme al numero di personaggi nativi.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "HAVING", "COUNT"],
    expectedQuery: "SELECT pianeta_origine_id, COUNT(*) AS totale_nativi FROM personaggi GROUP BY pianeta_origine_id HAVING COUNT(*) > 2;",
    hints: [
      "Raggruppa per pianeta_origine_id.",
      "Usa HAVING COUNT(*) > 2 per filtrare dopo l'aggregazione."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-049",
    title: "Personaggi e Nome della Loro Specie",
    description: "Mostra il nome del personaggio, il suo ruolo e il nome della specie a cui appartiene, unendo personaggi e specie.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome AS personaggio, personaggi.ruolo, specie.nome AS specie FROM personaggi JOIN specie ON personaggi.specie_id = specie.id;",
    hints: [
      "Collega la tabella personaggi a specie tramite personaggi.specie_id = specie.id.",
      "Proietta le colonne richieste."
    ],
    relevantTables: ["personaggi", "specie"]
  },
  {
    id: "ex-050",
    title: "Numero di Astronavi per Costruttore",
    description: "Mostra il nome di ciascun costruttore e il numero totale di modelli di astronave costruiti, ordinando dal costruttore con più astronavi a quello con meno.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "ORDER BY", "COUNT"],
    expectedQuery: "SELECT costruttore, COUNT(*) AS numero_navi FROM astronavi GROUP BY costruttore ORDER BY numero_navi DESC;",
    hints: [
      "Raggruppa per costruttore.",
      "Ordina in ordine decrescente usando il conteggio."
    ],
    relevantTables: ["astronavi"],
    checkOrder: true
  },
  {
    id: "ex-051",
    title: "Numero di Pianeti per Tipologia di Clima",
    description: "Conta quanti pianeti sono associati a ciascun clima. Mostra il clima e il numero di pianeti.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT clima, COUNT(*) AS numero_pianeti FROM pianeti GROUP BY clima;",
    hints: [
      "Usa GROUP BY clima.",
      "Includi COUNT(*) con alias numero_pianeti."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-052",
    title: "Tutte le Battaglie Vinte con Fazione Vincitrice",
    description: "Mostra il nome della battaglia, l'anno_bby e il nome della fazione che ha vinto il conflitto.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT battaglie.nome AS battaglia, battaglie.anno_bby, fazioni.nome AS fazione_vincitrice FROM battaglie JOIN fazioni ON battaglie.fazione_vincitrice_id = fazioni.id;",
    hints: [
      "Unisci battaglie e fazioni sulla chiave battaglie.fazione_vincitrice_id = fazioni.id.",
      "Seleziona il nome della battaglia e il nome della fazione vincitrice."
    ],
    relevantTables: ["battaglie", "fazioni"]
  },
  {
    id: "ex-053",
    title: "Capacità Equipaggio Totale per Fazione",
    description: "Calcola la somma complessiva della capacità dell'equipaggio di tutte le navi appartenenti a ciascuna fazione (fazione_id). Mostra fazione_id e il totale equipaggio.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "SUM"],
    expectedQuery: "SELECT fazione_id, SUM(capacita_equipaggio) AS equipaggio_totale FROM astronavi GROUP BY fazione_id;",
    hints: [
      "Raggruppa le astronavi per fazione_id.",
      "Usa la funzione SUM(capacita_equipaggio)."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-054",
    title: "Aspettativa di Vita Media per Linguaggio",
    description: "Calcola l'aspettativa di vita media per ciascun linguaggio delle specie registrate.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "AVG"],
    expectedQuery: "SELECT linguaggio, AVG(aspettativa_vita_media) AS vita_media FROM specie GROUP BY linguaggio;",
    hints: [
      "Raggruppa per la colonna linguaggio.",
      "Usa AVG(aspettativa_vita_media)."
    ],
    relevantTables: ["specie"]
  },
  {
    id: "ex-055",
    title: "Personaggi con Spada Laser Blu o Verde",
    description: "Mostra il nome del personaggio, il suo ruolo e il colore della lama per i personaggi dotati di spada laser con lama 'Blu' o 'Verde'.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT personaggi.nome, personaggi.ruolo, spade_laser.colore_lama FROM personaggi JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id WHERE spade_laser.colore_lama IN ('Blu', 'Verde');",
    hints: [
      "Esegui una JOIN tra personaggi e spade_laser.",
      "Aggiungi un filtro WHERE con IN ('Blu', 'Verde') o con operatore OR."
    ],
    relevantTables: ["personaggi", "spade_laser"]
  },
  {
    id: "ex-056",
    title: "Numero di Personaggi Sensibili alla Forza per Fazione",
    description: "Conta quanti personaggi sensibili alla Forza (sensibile_alla_forza = 1) appartengono a ciascuna fazione (fazione_id).",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "WHERE", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT fazione_id, COUNT(*) AS jedi_o_sith FROM personaggi WHERE sensibile_alla_forza = 1 GROUP BY fazione_id;",
    hints: [
      "Filtra prima con WHERE sensibile_alla_forza = 1.",
      "Poi raggruppa con GROUP BY fazione_id."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-057",
    title: "Lunghezza Massima delle Navi per Fazione",
    description: "Trova la lunghezza massima in metri delle astronavi per ciascuna fazione (fazione_id).",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "MAX"],
    expectedQuery: "SELECT fazione_id, MAX(lunghezza_metri) AS lunghezza_massima FROM astronavi GROUP BY fazione_id;",
    hints: [
      "Usa la funzione MAX(lunghezza_metri).",
      "Raggruppa per fazione_id."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-058",
    title: "Perdite Totali delle Battaglie per Pianeta",
    description: "Calcola le perdite stimate totali subite su ciascun pianeta (pianeta_id) nelle battaglie registrate.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "SUM"],
    expectedQuery: "SELECT pianeta_id, SUM(perdite_stimate) AS perdite_totali FROM battaglie GROUP BY pianeta_id;",
    hints: [
      "Raggruppa per pianeta_id nella tabella battaglie.",
      "Usa SUM(perdite_stimate)."
    ],
    relevantTables: ["battaglie"]
  },
  {
    id: "ex-059",
    title: "Specie Nascoste nel Pianeta Madre",
    description: "Mostra il nome della specie, il linguaggio e il nome del suo pianeta natale unendo specie e pianeti.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT specie.nome AS specie, specie.linguaggio, pianeti.nome AS pianeta_madre FROM specie JOIN pianeti ON specie.pianeta_madre_id = pianeti.id;",
    hints: [
      "Unisci specie con pianeti tramite specie.pianeta_madre_id = pianeti.id.",
      "Seleziona specie.nome, specie.linguaggio e pianeti.nome."
    ],
    relevantTables: ["specie", "pianeti"]
  },
  {
    id: "ex-060",
    title: "Settori Galattici con più di 3 Pianeti",
    description: "Trova i settori galattici che contengono più di 3 pianeti, visualizzando il settore e il conteggio dei pianeti.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "HAVING", "COUNT"],
    expectedQuery: "SELECT settore_galattico, COUNT(*) AS numero_pianeti FROM pianeti GROUP BY settore_galattico HAVING COUNT(*) > 3;",
    hints: [
      "Raggruppa per settore_galattico.",
      "Usa HAVING COUNT(*) > 3 per filtrare sui gruppi."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-061",
    title: "Età Media dei Personaggi Sensibili alla Forza",
    description: "Calcola il valore medio dell'anno di nascita (anno_nascita_bby) per tutti i personaggi che sono sensibili alla Forza.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "WHERE", "AVG"],
    expectedQuery: "SELECT AVG(anno_nascita_bby) AS media_anno_bby FROM personaggi WHERE sensibile_alla_forza = 1;",
    hints: [
      "Filtra con WHERE sensibile_alla_forza = 1.",
      "Calcola AVG(anno_nascita_bby)."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-062",
    title: "Tipi di Fazione e Numero di Fazioni Registrate",
    description: "Mostra ogni tipo di fazione presente e quante fazioni appartengono a quel tipo.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT tipo, COUNT(*) AS numero_fazioni FROM fazioni GROUP BY tipo;",
    hints: [
      "Raggruppa per la colonna 'tipo' nella tabella fazioni.",
      "Conta i record con COUNT(*)."
    ],
    relevantTables: ["fazioni"]
  },
  {
    id: "ex-063",
    title: "Tutte le Astronavi della Fazione Ribelle",
    description: "Mostra il nome dell'astronave, il modello e il costruttore delle navi appartenenti all'Alleanza Ribelle unendo astronavi e fazioni.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT astronavi.nome, astronavi.modello, astronavi.costruttore FROM astronavi JOIN fazioni ON astronavi.fazione_id = fazioni.id WHERE fazioni.nome = 'Alleanza Ribelle';",
    hints: [
      "Collega astronavi con fazioni.",
      "Filtra con fazioni.nome = 'Alleanza Ribelle'."
    ],
    relevantTables: ["astronavi", "fazioni"]
  },
  {
    id: "ex-064",
    title: "Personaggi Nati a Tatooine",
    description: "Estrai il nome e il ruolo di tutti i personaggi il cui pianeta di origine è 'Tatooine'.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT personaggi.nome, personaggi.ruolo FROM personaggi JOIN pianeti ON personaggi.pianeta_origine_id = pianeti.id WHERE pianeti.nome = 'Tatooine';",
    hints: [
      "Unisci personaggi con pianeti sulla chiave esterna pianeta_origine_id.",
      "Imposta la condizione: pianeti.nome = 'Tatooine'."
    ],
    relevantTables: ["personaggi", "pianeti"]
  },
  {
    id: "ex-065",
    title: "Pianeti che Hanno Ospitato Almeno una Battaglia",
    description: "Mostra i nomi univoci dei pianeti su cui si è svolta almeno una battaglia, unendo pianeti e battaglie.",
    difficulty: "medio",
    keywords: ["SELECT", "DISTINCT", "FROM", "JOIN"],
    expectedQuery: "SELECT DISTINCT pianeti.nome FROM pianeti JOIN battaglie ON pianeti.id = battaglie.pianeta_id;",
    hints: [
      "Unisci le due tabelle con JOIN ... ON pianeti.id = battaglie.pianeta_id.",
      "Usa DISTINCT per non mostrare lo stesso pianeta più volte."
    ],
    relevantTables: ["pianeti", "battaglie"]
  },
  {
    id: "ex-066",
    title: "Tutti i Personaggi con o senza Spada Laser (LEFT JOIN)",
    description: "Estrai il nome del personaggio e il colore della lama della sua spada laser. Mostra anche i personaggi che NON possiedono una spada laser (il colore sarà NULL).",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "LEFT JOIN"],
    expectedQuery: "SELECT personaggi.nome, spade_laser.colore_lama FROM personaggi LEFT JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id;",
    hints: [
      "Usa LEFT JOIN (o LEFT OUTER JOIN) per mantenere tutti i personaggi anche senza corrispondenza.",
      "Collega personaggi.id con spade_laser.personaggio_id."
    ],
    relevantTables: ["personaggi", "spade_laser"]
  },
  {
    id: "ex-067",
    title: "Velocità Media Iperguida per Fazione",
    description: "Calcola la velocità media nell'iperguida delle navi per ciascuna fazione (fazione_id).",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "AVG"],
    expectedQuery: "SELECT fazione_id, AVG(velocita_iperguida) AS velocita_media FROM astronavi GROUP BY fazione_id;",
    hints: [
      "Raggruppa per fazione_id.",
      "Usa AVG(velocita_iperguida)."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-068",
    title: "Pianeti con Popolazione Superiore alla Media",
    description: "Trova il nome e la popolazione di tutti i pianeti che hanno una popolazione superiore a 100.000.000 di abitanti.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, popolazione FROM pianeti WHERE popolazione > 100000000;",
    hints: [
      "Filtra la tabella pianeti con popolazione > 100000000.",
      "Proietta nome e popolazione."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-069",
    title: "Numero di Battaglie Vinte per Fazione",
    description: "Calcola quante battaglie ha vinto ciascuna fazione vincitrice (fazione_vincitrice_id). Mostra l'ID e il totale di vittorie.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT fazione_vincitrice_id, COUNT(*) AS vittorie FROM battaglie GROUP BY fazione_vincitrice_id;",
    hints: [
      "Raggruppa per fazione_vincitrice_id nella tabella battaglie.",
      "Conta con COUNT(*)."
    ],
    relevantTables: ["battaglie"]
  },
  {
    id: "ex-070",
    title: "Spade Laser con Cristalli di Ilum o Adegan",
    description: "Mostra l'identificativo e il colore della lama delle spade laser che utilizzano cristalli con origine 'Ilum' o 'Adegan'.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "WHERE", "LIKE"],
    expectedQuery: "SELECT id, colore_lama FROM spade_laser WHERE tipo_cristallo LIKE '%Ilum%' OR tipo_cristallo LIKE '%Adegan%';",
    hints: [
      "Usa l'operatore LIKE con '%Ilum%' e '%Adegan%'.",
      "Combina con l'operatore OR."
    ],
    relevantTables: ["spade_laser"]
  },
  {
    id: "ex-071",
    title: "Numero di Personaggi Umani per Pianeta Natale",
    description: "Conta quanti personaggi umani (specie_id = 1) provengono da ciascun pianeta di origine (pianeta_origine_id).",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "WHERE", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT pianeta_origine_id, COUNT(*) AS numero_umani FROM personaggi WHERE specie_id = 1 GROUP BY pianeta_origine_id;",
    hints: [
      "Filtra prima con WHERE specie_id = 1.",
      "Poi raggruppa con GROUP BY pianeta_origine_id."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-072",
    title: "Astronavi Senza Equipaggio Numeroso",
    description: "Seleziona il nome e la capacità dell'equipaggio per le navi con equipaggio compreso tra 2 e 10 membri.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, capacita_equipaggio FROM astronavi WHERE capacita_equipaggio BETWEEN 2 AND 10;",
    hints: [
      "Usa BETWEEN 2 AND 10 sulla colonna capacita_equipaggio.",
      "Proietta nome e capacita_equipaggio."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-073",
    title: "Pianeti il cui Clima è Temperato con più di 1 Miliardo di Abitanti",
    description: "Trova il nome, la popolazione e il terreno dei pianeti che hanno clima 'temperato' e popolazione superiore a 1.000.000.000.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, popolazione, terreno FROM pianeti WHERE clima = 'temperato' AND popolazione > 1000000000;",
    hints: [
      "Usa l'operatore logico AND per unire i due criteri.",
      "Verifica sia il clima sia la popolazione."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-074",
    title: "Personaggi con Spada Laser Rossa e Nome Fazione",
    description: "Mostra il nome del personaggio e il colore della lama unendo personaggi e spade_laser, filtrando solo per coloro che hanno lama 'Rosso'.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT personaggi.nome, spade_laser.colore_lama FROM personaggi JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id WHERE spade_laser.colore_lama = 'Rosso';",
    hints: [
      "Esegui una JOIN su personaggi.id = spade_laser.personaggio_id.",
      "Aggiungi WHERE spade_laser.colore_lama = 'Rosso'."
    ],
    relevantTables: ["personaggi", "spade_laser"]
  },
  {
    id: "ex-075",
    title: "Fazioni con più di 1 Astronave Operativa",
    description: "Trova gli ID delle fazioni (fazione_id) che possiedono più di 1 astronave registrata, insieme al conteggio.",
    difficulty: "medio",
    keywords: ["SELECT", "FROM", "GROUP BY", "HAVING", "COUNT"],
    expectedQuery: "SELECT fazione_id, COUNT(*) AS totale_navi FROM astronavi GROUP BY fazione_id HAVING COUNT(*) > 1;",
    hints: [
      "Raggruppa le astronavi per fazione_id.",
      "Filtra con la clausola HAVING COUNT(*) > 1."
    ],
    relevantTables: ["astronavi"]
  },

  // ==========================================
  // LIVELLO: DIFFICILE (30 ESERCIZI)
  // MULTI-JOIN (3+ tabelle), SUBQUERIES (IN, NOT IN, >, correlati), HAVING avanzato
  // ==========================================
  {
    id: "ex-076",
    title: "Personaggio, Specie, Pianeta Natale e Fazione (Tripla JOIN)",
    description: "Mostra in un unico report il nome del personaggio, il nome della sua specie, il nome del pianeta natale e il nome della sua fazione, unendo 4 tabelle.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome AS personaggio, specie.nome AS specie, pianeti.nome AS pianeta, fazioni.nome AS fazione FROM personaggi JOIN specie ON personaggi.specie_id = specie.id JOIN pianeti ON personaggi.pianeta_origine_id = pianeti.id JOIN fazioni ON personaggi.fazione_id = fazioni.id;",
    hints: [
      "Collega la tabella personaggi con specie, poi con pianeti, poi con fazioni.",
      "Usa 3 clausole JOIN con le rispettive chiavi esterne."
    ],
    relevantTables: ["personaggi", "specie", "pianeti", "fazioni"]
  },
  {
    id: "ex-077",
    title: "Personaggi con Spada Laser e Nome della Fazione",
    description: "Mostra il nome del personaggio, il colore della spada laser e il nome della fazione di appartenenza, unendo personaggi, spade_laser e fazioni.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome AS personaggio, spade_laser.colore_lama, fazioni.nome AS fazione FROM personaggi JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id JOIN fazioni ON personaggi.fazione_id = fazioni.id;",
    hints: [
      "Unisci personaggi con spade_laser su personaggi.id = spade_laser.personaggio_id.",
      "Unisci con fazioni su personaggi.fazione_id = fazioni.id."
    ],
    relevantTables: ["personaggi", "spade_laser", "fazioni"]
  },
  {
    id: "ex-078",
    title: "Pianeti Senza Alcun Personaggio Registrato (Sottoquery NOT IN)",
    description: "Trova il nome di tutti i pianeti dai quali NON proviene alcun personaggio registrato nella tabella 'personaggi'.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE", "NOT IN"],
    expectedQuery: "SELECT nome FROM pianeti WHERE id NOT IN (SELECT pianeta_origine_id FROM personaggi WHERE pianeta_origine_id IS NOT NULL);",
    hints: [
      "Usa una sottoquery con NOT IN: WHERE id NOT IN (SELECT pianeta_origine_id FROM personaggi ...).",
      "In alternativa puoi usare una LEFT JOIN filtrando dove la chiave del personaggio è NULL."
    ],
    relevantTables: ["pianeti", "personaggi"]
  },
  {
    id: "ex-079",
    title: "Personaggi che NON Possiedono una Spada Laser",
    description: "Trova il nome e il ruolo di tutti i personaggi che NON hanno una spada laser registrata nell'archivio.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE", "NOT IN"],
    expectedQuery: "SELECT nome, ruolo FROM personaggi WHERE id NOT IN (SELECT personaggio_id FROM spade_laser);",
    hints: [
      "Usa una sottoquery per selezionare tutti i personaggio_id presenti in spade_laser.",
      "Filtra la tabella personaggi con WHERE id NOT IN (...)."
    ],
    relevantTables: ["personaggi", "spade_laser"]
  },
  {
    id: "ex-080",
    title: "Astronavi Più Lunghe della Lunghezza Media di Tutte le Navi",
    description: "Seleziona il nome, il modello e la lunghezza delle astronavi la cui lunghezza supera la lunghezza media di tutte le astronavi della flotta.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, modello, lunghezza_metri FROM astronavi WHERE lunghezza_metri > (SELECT AVG(lunghezza_metri) FROM astronavi);",
    hints: [
      "Crea una sottoquery scalare (SELECT AVG(lunghezza_metri) FROM astronavi).",
      "Usa l'operatore maggiore (>) nella clausola WHERE della query principale."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-081",
    title: "Battaglie e Fazione Vincitrice con Dettagli Pianeta (Multi-JOIN)",
    description: "Estrai il nome della battaglia, il nome del pianeta su cui si è combattuto, il clima del pianeta e il nome della fazione vincitrice.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT battaglie.nome AS battaglia, pianeti.nome AS pianeta, pianeti.clima, fazioni.nome AS fazione_vincitrice FROM battaglie JOIN pianeti ON battaglie.pianeta_id = pianeti.id JOIN fazioni ON battaglie.fazione_vincitrice_id = fazioni.id;",
    hints: [
      "Unisci battaglie con pianeti (battaglie.pianeta_id = pianeti.id).",
      "Unisci battaglie con fazioni (battaglie.fazione_vincitrice_id = fazioni.id)."
    ],
    relevantTables: ["battaglie", "pianeti", "fazioni"]
  },
  {
    id: "ex-082",
    title: "Fazioni con Flotta: Conteggio Navi e Lunghezza Totale",
    description: "Per ogni fazione che possiede almeno un'astronave, mostra il nome della fazione, il numero di astronavi e la somma della loro lunghezza in metri.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "GROUP BY"],
    expectedQuery: "SELECT fazioni.nome AS fazione, COUNT(astronavi.id) AS numero_navi, SUM(astronavi.lunghezza_metri) AS lunghezza_totale FROM fazioni JOIN astronavi ON fazioni.id = astronavi.fazione_id GROUP BY fazioni.nome;",
    hints: [
      "Unisci fazioni e astronavi.",
      "Raggruppa per fazioni.nome e calcola COUNT e SUM."
    ],
    relevantTables: ["fazioni", "astronavi"]
  },
  {
    id: "ex-083",
    title: "Personaggio Più Anziano per Ciascuna Fazione (Sottoquery Correlata o Raggruppamento)",
    description: "Trova il valore massimo di anno_nascita_bby (il più anziano) per ciascuna fazione, mostrando il nome della fazione e l'età massima in BBY.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "GROUP BY", "MAX"],
    expectedQuery: "SELECT fazioni.nome AS fazione, MAX(personaggi.anno_nascita_bby) AS massimo_anno_bby FROM personaggi JOIN fazioni ON personaggi.fazione_id = fazioni.id GROUP BY fazioni.nome;",
    hints: [
      "Unisci personaggi con fazioni.",
      "Raggruppa per fazioni.nome e usa MAX(personaggi.anno_nascita_bby)."
    ],
    relevantTables: ["personaggi", "fazioni"]
  },
  {
    id: "ex-084",
    title: "Pianeti la cui Popolazione Supera quella di Tatooine",
    description: "Seleziona il nome e la popolazione dei pianeti che hanno una popolazione superiore a quella di 'Tatooine', usando una sottoquery.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, popolazione FROM pianeti WHERE popolazione > (SELECT popolazione FROM pianeti WHERE nome = 'Tatooine');",
    hints: [
      "Usa una sottoquery per ricavare la popolazione di Tatooine: (SELECT popolazione FROM pianeti WHERE nome = 'Tatooine').",
      "Confronta la popolazione con l'operatore >."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-085",
    title: "Fazioni che Hanno Vinto Almeno 2 Battaglie",
    description: "Trova il nome delle fazioni che hanno vinto 2 o più battaglie, unendo battaglie e fazioni e applicando un filtro sui gruppi.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "GROUP BY", "HAVING", "COUNT"],
    expectedQuery: "SELECT fazioni.nome AS fazione, COUNT(battaglie.id) AS vittorie FROM fazioni JOIN battaglie ON fazioni.id = battaglie.fazione_vincitrice_id GROUP BY fazioni.nome HAVING COUNT(battaglie.id) >= 2;",
    hints: [
      "Unisci fazioni e battaglie.",
      "Raggruppa per fazioni.nome e filtra con HAVING COUNT(battaglie.id) >= 2."
    ],
    relevantTables: ["fazioni", "battaglie"]
  },
  {
    id: "ex-086",
    title: "Personaggi con Spada Laser Blu Nati prima di Yavin",
    description: "Mostra il nome del personaggio, il suo ruolo, l'anno di nascita e il cristallo della spada per chi possiede una spada 'Blu', unendo personaggi e spade_laser.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT personaggi.nome, personaggi.ruolo, personaggi.anno_nascita_bby, spade_laser.tipo_cristallo FROM personaggi JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id WHERE spade_laser.colore_lama = 'Blu';",
    hints: [
      "Collega personaggi e spade_laser su personaggi.id = spade_laser.personaggio_id.",
      "Filtra per colore_lama = 'Blu'."
    ],
    relevantTables: ["personaggi", "spade_laser"]
  },
  {
    id: "ex-087",
    title: "Pianeti che sono Teatri di Battaglie con Perdite Superiori alla Media",
    description: "Trova i nomi dei pianeti dove si sono svolte battaglie con perdite stimate superiori alla media delle perdite di tutte le battaglie.",
    difficulty: "difficile",
    keywords: ["SELECT", "DISTINCT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT DISTINCT pianeti.nome FROM pianeti JOIN battaglie ON pianeti.id = battaglie.pianeta_id WHERE battaglie.perdite_stimate > (SELECT AVG(perdite_stimate) FROM battaglie);",
    hints: [
      "Usa una sottoquery (SELECT AVG(perdite_stimate) FROM battaglie) nel filtro WHERE.",
      "Unisci pianeti con battaglie e usa DISTINCT."
    ],
    relevantTables: ["pianeti", "battaglie"]
  },
  {
    id: "ex-088",
    title: "Numero di Personaggi per Nome della Fazione (anche fazioni con 0 personaggi)",
    description: "Mostra il nome di TUTTE le fazioni e il numero di personaggi appartenenti a ciascuna, includendo anche le fazioni senza personaggi (LEFT JOIN).",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "LEFT JOIN", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT fazioni.nome AS fazione, COUNT(personaggi.id) AS totale_personaggi FROM fazioni LEFT JOIN personaggi ON fazioni.id = personaggi.fazione_id GROUP BY fazioni.nome;",
    hints: [
      "Usa una LEFT JOIN partendo da fazioni verso personaggi.",
      "Conta personaggi.id (e NON *) per contare 0 quando non ci sono corrispondenze."
    ],
    relevantTables: ["fazioni", "personaggi"]
  },
  {
    id: "ex-089",
    title: "Le Astronavi Più Veloci di Ciascuna Fazione",
    description: "Trova la velocità minima nell'iperguida (massima rapidità) registrata per ciascuna fazione che possiede navi, mostrando il nome della fazione e la velocità minima.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "GROUP BY", "MIN"],
    expectedQuery: "SELECT fazioni.nome AS fazione, MIN(astronavi.velocita_iperguida) AS velocita_migliore FROM fazioni JOIN astronavi ON fazioni.id = astronavi.fazione_id GROUP BY fazioni.nome;",
    hints: [
      "Unisci fazioni con astronavi.",
      "Raggruppa per fazioni.nome e usa MIN(astronavi.velocita_iperguida)."
    ],
    relevantTables: ["fazioni", "astronavi"]
  },
  {
    id: "ex-090",
    title: "Personaggi della Stessa Specie di Yoda (Sottoquery)",
    description: "Trova il nome e l'anno di nascita di tutti i personaggi appartenenti alla stessa specie di 'Yoda' (escluso Yoda stesso).",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, anno_nascita_bby FROM personaggi WHERE specie_id = (SELECT specie_id FROM personaggi WHERE nome = 'Yoda') AND nome <> 'Yoda';",
    hints: [
      "Usa una sottoquery per trovare specie_id di Yoda: (SELECT specie_id FROM personaggi WHERE nome = 'Yoda').",
      "Escludi Yoda con AND nome <> 'Yoda'."
    ],
    relevantTables: ["personaggi"]
  },
  {
    id: "ex-091",
    title: "Specie Native di Pianeti con Clima Temperato",
    description: "Mostra il nome della specie, il linguaggio e il nome del pianeta madre per le specie originarie di pianeti con clima 'temperato'.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT specie.nome AS specie, specie.linguaggio, pianeti.nome AS pianeta FROM specie JOIN pianeti ON specie.pianeta_madre_id = pianeti.id WHERE pianeti.clima = 'temperato';",
    hints: [
      "Collega specie a pianeti tramite pianeta_madre_id.",
      "Filtra dove pianeti.clima = 'temperato'."
    ],
    relevantTables: ["specie", "pianeti"]
  },
  {
    id: "ex-092",
    title: "Personaggi con Spada Laser e Dettagli del Pianeta Natale (Tripla JOIN)",
    description: "Mostra il nome del personaggio, il nome del pianeta natale e il colore della lama della sua spada laser unendo personaggi, pianeti e spade_laser.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome AS personaggio, pianeti.nome AS pianeta, spade_laser.colore_lama FROM personaggi JOIN pianeti ON personaggi.pianeta_origine_id = pianeti.id JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id;",
    hints: [
      "Esegui una JOIN con pianeti (pianeta_origine_id = pianeti.id) e una con spade_laser (personaggi.id = spade_laser.personaggio_id).",
      "Proietta i 3 attributi richiesti."
    ],
    relevantTables: ["personaggi", "pianeti", "spade_laser"]
  },
  {
    id: "ex-093",
    title: "Pianeti con Popolazione Superiore alla Somma di Tutti i Pianeti dell'Orlo Esterno",
    description: "Trova il nome e la popolazione dei pianeti la cui popolazione da sola è maggiore della popolazione totale di tutti i pianeti dell'Orlo Esterno.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE", "SUM"],
    expectedQuery: "SELECT nome, popolazione FROM pianeti WHERE popolazione > (SELECT SUM(popolazione) FROM pianeti WHERE settore_galattico = 'Orlo Esterno');",
    hints: [
      "Calcola la somma dell'Orlo Esterno in una sottoquery: (SELECT SUM(popolazione) FROM pianeti WHERE settore_galattico = 'Orlo Esterno').",
      "Confronta con la popolazione del singolo pianeta."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-094",
    title: "Fazioni che Hanno Sia Personaggi che Astronavi",
    description: "Estrai i nomi delle fazioni che hanno sia almeno un personaggio registrato sia almeno un'astronave registrata.",
    difficulty: "difficile",
    keywords: ["SELECT", "DISTINCT", "FROM", "WHERE", "IN"],
    expectedQuery: "SELECT nome FROM fazioni WHERE id IN (SELECT fazione_id FROM personaggi) AND id IN (SELECT fazione_id FROM astronavi);",
    hints: [
      "Usa due condizioni con IN: id IN (SELECT fazione_id FROM personaggi) AND id IN (SELECT fazione_id FROM astronavi).",
      "Seleziona il nome della fazione."
    ],
    relevantTables: ["fazioni", "personaggi", "astronavi"]
  },
  {
    id: "ex-095",
    title: "Perdite Complessive nelle Battaglie per Fazione Vincitrice (con Nome Fazione)",
    description: "Mostra il nome della fazione vincitrice e il totale delle perdite stimate causate nei conflitti vinti, ordinando dalla fazione con più perdite a quella con meno.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "GROUP BY", "ORDER BY", "SUM"],
    expectedQuery: "SELECT fazioni.nome AS fazione, SUM(battaglie.perdite_stimate) AS perdite_totali FROM fazioni JOIN battaglie ON fazioni.id = battaglie.fazione_vincitrice_id GROUP BY fazioni.nome ORDER BY perdite_totali DESC;",
    hints: [
      "Unisci fazioni e battaglie.",
      "Raggruppa per fazioni.nome e somma perdite_stimate con SUM().",
      "Ordina con ORDER BY perdite_totali DESC."
    ],
    relevantTables: ["fazioni", "battaglie"],
    checkOrder: true
  },
  {
    id: "ex-096",
    title: "Personaggi Sensibili alla Forza con Fazione e Ruolo Specifico",
    description: "Mostra il nome del personaggio, il suo ruolo e il leader della sua fazione per tutti i personaggi con sensibile_alla_forza = 1 e fazione non nulla.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT personaggi.nome AS personaggio, personaggi.ruolo, fazioni.leader FROM personaggi JOIN fazioni ON personaggi.fazione_id = fazioni.id WHERE personaggi.sensibile_alla_forza = 1;",
    hints: [
      "Unisci personaggi con fazioni.",
      "Filtra con WHERE personaggi.sensibile_alla_forza = 1."
    ],
    relevantTables: ["personaggi", "fazioni"]
  },
  {
    id: "ex-097",
    title: "Astronavi con Equipaggio Superiore alla Media della Propria Fazione",
    description: "Trova il nome dell'astronave, il modello e la capacità equipaggio per le navi la cui capacità equipaggio supera 100 membri.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE"],
    expectedQuery: "SELECT nome, modello, capacita_equipaggio FROM astronavi WHERE capacita_equipaggio > 100;",
    hints: [
      "Filtra la tabella astronavi con capacita_equipaggio > 100.",
      "Proietta nome, modello e capacita_equipaggio."
    ],
    relevantTables: ["astronavi"]
  },
  {
    id: "ex-098",
    title: "Pianeti con Battaglie nell'Anno 0 BBY o Precedente",
    description: "Mostra il nome del pianeta e il nome della battaglia svoltasi in anno_bby <= 0 (durante o dopo la Battaglia di Yavin).",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE"],
    expectedQuery: "SELECT pianeti.nome AS pianeta, battaglie.nome AS battaglia, battaglie.anno_bby FROM pianeti JOIN battaglie ON pianeti.id = battaglie.pianeta_id WHERE battaglie.anno_bby <= 0;",
    hints: [
      "Unisci pianeti con battaglie.",
      "Filtra con battaglie.anno_bby <= 0."
    ],
    relevantTables: ["pianeti", "battaglie"]
  },
  {
    id: "ex-099",
    title: "Distribuzione Spade Laser per Tipo Cristallo e Fazione del Personaggio",
    description: "Mostra il tipo di cristallo, il nome della fazione e il conteggio delle spade laser, unendo spade_laser, personaggi e fazioni.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT spade_laser.tipo_cristallo, fazioni.nome AS fazione, COUNT(*) AS totale FROM spade_laser JOIN personaggi ON spade_laser.personaggio_id = personaggi.id JOIN fazioni ON personaggi.fazione_id = fazioni.id GROUP BY spade_laser.tipo_cristallo, fazioni.nome;",
    hints: [
      "Unisci 3 tabelle: spade_laser, personaggi, fazioni.",
      "Raggruppa sia per spade_laser.tipo_cristallo sia per fazioni.nome."
    ],
    relevantTables: ["spade_laser", "personaggi", "fazioni"]
  },
  {
    id: "ex-100",
    title: "Il Maestro e il Pianeta: Pianeti con Almeno un Maestro Jedi",
    description: "Estrai i nomi univoci dei pianeti di nascita dei personaggi che hanno il ruolo di 'Maestro Jedi' o 'Gran Maestro Jedi'.",
    difficulty: "difficile",
    keywords: ["SELECT", "DISTINCT", "FROM", "JOIN", "WHERE", "LIKE"],
    expectedQuery: "SELECT DISTINCT pianeti.nome AS pianeta FROM pianeti JOIN personaggi ON pianeti.id = personaggi.pianeta_origine_id WHERE personaggi.ruolo LIKE '%Maestro Jedi%';",
    hints: [
      "Collega pianeti con personaggi.",
      "Filtra dove personaggi.ruolo LIKE '%Maestro Jedi%'.",
      "Usa DISTINCT per evitare duplicati."
    ],
    relevantTables: ["pianeti", "personaggi"]
  },
  {
    id: "ex-101",
    title: "Fazioni Senza Battaglie Vinte (LEFT JOIN o NOT IN)",
    description: "Mostra il nome e il leader di tutte le fazioni che NON hanno vinto alcuna battaglia registrata.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE", "NOT IN"],
    expectedQuery: "SELECT nome, leader FROM fazioni WHERE id NOT IN (SELECT fazione_vincitrice_id FROM battaglie);",
    hints: [
      "Usa una sottoquery per ricavare gli ID delle fazioni vincitrici.",
      "Filtra la tabella fazioni con id NOT IN (...)."
    ],
    relevantTables: ["fazioni", "battaglie"]
  },
  {
    id: "ex-102",
    title: "Pianeti con Popolazione Maggiore di Qualsiasi Pianeta del Settore Mediano",
    description: "Seleziona il nome e la popolazione dei pianeti la cui popolazione supera il massimo di popolazione presente nell'Orlo Mediano.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "WHERE", "MAX"],
    expectedQuery: "SELECT nome, popolazione FROM pianeti WHERE popolazione > (SELECT MAX(popolazione) FROM pianeti WHERE settore_galattico = 'Orlo Mediano');",
    hints: [
      "Trova il massimo con (SELECT MAX(popolazione) FROM pianeti WHERE settore_galattico = 'Orlo Mediano').",
      "Confronta con popolazione > (...)."
    ],
    relevantTables: ["pianeti"]
  },
  {
    id: "ex-103",
    title: "Personaggi con Fazione e Dettagli Astronave della Fazione (Multi-JOIN)",
    description: "Mostra il nome del personaggio, il nome della sua fazione e il nome delle astronavi gestite da quella fazione unendo personaggi, fazioni e astronavi.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN"],
    expectedQuery: "SELECT personaggi.nome AS personaggio, fazioni.nome AS fazione, astronavi.nome AS astronave FROM personaggi JOIN fazioni ON personaggi.fazione_id = fazioni.id JOIN astronavi ON fazioni.id = astronavi.fazione_id;",
    hints: [
      "Collega personaggi con fazioni, e fazioni con astronavi su fazione_id = fazioni.id.",
      "Proietta personaggio, fazione e astronave."
    ],
    relevantTables: ["personaggi", "fazioni", "astronavi"]
  },
  {
    id: "ex-104",
    title: "Personaggi con Spada Laser Impugnatura Curva o Doppia Lama",
    description: "Trova il nome del personaggio, il suo ruolo e l'impugnatura della sua spada laser per spade con impugnatura contenente 'curva' o 'Doppia'.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "WHERE", "LIKE"],
    expectedQuery: "SELECT personaggi.nome, personaggi.ruolo, spade_laser.impugnatura FROM personaggi JOIN spade_laser ON personaggi.id = spade_laser.personaggio_id WHERE spade_laser.impugnatura LIKE '%curva%' OR spade_laser.impugnatura LIKE '%Doppia%';",
    hints: [
      "Unisci personaggi e spade_laser.",
      "Applica la condizione WHERE con LIKE su impugnatura."
    ],
    relevantTables: ["personaggi", "spade_laser"]
  },
  {
    id: "ex-105",
    title: "Riepilogo Generale Galattico: Fazioni con Conteggio Personaggi e Conteggio Navi",
    description: "Mostra il nome della fazione, il numero di personaggi appartenenti a quella fazione (conteggio calcolato) e il suo tipo.",
    difficulty: "difficile",
    keywords: ["SELECT", "FROM", "JOIN", "GROUP BY", "COUNT"],
    expectedQuery: "SELECT fazioni.nome AS fazione, fazioni.tipo, COUNT(personaggi.id) AS numero_membri FROM fazioni JOIN personaggi ON fazioni.id = personaggi.fazione_id GROUP BY fazioni.nome, fazioni.tipo;",
    hints: [
      "Unisci fazioni e personaggi.",
      "Raggruppa per fazioni.nome e fazioni.tipo, calcolando COUNT(personaggi.id)."
    ],
    relevantTables: ["fazioni", "personaggi"]
  }
];

export const AVAILABLE_KEYWORDS = [
  { id: "SELECT", label: "SELECT", description: "Proiezione di colonne ed espressioni", isDefault: true },
  { id: "FROM", label: "FROM", description: "Sorgenti dati e tabelle", isDefault: true },
  { id: "WHERE", label: "WHERE", description: "Filtri sulle righe", isDefault: true },
  { id: "GROUP BY", label: "GROUP BY", description: "Raggruppamenti aggregati", isDefault: true },
  { id: "ORDER BY", label: "ORDER BY", description: "Ordinamento risultati (ASC / DESC)", isDefault: true },
  { id: "JOIN", label: "JOIN", description: "Unione tra tabelle (INNER / LEFT JOIN)", isDefault: false },
  { id: "HAVING", label: "HAVING", description: "Filtri sui gruppi aggregati", isDefault: false },
  { id: "LIMIT", label: "LIMIT", description: "Limitazione del numero di righe", isDefault: false },
  { id: "DISTINCT", label: "DISTINCT", description: "Eliminazione dei valori duplicati", isDefault: false },
  { id: "LIKE", label: "LIKE", description: "Pattern matching con caratteri jolly (%)", isDefault: false },
  { id: "COUNT", label: "COUNT", description: "Conteggio delle righe o valori non nulli", isDefault: false },
  { id: "SUM", label: "SUM", description: "Somma di valori numerici", isDefault: false },
  { id: "AVG", label: "AVG", description: "Media aritmetica dei valori", isDefault: false },
  { id: "MIN", label: "MIN", description: "Valore minimo in un gruppo", isDefault: false },
  { id: "MAX", label: "MAX", description: "Valore massimo in un gruppo", isDefault: false },
  { id: "NOT IN", label: "NOT IN / Sottoquery", description: "Sottoquery di esclusione o appartenenza", isDefault: false }
];
