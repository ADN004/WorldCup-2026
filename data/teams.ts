import type { Team } from '@/types'

export const TEAMS: Team[] = [
  // ── Group A: Mexico, South Africa, South Korea, Czechia ──────────────────
  {
    id: 'mexico', name: 'Mexico', shortName: 'MEX', code: 'mx',
    group: 'A', fifaRanking: 15, flagEmoji: '🇲🇽',
    primaryColor: '#006847', secondaryColor: '#CE1126',
    coach: 'Javier Aguirre', continent: 'CONCACAF',
    worldCupAppearances: 17, bestResult: 'Quarterfinals (1970, 1986)',
    founded: 1927, homeStadium: 'Estadio Azteca', fanBase: 9.5,
  },
  {
    id: 'south-africa', name: 'South Africa', shortName: 'RSA', code: 'za',
    group: 'A', fifaRanking: 40, flagEmoji: '🇿🇦',
    primaryColor: '#007A4D', secondaryColor: '#FFB81C',
    coach: 'Hugo Broos', continent: 'CAF',
    worldCupAppearances: 4, bestResult: 'Group Stage (2010 – host)',
    founded: 1991, homeStadium: 'FNB Stadium', fanBase: 0.8,
  },
  {
    id: 'south-korea', name: 'South Korea', shortName: 'KOR', code: 'kr',
    group: 'A', fifaRanking: 17, flagEmoji: '🇰🇷',
    primaryColor: '#CD2E3A', secondaryColor: '#003478',
    coach: 'Hong Myung-bo', continent: 'AFC',
    worldCupAppearances: 11, bestResult: 'Fourth Place (2002)',
    founded: 1928, homeStadium: 'Seoul World Cup Stadium', fanBase: 3.8,
  },
  {
    id: 'czechia', name: 'Czechia', shortName: 'CZE', code: 'cz',
    group: 'A', fifaRanking: 32, flagEmoji: '🇨🇿',
    primaryColor: '#D7141A', secondaryColor: '#11457E',
    coach: 'Ivan Hašek', continent: 'UEFA',
    worldCupAppearances: 9, bestResult: 'Runners-up (1934, 1962 as Czechoslovakia)',
    founded: 1901, homeStadium: 'Doosan Arena', fanBase: 1.0,
  },

  // ── Group B: Canada, Bosnia & Herzegovina, Qatar, Switzerland ───────────
  {
    id: 'canada', name: 'Canada', shortName: 'CAN', code: 'ca',
    group: 'B', fifaRanking: 30, flagEmoji: '🇨🇦',
    primaryColor: '#FF0000', secondaryColor: '#FFFFFF',
    coach: 'Jesse Marsch', continent: 'CONCACAF',
    worldCupAppearances: 3, bestResult: 'Group Stage',
    founded: 1912, homeStadium: 'BMO Field', fanBase: 3.0,
  },
  {
    id: 'bosnia', name: 'Bosnia & Herzegovina', shortName: 'BIH', code: 'ba',
    group: 'B', fifaRanking: 36, flagEmoji: '🇧🇦',
    primaryColor: '#002395', secondaryColor: '#FEDF00',
    coach: 'Sergej Barbarez', continent: 'UEFA',
    worldCupAppearances: 2, bestResult: 'Group Stage (2014)',
    founded: 1992, homeStadium: 'Stadion Bilino Polje', fanBase: 0.6,
  },
  {
    id: 'qatar', name: 'Qatar', shortName: 'QAT', code: 'qa',
    group: 'B', fifaRanking: 31, flagEmoji: '🇶🇦',
    primaryColor: '#8D153A', secondaryColor: '#FFFFFF',
    coach: 'Marquez López', continent: 'AFC',
    worldCupAppearances: 2, bestResult: 'Group Stage',
    founded: 1960, homeStadium: 'Lusail Iconic Stadium', fanBase: 0.4,
  },
  {
    id: 'switzerland', name: 'Switzerland', shortName: 'SUI', code: 'ch',
    group: 'B', fifaRanking: 18, flagEmoji: '🇨🇭',
    primaryColor: '#FF0000', secondaryColor: '#FFFFFF',
    coach: 'Murat Yakin', continent: 'UEFA',
    worldCupAppearances: 12, bestResult: 'Quarterfinals (1934, 1938, 1954)',
    founded: 1895, homeStadium: 'Stade de Suisse', fanBase: 1.3,
  },

  // ── Group C: Brazil, Morocco, Haiti, Scotland ────────────────────────────
  {
    id: 'brazil', name: 'Brazil', shortName: 'BRA', code: 'br',
    group: 'C', fifaRanking: 5, flagEmoji: '🇧🇷',
    primaryColor: '#009C3B', secondaryColor: '#FFDF00',
    coach: 'Carlo Ancelotti', continent: 'CONMEBOL',
    worldCupAppearances: 22, bestResult: 'Winners (1958, 1962, 1970, 1994, 2002)',
    founded: 1914, homeStadium: 'Estádio do Maracanã', fanBase: 18.5,
  },
  {
    id: 'morocco', name: 'Morocco', shortName: 'MAR', code: 'ma',
    group: 'C', fifaRanking: 12, flagEmoji: '🇲🇦',
    primaryColor: '#C1272D', secondaryColor: '#006233',
    coach: 'Walid Regragui', continent: 'CAF',
    worldCupAppearances: 6, bestResult: 'Fourth Place (2022)',
    founded: 1955, homeStadium: 'Stade Mohammed V', fanBase: 4.8,
  },
  {
    id: 'haiti', name: 'Haiti', shortName: 'HAI', code: 'ht',
    group: 'C', fifaRanking: 46, flagEmoji: '🇭🇹',
    primaryColor: '#00209F', secondaryColor: '#D21034',
    coach: 'Marc Collat', continent: 'CONCACAF',
    worldCupAppearances: 2, bestResult: 'Group Stage (1974)',
    founded: 1904, homeStadium: 'Stade Sylvio Cator', fanBase: 0.2,
  },
  {
    id: 'scotland', name: 'Scotland', shortName: 'SCO', code: 'gb-sct',
    group: 'C', fifaRanking: 29, flagEmoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    primaryColor: '#003DA5', secondaryColor: '#FFFFFF',
    coach: 'Steve Clarke', continent: 'UEFA',
    worldCupAppearances: 8, bestResult: 'Group Stage',
    founded: 1873, homeStadium: 'Hampden Park', fanBase: 0.9,
  },

  // ── Group D: USA, Paraguay, Australia, Turkey ────────────────────────────
  {
    id: 'usa', name: 'United States', shortName: 'USA', code: 'us',
    group: 'D', fifaRanking: 11, flagEmoji: '🇺🇸',
    primaryColor: '#002868', secondaryColor: '#BF0A30',
    coach: 'Mauricio Pochettino', continent: 'CONCACAF',
    worldCupAppearances: 11, bestResult: 'Third Place (1930)',
    founded: 1913, homeStadium: 'Dignity Health Sports Park', fanBase: 8.2,
  },
  {
    id: 'paraguay', name: 'Paraguay', shortName: 'PAR', code: 'py',
    group: 'D', fifaRanking: 39, flagEmoji: '🇵🇾',
    primaryColor: '#D52B1E', secondaryColor: '#FFFFFF',
    coach: 'Gustavo Alfaro', continent: 'CONMEBOL',
    worldCupAppearances: 9, bestResult: 'Quarterfinals (2010)',
    founded: 1906, homeStadium: 'Estadio Defensores del Chaco', fanBase: 0.5,
  },
  {
    id: 'australia', name: 'Australia', shortName: 'AUS', code: 'au',
    group: 'D', fifaRanking: 27, flagEmoji: '🇦🇺',
    primaryColor: '#FFD700', secondaryColor: '#006400',
    coach: 'Tony Popovic', continent: 'AFC',
    worldCupAppearances: 6, bestResult: 'Round of 16 (2006, 2022)',
    founded: 1961, homeStadium: 'Stadium Australia', fanBase: 1.9,
  },
  {
    id: 'turkey', name: 'Türkiye', shortName: 'TUR', code: 'tr',
    group: 'D', fifaRanking: 24, flagEmoji: '🇹🇷',
    primaryColor: '#E30A17', secondaryColor: '#FFFFFF',
    coach: 'Vincenzo Montella', continent: 'UEFA',
    worldCupAppearances: 2, bestResult: 'Third Place (2002)',
    founded: 1923, homeStadium: 'Türk Telekom Stadyumu', fanBase: 2.7,
  },

  // ── Group E: Germany, Curaçao, Ivory Coast, Ecuador ─────────────────────
  {
    id: 'germany', name: 'Germany', shortName: 'GER', code: 'de',
    group: 'E', fifaRanking: 9, flagEmoji: '🇩🇪',
    primaryColor: '#000000', secondaryColor: '#DD0000',
    coach: 'Julian Nagelsmann', continent: 'UEFA',
    worldCupAppearances: 20, bestResult: 'Winners (1954, 1974, 1990, 2014)',
    founded: 1900, homeStadium: 'Allianz Arena', fanBase: 8.0,
  },
  {
    id: 'curacao', name: 'Curaçao', shortName: 'CUW', code: 'cw',
    group: 'E', fifaRanking: 48, flagEmoji: '🇨🇼',
    primaryColor: '#002B7F', secondaryColor: '#F9E300',
    coach: 'Remko Bicentini', continent: 'CONCACAF',
    worldCupAppearances: 1, bestResult: 'Group Stage (2026)',
    founded: 1921, homeStadium: 'Ergilio Hato Stadium', fanBase: 0.1,
  },
  {
    id: 'ivory-coast', name: "Ivory Coast", shortName: 'CIV', code: 'ci',
    group: 'E', fifaRanking: 26, flagEmoji: '🇨🇮',
    primaryColor: '#F77F00', secondaryColor: '#009A44',
    coach: 'Emerse Faé', continent: 'CAF',
    worldCupAppearances: 4, bestResult: 'Group Stage',
    founded: 1960, homeStadium: 'Stade Félix Houphouët-Boigny', fanBase: 1.1,
  },
  {
    id: 'ecuador', name: 'Ecuador', shortName: 'ECU', code: 'ec',
    group: 'E', fifaRanking: 19, flagEmoji: '🇪🇨',
    primaryColor: '#FFD100', secondaryColor: '#003DA5',
    coach: 'Sebastián Beccacece', continent: 'CONMEBOL',
    worldCupAppearances: 4, bestResult: 'Round of 16 (2006)',
    founded: 1925, homeStadium: 'Estadio Olímpico Atahualpa', fanBase: 0.7,
  },

  // ── Group F: Netherlands, Japan, Sweden, Tunisia ─────────────────────────
  {
    id: 'netherlands', name: 'Netherlands', shortName: 'NED', code: 'nl',
    group: 'F', fifaRanking: 7, flagEmoji: '🇳🇱',
    primaryColor: '#FF6900', secondaryColor: '#003DA5',
    coach: 'Ronald Koeman', continent: 'UEFA',
    worldCupAppearances: 11, bestResult: 'Runners-up (1974, 1978, 2010)',
    founded: 1889, homeStadium: 'Johan Cruyff Arena', fanBase: 4.5,
  },
  {
    id: 'japan', name: 'Japan', shortName: 'JPN', code: 'jp',
    group: 'F', fifaRanking: 16, flagEmoji: '🇯🇵',
    primaryColor: '#BC002D', secondaryColor: '#FFFFFF',
    coach: 'Hajime Moriyasu', continent: 'AFC',
    worldCupAppearances: 7, bestResult: 'Round of 16 (2002, 2010, 2018, 2022)',
    founded: 1921, homeStadium: 'Japan National Stadium', fanBase: 4.1,
  },
  {
    id: 'sweden', name: 'Sweden', shortName: 'SWE', code: 'se',
    group: 'F', fifaRanking: 25, flagEmoji: '🇸🇪',
    primaryColor: '#006AA7', secondaryColor: '#FECC02',
    coach: 'Jon Dahl Tomasson', continent: 'UEFA',
    worldCupAppearances: 12, bestResult: 'Runners-up (1958)',
    founded: 1904, homeStadium: 'Friends Arena', fanBase: 1.6,
  },
  {
    id: 'tunisia', name: 'Tunisia', shortName: 'TUN', code: 'tn',
    group: 'F', fifaRanking: 34, flagEmoji: '🇹🇳',
    primaryColor: '#E70013', secondaryColor: '#FFFFFF',
    coach: 'Jalel Kadri', continent: 'CAF',
    worldCupAppearances: 6, bestResult: 'Group Stage',
    founded: 1956, homeStadium: 'Stade de Radès', fanBase: 0.7,
  },

  // ── Group G: Belgium, Egypt, Iran, New Zealand ───────────────────────────
  {
    id: 'belgium', name: 'Belgium', shortName: 'BEL', code: 'be',
    group: 'G', fifaRanking: 8, flagEmoji: '🇧🇪',
    primaryColor: '#000000', secondaryColor: '#EF3340',
    coach: 'Domenico Tedesco', continent: 'UEFA',
    worldCupAppearances: 14, bestResult: 'Third Place (2018)',
    founded: 1895, homeStadium: 'King Baudouin Stadium', fanBase: 4.0,
  },
  {
    id: 'egypt', name: 'Egypt', shortName: 'EGY', code: 'eg',
    group: 'G', fifaRanking: 33, flagEmoji: '🇪🇬',
    primaryColor: '#CE1126', secondaryColor: '#FFFFFF',
    coach: 'Hossam Hassan', continent: 'CAF',
    worldCupAppearances: 3, bestResult: 'Group Stage',
    founded: 1921, homeStadium: 'Cairo International Stadium', fanBase: 2.2,
  },
  {
    id: 'iran', name: 'Iran', shortName: 'IRN', code: 'ir',
    group: 'G', fifaRanking: 28, flagEmoji: '🇮🇷',
    primaryColor: '#239F40', secondaryColor: '#FFFFFF',
    coach: 'Amir Ghalenoei', continent: 'AFC',
    worldCupAppearances: 6, bestResult: 'Group Stage',
    founded: 1920, homeStadium: 'Azadi Stadium', fanBase: 1.4,
  },
  {
    id: 'new-zealand', name: 'New Zealand', shortName: 'NZL', code: 'nz',
    group: 'G', fifaRanking: 35, flagEmoji: '🇳🇿',
    primaryColor: '#000000', secondaryColor: '#FFFFFF',
    coach: 'Darren Bazeley', continent: 'OFC',
    worldCupAppearances: 3, bestResult: 'Group Stage',
    founded: 1891, homeStadium: 'Eden Park', fanBase: 0.4,
  },

  // ── Group H: Spain, Cape Verde, Saudi Arabia, Uruguay ────────────────────
  {
    id: 'spain', name: 'Spain', shortName: 'ESP', code: 'es',
    group: 'H', fifaRanking: 3, flagEmoji: '🇪🇸',
    primaryColor: '#C60B1E', secondaryColor: '#FFC400',
    coach: 'Luis de la Fuente', continent: 'UEFA',
    worldCupAppearances: 16, bestResult: 'Winners (2010)',
    founded: 1909, homeStadium: 'Estadio Santiago Bernabéu', fanBase: 9.0,
  },
  {
    id: 'cape-verde', name: 'Cape Verde', shortName: 'CPV', code: 'cv',
    group: 'H', fifaRanking: 45, flagEmoji: '🇨🇻',
    primaryColor: '#003893', secondaryColor: '#CF2027',
    coach: 'Pedro Leitão Brito', continent: 'CAF',
    worldCupAppearances: 1, bestResult: 'Group Stage (2026)',
    founded: 1982, homeStadium: 'Estádio Nacional de Cabo Verde', fanBase: 0.1,
  },
  {
    id: 'saudi-arabia', name: 'Saudi Arabia', shortName: 'KSA', code: 'sa',
    group: 'H', fifaRanking: 38, flagEmoji: '🇸🇦',
    primaryColor: '#006C35', secondaryColor: '#FFFFFF',
    coach: 'Hervé Renard', continent: 'AFC',
    worldCupAppearances: 6, bestResult: 'Round of 16 (1994)',
    founded: 1956, homeStadium: 'King Fahd International Stadium', fanBase: 1.2,
  },
  {
    id: 'uruguay', name: 'Uruguay', shortName: 'URU', code: 'uy',
    group: 'H', fifaRanking: 13, flagEmoji: '🇺🇾',
    primaryColor: '#75AADB', secondaryColor: '#FFFFFF',
    coach: 'Marcelo Bielsa', continent: 'CONMEBOL',
    worldCupAppearances: 14, bestResult: 'Winners (1930, 1950)',
    founded: 1900, homeStadium: 'Estadio Centenario', fanBase: 2.1,
  },

  // ── Group I: France, Senegal, Iraq, Norway ───────────────────────────────
  {
    id: 'france', name: 'France', shortName: 'FRA', code: 'fr',
    group: 'I', fifaRanking: 2, flagEmoji: '🇫🇷',
    primaryColor: '#003189', secondaryColor: '#ED2939',
    coach: 'Didier Deschamps', continent: 'UEFA',
    worldCupAppearances: 16, bestResult: 'Winners (1998, 2018)',
    founded: 1919, homeStadium: 'Stade de France', fanBase: 10.8,
  },
  {
    id: 'senegal', name: 'Senegal', shortName: 'SEN', code: 'sn',
    group: 'I', fifaRanking: 20, flagEmoji: '🇸🇳',
    primaryColor: '#00853F', secondaryColor: '#FDEF42',
    coach: 'Aliou Cissé', continent: 'CAF',
    worldCupAppearances: 4, bestResult: 'Quarterfinals (2002)',
    founded: 1960, homeStadium: 'Stade Léopold Sédar Senghor', fanBase: 1.3,
  },
  {
    id: 'iraq', name: 'Iraq', shortName: 'IRQ', code: 'iq',
    group: 'I', fifaRanking: 47, flagEmoji: '🇮🇶',
    primaryColor: '#CE1126', secondaryColor: '#007A3D',
    coach: 'Jesús Casas', continent: 'AFC',
    worldCupAppearances: 2, bestResult: 'Group Stage (1986)',
    founded: 1948, homeStadium: 'Franso Hariri Stadium', fanBase: 0.5,
  },
  {
    id: 'norway', name: 'Norway', shortName: 'NOR', code: 'no',
    group: 'I', fifaRanking: 21, flagEmoji: '🇳🇴',
    primaryColor: '#EF2B2D', secondaryColor: '#FFFFFF',
    coach: 'Ståle Solbakken', continent: 'UEFA',
    worldCupAppearances: 4, bestResult: 'Round of 16 (1938, 1994)',
    founded: 1902, homeStadium: 'Ullevaal Stadion', fanBase: 0.8,
  },

  // ── Group J: Argentina, Algeria, Austria, Jordan ─────────────────────────
  {
    id: 'argentina', name: 'Argentina', shortName: 'ARG', code: 'ar',
    group: 'J', fifaRanking: 1, flagEmoji: '🇦🇷',
    primaryColor: '#75AADB', secondaryColor: '#FFFFFF',
    coach: 'Lionel Scaloni', continent: 'CONMEBOL',
    worldCupAppearances: 18, bestResult: 'Winners (1978, 1986, 2022)',
    founded: 1893, homeStadium: 'Estadio Monumental', fanBase: 14.2,
  },
  {
    id: 'algeria', name: 'Algeria', shortName: 'ALG', code: 'dz',
    group: 'J', fifaRanking: 22, flagEmoji: '🇩🇿',
    primaryColor: '#006233', secondaryColor: '#FFFFFF',
    coach: 'Vladimir Petković', continent: 'CAF',
    worldCupAppearances: 4, bestResult: 'Round of 16 (2014)',
    founded: 1962, homeStadium: 'Stade Mustapha Tchaker', fanBase: 1.8,
  },
  {
    id: 'austria', name: 'Austria', shortName: 'AUT', code: 'at',
    group: 'J', fifaRanking: 23, flagEmoji: '🇦🇹',
    primaryColor: '#ED2939', secondaryColor: '#FFFFFF',
    coach: 'Ralf Rangnick', continent: 'UEFA',
    worldCupAppearances: 7, bestResult: 'Third Place (1954)',
    founded: 1904, homeStadium: 'Ernst-Happel-Stadion', fanBase: 1.1,
  },
  {
    id: 'jordan', name: 'Jordan', shortName: 'JOR', code: 'jo',
    group: 'J', fifaRanking: 43, flagEmoji: '🇯🇴',
    primaryColor: '#007A3D', secondaryColor: '#CE1126',
    coach: 'Hussein Ammouta', continent: 'AFC',
    worldCupAppearances: 1, bestResult: 'Group Stage (2026)',
    founded: 1949, homeStadium: 'Amman International Stadium', fanBase: 0.2,
  },

  // ── Group K: Portugal, DR Congo, Uzbekistan, Colombia ────────────────────
  {
    id: 'portugal', name: 'Portugal', shortName: 'POR', code: 'pt',
    group: 'K', fifaRanking: 6, flagEmoji: '🇵🇹',
    primaryColor: '#006600', secondaryColor: '#FF0000',
    coach: 'Roberto Martínez', continent: 'UEFA',
    worldCupAppearances: 8, bestResult: 'Third Place (1966)',
    founded: 1914, homeStadium: 'Estádio da Luz', fanBase: 5.5,
  },
  {
    id: 'dr-congo', name: 'DR Congo', shortName: 'COD', code: 'cd',
    group: 'K', fifaRanking: 41, flagEmoji: '🇨🇩',
    primaryColor: '#007FFF', secondaryColor: '#CE1126',
    coach: 'Sébastien Desabre', continent: 'CAF',
    worldCupAppearances: 1, bestResult: 'Quarterfinals (1974 as Zaire)',
    founded: 1919, homeStadium: 'Stade des Martyrs', fanBase: 0.6,
  },
  {
    id: 'uzbekistan', name: 'Uzbekistan', shortName: 'UZB', code: 'uz',
    group: 'K', fifaRanking: 42, flagEmoji: '🇺🇿',
    primaryColor: '#1EB53A', secondaryColor: '#FFFFFF',
    coach: 'Srecko Katanec', continent: 'AFC',
    worldCupAppearances: 1, bestResult: 'Group Stage (2026)',
    founded: 1946, homeStadium: 'Milliy Stadion', fanBase: 0.3,
  },
  {
    id: 'colombia', name: 'Colombia', shortName: 'COL', code: 'co',
    group: 'K', fifaRanking: 14, flagEmoji: '🇨🇴',
    primaryColor: '#FCD116', secondaryColor: '#003087',
    coach: 'Néstor Lorenzo', continent: 'CONMEBOL',
    worldCupAppearances: 6, bestResult: 'Quarterfinals (2014)',
    founded: 1924, homeStadium: 'Estadio Metropolitano Roberto Meléndez', fanBase: 3.2,
  },

  // ── Group L: England, Croatia, Ghana, Panama ─────────────────────────────
  {
    id: 'england', name: 'England', shortName: 'ENG', code: 'gb-eng',
    group: 'L', fifaRanking: 4, flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    primaryColor: '#FFFFFF', secondaryColor: '#003CE8',
    coach: 'Lee Carsley', continent: 'UEFA',
    worldCupAppearances: 16, bestResult: 'Winners (1966)',
    founded: 1863, homeStadium: 'Wembley Stadium', fanBase: 7.8,
  },
  {
    id: 'croatia', name: 'Croatia', shortName: 'CRO', code: 'hr',
    group: 'L', fifaRanking: 10, flagEmoji: '🇭🇷',
    primaryColor: '#FF0000', secondaryColor: '#003DA5',
    coach: 'Zlatko Dalić', continent: 'UEFA',
    worldCupAppearances: 6, bestResult: 'Runners-up (2018)',
    founded: 1912, homeStadium: 'Stadion Maksimir', fanBase: 2.3,
  },
  {
    id: 'ghana', name: 'Ghana', shortName: 'GHA', code: 'gh',
    group: 'L', fifaRanking: 31, flagEmoji: '🇬🇭',
    primaryColor: '#006B3F', secondaryColor: '#FCD116',
    coach: 'Otto Addo', continent: 'CAF',
    worldCupAppearances: 4, bestResult: 'Quarterfinals (2010)',
    founded: 1957, homeStadium: 'Baba Yara Sports Stadium', fanBase: 0.9,
  },
  {
    id: 'panama', name: 'Panama', shortName: 'PAN', code: 'pa',
    group: 'L', fifaRanking: 44, flagEmoji: '🇵🇦',
    primaryColor: '#FFFFFF', secondaryColor: '#FF0000',
    coach: 'Thomas Christiansen', continent: 'CONCACAF',
    worldCupAppearances: 2, bestResult: 'Group Stage (2018)',
    founded: 1951, homeStadium: 'Estadio Rommel Fernández', fanBase: 0.3,
  },
]

export const TEAM_MAP = new Map(TEAMS.map(t => [t.id, t]))

export function getTeam(id: string): Team | undefined {
  return TEAM_MAP.get(id)
}

export function getTeamsByGroup(group: string): Team[] {
  return TEAMS.filter(t => t.group === group)
}

export const ALL_GROUP_IDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const

export function getFlagUrl(code: string, size: number = 40): string {
  return `https://flagcdn.com/w${size}/${code.toLowerCase()}.png`
}

export function getFlagSvg(code: string): string {
  return `https://flagcdn.com/${code.toLowerCase()}.svg`
}
