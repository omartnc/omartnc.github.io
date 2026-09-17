(function () {
  "use strict";

  var nav = document.getElementById("sideNav");
  var toggle = document.getElementById("navToggle");

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  // Mobile menu toggle
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close the mobile menu when a link is chosen
  nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close the mobile menu on Escape, outside tap, or when keyboard focus
  // leaves it (disclosure pattern: never leave focus stranded behind the
  // open overlay)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (nav.classList.contains("is-open") && !nav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("focusin", function (event) {
    if (nav.classList.contains("is-open") && !nav.contains(event.target)) {
      closeMenu();
    }
  });

  // Scrollspy: highlight the nav link of the section in view
  var links = Array.prototype.slice.call(nav.querySelectorAll(".site-nav__link"));
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // Project dialogs (ponytail: no fallback for browsers without <dialog>/
  // IntersectionObserver; targets all modern browsers, upgrade path is a
  // tiny polyfill or a class-based modal if legacy support is ever needed)
  document.querySelectorAll("[data-dialog]").forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      var dialog = document.querySelector(trigger.getAttribute("data-dialog"));
      if (dialog && dialog.showModal) {
        dialog.showModal();
      }
    });
  });

  document.querySelectorAll("dialog.project-dialog").forEach(function (dialog) {
    dialog.querySelectorAll("[data-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        dialog.close();
      });
    });
    // Clicking the backdrop (target === dialog) closes
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });

  // Footer year
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
