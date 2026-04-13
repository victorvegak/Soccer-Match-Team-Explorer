const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

// Get teams
export async function getTeams() {
  const res = await fetch(`${BASE_URL}/search_all_teams.php?l=English Premier League`);
  const data = await res.json();
  return data.teams;
}

// Get team details
export async function getTeamById(id) {
  const res = await fetch(`${BASE_URL}/lookupteam.php?id=${id}`);
  const data = await res.json();
  return data.teams[0];
}

// ✅ matches
export async function getTeamMatches(teamId) {
  const res = await fetch(`${BASE_URL}/eventsnext.php?id=${teamId}`);
  const data = await res.json();
  return data.results; // already an array
}

// ✅ logo
export async function getTeamLogo(teamName) {
  try {
    const res = await fetch(`${BASE_URL}/searchteams.php?t=${teamName}`);
    const data = await res.json();

    return data.teams?.[0]?.strTeamBadge || "https://via.placeholder.com/50";
  } catch {
    return "https://via.placeholder.com/50";
  }
}

// ✅ search teams
export async function searchTeams(query) {
  const res = await fetch(`${BASE_URL}/searchteams.php?t=${query}`);
  const data = await res.json();
  return data.teams || [];
}

export async function getStandings() {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2023-2024"
  );
  const data = await res.json();
  return data.table;
}