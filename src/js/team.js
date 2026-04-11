import TeamDetails from "./TeamDetails.mjs";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const team = new TeamDetails(id, ".team-detail");
team.init();