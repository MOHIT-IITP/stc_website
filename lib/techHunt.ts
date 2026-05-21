export type TechHuntLevel = {
  level: number;
  route: string;
  clue: string;
  question?: string;
  answer?: string;
};

export type TechHuntRouteDoc = {
  levels: TechHuntLevel[];
  totalLevels: number;
};

export function normalizeTechHuntAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getChallengeForLevel(
  routeDoc: TechHuntRouteDoc,
  levelNumber: number,
) {
  return routeDoc.levels.find((entry) => entry.level === levelNumber) || null;
}

export function isQuestionPending(team: any, currentLevel: number) {
  return (
    Number(team?.questionLevel || 0) === Number(currentLevel) &&
    Boolean(team?.questionUnlockedFor)
  );
}

export function isQuestionUnlockedForMember(
  team: any,
  currentLevel: number,
  email: string,
) {
  return (
    isQuestionPending(team, currentLevel) &&
    String(team.questionUnlockedFor || "")
      .toLowerCase()
      .trim() ===
      String(email || "")
        .toLowerCase()
        .trim()
  );
}
