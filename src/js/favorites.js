import FavoritesPage from "./FavoritesPage.mjs";

const container = document.querySelector(".favorites-list");

if (container) {
  const page = new FavoritesPage(".favorites-list");
  page.init();
}