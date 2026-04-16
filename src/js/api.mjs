// 🔥 Base URL usando AllOrigins (no requiere activación, no da 403)
const BASE_URL =
  "https://api.allorigins.win/raw?url=https://www.thesportsdb.com/api/v1/json/3/";

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

// get cache and check expiration
function getCache(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const parsed = JSON.parse(item);
  const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return parsed.data;
}

// save cache with timestamp
function setCache(key, data) {
  const payload = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(key, JSON.stringify(payload));
}

// fetch with fallback + cache
async function fetchWithCache(url, cacheKey) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    if (data) setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.warn("⚠️ API failed, using cache:", cacheKey);

    const cached = getCache(cacheKey);
    if (cached) return cached;

    throw error;
  }
}

// Teams
export async function getTeams() {
  const data = await fetchWithCache(
    `${BASE_URL}search_all_teams.php?l=English%20Premier%20League`,
    "teams"
  );

  return data.teams || [];
}

const logoMemoryCache = {};

export async function getTeamLogo(teamName) {
  const key = teamName.trim().toLowerCase();

  // Memory cache
  if (logoMemoryCache[key]) return logoMemoryCache[key];

  // LocalStorage cache
  const cachedTeams = getCache("teams");
  if (cachedTeams) {
    const team = cachedTeams.find(
      (t) => t.strTeam.toLowerCase() === key
    );
    if (team?.strTeamBadge) {
      logoMemoryCache[key] = team.strTeamBadge;
      return team.strTeamBadge;
    }
  }

  console.warn("⚠️ Logo not found in cache:", teamName);
  return null;
}

// Search
export async function searchTeams(query) {
  const data = await fetchWithCache(
    `${BASE_URL}searchteams.php?t=${query}`,
    `search-${query}`
  );
  return data.teams || [];
}

// Team by ID
export async function getTeamById(id) {
  const data = await fetchWithCache(
    `${BASE_URL}lookupteam.php?id=${id}`,
    `team-${id}`
  );
  return data.teams?.[0] || null;
}

// Matches
export async function getTeamMatches(teamId) {
  const data = await fetchWithCache(
    `${BASE_URL}eventslast.php?id=${teamId}`,
    `matches-${teamId}`
  );
  return data.results || [];
}

// Standings
export async function getStandings() {
  const data = await fetchWithCache(
    `${BASE_URL}lookuptable.php?l=4328&s=2023-2024`,
    "standings"
  );
  return data.table || [];
}



/* Search
export async function searchTeams(query) {
  const data = await fetchWithCache(
    `${BASE_URL}/searchteams.php?t=${query}`,
    `search-${query}`
  );

  return data.teams || [];
}

// Team Details
export async function getTeamById(id) {
  const data = await fetchWithCache(
    `${BASE_URL}/lookupteam.php?id=${id}`,
    `team-${id}`
  );

  return data.teams?.[0] || null;
}

// Matches
export async function getTeamMatches(teamId) {
  const data = await fetchWithCache(
    `${BASE_URL}/eventslast.php?id=${teamId}`,
    `matches-${teamId}`
  );

  return data.results || [];
}

// Logos
const logoMemoryCache = {};

export async function getTeamLogo(teamName) {
  // ✅ memory cache
  if (logoMemoryCache[teamName]) {
    return logoMemoryCache[teamName];
  }

  // ✅ localStorage cache
  const cached = getCache(`logo-${teamName}`);
  if (cached) {
    logoMemoryCache[teamName] = cached;
    return cached;
  }

  try {
    const data = await fetchWithCache(
      `${BASE_URL}/searchteams.php?t=${teamName}`,
      `logo-api-${teamName}`
    );

    const logo = data.teams?.[0]?.strTeamBadge || null;

    if (logo) {
      logoMemoryCache[teamName] = logo;
      setCache(`logo-${teamName}`, logo);
    }

    return logo;
  } catch (error) {
    console.warn("⚠️ Logo fetch failed:", teamName);
    return null;
  }
}

// 📊 Standings
export async function getStandings() {
  const data = await fetchWithCache(
    `${BASE_URL}/lookuptable.php?l=4328&s=2023-2024`,
    "standings"
  );

  return data.table || [];
}
*/
