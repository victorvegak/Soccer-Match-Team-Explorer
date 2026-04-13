export default class Favorites {
  constructor(key = "favorite-teams") {
    this.key = key;
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  saveFavorites(favorites) {
    localStorage.setItem(this.key, JSON.stringify(favorites));
  }

  isFavorite(teamId) {
    const favorites = this.getFavorites();
    return favorites.some(team => team.idTeam == teamId);
  }

  toggleFavorite(team) {
    let favorites = this.getFavorites();

    if (this.isFavorite(team.idTeam)) {
      favorites = favorites.filter(t => t.idTeam !== team.idTeam);
    } else {
      favorites.push(team);
    }

    this.saveFavorites(favorites);
  }
}