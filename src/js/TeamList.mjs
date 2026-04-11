import { getTeams } from "./api.mjs";

export default class TeamList {
  constructor(selector) {
    this.parent = document.querySelector(selector);
  }

  async init() {
    const teams = await getTeams();
    this.render(teams);
  }

  render(teams) {
    const html = teams.map(team => {
      console.log("IMAGE:", team.strTeamBadge); // ✅ correct place
      return this.teamTemplate(team);
    }).join("");

    this.parent.innerHTML = html;
  }

  teamTemplate(team) {
  const image = team.strBadge 
    ? team.strBadge 
    : "https://placehold.co/100";

  return `
    <div class="team-card">
      <a href="/src/pages/team.html?id=${team.idTeam}">
        <img src="${image}" alt="${team.strTeam}">
        <h3>${team.strTeam}</h3>
      </a>
    </div>
  `;
}
}