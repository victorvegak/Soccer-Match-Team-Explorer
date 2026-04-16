import { getTeamMatches } from "./api.mjs";

// Helper to format dates nicely
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default class Match {
  constructor(teamId, selector) {
    this.teamId = teamId;
    this.parent = document.querySelector(selector);
  }

  loaderTemplate() {
    return `<div class="loader"><div class="spinner"></div></div>`;
  }

  async init() {
    if (!this.parent) return;

    try {
      this.parent.innerHTML = this.loaderTemplate();
      const matches = await getTeamMatches(this.teamId);

      // Separate upcoming vs past matches
      const upcoming = matches.find(m => new Date(m.dateEvent) > new Date());
      const pastMatches = matches.filter(m => new Date(m.dateEvent) <= new Date());

      // Render upcoming match
      const upcomingContainer = document.querySelector(".upcoming-match");
      if (upcoming && upcomingContainer) {
        upcomingContainer.innerHTML = `
          <div class="upcoming-match fade-in">
            <h3>Next Match</h3>
            <p>${upcoming.strHomeTeam} vs ${upcoming.strAwayTeam}</p>
            <p>Date: ${formatDate(upcoming.dateEvent)}</p>
          </div>
        `;
      }

      // Render past matches
      this.render(pastMatches);
    } catch (error) {
      console.error("Error loading matches:", error);
      this.parent.innerHTML = "<p>Error loading matches</p>";
    }
  }

  render(matches) {
    if (!matches || matches.length === 0) {
      this.parent.innerHTML = "<p>No matches found</p>";
      return;
    }

    const html = matches.slice(0, 5).map((match, index) => {
      // Determine result class (win/loss/draw)
      let resultClass = "draw";
      if (match.intHomeScore != null && match.intAwayScore != null) {
        if (match.strHomeTeam === this.teamId.toString()) {
          if (match.intHomeScore > match.intAwayScore) resultClass = "win";
          else if (match.intHomeScore < match.intAwayScore) resultClass = "loss";
        } else if (match.strAwayTeam === this.teamId.toString()) {
          if (match.intAwayScore > match.intHomeScore) resultClass = "win";
          else if (match.intAwayScore < match.intHomeScore) resultClass = "loss";
        }
      }

      return `
        <div class="match-card fade-in ${resultClass}" style="animation-delay: ${index * 0.1}s">
          <div class="match-teams">
            ${match.strHomeTeamBadge ? `<img src="${match.strHomeTeamBadge}" class="team-logo" alt="${match.strHomeTeam}">` : ""}
            <p>${match.strHomeTeam}</p>
            <div class="match-score">
              <span>${match.intHomeScore ?? "-"}</span>
              <span>vs</span>
              <span>${match.intAwayScore ?? "-"}</span>
            </div>
            ${match.strAwayTeamBadge ? `<img src="${match.strAwayTeamBadge}" class="team-logo" alt="${match.strAwayTeam}">` : ""}
            <p>${match.strAwayTeam}</p>
          </div>
          <p class="match-date">${formatDate(match.dateEvent)}</p>
        </div>
      `;
    }).join("");

    this.parent.innerHTML = html;
  }
}
