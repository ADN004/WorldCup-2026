import type { LineupPlayer, SubstitutePlayer, TeamLineupData } from '@/types'

// Coordinate system:
//   x: 0 = left touchline, 100 = right touchline (from GK's perspective)
//   y: 0 = opposition goal, 100 = own goal  (GK sits near y=88)

export const LINEUPS: Record<string, TeamLineupData> = {

  // ── Argentina · Group J · 4-3-3 ────────────────────────────────────────
  'argentina': {
    formation: '4-3-3',
    players: [
      { name: 'E. Martínez',   number: 23, pos: 'GK',  x: 50, y: 88 },
      { name: 'Tagliafico',    number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Otamendi',      number: 19, pos: 'DEF', x: 38, y: 70 },
      { name: 'Romero',        number: 13, pos: 'DEF', x: 62, y: 70 },
      { name: 'Molina',        number: 26, pos: 'DEF', x: 85, y: 72 },
      { name: 'Mac Allister',  number: 20, pos: 'MID', x: 22, y: 48 },
      { name: 'De Paul',       number:  7, pos: 'MID', x: 50, y: 45 },
      { name: 'E. Fernández',  number: 24, pos: 'MID', x: 78, y: 48 },
      { name: 'N. González',   number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Álvarez',       number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Messi',         number: 10, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'G. Rulli',      number: 12, pos: 'GK'  },
      { name: 'Li. Martínez',  number: 25, pos: 'DEF' },
      { name: 'Barco',         number: 18, pos: 'MID' },
      { name: 'Lo Celso',      number: 14, pos: 'MID' },
      { name: 'Palacios',      number: 21, pos: 'MID' },
      { name: 'Lautaro',       number: 22, pos: 'FWD' },
      { name: 'Almada',        number: 17, pos: 'FWD' },
    ],
  },

  // ── France · Group I · 4-3-3 ───────────────────────────────────────────
  'france': {
    formation: '4-3-3',
    players: [
      { name: 'Maignan',        number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Digne',          number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Konaté',         number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Saliba',         number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Gusto',          number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Zaïre-Emery',   number: 15, pos: 'MID', x: 22, y: 48 },
      { name: 'Tchouaméni',    number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Koné',           number: 14, pos: 'MID', x: 78, y: 48 },
      { name: 'Barcola',        number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Mbappé',         number: 10, pos: 'FWD', x: 50, y: 15 },
      { name: 'Dembélé',        number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'B. Samba',       number: 16, pos: 'GK'  },
      { name: 'Upamecano',      number: 23, pos: 'DEF' },
      { name: 'L. Hernandez',   number: 21, pos: 'DEF' },
      { name: 'Kanté',          number: 13, pos: 'MID' },
      { name: 'Rabiot',         number:  6, pos: 'MID' },
      { name: 'M. Thuram',      number:  9, pos: 'FWD' },
      { name: 'Olise',          number: 17, pos: 'FWD' },
    ],
  },

  // ── Brazil · Group C · 4-2-3-1 ─────────────────────────────────────────
  'brazil': {
    formation: '4-2-3-1',
    players: [
      { name: 'Alisson',       number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'G. Arana',      number:  6, pos: 'DEF', x: 15, y: 72 },
      { name: 'G. Magalhães',  number:  3, pos: 'DEF', x: 38, y: 70 },
      { name: 'Marquinhos',    number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Vanderson',     number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Gerson',        number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'B. Guimarães',  number:  5, pos: 'MID', x: 65, y: 58 },
      { name: 'Raphinha',      number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'Paquetá',       number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Rodrygo',       number:  9, pos: 'MID', x: 80, y: 40 },
      { name: 'Vinicius Jr.',  number:  7, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Ederson',       number: 22, pos: 'GK'  },
      { name: 'Militão',       number: 13, pos: 'DEF' },
      { name: 'Casemiro',      number: 17, pos: 'MID' },
      { name: 'Antony',        number: 18, pos: 'MID' },
      { name: 'Fred',          number: 21, pos: 'MID' },
      { name: 'Endrick',       number: 19, pos: 'FWD' },
    ],
  },

  // ── England · Group L · 4-2-3-1 ────────────────────────────────────────
  'england': {
    formation: '4-2-3-1',
    players: [
      { name: 'Pickford',           number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Trippier',           number: 12, pos: 'DEF', x: 15, y: 72 },
      { name: 'Guehi',              number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Stones',             number:  6, pos: 'DEF', x: 62, y: 70 },
      { name: 'Alexander-Arnold',   number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Rice',               number:  4, pos: 'MID', x: 35, y: 58 },
      { name: 'Mainoo',             number: 13, pos: 'MID', x: 65, y: 58 },
      { name: 'Foden',              number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'Bellingham',         number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Saka',               number:  7, pos: 'MID', x: 80, y: 40 },
      { name: 'Kane',               number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Ramsdale',      number: 22, pos: 'GK'  },
      { name: 'Maguire',       number: 16, pos: 'DEF' },
      { name: 'Walker',        number: 23, pos: 'DEF' },
      { name: 'Gallagher',     number:  8, pos: 'MID' },
      { name: 'Palmer',        number: 20, pos: 'FWD' },
      { name: 'Watkins',       number: 21, pos: 'FWD' },
    ],
  },

  // ── Spain · Group H · 4-3-3 ────────────────────────────────────────────
  'spain': {
    formation: '4-3-3',
    players: [
      { name: 'U. Simón',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Cucurella',   number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Laporte',     number: 14, pos: 'DEF', x: 38, y: 70 },
      { name: 'Le Normand',  number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Carvajal',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Merino',      number:  7, pos: 'MID', x: 22, y: 48 },
      { name: 'Pedri',       number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Fabián Ruiz', number: 15, pos: 'MID', x: 78, y: 48 },
      { name: 'N. Williams', number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Morata',      number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Yamal',       number: 19, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'R. Sánchez',  number: 13, pos: 'GK'  },
      { name: 'Zubimendi',   number: 17, pos: 'MID' },
      { name: 'Gavi',        number:  6, pos: 'MID' },
      { name: 'Baena',       number: 18, pos: 'MID' },
      { name: 'F. Torres',   number: 22, pos: 'FWD' },
      { name: 'Oyarzabal',   number: 21, pos: 'FWD' },
    ],
  },

  // ── Portugal · Group K · 4-2-3-1 ───────────────────────────────────────
  'portugal': {
    formation: '4-2-3-1',
    players: [
      { name: 'D. Costa',     number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'N. Mendes',    number: 19, pos: 'DEF', x: 15, y: 72 },
      { name: 'Danilo',       number:  3, pos: 'DEF', x: 38, y: 70 },
      { name: 'R. Dias',      number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Cancelo',      number: 20, pos: 'DEF', x: 85, y: 72 },
      { name: 'Palhinha',     number:  6, pos: 'MID', x: 35, y: 58 },
      { name: 'Vitinha',      number: 16, pos: 'MID', x: 65, y: 58 },
      { name: 'R. Leão',      number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'B. Silva',     number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'B. Fernandes', number:  8, pos: 'MID', x: 80, y: 40 },
      { name: 'Ronaldo',      number:  7, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'J. Sá',        number: 22, pos: 'GK'  },
      { name: 'G. Inácio',    number: 15, pos: 'DEF' },
      { name: 'R. Neves',     number: 17, pos: 'MID' },
      { name: 'D. Jota',      number: 21, pos: 'FWD' },
      { name: 'J. Félix',     number: 25, pos: 'FWD' },
      { name: 'G. Ramos',     number: 23, pos: 'FWD' },
    ],
  },

  // ── Germany · Group E · 4-2-3-1 ────────────────────────────────────────
  'germany': {
    formation: '4-2-3-1',
    players: [
      { name: 'Neuer',          number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Raum',           number:  5, pos: 'DEF', x: 15, y: 72 },
      { name: 'Schlotterbeck',  number:  3, pos: 'DEF', x: 38, y: 70 },
      { name: 'Rüdiger',        number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Kimmich',        number:  6, pos: 'DEF', x: 85, y: 72 },
      { name: 'Andrich',        number: 23, pos: 'MID', x: 35, y: 58 },
      { name: 'Groß',           number: 13, pos: 'MID', x: 65, y: 58 },
      { name: 'Sané',           number: 19, pos: 'MID', x: 20, y: 40 },
      { name: 'Musiala',        number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Wirtz',          number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Füllkrug',       number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Baumann',        number: 12, pos: 'GK'  },
      { name: 'Tah',            number: 16, pos: 'DEF' },
      { name: 'Goretzka',       number:  8, pos: 'MID' },
      { name: 'Havertz',        number:  7, pos: 'FWD' },
      { name: 'Gnabry',         number: 14, pos: 'FWD' },
      { name: 'Müller',         number: 25, pos: 'FWD' },
    ],
  },

  // ── Netherlands · Group F · 4-3-3 ──────────────────────────────────────
  'netherlands': {
    formation: '4-3-3',
    players: [
      { name: 'Verbruggen', number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Hato',       number:  6, pos: 'DEF', x: 15, y: 72 },
      { name: 'Van Dijk',   number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'De Vrij',    number:  3, pos: 'DEF', x: 62, y: 70 },
      { name: 'Dumfries',   number: 22, pos: 'DEF', x: 85, y: 72 },
      { name: 'Reijnders',  number:  8, pos: 'MID', x: 22, y: 48 },
      { name: 'F. De Jong', number: 21, pos: 'MID', x: 50, y: 45 },
      { name: 'Simons',     number: 11, pos: 'MID', x: 78, y: 48 },
      { name: 'Gakpo',      number: 18, pos: 'FWD', x: 20, y: 18 },
      { name: 'Brobbey',    number: 19, pos: 'FWD', x: 50, y: 15 },
      { name: 'Frimpong',   number: 15, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Flekken',     number: 12, pos: 'GK'  },
      { name: 'Timber',      number: 16, pos: 'DEF' },
      { name: 'Van de Beek', number: 14, pos: 'MID' },
      { name: 'De Roon',     number: 20, pos: 'MID' },
      { name: 'Depay',       number:  9, pos: 'FWD' },
      { name: 'Malen',       number:  7, pos: 'FWD' },
    ],
  },

  // ── Mexico · Group A · 4-3-3 ───────────────────────────────────────────
  'mexico': {
    formation: '4-3-3',
    players: [
      { name: 'Ochoa',       number: 13, pos: 'GK',  x: 50, y: 88 },
      { name: 'J. Sánchez',  number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Araujo',      number:  3, pos: 'DEF', x: 62, y: 70 },
      { name: 'Montes',      number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Gallardo',    number: 23, pos: 'DEF', x: 15, y: 72 },
      { name: 'Herrera',     number: 16, pos: 'MID', x: 78, y: 48 },
      { name: 'E. Álvarez',  number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Gutiérrez',   number: 18, pos: 'MID', x: 22, y: 48 },
      { name: 'Lozano',      number: 22, pos: 'FWD', x: 80, y: 18 },
      { name: 'R. Jiménez',  number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Antuna',      number: 11, pos: 'FWD', x: 20, y: 18 },
    ],
    subs: [
      { name: 'A. Cota',     number: 12, pos: 'GK'  },
      { name: 'J. Vásquez',  number: 17, pos: 'DEF' },
      { name: 'Rodríguez',   number:  6, pos: 'MID' },
      { name: 'L. Romo',     number: 10, pos: 'MID' },
      { name: 'H. Martín',   number: 15, pos: 'FWD' },
      { name: 'A. Martín',   number: 21, pos: 'FWD' },
    ],
  },

  // ── South Africa · Group A · 4-3-3 ────────────────────────────────────
  'south-africa': {
    formation: '4-3-3',
    players: [
      { name: 'R. Williams', number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Petersen',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Ngezana',     number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Kekana',      number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Mudau',       number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Mokoena',     number: 11, pos: 'MID', x: 78, y: 48 },
      { name: 'Mvala',       number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Zwane',       number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Hlongwane',   number: 22, pos: 'FWD', x: 80, y: 18 },
      { name: 'Tau',         number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Dolly',       number:  7, pos: 'FWD', x: 20, y: 18 },
    ],
    subs: [
      { name: 'B. Mothwa',   number: 12, pos: 'GK'  },
      { name: 'Mobbie',      number: 18, pos: 'DEF' },
      { name: 'Matlaba',     number: 20, pos: 'DEF' },
      { name: 'E. Dlamini',  number: 17, pos: 'MID' },
      { name: 'Shalulile',   number: 19, pos: 'FWD' },
      { name: 'Lorch',       number: 14, pos: 'FWD' },
    ],
  },

  // ── South Korea · Group A · 4-3-3 ─────────────────────────────────────
  'south-korea': {
    formation: '4-3-3',
    players: [
      { name: 'Kim S.G.',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Kim M.H.',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Kim M.J.',    number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Jung S.H.',   number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Kim J.S.',    number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Hwang I.B.',  number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Jung W.Y.',   number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Lee J.S.',    number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Lee K.I.',    number: 19, pos: 'FWD', x: 80, y: 18 },
      { name: 'Cho G.S.',    number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Son',         number:  7, pos: 'FWD', x: 20, y: 18 },
    ],
    subs: [
      { name: 'Jo H.W.',     number: 21, pos: 'GK'  },
      { name: 'Oh H.K.',     number: 16, pos: 'MID' },
      { name: 'Paik S.G.',   number: 17, pos: 'MID' },
      { name: 'Kwon C.H.',   number: 11, pos: 'FWD' },
      { name: 'Hwang H.C.',  number: 14, pos: 'FWD' },
      { name: 'Na S.H.',     number: 13, pos: 'FWD' },
    ],
  },

  // ── Czechia · Group A · 4-2-3-1 ───────────────────────────────────────
  'czechia': {
    formation: '4-2-3-1',
    players: [
      { name: 'Staněk',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Coufal',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Kalas',       number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Zima',        number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Bořil',       number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Provod',      number: 16, pos: 'MID', x: 65, y: 58 },
      { name: 'Souček',      number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'Lingr',       number: 17, pos: 'MID', x: 80, y: 40 },
      { name: 'Barák',       number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Hložek',      number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'Schick',      number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Vaclík',      number: 12, pos: 'GK'  },
      { name: 'Krejčí',      number: 15, pos: 'DEF' },
      { name: 'Sadílek',     number: 18, pos: 'MID' },
      { name: 'Černý',       number: 21, pos: 'MID' },
      { name: 'Čvančara',    number: 19, pos: 'FWD' },
      { name: 'Pešek',       number: 22, pos: 'FWD' },
    ],
  },

  // ── Canada · Group B · 4-3-3 ───────────────────────────────────────────
  'canada': {
    formation: '4-3-3',
    players: [
      { name: 'Borjan',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'A. Johnston', number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'K. Miller',   number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Vitória',     number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'A. Davies',   number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Eustáquio',   number:  7, pos: 'MID', x: 78, y: 48 },
      { name: 'I. Koné',     number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Osorio',      number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Buchanan',    number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'J. David',    number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Larin',       number: 17, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'D. St. Clair',number: 12, pos: 'GK'  },
      { name: 'S. Kennedy',  number: 15, pos: 'DEF' },
      { name: 'L. Fraser',   number: 16, pos: 'MID' },
      { name: 'Millar',      number: 14, pos: 'FWD' },
      { name: 'Shaffelburg', number: 18, pos: 'FWD' },
    ],
  },

  // ── Bosnia · Group B · 4-2-3-1 ────────────────────────────────────────
  'bosnia': {
    formation: '4-2-3-1',
    players: [
      { name: 'Vasilj',       number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Ahmedhožić',   number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Šarić',        number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Bičakčić',     number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'S. Kolasinac', number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Hadžiahmetović',number: 8, pos: 'MID', x: 65, y: 58 },
      { name: 'Pjanić',       number: 10, pos: 'MID', x: 35, y: 58 },
      { name: 'Stevanović',   number: 16, pos: 'MID', x: 80, y: 40 },
      { name: 'Šunjić',       number: 14, pos: 'MID', x: 50, y: 38 },
      { name: 'Hajradinović', number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'Demirović',    number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Šehić',        number: 12, pos: 'GK'  },
      { name: 'Cipetić',      number: 17, pos: 'DEF' },
      { name: 'Lončar',       number: 20, pos: 'MID' },
      { name: 'Menalo',       number: 22, pos: 'FWD' },
      { name: 'Musa',         number: 19, pos: 'FWD' },
    ],
  },

  // ── Qatar · Group B · 4-2-3-1 ─────────────────────────────────────────
  'qatar': {
    formation: '4-2-3-1',
    players: [
      { name: 'Barsham',     number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'P. Miguel',   number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'A. Madibo',   number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Rostom',      number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'A. Hassan',   number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Boudiaf',     number:  6, pos: 'MID', x: 65, y: 58 },
      { name: 'Hatem',       number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'Ismail',      number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Al-Haydos',   number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Afif',        number:  7, pos: 'MID', x: 20, y: 40 },
      { name: 'Ali',         number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Al-Sheeb',    number: 22, pos: 'GK'  },
      { name: 'Al-Rawi',     number: 17, pos: 'DEF' },
      { name: 'Anber',       number: 18, pos: 'MID' },
      { name: 'Assadalla',   number: 15, pos: 'FWD' },
      { name: 'Al-Aaeldin',  number: 19, pos: 'FWD' },
    ],
  },

  // ── Switzerland · Group B · 4-3-3 ─────────────────────────────────────
  'switzerland': {
    formation: '4-3-3',
    players: [
      { name: 'Kobel',       number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Widmer',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Akanji',      number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Schär',       number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'R. Rodríguez',number: 13, pos: 'DEF', x: 15, y: 72 },
      { name: 'Zakaria',     number: 15, pos: 'MID', x: 78, y: 48 },
      { name: 'Xhaka',       number: 10, pos: 'MID', x: 50, y: 45 },
      { name: 'Rieder',      number: 17, pos: 'MID', x: 22, y: 48 },
      { name: 'Duah',        number: 19, pos: 'FWD', x: 80, y: 18 },
      { name: 'Embolo',      number:  7, pos: 'FWD', x: 50, y: 15 },
      { name: 'Okafor',      number: 11, pos: 'FWD', x: 20, y: 18 },
    ],
    subs: [
      { name: 'Sommer',      number: 12, pos: 'GK'  },
      { name: 'Elvedi',      number: 20, pos: 'DEF' },
      { name: 'Freuler',     number:  8, pos: 'MID' },
      { name: 'Shaqiri',     number: 23, pos: 'FWD' },
      { name: 'Seferović',   number: 25, pos: 'FWD' },
      { name: 'Fassnacht',   number: 22, pos: 'FWD' },
    ],
  },

  // ── Morocco · Group C · 4-3-3 ─────────────────────────────────────────
  'morocco': {
    formation: '4-3-3',
    players: [
      { name: 'Bono',        number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Hakimi',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Aguerd',      number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Saiss',       number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Attiat-Allah',number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Amrabat',     number:  6, pos: 'MID', x: 78, y: 48 },
      { name: 'Ounahi',      number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Bellahyane',  number: 18, pos: 'MID', x: 22, y: 48 },
      { name: 'Ziyech',      number: 22, pos: 'FWD', x: 80, y: 18 },
      { name: 'En-Nesyri',   number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Boufal',      number: 11, pos: 'FWD', x: 20, y: 18 },
    ],
    subs: [
      { name: 'Tagnaouti',   number: 12, pos: 'GK'  },
      { name: 'El Yamiq',    number: 15, pos: 'DEF' },
      { name: 'Benoun',      number: 14, pos: 'DEF' },
      { name: 'Ezzalzouli',  number: 17, pos: 'FWD' },
      { name: 'Zaroury',     number: 19, pos: 'FWD' },
      { name: 'Sabiri',      number: 21, pos: 'MID' },
    ],
  },

  // ── Haiti · Group C · 4-4-2 ───────────────────────────────────────────
  'haiti': {
    formation: '4-4-2',
    players: [
      { name: 'Voltaire',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Remy',        number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Cornéus',     number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Florival',    number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Dorval',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Augustin',    number:  7, pos: 'MID', x: 85, y: 50 },
      { name: 'Pierre',      number:  8, pos: 'MID', x: 60, y: 48 },
      { name: 'Joseph',      number:  6, pos: 'MID', x: 40, y: 48 },
      { name: 'Cazeau',      number: 11, pos: 'MID', x: 15, y: 50 },
      { name: 'Sainté',      number:  9, pos: 'FWD', x: 65, y: 18 },
      { name: 'Guerrier',    number: 10, pos: 'FWD', x: 35, y: 18 },
    ],
    subs: [
      { name: 'Décimus',     number: 12, pos: 'GK'  },
      { name: 'Prophète',    number: 16, pos: 'DEF' },
      { name: 'Beauvais',    number: 17, pos: 'MID' },
      { name: 'Geffrard',    number: 19, pos: 'FWD' },
      { name: 'Cantave',     number: 20, pos: 'FWD' },
    ],
  },

  // ── Scotland · Group C · 4-3-3 ────────────────────────────────────────
  'scotland': {
    formation: '4-3-3',
    players: [
      { name: 'Gunn',        number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Ralston',     number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Hendry',      number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'McKenna',     number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Robertson',   number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'McGregor',    number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Gilmour',     number: 10, pos: 'MID', x: 50, y: 45 },
      { name: 'McTominay',   number:  6, pos: 'MID', x: 22, y: 48 },
      { name: 'Maeda',       number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Adams',       number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'McGinn',      number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Marshall',    number: 12, pos: 'GK'  },
      { name: 'Cooper',      number: 15, pos: 'DEF' },
      { name: 'Porteous',    number: 16, pos: 'DEF' },
      { name: 'Christie',    number: 17, pos: 'MID' },
      { name: 'Ferguson',    number: 18, pos: 'MID' },
      { name: 'Dykes',       number: 19, pos: 'FWD' },
    ],
  },

  // ── USA · Group D · 4-2-3-1 ───────────────────────────────────────────
  'usa': {
    formation: '4-2-3-1',
    players: [
      { name: 'Turner',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Dest',        number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Richards',    number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Zimmerman',   number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Robinson',    number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Musah',       number:  8, pos: 'MID', x: 65, y: 58 },
      { name: 'Adams',       number:  4, pos: 'MID', x: 35, y: 58 },
      { name: 'Sargent',     number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Reyna',       number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Weah',        number: 21, pos: 'MID', x: 20, y: 40 },
      { name: 'Pulisic',     number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Horvath',     number: 12, pos: 'GK'  },
      { name: 'Long',        number: 15, pos: 'DEF' },
      { name: 'McKennie',    number: 16, pos: 'MID' },
      { name: 'Ferreira',    number: 18, pos: 'FWD' },
      { name: 'Scally',      number: 22, pos: 'DEF' },
      { name: 'Mihailovic',  number: 17, pos: 'MID' },
    ],
  },

  // ── Paraguay · Group D · 4-3-3 ────────────────────────────────────────
  'paraguay': {
    formation: '4-3-3',
    players: [
      { name: 'Silva',       number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Alderete',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Balbuena',    number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Alonso',      number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Espinoza',    number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Cubas',       number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Villasanti',  number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Almirón',     number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Enciso',      number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Sanabria',    number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Gómez',       number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Espínola',    number: 12, pos: 'GK'  },
      { name: 'Otaz',        number: 15, pos: 'DEF' },
      { name: 'Piris',       number: 16, pos: 'MID' },
      { name: 'Gamarra',     number: 17, pos: 'MID' },
      { name: 'Duarte',      number: 19, pos: 'FWD' },
      { name: 'Rodríguez',   number: 21, pos: 'FWD' },
    ],
  },

  // ── Australia · Group D · 4-3-3 ───────────────────────────────────────
  'australia': {
    formation: '4-3-3',
    players: [
      { name: 'Ryan',        number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Degenek',     number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Rowles',      number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Burgess',     number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Behich',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Mooy',        number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Hrustic',     number: 10, pos: 'MID', x: 50, y: 45 },
      { name: 'Irvine',      number:  6, pos: 'MID', x: 22, y: 48 },
      { name: 'Atkinson',    number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Duke',        number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Leckie',      number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Vukovic',     number: 12, pos: 'GK'  },
      { name: 'Souttar',     number: 15, pos: 'DEF' },
      { name: 'Baccus',      number: 17, pos: 'MID' },
      { name: 'Goodwin',     number: 18, pos: 'FWD' },
      { name: 'Nabbout',     number: 19, pos: 'FWD' },
    ],
  },

  // ── Turkey · Group D · 4-2-3-1 ────────────────────────────────────────
  'turkey': {
    formation: '4-2-3-1',
    players: [
      { name: 'Günoök',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Müldür',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Demiral',     number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Söyüncü',     number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Kadioglu',    number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Yokuslu',     number:  6, pos: 'MID', x: 65, y: 58 },
      { name: 'Özcan',       number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'Güler',       number: 10, pos: 'MID', x: 80, y: 40 },
      { name: 'Calhanoglu',  number: 17, pos: 'MID', x: 50, y: 38 },
      { name: 'B.A. Yılmaz', number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'Akturkoglu',  number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Bayindir',    number: 12, pos: 'GK'  },
      { name: 'Kabak',       number: 15, pos: 'DEF' },
      { name: 'Ayhan',       number: 16, pos: 'DEF' },
      { name: 'Yıldız',      number: 18, pos: 'MID' },
      { name: 'Can Uzun',    number: 21, pos: 'FWD' },
      { name: 'Tosun',       number: 19, pos: 'FWD' },
    ],
  },

  // ── Curacao · Group E · 4-3-3 ─────────────────────────────────────────
  'curacao': {
    formation: '4-3-3',
    players: [
      { name: 'Hato',        number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Sno',         number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Martina',     number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Botteghin',   number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Cijntje',     number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Fer',         number:  6, pos: 'MID', x: 78, y: 48 },
      { name: 'Clasie',      number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Dörsch',      number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Aranguren',   number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Rienstra',    number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Bonevacia',   number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Rozendaal',   number: 12, pos: 'GK'  },
      { name: 'Bakboord',    number: 15, pos: 'DEF' },
      { name: 'Sulvaran',    number: 16, pos: 'MID' },
      { name: 'Kwidama',     number: 17, pos: 'MID' },
      { name: 'Metgod',      number: 19, pos: 'FWD' },
    ],
  },

  // ── Ivory Coast · Group E · 4-3-3 ─────────────────────────────────────
  'ivory-coast': {
    formation: '4-3-3',
    players: [
      { name: 'Sangaré',     number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Boly',        number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Bailly',      number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Deli',        number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Konan',       number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Sangaré',     number:  6, pos: 'MID', x: 78, y: 48 },
      { name: 'Kessié',      number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Boga',        number: 11, pos: 'MID', x: 22, y: 48 },
      { name: 'Zaha',        number: 10, pos: 'FWD', x: 20, y: 18 },
      { name: 'Haller',      number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Pépe',        number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Gbagbi',      number: 12, pos: 'GK'  },
      { name: 'Cissé',       number: 14, pos: 'DEF' },
      { name: 'Diabaté',     number: 16, pos: 'MID' },
      { name: 'Traoré',      number: 17, pos: 'MID' },
      { name: 'Gradel',      number: 19, pos: 'FWD' },
      { name: 'Cornet',      number: 21, pos: 'FWD' },
    ],
  },

  // ── Ecuador · Group E · 4-3-3 ─────────────────────────────────────────
  'ecuador': {
    formation: '4-3-3',
    players: [
      { name: 'Domínguez',   number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Preciado',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Torres',      number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Hincapié',    number:  3, pos: 'DEF', x: 38, y: 70 },
      { name: 'Estupiñán',   number: 16, pos: 'DEF', x: 15, y: 72 },
      { name: 'Caicedo',     number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Gruezo',      number:  5, pos: 'MID', x: 50, y: 45 },
      { name: 'Sarmiento',   number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Plata',       number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Enner V.',    number:  7, pos: 'FWD', x: 50, y: 15 },
      { name: 'Estrada',     number:  9, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Ramírez',     number: 12, pos: 'GK'  },
      { name: 'Arboleda',    number: 15, pos: 'DEF' },
      { name: 'Mena',        number: 17, pos: 'MID' },
      { name: 'Loor',        number: 18, pos: 'MID' },
      { name: 'Cifuentes',   number: 19, pos: 'FWD' },
      { name: 'Corozo',      number: 21, pos: 'FWD' },
    ],
  },

  // ── Japan · Group F · 4-2-3-1 ─────────────────────────────────────────
  'japan': {
    formation: '4-2-3-1',
    players: [
      { name: 'Gonda',       number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Yamane',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Itakura',     number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Yoshida',     number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Nagatomo',    number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Endo',        number:  6, pos: 'MID', x: 65, y: 58 },
      { name: 'Morita',      number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'Doan',        number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Kubo',        number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Mitoma',      number:  7, pos: 'MID', x: 20, y: 40 },
      { name: 'Ueda',        number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Schmidt',     number: 12, pos: 'GK'  },
      { name: 'Taniguchi',   number: 15, pos: 'DEF' },
      { name: 'Kamada',      number: 14, pos: 'MID' },
      { name: 'Sakai',       number: 17, pos: 'DEF' },
      { name: 'Furuhashi',   number: 18, pos: 'FWD' },
      { name: 'Maeda',       number: 19, pos: 'FWD' },
    ],
  },

  // ── Sweden · Group F · 4-3-3 ──────────────────────────────────────────
  'sweden': {
    formation: '4-3-3',
    players: [
      { name: 'Olsen',       number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Lustig',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Lindelöf',    number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Danielson',   number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Augustinsson',number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Olsson',      number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Ekdal',       number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Svensson',    number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Forsberg',    number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Gyökeres',    number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Elanga',      number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Nordfeldt',   number: 12, pos: 'GK'  },
      { name: 'Bengtsson',   number: 15, pos: 'DEF' },
      { name: 'Claesson',    number: 16, pos: 'MID' },
      { name: 'Quaison',     number: 17, pos: 'FWD' },
      { name: 'Isak',        number: 19, pos: 'FWD' },
      { name: 'Celik',       number: 20, pos: 'DEF' },
    ],
  },

  // ── Tunisia · Group F · 4-3-3 ─────────────────────────────────────────
  'tunisia': {
    formation: '4-3-3',
    players: [
      { name: 'Dahmen',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Ghandri',     number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Talbi',       number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Meriah',      number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Abdi',        number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Laidouni',    number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Skhiri',      number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Ben Romdhane',number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Drager',      number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Jebali',      number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Khazri',      number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Ben Said',    number: 12, pos: 'GK'  },
      { name: 'Msakni',      number: 15, pos: 'MID' },
      { name: 'Sassi',       number: 17, pos: 'MID' },
      { name: 'Slimane',     number: 18, pos: 'FWD' },
      { name: 'Jaziri',      number: 19, pos: 'FWD' },
    ],
  },

  // ── Belgium · Group G · 4-3-3 ─────────────────────────────────────────
  'belgium': {
    formation: '4-3-3',
    players: [
      { name: 'Casteels',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Castagne',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Faes',        number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Vertonghen',  number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Theate',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'De Bruyne',   number:  7, pos: 'MID', x: 78, y: 48 },
      { name: 'Tielemans',   number:  8, pos: 'MID', x: 50, y: 45 },
      { name: 'Mangala',     number:  6, pos: 'MID', x: 22, y: 48 },
      { name: 'Doku',        number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Lukaku',      number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Trossard',    number: 10, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Mignolet',    number: 12, pos: 'GK'  },
      { name: 'Alderweireld',number: 15, pos: 'DEF' },
      { name: 'Witsel',      number: 14, pos: 'MID' },
      { name: 'Vanaken',     number: 17, pos: 'MID' },
      { name: 'Batshuayi',   number: 23, pos: 'FWD' },
      { name: 'Openda',      number: 19, pos: 'FWD' },
    ],
  },

  // ── Egypt · Group G · 4-2-3-1 ─────────────────────────────────────────
  'egypt': {
    formation: '4-2-3-1',
    players: [
      { name: 'El-Hadary',   number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Kamal',       number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'El-Wensh',    number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Hegazi',      number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Ashraf',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Elneny',      number:  8, pos: 'MID', x: 65, y: 58 },
      { name: 'Hamdi',       number:  6, pos: 'MID', x: 35, y: 58 },
      { name: 'Trezeguet',   number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Salah',       number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Ramadan',     number:  7, pos: 'MID', x: 20, y: 40 },
      { name: 'Mostafa M.',  number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'El-Shenawy',  number: 12, pos: 'GK'  },
      { name: 'Farouk',      number: 15, pos: 'DEF' },
      { name: 'Marmoush',    number: 17, pos: 'FWD' },
      { name: 'Shobeir',     number: 16, pos: 'MID' },
      { name: 'Zizo',        number: 19, pos: 'FWD' },
    ],
  },

  // ── Iran · Group G · 4-2-3-1 ──────────────────────────────────────────
  'iran': {
    formation: '4-2-3-1',
    players: [
      { name: 'Beiranvand',  number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Mohammadi',   number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Hosseini',    number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Pouraliganji',number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Hajsafi',     number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Noorollahi',  number:  6, pos: 'MID', x: 65, y: 58 },
      { name: 'Ezatolahi',   number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'Azmoun',      number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Gholizadeh',  number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Jahanbakhsh', number:  7, pos: 'MID', x: 20, y: 40 },
      { name: 'Taremi',      number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Rahmati',     number: 12, pos: 'GK'  },
      { name: 'Rezaeian',    number: 15, pos: 'DEF' },
      { name: 'Karimi',      number: 17, pos: 'MID' },
      { name: 'Sarlak',      number: 16, pos: 'MID' },
      { name: 'Ansarifard',  number: 19, pos: 'FWD' },
    ],
  },

  // ── New Zealand · Group G · 4-3-3 ─────────────────────────────────────
  'new-zealand': {
    formation: '4-3-3',
    players: [
      { name: 'Sail',        number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Bell',        number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Woud',        number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Cacace',      number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Just',        number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Loyd',        number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Garbett',     number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'R. de Silva',  number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'A. Wood',     number:  9, pos: 'FWD', x: 80, y: 18 },
      { name: 'Brockie',     number: 11, pos: 'FWD', x: 50, y: 15 },
      { name: 'McGarry',     number:  7, pos: 'FWD', x: 20, y: 18 },
    ],
    subs: [
      { name: 'Friend',      number: 12, pos: 'GK'  },
      { name: 'Boxall',      number: 15, pos: 'DEF' },
      { name: 'Clapham',     number: 16, pos: 'MID' },
      { name: 'Ridenton',    number: 17, pos: 'MID' },
      { name: 'Payne',       number: 19, pos: 'FWD' },
    ],
  },

  // ── Cape Verde · Group H · 4-3-3 ──────────────────────────────────────
  'cape-verde': {
    formation: '4-3-3',
    players: [
      { name: 'Vozinha',     number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Stopira',     number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Rober',       number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Kenny',       number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Cafu',        number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Andrade',     number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Fortes',      number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Tavares',     number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Jamur',       number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Nene',        number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Ryan Mendes', number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Kofre',       number: 12, pos: 'GK'  },
      { name: 'Lua Lua',     number: 15, pos: 'DEF' },
      { name: 'Lopes',       number: 17, pos: 'MID' },
      { name: 'Varela',      number: 18, pos: 'FWD' },
      { name: 'Monteiro',    number: 19, pos: 'FWD' },
    ],
  },

  // ── Saudi Arabia · Group H · 4-2-3-1 ──────────────────────────────────
  'saudi-arabia': {
    formation: '4-2-3-1',
    players: [
      { name: 'Al-Owais',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Al-Burayk',   number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Al-Amri',     number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Al-Tambakti', number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Abdulhamid',  number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Kanno',       number:  8, pos: 'MID', x: 65, y: 58 },
      { name: 'Al-Malki',    number:  6, pos: 'MID', x: 35, y: 58 },
      { name: 'Al-Dawsari',  number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Al-Shehri',   number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'Al-Ghannam',  number:  7, pos: 'MID', x: 20, y: 40 },
      { name: 'Al-Buraikan', number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Al-Yami',     number: 12, pos: 'GK'  },
      { name: 'Al-Shahrani', number: 15, pos: 'DEF' },
      { name: 'Al-Faraj',    number: 16, pos: 'MID' },
      { name: 'Al-Qasem',    number: 17, pos: 'MID' },
      { name: 'Bahebri',     number: 19, pos: 'FWD' },
    ],
  },

  // ── Uruguay · Group H · 4-3-3 ─────────────────────────────────────────
  'uruguay': {
    formation: '4-3-3',
    players: [
      { name: 'Rochet',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Nández',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Giménez',     number:  3, pos: 'DEF', x: 62, y: 70 },
      { name: 'Godín',       number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Viña',        number: 22, pos: 'DEF', x: 15, y: 72 },
      { name: 'Bentancur',   number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Torreira',    number:  5, pos: 'MID', x: 50, y: 45 },
      { name: 'Valverde',    number: 14, pos: 'MID', x: 22, y: 48 },
      { name: 'De Arrascaeta',number:10, pos: 'FWD', x: 20, y: 18 },
      { name: 'Suárez',      number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Cavani',      number: 21, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Muslera',     number: 12, pos: 'GK'  },
      { name: 'Coates',      number: 15, pos: 'DEF' },
      { name: 'Vecino',      number: 18, pos: 'MID' },
      { name: 'Maxi Gómez',  number: 17, pos: 'FWD' },
      { name: 'Facundo T.',  number: 19, pos: 'FWD' },
      { name: 'R. Benta.',   number: 11, pos: 'FWD' },
    ],
  },

  // ── Senegal · Group I · 4-3-3 ─────────────────────────────────────────
  'senegal': {
    formation: '4-3-3',
    players: [
      { name: 'É. Mendy',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'El H. Diouf', number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Koulibaly',   number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Niakhaté',    number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Jakobs',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'P.M. Sarr',   number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'L. Camara',   number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'I. Gueye',    number: 17, pos: 'MID', x: 22, y: 48 },
      { name: 'I. Sarr',     number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Mané',        number: 10, pos: 'FWD', x: 50, y: 15 },
      { name: 'N. Jackson',  number:  9, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Y. Diouf',    number: 12, pos: 'GK'  },
      { name: 'M. Sarr',     number: 15, pos: 'DEF' },
      { name: 'P. Gueye',    number: 18, pos: 'MID' },
      { name: 'H. Diarra',   number: 16, pos: 'MID' },
      { name: 'Diao',        number: 19, pos: 'FWD' },
      { name: 'Il. Ndiaye',  number: 21, pos: 'FWD' },
    ],
  },

  // ── Iraq · Group I · 4-4-2 ────────────────────────────────────────────
  'iraq': {
    formation: '4-4-2',
    players: [
      { name: 'J. Hassan',   number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'F. Putros',   number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'M. Younis',   number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'A. Hashim',   number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'H. Ali',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Z. Iqbal',    number:  8, pos: 'MID', x: 85, y: 50 },
      { name: 'A. Al-Ammari',number:  6, pos: 'MID', x: 60, y: 48 },
      { name: 'A. Jasim',    number: 10, pos: 'MID', x: 40, y: 48 },
      { name: 'M. Farji',    number: 11, pos: 'MID', x: 15, y: 50 },
      { name: 'A. Hussein',  number:  9, pos: 'FWD', x: 65, y: 18 },
      { name: 'Al-Hamadi',   number:  7, pos: 'FWD', x: 35, y: 18 },
    ],
    subs: [
      { name: 'F. Talib',    number: 12, pos: 'GK'  },
      { name: 'M. Doski',    number: 15, pos: 'DEF' },
      { name: 'I. Bayesh',   number: 16, pos: 'MID' },
      { name: 'K. Yakob',    number: 17, pos: 'MID' },
      { name: 'A. Qasem',    number: 18, pos: 'MID' },
      { name: 'M. Ali',      number: 19, pos: 'FWD' },
    ],
  },

  // ── Norway · Group I · 4-3-3 ──────────────────────────────────────────
  'norway': {
    formation: '4-3-3',
    players: [
      { name: 'Ø. Nyland',   number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Ryerson',     number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Østigård',    number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Ajer',        number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Bjørkan',     number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Ødegaard',    number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Berge',       number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Aursnes',     number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Nusa',        number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Haaland',     number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Sørloth',     number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'E. Selvik',   number: 12, pos: 'GK'  },
      { name: 'Heggem',      number: 15, pos: 'DEF' },
      { name: 'P. Berg',     number: 16, pos: 'MID' },
      { name: 'Thorstvedt',  number: 17, pos: 'MID' },
      { name: 'Bobb',        number: 18, pos: 'MID' },
      { name: 'Strand Larsen',number:19, pos: 'FWD' },
    ],
  },

  // ── Algeria · Group J · 4-2-3-1 ───────────────────────────────────────
  'algeria': {
    formation: '4-2-3-1',
    players: [
      { name: 'L. Zidane',   number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Aït-Nouri',   number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Bensebaini',  number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Mandi',       number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Hadjam',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Bentaleb',    number:  6, pos: 'MID', x: 65, y: 58 },
      { name: 'Zerrouki',    number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'Chaïbi',      number: 10, pos: 'MID', x: 80, y: 40 },
      { name: 'Aouar',       number: 17, pos: 'MID', x: 50, y: 38 },
      { name: 'I. Maza',     number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'Mahrez',      number:  7, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'Benbot',      number: 12, pos: 'GK'  },
      { name: 'Belghali',    number: 15, pos: 'DEF' },
      { name: 'Boudaoui',    number: 14, pos: 'MID' },
      { name: 'Amoura',      number: 19, pos: 'FWD' },
      { name: 'Gouiri',      number: 21, pos: 'FWD' },
      { name: 'H. Moussa',   number: 22, pos: 'FWD' },
    ],
  },

  // ── Austria · Group J · 4-2-3-1 ───────────────────────────────────────
  'austria': {
    formation: '4-2-3-1',
    players: [
      { name: 'Schlager',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Posch',       number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Danso',       number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'Lienhart',    number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'Friedl',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Laimer',      number:  8, pos: 'MID', x: 65, y: 58 },
      { name: 'Seiwald',     number:  6, pos: 'MID', x: 35, y: 58 },
      { name: 'X. Schlager', number: 10, pos: 'MID', x: 80, y: 40 },
      { name: 'Baumgartner', number: 14, pos: 'MID', x: 50, y: 38 },
      { name: 'Sabitzer',    number: 11, pos: 'MID', x: 20, y: 40 },
      { name: 'Arnautović',  number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'P. Pentz',    number: 12, pos: 'GK'  },
      { name: 'Alaba',       number: 15, pos: 'DEF' },
      { name: 'Grillitsch',  number: 16, pos: 'MID' },
      { name: 'Wanner',      number: 17, pos: 'MID' },
      { name: 'Gregoritsch', number: 18, pos: 'FWD' },
      { name: 'Kalajdžić',   number: 19, pos: 'FWD' },
    ],
  },

  // ── Jordan · Group J · 4-3-3 ──────────────────────────────────────────
  'jordan': {
    formation: '4-3-3',
    players: [
      { name: 'Abulaila',    number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'Abu Hashish', number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Abu Dahab',   number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Al-Rosan',    number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Abualnadi',   number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'Jamous',      number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Abu Taha',    number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'Al-Rawabdeh', number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Azaizeh',     number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'Al-Taamari',  number:  7, pos: 'FWD', x: 50, y: 15 },
      { name: 'Abu Zrayq',   number:  9, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'Bani Attiah', number: 12, pos: 'GK'  },
      { name: 'Nasib',       number: 15, pos: 'DEF' },
      { name: 'Ayed',        number: 16, pos: 'MID' },
      { name: 'Al-Rashdan',  number: 17, pos: 'MID' },
      { name: 'Al-Fakhouri', number: 19, pos: 'FWD' },
      { name: 'Al-Olwan',    number: 21, pos: 'FWD' },
    ],
  },

  // ── DR Congo · Group K · 4-3-3 ────────────────────────────────────────
  'dr-congo': {
    formation: '4-3-3',
    players: [
      { name: 'Y. Mvogo',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'W. Bope',       number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'O. Tshiuma',    number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'D. Mbemba',     number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'M. Bakwa',      number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'C. Akolo',      number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'Fr. Makiese',   number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'P. Bongonda',   number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Th. Balele',    number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'H. Luyindama',  number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'Th. Manzola',   number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'K. Lukoki',     number: 12, pos: 'GK'  },
      { name: 'B. Kibondo',    number: 15, pos: 'DEF' },
      { name: 'Je. Masuaku',   number: 14, pos: 'DEF' },
      { name: 'Sc. Maïa',      number: 16, pos: 'MID' },
      { name: 'Yo. Luyindula', number: 18, pos: 'MID' },
      { name: 'Ma. Mayele',    number: 19, pos: 'FWD' },
    ],
  },

  // ── Uzbekistan · Group K · 4-2-3-1 ───────────────────────────────────
  'uzbekistan': {
    formation: '4-2-3-1',
    players: [
      { name: 'I. Shatskiy',   number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'A. Ashurmatov', number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'S. Jaloliddinov',number: 5, pos: 'DEF', x: 62, y: 70 },
      { name: 'O. Akhmedov',   number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'B. Hamrobekov', number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'O. Zhamaletdinov',number: 6,pos: 'MID', x: 65, y: 58 },
      { name: 'J. Mirzayev',   number:  8, pos: 'MID', x: 35, y: 58 },
      { name: 'A. Shomurodov', number: 11, pos: 'MID', x: 80, y: 40 },
      { name: 'Kh. Tursunov',  number: 10, pos: 'MID', x: 50, y: 38 },
      { name: 'U. Rakhimov',   number:  7, pos: 'MID', x: 20, y: 40 },
      { name: 'E. Shomurodov', number:  9, pos: 'FWD', x: 50, y: 18 },
    ],
    subs: [
      { name: 'U. Nishonov',   number: 12, pos: 'GK'  },
      { name: 'D. Ortiqov',    number: 15, pos: 'DEF' },
      { name: 'J. Abdullaev',  number: 16, pos: 'MID' },
      { name: 'P. Tashkentov', number: 17, pos: 'MID' },
      { name: 'I. Kobilov',    number: 18, pos: 'FWD' },
      { name: 'M. Alijonov',   number: 19, pos: 'FWD' },
    ],
  },

  // ── Colombia · Group K · 4-3-3 ────────────────────────────────────────
  'colombia': {
    formation: '4-3-3',
    players: [
      { name: 'D. Ospina',     number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'D. Muñoz',      number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'Y. Mina',       number:  4, pos: 'DEF', x: 62, y: 70 },
      { name: 'D. Sánchez',    number:  5, pos: 'DEF', x: 38, y: 70 },
      { name: 'J. Mojica',     number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'R. Arias',      number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'J. Lerma',      number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'J. Cuadrado',   number:  7, pos: 'MID', x: 22, y: 48 },
      { name: 'L. Díaz',       number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'R. Falcao',     number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'L. Sinisterra', number: 10, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'C. Vargas',     number: 12, pos: 'GK'  },
      { name: 'E. Mena',       number: 15, pos: 'DEF' },
      { name: 'M. Uribe',      number: 16, pos: 'MID' },
      { name: 'J. Quintero',   number: 17, pos: 'MID' },
      { name: 'M. Borja',      number: 18, pos: 'FWD' },
      { name: 'A. Borre',      number: 19, pos: 'FWD' },
    ],
  },

  // ── Croatia · Group L · 4-3-3 ─────────────────────────────────────────
  'croatia': {
    formation: '4-3-3',
    players: [
      { name: 'D. Livaković',  number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'J. Šutalo',     number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'J. Gvardiol',   number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'Do. Vida',      number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'B. Sosa',       number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'M. Kovačić',    number:  8, pos: 'MID', x: 78, y: 48 },
      { name: 'M. Brozović',   number:  6, pos: 'MID', x: 50, y: 45 },
      { name: 'L. Modrić',     number: 10, pos: 'MID', x: 22, y: 48 },
      { name: 'Iv. Perišić',   number: 11, pos: 'FWD', x: 20, y: 18 },
      { name: 'A. Kramarić',   number:  9, pos: 'FWD', x: 50, y: 15 },
      { name: 'B. Pašalić',    number:  7, pos: 'FWD', x: 80, y: 18 },
    ],
    subs: [
      { name: 'I. Grbić',      number: 12, pos: 'GK'  },
      { name: 'De. Lovren',    number: 15, pos: 'DEF' },
      { name: 'Ma. Stanišić',  number: 16, pos: 'DEF' },
      { name: 'L. Ivanušec',   number: 17, pos: 'MID' },
      { name: 'Mi. Baturina',  number: 18, pos: 'MID' },
      { name: 'M. Budimir',    number: 19, pos: 'FWD' },
    ],
  },

  // ── Ghana · Group L · 4-4-2 ───────────────────────────────────────────
  'ghana': {
    formation: '4-4-2',
    players: [
      { name: 'L. Ati-Zigi',   number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'A. Lamptey',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'D. Djiku',      number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'A. Amartey',    number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Baba Rahman',   number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'T. Partey',     number:  6, pos: 'MID', x: 85, y: 50 },
      { name: 'S. Kudus',      number:  8, pos: 'MID', x: 60, y: 48 },
      { name: 'I. Ayew',       number: 10, pos: 'MID', x: 40, y: 48 },
      { name: 'J. Ayew',       number: 11, pos: 'MID', x: 15, y: 50 },
      { name: 'I. Williams',   number:  9, pos: 'FWD', x: 65, y: 18 },
      { name: 'A. Fatawu',     number:  7, pos: 'FWD', x: 35, y: 18 },
    ],
    subs: [
      { name: 'J. Wollacott',  number: 12, pos: 'GK'  },
      { name: 'A. Odoi',       number: 15, pos: 'DEF' },
      { name: 'E. Nkrumah',    number: 16, pos: 'DEF' },
      { name: 'E. Acquah',     number: 17, pos: 'MID' },
      { name: 'O. Paintsil',   number: 18, pos: 'FWD' },
      { name: 'K. Mensah',     number: 19, pos: 'FWD' },
    ],
  },

  // ── Panama · Group L · 4-4-2 ──────────────────────────────────────────
  'panama': {
    formation: '4-4-2',
    players: [
      { name: 'L. Mejía',      number:  1, pos: 'GK',  x: 50, y: 88 },
      { name: 'M. Murillo',    number:  2, pos: 'DEF', x: 85, y: 72 },
      { name: 'R. Waterman',   number:  5, pos: 'DEF', x: 62, y: 70 },
      { name: 'An. Murillo',   number:  4, pos: 'DEF', x: 38, y: 70 },
      { name: 'Ér. Davis',     number:  3, pos: 'DEF', x: 15, y: 72 },
      { name: 'A. Carrasquilla',number:  6, pos: 'MID', x: 85, y: 50 },
      { name: 'A. Godoy',      number:  8, pos: 'MID', x: 60, y: 48 },
      { name: 'B. Fajardo',    number: 10, pos: 'MID', x: 40, y: 48 },
      { name: 'C. Góndola',    number: 11, pos: 'MID', x: 15, y: 50 },
      { name: 'R. Torres',     number:  9, pos: 'FWD', x: 65, y: 18 },
      { name: 'G. Torres',     number:  7, pos: 'FWD', x: 35, y: 18 },
    ],
    subs: [
      { name: 'J. Penedo',     number: 12, pos: 'GK'  },
      { name: 'H. Anderson',   number: 15, pos: 'DEF' },
      { name: 'M. Taylor',     number: 16, pos: 'DEF' },
      { name: 'Cr. Martínez',  number: 17, pos: 'MID' },
      { name: 'I. Tejada',     number: 18, pos: 'MID' },
      { name: 'G. Benitez',    number: 19, pos: 'FWD' },
    ],
  },

}

export function getLineup(teamId: string): TeamLineupData | null {
  return LINEUPS[teamId] ?? null
}
