import { getTeamById } from "./api.mjs";

export default class TeamDetails {
  constructor(id, selector) {
    this.id = id;
    this.parent = document.querySelector(selector);
  }

  async init() {
    const data = await getTeamById(this.id);

    // Some APIs return { teams: [...] }
    const team = Array.isArray(data?.teams) ? data.teams[0] : data;

    this.render(team);
  }

  render(team) {
    if (!team) {
      this.parent.innerHTML = "<p>Team not found.</p>";
      return;
    }

    this.parent.innerHTML = `
      <h2>${team.strTeam}</h2>
      ${team.strTeamBadge ? `<img src="${team.strTeamBadge}" alt="${team.strTeam}">` : ""}
      <p><strong>Country:</strong> ${team.strCountry}</p>
      <p>${team.strDescriptionEN ? team.strDescriptionEN.slice(0, 200) + "..." : "No description available."}</p>
    `;
  }
}



