import type { Match } from '@/types'

// All times stored in UTC. App converts to IST (UTC+5:30) for display.
// Source: Official FIFA / NBC Sports confirmed schedule.
// ET times converted to UTC by adding 4 hours (EDT = UTC−4).

export const FIXTURES: Match[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // GROUP STAGE – MATCHDAY 1
  // ══════════════════════════════════════════════════════════════════════════

  // Group A
  { id: 'A_MD1_1', stage: 'GROUP', group: 'A', matchday: 1,
    homeTeamId: 'mexico', awayTeamId: 'south-africa',
    stadiumId: 'azteca', utcDate: '2026-06-11T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'A_MD1_2', stage: 'GROUP', group: 'A', matchday: 1,
    homeTeamId: 'south-korea', awayTeamId: 'czechia',
    stadiumId: 'akron', utcDate: '2026-06-12T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group B
  { id: 'B_MD1_1', stage: 'GROUP', group: 'B', matchday: 1,
    homeTeamId: 'canada', awayTeamId: 'bosnia',
    stadiumId: 'bmo', utcDate: '2026-06-12T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'B_MD1_2', stage: 'GROUP', group: 'B', matchday: 1,
    homeTeamId: 'qatar', awayTeamId: 'switzerland',
    stadiumId: 'levis', utcDate: '2026-06-13T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group C
  { id: 'C_MD1_1', stage: 'GROUP', group: 'C', matchday: 1,
    homeTeamId: 'brazil', awayTeamId: 'morocco',
    stadiumId: 'metlife', utcDate: '2026-06-13T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },
  { id: 'C_MD1_2', stage: 'GROUP', group: 'C', matchday: 1,
    homeTeamId: 'haiti', awayTeamId: 'scotland',
    stadiumId: 'gillette', utcDate: '2026-06-14T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group D
  { id: 'D_MD1_1', stage: 'GROUP', group: 'D', matchday: 1,
    homeTeamId: 'usa', awayTeamId: 'paraguay',
    stadiumId: 'sofi', utcDate: '2026-06-13T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'D_MD1_2', stage: 'GROUP', group: 'D', matchday: 1,
    homeTeamId: 'australia', awayTeamId: 'turkey',
    stadiumId: 'bc-place', utcDate: '2026-06-14T04:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group E
  { id: 'E_MD1_1', stage: 'GROUP', group: 'E', matchday: 1,
    homeTeamId: 'germany', awayTeamId: 'curacao',
    stadiumId: 'nrg', utcDate: '2026-06-14T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'E_MD1_2', stage: 'GROUP', group: 'E', matchday: 1,
    homeTeamId: 'ivory-coast', awayTeamId: 'ecuador',
    stadiumId: 'lincoln', utcDate: '2026-06-14T23:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group F
  { id: 'F_MD1_1', stage: 'GROUP', group: 'F', matchday: 1,
    homeTeamId: 'netherlands', awayTeamId: 'japan',
    stadiumId: 'att', utcDate: '2026-06-14T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'F_MD1_2', stage: 'GROUP', group: 'F', matchday: 1,
    homeTeamId: 'sweden', awayTeamId: 'tunisia',
    stadiumId: 'bbva', utcDate: '2026-06-15T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group G
  { id: 'G_MD1_1', stage: 'GROUP', group: 'G', matchday: 1,
    homeTeamId: 'belgium', awayTeamId: 'egypt',
    stadiumId: 'lumen', utcDate: '2026-06-15T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'G_MD1_2', stage: 'GROUP', group: 'G', matchday: 1,
    homeTeamId: 'iran', awayTeamId: 'new-zealand',
    stadiumId: 'sofi', utcDate: '2026-06-16T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group H
  { id: 'H_MD1_1', stage: 'GROUP', group: 'H', matchday: 1,
    homeTeamId: 'spain', awayTeamId: 'cape-verde',
    stadiumId: 'mercedes', utcDate: '2026-06-15T16:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'H_MD1_2', stage: 'GROUP', group: 'H', matchday: 1,
    homeTeamId: 'saudi-arabia', awayTeamId: 'uruguay',
    stadiumId: 'hardrock', utcDate: '2026-06-15T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group I
  { id: 'I_MD1_1', stage: 'GROUP', group: 'I', matchday: 1,
    homeTeamId: 'france', awayTeamId: 'senegal',
    stadiumId: 'metlife', utcDate: '2026-06-16T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },
  { id: 'I_MD1_2', stage: 'GROUP', group: 'I', matchday: 1,
    homeTeamId: 'iraq', awayTeamId: 'norway',
    stadiumId: 'gillette', utcDate: '2026-06-16T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group J
  { id: 'J_MD1_1', stage: 'GROUP', group: 'J', matchday: 1,
    homeTeamId: 'argentina', awayTeamId: 'algeria',
    stadiumId: 'arrowhead', utcDate: '2026-06-17T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },
  { id: 'J_MD1_2', stage: 'GROUP', group: 'J', matchday: 1,
    homeTeamId: 'austria', awayTeamId: 'jordan',
    stadiumId: 'levis', utcDate: '2026-06-17T04:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group K
  { id: 'K_MD1_1', stage: 'GROUP', group: 'K', matchday: 1,
    homeTeamId: 'portugal', awayTeamId: 'dr-congo',
    stadiumId: 'nrg', utcDate: '2026-06-17T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'K_MD1_2', stage: 'GROUP', group: 'K', matchday: 1,
    homeTeamId: 'uzbekistan', awayTeamId: 'colombia',
    stadiumId: 'azteca', utcDate: '2026-06-18T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group L
  { id: 'L_MD1_1', stage: 'GROUP', group: 'L', matchday: 1,
    homeTeamId: 'england', awayTeamId: 'croatia',
    stadiumId: 'att', utcDate: '2026-06-17T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },
  { id: 'L_MD1_2', stage: 'GROUP', group: 'L', matchday: 1,
    homeTeamId: 'ghana', awayTeamId: 'panama',
    stadiumId: 'bmo', utcDate: '2026-06-17T23:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // ══════════════════════════════════════════════════════════════════════════
  // GROUP STAGE – MATCHDAY 2
  // ══════════════════════════════════════════════════════════════════════════

  // Group A
  { id: 'A_MD2_1', stage: 'GROUP', group: 'A', matchday: 2,
    homeTeamId: 'czechia', awayTeamId: 'south-africa',
    stadiumId: 'mercedes', utcDate: '2026-06-18T16:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },
  { id: 'A_MD2_2', stage: 'GROUP', group: 'A', matchday: 2,
    homeTeamId: 'mexico', awayTeamId: 'south-korea',
    stadiumId: 'akron', utcDate: '2026-06-19T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group B
  { id: 'B_MD2_1', stage: 'GROUP', group: 'B', matchday: 2,
    homeTeamId: 'switzerland', awayTeamId: 'bosnia',
    stadiumId: 'sofi', utcDate: '2026-06-18T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'B_MD2_2', stage: 'GROUP', group: 'B', matchday: 2,
    homeTeamId: 'canada', awayTeamId: 'qatar',
    stadiumId: 'bc-place', utcDate: '2026-06-18T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group C
  { id: 'C_MD2_1', stage: 'GROUP', group: 'C', matchday: 2,
    homeTeamId: 'scotland', awayTeamId: 'morocco',
    stadiumId: 'gillette', utcDate: '2026-06-19T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'C_MD2_2', stage: 'GROUP', group: 'C', matchday: 2,
    homeTeamId: 'brazil', awayTeamId: 'haiti',
    stadiumId: 'lincoln', utcDate: '2026-06-20T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group D
  { id: 'D_MD2_1', stage: 'GROUP', group: 'D', matchday: 2,
    homeTeamId: 'usa', awayTeamId: 'australia',
    stadiumId: 'lumen', utcDate: '2026-06-19T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'D_MD2_2', stage: 'GROUP', group: 'D', matchday: 2,
    homeTeamId: 'turkey', awayTeamId: 'paraguay',
    stadiumId: 'levis', utcDate: '2026-06-20T04:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group E
  { id: 'E_MD2_1', stage: 'GROUP', group: 'E', matchday: 2,
    homeTeamId: 'germany', awayTeamId: 'ivory-coast',
    stadiumId: 'bmo', utcDate: '2026-06-20T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'E_MD2_2', stage: 'GROUP', group: 'E', matchday: 2,
    homeTeamId: 'ecuador', awayTeamId: 'curacao',
    stadiumId: 'arrowhead', utcDate: '2026-06-21T00:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group F
  { id: 'F_MD2_1', stage: 'GROUP', group: 'F', matchday: 2,
    homeTeamId: 'netherlands', awayTeamId: 'sweden',
    stadiumId: 'nrg', utcDate: '2026-06-20T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'F_MD2_2', stage: 'GROUP', group: 'F', matchday: 2,
    homeTeamId: 'tunisia', awayTeamId: 'japan',
    stadiumId: 'bbva', utcDate: '2026-06-21T04:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group G
  { id: 'G_MD2_1', stage: 'GROUP', group: 'G', matchday: 2,
    homeTeamId: 'belgium', awayTeamId: 'iran',
    stadiumId: 'sofi', utcDate: '2026-06-21T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'G_MD2_2', stage: 'GROUP', group: 'G', matchday: 2,
    homeTeamId: 'new-zealand', awayTeamId: 'egypt',
    stadiumId: 'bc-place', utcDate: '2026-06-22T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group H
  { id: 'H_MD2_1', stage: 'GROUP', group: 'H', matchday: 2,
    homeTeamId: 'spain', awayTeamId: 'saudi-arabia',
    stadiumId: 'mercedes', utcDate: '2026-06-21T16:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'H_MD2_2', stage: 'GROUP', group: 'H', matchday: 2,
    homeTeamId: 'uruguay', awayTeamId: 'cape-verde',
    stadiumId: 'hardrock', utcDate: '2026-06-21T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group I
  { id: 'I_MD2_1', stage: 'GROUP', group: 'I', matchday: 2,
    homeTeamId: 'france', awayTeamId: 'iraq',
    stadiumId: 'lincoln', utcDate: '2026-06-22T21:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'I_MD2_2', stage: 'GROUP', group: 'I', matchday: 2,
    homeTeamId: 'norway', awayTeamId: 'senegal',
    stadiumId: 'metlife', utcDate: '2026-06-23T00:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group J
  { id: 'J_MD2_1', stage: 'GROUP', group: 'J', matchday: 2,
    homeTeamId: 'argentina', awayTeamId: 'austria',
    stadiumId: 'att', utcDate: '2026-06-22T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'J_MD2_2', stage: 'GROUP', group: 'J', matchday: 2,
    homeTeamId: 'jordan', awayTeamId: 'algeria',
    stadiumId: 'levis', utcDate: '2026-06-23T03:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MEDIUM' },

  // Group K
  { id: 'K_MD2_1', stage: 'GROUP', group: 'K', matchday: 2,
    homeTeamId: 'portugal', awayTeamId: 'uzbekistan',
    stadiumId: 'nrg', utcDate: '2026-06-23T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'K_MD2_2', stage: 'GROUP', group: 'K', matchday: 2,
    homeTeamId: 'colombia', awayTeamId: 'dr-congo',
    stadiumId: 'akron', utcDate: '2026-06-24T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group L
  { id: 'L_MD2_1', stage: 'GROUP', group: 'L', matchday: 2,
    homeTeamId: 'england', awayTeamId: 'ghana',
    stadiumId: 'gillette', utcDate: '2026-06-23T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'L_MD2_2', stage: 'GROUP', group: 'L', matchday: 2,
    homeTeamId: 'panama', awayTeamId: 'croatia',
    stadiumId: 'bmo', utcDate: '2026-06-23T23:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // ══════════════════════════════════════════════════════════════════════════
  // GROUP STAGE – MATCHDAY 3 (simultaneous within each group)
  // ══════════════════════════════════════════════════════════════════════════

  // Group B – June 24
  { id: 'B_MD3_1', stage: 'GROUP', group: 'B', matchday: 3,
    homeTeamId: 'switzerland', awayTeamId: 'canada',
    stadiumId: 'bc-place', utcDate: '2026-06-24T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'B_MD3_2', stage: 'GROUP', group: 'B', matchday: 3,
    homeTeamId: 'bosnia', awayTeamId: 'qatar',
    stadiumId: 'lumen', utcDate: '2026-06-24T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group C – June 24
  { id: 'C_MD3_1', stage: 'GROUP', group: 'C', matchday: 3,
    homeTeamId: 'scotland', awayTeamId: 'brazil',
    stadiumId: 'hardrock', utcDate: '2026-06-24T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'C_MD3_2', stage: 'GROUP', group: 'C', matchday: 3,
    homeTeamId: 'morocco', awayTeamId: 'haiti',
    stadiumId: 'mercedes', utcDate: '2026-06-24T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group A – June 24/25
  { id: 'A_MD3_1', stage: 'GROUP', group: 'A', matchday: 3,
    homeTeamId: 'czechia', awayTeamId: 'mexico',
    stadiumId: 'azteca', utcDate: '2026-06-25T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'A_MD3_2', stage: 'GROUP', group: 'A', matchday: 3,
    homeTeamId: 'south-africa', awayTeamId: 'south-korea',
    stadiumId: 'bbva', utcDate: '2026-06-25T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group F – June 25
  { id: 'F_MD3_1', stage: 'GROUP', group: 'F', matchday: 3,
    homeTeamId: 'japan', awayTeamId: 'sweden',
    stadiumId: 'att', utcDate: '2026-06-25T23:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'F_MD3_2', stage: 'GROUP', group: 'F', matchday: 3,
    homeTeamId: 'tunisia', awayTeamId: 'netherlands',
    stadiumId: 'arrowhead', utcDate: '2026-06-25T23:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group E – June 25
  { id: 'E_MD3_1', stage: 'GROUP', group: 'E', matchday: 3,
    homeTeamId: 'ecuador', awayTeamId: 'germany',
    stadiumId: 'metlife', utcDate: '2026-06-25T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'E_MD3_2', stage: 'GROUP', group: 'E', matchday: 3,
    homeTeamId: 'curacao', awayTeamId: 'ivory-coast',
    stadiumId: 'lincoln', utcDate: '2026-06-25T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group D – June 25/26
  { id: 'D_MD3_1', stage: 'GROUP', group: 'D', matchday: 3,
    homeTeamId: 'turkey', awayTeamId: 'usa',
    stadiumId: 'sofi', utcDate: '2026-06-26T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'D_MD3_2', stage: 'GROUP', group: 'D', matchday: 3,
    homeTeamId: 'paraguay', awayTeamId: 'australia',
    stadiumId: 'levis', utcDate: '2026-06-26T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group I – June 26
  { id: 'I_MD3_1', stage: 'GROUP', group: 'I', matchday: 3,
    homeTeamId: 'norway', awayTeamId: 'france',
    stadiumId: 'gillette', utcDate: '2026-06-26T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'I_MD3_2', stage: 'GROUP', group: 'I', matchday: 3,
    homeTeamId: 'senegal', awayTeamId: 'iraq',
    stadiumId: 'bmo', utcDate: '2026-06-26T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group H – June 26/27
  { id: 'H_MD3_1', stage: 'GROUP', group: 'H', matchday: 3,
    homeTeamId: 'cape-verde', awayTeamId: 'saudi-arabia',
    stadiumId: 'nrg', utcDate: '2026-06-27T00:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'H_MD3_2', stage: 'GROUP', group: 'H', matchday: 3,
    homeTeamId: 'uruguay', awayTeamId: 'spain',
    stadiumId: 'akron', utcDate: '2026-06-27T00:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },

  // Group G – June 26/27
  { id: 'G_MD3_1', stage: 'GROUP', group: 'G', matchday: 3,
    homeTeamId: 'egypt', awayTeamId: 'iran',
    stadiumId: 'lumen', utcDate: '2026-06-27T03:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'G_MD3_2', stage: 'GROUP', group: 'G', matchday: 3,
    homeTeamId: 'new-zealand', awayTeamId: 'belgium',
    stadiumId: 'bc-place', utcDate: '2026-06-27T03:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group L – June 27
  { id: 'L_MD3_1', stage: 'GROUP', group: 'L', matchday: 3,
    homeTeamId: 'panama', awayTeamId: 'england',
    stadiumId: 'metlife', utcDate: '2026-06-27T21:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'L_MD3_2', stage: 'GROUP', group: 'L', matchday: 3,
    homeTeamId: 'croatia', awayTeamId: 'ghana',
    stadiumId: 'lincoln', utcDate: '2026-06-27T21:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group K – June 27/28
  { id: 'K_MD3_1', stage: 'GROUP', group: 'K', matchday: 3,
    homeTeamId: 'colombia', awayTeamId: 'portugal',
    stadiumId: 'hardrock', utcDate: '2026-06-27T23:30:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'K_MD3_2', stage: 'GROUP', group: 'K', matchday: 3,
    homeTeamId: 'dr-congo', awayTeamId: 'uzbekistan',
    stadiumId: 'mercedes', utcDate: '2026-06-27T23:30:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // Group J – June 27/28
  { id: 'J_MD3_1', stage: 'GROUP', group: 'J', matchday: 3,
    homeTeamId: 'algeria', awayTeamId: 'austria',
    stadiumId: 'arrowhead', utcDate: '2026-06-28T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'J_MD3_2', stage: 'GROUP', group: 'J', matchday: 3,
    homeTeamId: 'jordan', awayTeamId: 'argentina',
    stadiumId: 'att', utcDate: '2026-06-28T02:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },

  // ══════════════════════════════════════════════════════════════════════════
  // ROUND OF 32 (June 28 – July 3)
  // ══════════════════════════════════════════════════════════════════════════

  { id: 'R32_1', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'sofi', utcDate: '2026-06-28T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_2', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'nrg', utcDate: '2026-06-29T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_3', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'gillette', utcDate: '2026-06-29T20:30:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_4', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'bbva', utcDate: '2026-06-30T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_5', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'att', utcDate: '2026-06-30T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_6', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'metlife', utcDate: '2026-06-30T21:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_7', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'azteca', utcDate: '2026-07-01T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_8', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'mercedes', utcDate: '2026-07-01T16:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_9', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'lumen', utcDate: '2026-07-01T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_10', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'levis', utcDate: '2026-07-02T00:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_11', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'sofi', utcDate: '2026-07-02T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_12', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'bmo', utcDate: '2026-07-02T23:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_13', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'bc-place', utcDate: '2026-07-03T03:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_14', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'att', utcDate: '2026-07-03T18:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_15', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'hardrock', utcDate: '2026-07-03T22:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R32_16', stage: 'ROUND_OF_32', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'arrowhead', utcDate: '2026-07-04T01:30:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // ══════════════════════════════════════════════════════════════════════════
  // ROUND OF 16 (July 4–7)
  // ══════════════════════════════════════════════════════════════════════════

  { id: 'R16_1', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'nrg', utcDate: '2026-07-04T17:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R16_2', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'lincoln', utcDate: '2026-07-04T21:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R16_3', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'metlife', utcDate: '2026-07-05T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R16_4', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'azteca', utcDate: '2026-07-06T00:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R16_5', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'att', utcDate: '2026-07-06T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R16_6', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'lumen', utcDate: '2026-07-07T00:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R16_7', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'mercedes', utcDate: '2026-07-07T16:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'R16_8', stage: 'ROUND_OF_16', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'bc-place', utcDate: '2026-07-07T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // ══════════════════════════════════════════════════════════════════════════
  // QUARTERFINALS (July 9–11)
  // ══════════════════════════════════════════════════════════════════════════

  { id: 'QF_1', stage: 'QUARTER_FINAL', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'gillette', utcDate: '2026-07-09T20:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'QF_2', stage: 'QUARTER_FINAL', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'sofi', utcDate: '2026-07-10T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'QF_3', stage: 'QUARTER_FINAL', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'hardrock', utcDate: '2026-07-11T21:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },
  { id: 'QF_4', stage: 'QUARTER_FINAL', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'arrowhead', utcDate: '2026-07-12T01:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // ══════════════════════════════════════════════════════════════════════════
  // SEMI-FINALS (July 14–15)
  // ══════════════════════════════════════════════════════════════════════════

  { id: 'SF_1', stage: 'SEMI_FINAL', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'att', utcDate: '2026-07-14T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },
  { id: 'SF_2', stage: 'SEMI_FINAL', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'mercedes', utcDate: '2026-07-15T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'MUST_WATCH' },

  // ══════════════════════════════════════════════════════════════════════════
  // THIRD PLACE PLAYOFF (July 18)
  // ══════════════════════════════════════════════════════════════════════════

  { id: 'TP_1', stage: 'THIRD_PLACE', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'hardrock', utcDate: '2026-07-18T21:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'HIGH' },

  // ══════════════════════════════════════════════════════════════════════════
  // FINAL (July 19)
  // ══════════════════════════════════════════════════════════════════════════

  { id: 'FINAL_1', stage: 'FINAL', matchday: 1,
    homeTeamId: 'tbd', awayTeamId: 'tbd',
    stadiumId: 'metlife', utcDate: '2026-07-19T19:00:00Z',
    status: 'SCHEDULED', score: { home: null, away: null }, importance: 'FINAL' },
]

export const FIXTURE_MAP = new Map(FIXTURES.map(f => [f.id, f]))

export function getFixture(id: string): Match | undefined {
  return FIXTURE_MAP.get(id)
}

export function getGroupFixtures(group: string): Match[] {
  return FIXTURES.filter(f => f.group === group)
}

export function getFixturesByStage(stage: string): Match[] {
  return FIXTURES.filter(f => f.stage === stage)
}

export function getTeamFixtures(teamId: string): Match[] {
  return FIXTURES.filter(f => f.homeTeamId === teamId || f.awayTeamId === teamId)
}

export function getLiveFixtures(): Match[] {
  return FIXTURES.filter(f => f.status === 'LIVE' || f.status === 'HALF_TIME')
}

export function getUpcomingFixtures(limit = 10): Match[] {
  const now = new Date()
  return FIXTURES
    .filter(f => f.status === 'SCHEDULED' && new Date(f.utcDate) > now)
    .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())
    .slice(0, limit)
}
