import { getTeams } from "./api.mjs";
import Favorites from "./Favorites.mjs";

export default class TeamList {
  constructor(selector) {
    this.parent = document.querySelector(selector);
    this.teams = [];
  }

  async init() {
    this.teams = await getTeams(); 
    this.render(this.teams);
    this.initSearch();
  }

  render(teams) {
    const fav = new Favorites();

    const html = teams.map((team) => {
      const isFav = fav.isFavorite(team.idTeam);

      return `
        <div class="team-card">
          <a href="/pages/team.html?id=${team.idTeam}">
            ${team.strTeamBadge ? `<img src="${team.strTeamBadge}" alt="${team.strTeam}">` : ""}
            <h3>${team.strTeam}</h3>
          </a>

          <button class="fav-btn ${isFav ? "active" : ""}" data-id="${team.idTeam}">
            ⭐
          </button>
        </div>
      `;
    }).join("");

    this.parent.innerHTML = html;
    this.addFavoriteEvents(teams);
  }

  addFavoriteEvents(teams) {
    const fav = new Favorites();

    this.parent.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const id = Number(e.target.dataset.id);
        const team = teams.find(t => Number(t.idTeam) === id);

        if (!team) {
          console.error("Team not found:", id);
          return;
        }

        fav.toggleFavorite(team);
        e.target.classList.toggle("active");
      });
    });
  }

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

