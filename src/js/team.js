import TeamDetails from "./TeamDetails.mjs";
import Match from "./Match.mjs";

function initTeamPage() {
  const params = new URLSearchParams(window.location.search);
  const teamId = Number(params.get("id"));

  const detailContainer = document.querySelector(".team-detail");
  const matchesContainer = document.querySelector(".matches");

  // 🛑 If no ID
  if (!teamId) {
    if (detailContainer) {
      detailContainer.innerHTML = "<p>Select a team from the Teams page.</p>";
    }

    if (matchesContainer) {
      matchesContainer.innerHTML = "";
    }

    console.warn("No team ID provided");
    return; // ✅ NOW VALID
  }

  // ✅ Load data
  const team = new TeamDetails(teamId, ".team-detail");
  team.init();

  const matches = new Match(teamId, ".matches");
  matches.init();
}

// 🚀 Run it
initTeamPage();