import { getTeamMatches, getTeamLogo } from "./api.mjs";
export default class Match {
  constructor(teamId, selector) {
    this.teamId = teamId;
    this.parent = document.querySelector(selector);
    this.logoCache = {};
  }
loaderTemplate() {
      return `
        <div class="loader">
          <div class="spinner"></div>
        </div>
      `;
    }

  async init() {
    try {
      this.parent.innerHTML = this.loaderTemplate();    
      
      const matches = (await getTeamMatches(this.teamId)) || [];

      if (!matches || matches.length === 0) {
      this.parent.innerHTML = "<p>No recent matches available</p>";
      return;
    }

      this.render(matches);
    }
    catch (error) {
      this.parent.innerHTML = "<p>Error loading matches</p>";
      console.error(error);
    }
  }

  async getLogo(teamName) {
    if (this.logoCache[teamName]) {
      return this.logoCache[teamName];
    }

    const logo = await getTeamLogo(teamName);
    this.logoCache[teamName] = logo;

    return logo;
  }

  async render(matches) {
    if (!Array.isArray(matches) || matches.length === 0) {
  this.parent.innerHTML = "<p>No recent matches available</p>";
  return;
}

    const html = await Promise.all(
      matches.slice(0, 5).map(async (match, index) => {
        const homeLogo = await this.getLogo(match.strHomeTeam);
        const awayLogo = await this.getLogo(match.strAwayTeam);

        return `
          <div class="match-card fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="match-teams">

              <div class="team">
                <img src="${homeLogo || "/images/default-team.png"}" class="team-logo">
                <p>${match.strHomeTeam}</p>
              </div>

              <div class="match-score">
                <span>${match.intHomeScore ?? "-"}</span>
                <span>vs</span>
                <span>${match.intAwayScore ?? "-"}</span>
              </div>

              <div class="team">
                <img src="${awayLogo}" class="team-logo">
                <p>${match.strAwayTeam}</p>
              </div>

            </div>

            <p class="match-date">${match.dateEvent}</p>
          </div>
        `;
      })
    );

    this.parent.innerHTML = html.join("");
  }
}