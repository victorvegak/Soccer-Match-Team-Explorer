const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

// Get teams (Premier League example)
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