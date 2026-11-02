import { SqlTable } from "../types";

export const STAR_WARS_SCHEMA: SqlTable[] = [
  {
    name: "personaggi",
    label: "Personaggi",
    description: "Eroi, maestri Jedi, signori dei Sith, contrabbandieri e comandanti della galassia.",
    columns: [
      { name: "id", type: "INTEGER", isPrimaryKey: true, description: "Identificativo univoco del personaggio" },
      { name: "nome", type: "VARCHAR(50)", description: "Nome completo o identificativo del personaggio" },
      { name: "specie_id", type: "INTEGER", isForeignKey: true, references: { table: "specie", column: "id" }, description: "ID della specie biologica o droide" },
      { name: "pianeta_origine_id", type: "INTEGER", isForeignKey: true, references: { table: "pianeti", column: "id" }, description: "ID del pianeta natale" },
      { name: "fazione_id", type: "INTEGER", isForeignKey: true, references: { table: "fazioni", column: "id" }, description: "ID dell'organizzazione di appartenenza" },
      { name: "anno_nascita_bby", type: "INTEGER", description: "Anno di nascita prima della Battaglia di Yavin (BBY)" },
      { name: "sensibile_alla_forza", type: "BOOLEAN", description: "Se il personaggio controlla la Forza (1=Sì, 0=No)" },
      { name: "ruolo", type: "VARCHAR(50)", description: "Titolo, grado o professione (es: Maestro Jedi, Pilota, Cacciatore di taglie)" }
    ]
  },
  {
    name: "pianeti",
    label: "Pianeti",
    description: "Mondi della galassia, dai deserti dell'Orlo Esterno alle ecumenopoli del Nucleo.",
    columns: [
      { name: "id", type: "INTEGER", isPrimaryKey: true, description: "Identificativo univoco del pianeta" },
      { name: "nome", type: "VARCHAR(50)", description: "Nome del pianeta" },
      { name: "clima", type: "VARCHAR(50)", description: "Condizioni climatiche prevalenti (arido, temperato, ghiacciato, tropicale)" },
      { name: "terreno", type: "VARCHAR(50)", description: "Tipologia di superficie (deserto, foresta, città-pianeta, palude)" },
      { name: "popolazione", type: "BIGINT", description: "Numero totale di abitanti registrati" },
      { name: "settore_galattico", type: "VARCHAR(50)", description: "Regione (Nucleo Profondo, Orlo Interno, Orlo Mediano, Orlo Esterno)" }
    ]
  },
  {
    name: "fazioni",
    label: "Fazioni",
    description: "Governi, alleanze, corporazioni militari e ordini filosofici.",
    columns: [
      { name: "id", type: "INTEGER", isPrimaryKey: true, description: "Identificativo univoco della fazione" },
      { name: "nome", type: "VARCHAR(50)", description: "Denominazione ufficiale dell'alleanza o governo" },
      { name: "leader", type: "VARCHAR(50)", description: "Comandante supremo o capo di stato" },
      { name: "tipo", type: "VARCHAR(30)", description: "Tipologia (Governo, Ordine Religioso, Movimento Ribelle, Sindacato)" },
      { name: "motto", type: "VARCHAR(100)", description: "Grido di battaglia o principio cardine" }
    ]
  },
  {
    name: "specie",
    label: "Specie",
    description: "Razze senzienti e forme di vita native della galassia.",
    columns: [
      { name: "id", type: "INTEGER", isPrimaryKey: true, description: "Identificativo univoco della specie" },
      { name: "nome", type: "VARCHAR(50)", description: "Nome della specie biologica o costrutto" },
      { name: "linguaggio", type: "VARCHAR(50)", description: "Linguaggio o dialetto nativo primario" },
      { name: "aspettativa_vita_media", type: "INTEGER", description: "Durata media della vita in anni galattici standard" },
      { name: "pianeta_madre_id", type: "INTEGER", isForeignKey: true, references: { table: "pianeti", column: "id" }, description: "Pianeta di origine evolutiva" }
    ]
  },
  {
    name: "astronavi",
    label: "Astronavi",
    description: "Caccia stellari, incrociatori da battaglia, mercantili e navi ammiraglie.",
    columns: [
      { name: "id", type: "INTEGER", isPrimaryKey: true, description: "Identificativo univoco del velivolo" },
      { name: "nome", type: "VARCHAR(50)", description: "Nome dell'astronave o designazione" },
      { name: "modello", type: "VARCHAR(50)", description: "Classe o modello di fabbrica" },
      { name: "costruttore", type: "VARCHAR(60)", description: "Cantiere navale produttore" },
      { name: "lunghezza_metri", type: "DECIMAL(10,2)", description: "Lunghezza complessiva del vascello in metri" },
      { name: "velocita_iperguida", type: "DECIMAL(4,2)", description: "Moltiplicatore classe iperguida (valori minori = più veloce)" },
      { name: "capacita_equipaggio", type: "INTEGER", description: "Numero minimo o massimo di membri dell'equipaggio" },
      { name: "fazione_id", type: "INTEGER", isForeignKey: true, references: { table: "fazioni", column: "id" }, description: "Fazione proprietaria o operatrice" }
    ]
  },
  {
    name: "spade_laser",
    label: "Spade Laser",
    description: "Armi nobili dei Cavalieri Jedi e dei Guerrieri Oscuri Sith.",
    columns: [
      { name: "id", type: "INTEGER", isPrimaryKey: true, description: "Identificativo univoco della spada" },
      { name: "personaggio_id", type: "INTEGER", isForeignKey: true, references: { table: "personaggi", column: "id" }, description: "ID del legittimo proprietario o possessore" },
      { name: "colore_lama", type: "VARCHAR(30)", description: "Colore del fascio al plasma (Blu, Verde, Rosso, Viola, Bianco, Giallo)" },
      { name: "tipo_cristallo", type: "VARCHAR(50)", description: "Origine del cristallo Kyber (Ilum, Adegan, Sintetico, Purificato)" },
      { name: "impugnatura", type: "VARCHAR(50)", description: "Stile dell'elsa (Standard, Curva, Doppia lama, Guardia incrociata)" }
    ]
  },
  {
    name: "battaglie",
    label: "Battaglie",
    description: "Grandi scontri e conflitti epici che hanno deciso il destino della galassia.",
    columns: [
      { name: "id", type: "INTEGER", isPrimaryKey: true, description: "Identificativo univoco dello scontro" },
      { name: "nome", type: "VARCHAR(60)", description: "Nome storico del conflitto" },
      { name: "pianeta_id", type: "INTEGER", isForeignKey: true, references: { table: "pianeti", column: "id" }, description: "Teatro della battaglia" },
      { name: "anno_bby", type: "INTEGER", description: "Anno di svolgimento in BBY (prima di Yavin)" },
      { name: "fazione_vincitrice_id", type: "INTEGER", isForeignKey: true, references: { table: "fazioni", column: "id" }, description: "Fazione che ha trionfato nel conflitto" },
      { name: "perdite_stimate", type: "INTEGER", description: "Stima complessiva dei caduti o navi distrutte" }
    ]
  }
];

export const STAR_WARS_SEED_SQL = `
-- Crea tabelle
CREATE TABLE pianeti (
  id INT PRIMARY KEY,
  nome STRING,
  clima STRING,
  terreno STRING,
  popolazione BIGINT,
  settore_galattico STRING
);

CREATE TABLE fazioni (
  id INT PRIMARY KEY,
  nome STRING,
  leader STRING,
  tipo STRING,
  motto STRING
);

CREATE TABLE specie (
  id INT PRIMARY KEY,
  nome STRING,
  linguaggio STRING,
  aspettativa_vita_media INT,
  pianeta_madre_id INT
);

CREATE TABLE personaggi (
  id INT PRIMARY KEY,
  nome STRING,
  specie_id INT,
  pianeta_origine_id INT,
  fazione_id INT,
  anno_nascita_bby INT,
  sensibile_alla_forza INT,
  ruolo STRING
);

CREATE TABLE astronavi (
  id INT PRIMARY KEY,
  nome STRING,
  modello STRING,
  costruttore STRING,
  lunghezza_metri FLOAT,
  velocita_iperguida FLOAT,
  capacita_equipaggio INT,
  fazione_id INT
);

CREATE TABLE spade_laser (
  id INT PRIMARY KEY,
  personaggio_id INT,
  colore_lama STRING,
  tipo_cristallo STRING,
  impugnatura STRING
);

CREATE TABLE battaglie (
  id INT PRIMARY KEY,
  nome STRING,
  pianeta_id INT,
  anno_bby INT,
  fazione_vincitrice_id INT,
  perdite_stimate INT
);

-- Popola Pianeti
INSERT INTO pianeti VALUES
(1, 'Tatooine', 'arido', 'deserto', 200000, 'Orlo Esterno'),
(2, 'Coruscant', 'temperato', 'città-pianeta', 1000000000000, 'Nucleo Profondo'),
(3, 'Naboo', 'temperato', 'paludi e colline', 4500000000, 'Orlo Mediano'),
(4, 'Alderaan', 'temperato', 'montagne e pianure', 2000000000, 'Nucleo Profondo'),
(5, 'Hoth', 'ghiacciato', 'tundra e ghiacciai', 0, 'Orlo Esterno'),
(6, 'Dagobah', 'tropicale', 'paludi dense', 1, 'Orlo Esterno'),
(7, 'Bespin', 'temperato', 'gigante gassoso', 6000000, 'Orlo Esterno'),
(8, 'Endor', 'temperato', 'foreste e boschi', 30000000, 'Orlo Esterno'),
(9, 'Mustafar', 'torrido', 'vulcani e lava', 20000, 'Orlo Esterno'),
(10, 'Kamino', 'temperato', 'oceano globale', 1000000000, 'Spazio Selvaggio'),
(11, 'Geonosis', 'arido', 'deserto roccioso', 100000000, 'Orlo Esterno'),
(12, 'Kashyyyk', 'tropicale', 'giungla e foreste giganti', 45000000, 'Orlo Mediano'),
(13, 'Mandalore', 'arido', 'deserti e biomi artificiali', 4000000, 'Orlo Esterno'),
(14, 'Exegol', 'oscuro', 'desolato e roccioso', 50000, 'Regioni Ignote'),
(15, 'Scarif', 'tropicale', 'isole e oceani', 5000, 'Orlo Esterno');

-- Popola Fazioni
INSERT INTO fazioni VALUES
(1, 'Alleanza Ribelle', 'Mon Mothma', 'Movimento Ribelle', 'Che la Forza sia con noi'),
(2, 'Impero Galattico', 'Imperatore Palpatine', 'Governo', 'Ordine, Sicurezza, Pace'),
(3, 'Repubblica Galattica', 'Cancelliere Valorum', 'Governo', 'Uniti nella Democrazia'),
(4, 'Ordine Jedi', 'Gran Maestro Yoda', 'Ordine Religioso', 'Non c''è emozione, c''è pace'),
(5, 'Ordine Sith', 'Darth Sidious', 'Ordine Religioso', 'La pace è una menzogna, c''è solo passione'),
(6, 'Confederazione Sistemi Indipendenti', 'Conte Dooku', 'Governo', 'Libertà dalla Repubblica'),
(7, 'Gilda dei Cacciatori di Taglie', 'Greef Karga', 'Sindacato', 'La taglia è sacra'),
(8, 'Mandaloriani', 'Bo-Katan Kryze', 'Governo', 'Questa è la via');

-- Popola Specie
INSERT INTO specie VALUES
(1, 'Umano', 'Galactic Basic', 85, 2),
(2, 'Wookiee', 'Shyriiwook', 400, 12),
(3, 'Droide', 'Binario', 150, 2),
(4, 'Specie di Yoda', 'Galactic Basic', 900, 6),
(5, 'Twi''lek', 'Ryl', 80, 1),
(6, 'Zabrak', 'Zabraki', 90, 1),
(7, 'Hutt', 'Huttese', 1000, 1),
(8, 'Kaminoano', 'Kaminoan', 80, 10),
(9, 'Geonosiano', 'Geonosian', 65, 11),
(10, 'Togruta', 'Togruti', 94, 3);

-- Popola Personaggi
INSERT INTO personaggi VALUES
(1, 'Luke Skywalker', 1, 1, 1, 19, 1, 'Cavaliere Jedi'),
(2, 'Darth Vader', 1, 1, 2, 41, 1, 'Signore dei Sith'),
(3, 'Leia Organa', 1, 4, 1, 19, 1, 'Principessa e Senatrice'),
(4, 'Han Solo', 1, 2, 1, 29, 0, 'Contrabbandiere e Capitano'),
(5, 'Yoda', 4, 6, 4, 896, 1, 'Gran Maestro Jedi'),
(6, 'Obi-Wan Kenobi', 1, 2, 4, 57, 1, 'Maestro Jedi'),
(7, 'Imperatore Palpatine', 1, 3, 2, 82, 1, 'Signore Oscuro dei Sith'),
(8, 'Chewbacca', 2, 12, 1, 200, 0, 'Copilota'),
(9, 'R2-D2', 3, 3, 1, 33, 0, 'Droide Astromeccanico'),
(10, 'C-3PO', 3, 1, 1, 32, 0, 'Droide Protocollare'),
(11, 'Mace Windu', 1, 2, 4, 72, 1, 'Maestro Jedi'),
(12, 'Ahsoka Tano', 10, 3, 1, 36, 1, 'Guerriera della Forza'),
(13, 'Boba Fett', 1, 10, 7, 32, 0, 'Cacciatore di taglie'),
(14, 'Conte Dooku', 1, 3, 6, 102, 1, 'Signore dei Sith'),
(15, 'Darth Maul', 6, 1, 5, 54, 1, 'Guerriero Sith'),
(16, 'Padmé Amidala', 1, 3, 3, 46, 0, 'Regina e Senatrice'),
(17, 'Lando Calrissian', 1, 2, 1, 31, 0, 'Barone Amministratore'),
(18, 'Din Djarin', 1, 13, 8, 30, 0, 'Guerriero Mandaloriano'),
(19, 'Grogu', 4, 2, 8, 50, 1, 'Iniziato della Forza'),
(20, 'Grand Moff Tarkin', 1, 2, 2, 64, 0, 'Governatore Imperiale'),
(21, 'Cassian Andor', 1, 15, 1, 26, 0, 'Capitano dell''Intelligence'),
(22, 'Qui-Gon Jinn', 1, 2, 4, 92, 1, 'Maestro Jedi'),
(23, 'Jabba the Hutt', 7, 1, 7, 600, 0, 'Signore del Crimine'),
(24, 'Bo-Katan Kryze', 1, 13, 8, 48, 0, 'Leader Mandaloriana');

-- Popola Astronavi
INSERT INTO astronavi VALUES
(1, 'Millennium Falcon', 'YT-1300f', 'Corellian Engineering', 34.75, 0.50, 4, 1),
(2, 'X-wing Red 5', 'T-65B X-wing', 'Incom Corporation', 12.50, 1.00, 1, 1),
(3, 'TIE Advanced x1', 'TIE Advanced', 'Sienar Fleet Systems', 9.20, 1.00, 1, 2),
(4, 'Star Destroyer Devastator', 'Imperial I-class', 'Kuat Drive Yards', 1600.00, 2.00, 37000, 2),
(5, 'Slave I', 'Firespray-31', 'Kuat Systems', 21.50, 0.70, 2, 7),
(6, 'Executor', 'Super Star Destroyer', 'Kuat Drive Yards', 19000.00, 2.00, 280000, 2),
(7, 'Tantive IV', 'CR90 Corvette', 'Corellian Engineering', 126.68, 2.00, 165, 1),
(8, 'Ghost', 'VCX-100', 'Corellian Engineering', 43.90, 0.50, 6, 1),
(9, 'Razor Crest', 'ST-70 Gunship', 'Pre-Empire Yards', 24.00, 1.20, 2, 8),
(10, 'Jedi Interceptor', 'Eta-2 Actis', 'Kuat Systems Engineering', 5.47, 1.00, 1, 4),
(11, 'Invisible Hand', 'Providence-class', 'Free Dac Volunteers', 1088.00, 1.50, 600, 6),
(12, 'Y-wing Gold Leader', 'BTL-A4 Y-wing', 'Koensayr Manufacturing', 16.20, 1.00, 2, 1);

-- Popola Spade Laser
INSERT INTO spade_laser VALUES
(1, 1, 'Verde', 'Kyber di Ilum', 'Standard in lega metallica'),
(2, 2, 'Rosso', 'Kyber Sanguinante', 'Standard pesante nera'),
(3, 5, 'Verde', 'Kyber di Ilum', 'Miniatura shoto'),
(4, 6, 'Blu', 'Kyber di Ilum', 'Standard classica'),
(5, 7, 'Rosso', 'Kyber Sintetico', 'Elegante dorata'),
(6, 11, 'Viola', 'Kyber di Hurrikaine', 'Elettroplaccata in Electrum'),
(7, 12, 'Bianco', 'Kyber Purificato', 'Doppia elva curva'),
(8, 14, 'Rosso', 'Kyber Sintetico', 'Impugnatura curva da duello'),
(9, 15, 'Rosso', 'Kyber Sintetico', 'Doppia lama a bastone'),
(10, 22, 'Verde', 'Kyber di Adegan', 'Robusta scanalata');

-- Popola Battaglie
INSERT INTO battaglie VALUES
(1, 'Battaglia di Yavin', 8, 0, 1, 35000),
(2, 'Battaglia di Hoth', 5, -3, 2, 1200),
(3, 'Battaglia di Endor', 8, -4, 1, 75000),
(4, 'Battaglia di Geonosis', 11, 22, 3, 23000),
(5, 'Battaglia di Coruscant', 2, 19, 3, 15000),
(6, 'Battaglia di Scarif', 15, 0, 2, 8500),
(7, 'Battaglia di Mustafar', 9, 19, 2, 50),
(8, 'Battaglia di Naboo', 3, 32, 3, 4500),
(9, 'Battaglia di Kamino', 10, 21, 3, 6200);
`;
