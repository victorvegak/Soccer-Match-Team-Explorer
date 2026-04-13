import TeamList from "./TeamList.mjs";
import Standings from "./Standings.mjs";
import TeamDetails from "./TeamDetails.mjs";
import Match from "./Match.mjs";

if (document.querySelector(".standings")) {
  const standings = new Standings(".standings");
  standings.init();
}

if (document.querySelector(".team-list")) {
  const teamList = new TeamList(".team-list");
  teamList.init();
}