import type { Group, GroupId } from '@/types'

function emptyStandings(teamIds: string[]): Group['standings'] {
  return teamIds.map((teamId, index) => ({
    position: index + 1,
    teamId,
    played: 0, won: 0, drawn: 0, lost: 0,
    goalsFor: 0, goalsAgainst: 0, goalDifference: 0,
    points: 0, form: [], qualified: false, eliminated: false,
  }))
}

export const GROUPS: Group[] = [
  { id: 'A', name: 'Group A', standings: emptyStandings(['mexico', 'south-africa', 'south-korea', 'czechia']) },
  { id: 'B', name: 'Group B', standings: emptyStandings(['canada', 'bosnia', 'qatar', 'switzerland']) },
  { id: 'C', name: 'Group C', standings: emptyStandings(['brazil', 'morocco', 'haiti', 'scotland']) },
  { id: 'D', name: 'Group D', standings: emptyStandings(['usa', 'paraguay', 'australia', 'turkey']) },
  { id: 'E', name: 'Group E', standings: emptyStandings(['germany', 'curacao', 'ivory-coast', 'ecuador']) },
  { id: 'F', name: 'Group F', standings: emptyStandings(['netherlands', 'japan', 'sweden', 'tunisia']) },
  { id: 'G', name: 'Group G', standings: emptyStandings(['belgium', 'egypt', 'iran', 'new-zealand']) },
  { id: 'H', name: 'Group H', standings: emptyStandings(['spain', 'cape-verde', 'saudi-arabia', 'uruguay']) },
  { id: 'I', name: 'Group I', standings: emptyStandings(['france', 'senegal', 'iraq', 'norway']) },
  { id: 'J', name: 'Group J', standings: emptyStandings(['argentina', 'algeria', 'austria', 'jordan']) },
  { id: 'K', name: 'Group K', standings: emptyStandings(['portugal', 'dr-congo', 'uzbekistan', 'colombia']) },
  { id: 'L', name: 'Group L', standings: emptyStandings(['england', 'croatia', 'ghana', 'panama']) },
]

export const GROUP_MAP = new Map(GROUPS.map(g => [g.id, g]))

export function getGroup(id: GroupId): Group | undefined {
  return GROUP_MAP.get(id)
}

export const ALL_GROUPS = GROUPS

export const GROUP_LABELS: Record<GroupId, string> = {
  A: 'Group A', B: 'Group B', C: 'Group C', D: 'Group D',
  E: 'Group E', F: 'Group F', G: 'Group G', H: 'Group H',
  I: 'Group I', J: 'Group J', K: 'Group K', L: 'Group L',
}
