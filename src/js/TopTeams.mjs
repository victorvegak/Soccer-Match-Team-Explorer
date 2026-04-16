import { getStandings } from "./api.mjs";

export default class TopTeams {
  constructor(selector) {
    this.parent = document.querySelector(selector);
  }

  async init() {
    if (!this.parent) return;

    try {
      this.parent.innerHTML = this.loader();

      // ✅ Get standings
      const standings = await getStandings();

      // Take top 4 teams by rank
      const topTeams = standings.slice(0, 4);

      this.render(topTeams);
    } catch (error) {
      console.error(error);
      this.parent.innerHTML = "<p>Error loading top teams</p>";
    }
  }

  loader() {
    return `<div class="loader"><div class="spinner"></div></div>`;
  }

  render(teams) {
    const html = teams.map((team, index) => `
      <div class="top-team-card fade-in" style="animation-delay:${index * 0.1}s">
        <a href="/pages/team.html?id=${team.teamid}">
          <img 
            src="${team.strBadge || "https://via.placeholder.com/150"}" 
            alt="${team.strTeam}"
            class="team-logo"
          >
          <h3>${team.strTeam}</h3>
        </a>
      </div>
    `).join("");

    this.parent.innerHTML = `<div class="top-teams-grid">${html}</div>`;
  }
}



