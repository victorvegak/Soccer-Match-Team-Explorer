import { getStandings } from "./api.mjs";

export default class Standings {
  constructor(selector) {
    this.parent = document.querySelector(selector);
    this.tableData = [];
    this.sortDirection = {};
  }

  async init() {
    try {
      this.parent.innerHTML = `<p>Loading standings...</p>`;

      const table = await getStandings();

      this.tableData = table;
      this.render(this.tableData);
    } catch (err) {
      this.parent.innerHTML = "<p>Error loading standings</p>";
      console.error(err);
    }
  }

  render(table) {
    if (!table || table.length === 0) {
      this.parent.innerHTML = "<p>No standings available</p>";
      return;
    }

    const html = `
      <table class="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th data-sort="intPoints">Pts ⬍</th>
            <th data-sort="intWin">W ⬍</th>
            <th data-sort="intDraw">D ⬍</th>
            <th data-sort="intLoss">L ⬍</th>
          </tr>
        </thead>
        <tbody>
          ${table.map((team, index) => {
  let rowClass = "";

  if (index < 4) {
    rowClass = "top-team"; 
  } else if (index >= table.length - 3) {
    rowClass = "relegation"; 
  }

  return `
    <tr class="${rowClass}">
      <td>${team.intRank}</td>
      <td class="team-cell">
        <img src="${team.strBadge}" class="team-logo">
        ${team.strTeam}
      </td>
      <td>${team.intPoints}</td>
      <td>${team.intWin}</td>
      <td>${team.intDraw}</td>
      <td>${team.intLoss}</td>
    </tr>
  `;
    }).join("")}
        </tbody>
      </table>
    `;

    this.parent.innerHTML = html;

    this.addSortEvents(); // ✅ CALL IT HERE (VERY IMPORTANT)
  }

  // ✅ 🔥 ADD YOUR METHOD HERE
  addSortEvents() {
    const headers = this.parent.querySelectorAll("[data-sort]");

    headers.forEach(header => {
      header.addEventListener("click", () => {
        const key = header.dataset.sort;

        this.sortDirection[key] = !this.sortDirection[key];

        const sorted = [...this.tableData].sort((a, b) => 
          this.sortDirection[key]
            ? b[key] - a[key]
            : a[key] - b[key]
        );

        this.render(sorted);
      });
    });
  }
}