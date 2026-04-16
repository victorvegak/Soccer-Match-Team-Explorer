import Favorites from "./Favorites.mjs";

export default class FavoritesPage {
  constructor(selector) {
    this.parent = document.querySelector(selector);
  }

  init() {
    if (!this.parent) return;
    this.render();
  }

  render() {
    const fav = new Favorites();
    const teams = fav.getFavorites();

    if (!teams || teams.length === 0) {
      this.parent.innerHTML = "<p>No favorite teams yet ⭐</p>";
      return;
    }

    const html = teams.map((team) => `
      <div class="team-card fade-in">
        <a href="/pages/team.html?id=${team.idTeam}">
          ${team.strBadge ? `<img src="${team.strBadge}" alt="${team.strTeam}" class="team-logo">` : ""}
          <h3>${team.strTeam}</h3>
        </a>

        <button class="remove-fav" data-id="${team.idTeam}">
          ❌
        </button>
      </div>
    `).join("");

    this.parent.innerHTML = html;
    this.addRemoveEvents();
  }

  addRemoveEvents() {
    const fav = new Favorites();

    this.parent.querySelectorAll(".remove-fav").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        let favorites = fav.getFavorites();
        favorites = favorites.filter(t => Number(t.idTeam) !== id);
        fav.saveFavorites(favorites);
        this.render();
      });
    });
  }
}


