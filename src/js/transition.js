// Fade in on page load
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Fade out on link click
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

   
    if (!href || href.startsWith("#") || this.target === "_blank") return;

    e.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});