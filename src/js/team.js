import TeamDetails from "./TeamDetails.mjs";
import Match from "./Match.mjs";

const params = new URLSearchParams(window.location.search);
const teamId = Number(params.get("id"));

if (!teamId) {
  document.querySelector(".team-detail").innerHTML =
    "<p>Please select a team from the list.</p>";
  window.location.href = "/";
}

const team = new TeamDetails(teamId, ".team-detail");
team.init();

const matches = new Match(teamId, ".matches");
matches.init();