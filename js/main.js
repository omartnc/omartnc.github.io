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

  // Close with the exit animation: add the class, wait for animationend, close.
  // Escape still closes natively (instant) — acceptable; the animated path
  // covers the visible close interactions.
  function closeAnimated(dialog) {
    if (dialog.classList.contains("is-closing")) {
      return;
    }
    dialog.classList.add("is-closing");
    dialog.addEventListener(
      "animationend",
      function onEnd() {
        dialog.classList.remove("is-closing");
        dialog.close();
        dialog.removeEventListener("animationend", onEnd);
      },
      { once: true }
    );
  }

  document.querySelectorAll("dialog.project-dialog").forEach(function (dialog) {
    dialog.querySelectorAll("[data-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        closeAnimated(dialog);
      });
    });
    // Clicking the backdrop (target === dialog) closes
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeAnimated(dialog);
      }
    });
  });

  // Scroll reveals: sections fade+rise once when they enter the viewport.
  // Falls back to "everything visible" without IntersectionObserver or when
  // the user prefers reduced motion (CSS handles that case too).
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  function revealAll() {
    revealEls.forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }

  if (!("IntersectionObserver" in window) || reduceMotion || !revealEls.length) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
