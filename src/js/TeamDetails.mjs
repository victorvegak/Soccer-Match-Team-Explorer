import { getTeamById } from "./api.mjs";

export default class TeamDetails {
  constructor(id, selector) {
    this.id = id;
    this.parent = document.querySelector(selector);
  }

  async init() {
    const team = await getTeamById(this.id);
    this.render(team);
  }

  render(team) {
    if (!team) {
      this.parent.innerHTML = "<p>Team not found.</p>";
      return;
    }
    this.parent.innerHTML = `
      <h2>${team.strTeam}</h2>
      <img src="${team.strTeamBadge || "https://via.placehold.co/150"}">
      <p>${team.strCountry}</p>
      <p>${team.strDescriptionEN?.slice(0, 200)}...</p>
    `;
  }
}