// Create loader bar
const loader = document.createElement("div");
loader.classList.add("page-loader");
document.body.appendChild(loader);

// Start loading animation
function startLoading() {
  loader.style.width = "0%";
  loader.style.opacity = "1";

  setTimeout(() => {
    loader.style.width = "70%";
  }, 100);

  setTimeout(() => {
    loader.style.width = "100%";
  }, 300);
}

// Finish loading
function finishLoading() {
  loader.style.width = "100%";

  setTimeout(() => {
    loader.style.opacity = "0";
  }, 200);
}

// Run on page load
window.addEventListener("load", () => {
  finishLoading();
});

// Intercept links
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  const href = link.getAttribute("href");

  if (!href || href.startsWith("#") || link.target === "_blank") return;

  e.preventDefault();

  startLoading();

  setTimeout(() => {
    window.location.href = href;
  }, 400);
});