import { getTeams, getTeamLogo } from "./api.mjs";
import Favorites from "./Favorites.mjs";

export default class TeamList {
  constructor(selector) {
    this.parent = document.querySelector(selector);
    this.teams = []; // ✅ store teams
  }

  async init() {
    this.teams = await getTeams();
    this.render(this.teams);

    this.initSearch(); // ✅ CALL IT HERE
  }

  async render(teams) {
    const fav = new Favorites();

    const html = await Promise.all(
    teams.map(async (team) => {
      const logo = await getTeamLogo(team.strTeam);

      const isFav = fav.isFavorite(team.idTeam);

      return `
        <div class="team-card">
          <a href="/pages/team.html?id=${team.idTeam}">
            <img 
              src="${logo || "/images/default-team.png"}" 
              alt="${team.strTeam}"
            >
            <h3>${team.strTeam}</h3>
          </a>

          <button class="fav-btn ${isFav ? "active" : ""}" data-id="${team.idTeam}">
            ⭐
          </button>
        </div>
      `;
    })
  );

  this.parent.innerHTML = html.join("");

  this.addFavoriteEvents(teams);
}

  addFavoriteEvents(teams) {
    const fav = new Favorites();

    document.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // ✅ prevent link click

        const id = Number(e.target.dataset.id);

        const team = teams.find(t => Number(t.idTeam) === id);

        fav.toggleFavorite(team);
        e.target.classList.toggle("active");
      });
    });
  }

  // ✅ 🔥 ADD IT HERE (inside class, outside other methods)
  initSearch() {
    const searchInput = document.getElementById("search");

    if (!searchInput) return;

    let timeout;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const value = e.target.value.toLowerCase();

        const filtered = this.teams.filter(team =>
          team.strTeam.toLowerCase().includes(value)
        );

        this.render(filtered);
      }, 300);
    });
  }
}