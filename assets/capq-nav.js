
/*
  CAPQ Pro — Shared Navigation Menu
  File: assets/capq-nav.js

  Add this script to any CAPQ HTML page:
  <script src="assets/capq-nav.js" defer></script>
*/

(() => {
  "use strict";

  const pages = [
    {
      label: "CAPQ Home",
      href: "index.html",
      icon: "⌂"
    },
    {
      label: "Barber Dashboard",
      href: "barber-dashboard.html",
      icon: "▦"
    },
    {
      label: "Walk-In Check-In",
      href: "checkin.html",
      icon: "✓"
    },
    {
      label: "Walk-In Barber Directory",
      href: "barbers.html",
      icon: "♟"
    },
    {
      label: "My Barber Connect",
      href: "barber-connect.html",
      icon: "◈"
    },
    {
      label: "Find a Barber",
      href: "barber-directory.html",
      icon: "⌕"
    }
  ];

  function buildMenu() {
    if (document.getElementById("capqGlobalNav")) {
      return;
    }

    const style = document.createElement("style");

    style.textContent = `
      #capqGlobalNav {
        position:relative;
        z-index:1000;
        width:100%;
        background:#15171b;
        border-bottom:1px solid #45413a;
        color:#F7F7F4;
        font-family:Arial,Helvetica,sans-serif;
      }

      #capqGlobalNav * {
        box-sizing:border-box;
      }

      .capq-nav-inner {
        max-width:1100px;
        margin:auto;
        padding:10px 18px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
      }

      .capq-nav-home {
        color:#D6B45C;
        text-decoration:none;
        font-size:13px;
        font-weight:bold;
        letter-spacing:1px;
      }

      .capq-nav-toggle {
        display:flex;
        align-items:center;
        gap:10px;
        padding:11px 16px;
        background:#292D33;
        border:1px solid #D6B45C;
        border-radius:10px;
        color:#F7F7F4;
        font-size:14px;
        font-weight:bold;
        cursor:pointer;
      }

      .capq-nav-toggle:hover {
        background:#383b40;
      }

      .capq-nav-toggle:focus-visible,
      .capq-nav-link:focus-visible {
        outline:2px solid #D6B45C;
        outline-offset:3px;
      }

      .capq-nav-dropdown {
        position:absolute;
        top:100%;
        right:max(18px,calc((100% - 1100px)/2));
        width:min(350px,calc(100vw - 36px));
        background:#1D2025;
        border:1px solid #75633d;
        border-radius:12px;
        padding:10px;
        box-shadow:0 14px 35px rgba(0,0,0,.5);
        max-height:75vh;
        overflow-y:auto;
      }

      .capq-nav-dropdown[hidden] {
        display:none !important;
      }

      .capq-nav-heading {
        padding:12px 12px 8px;
        color:#A9ADB5;
        font-size:11px;
        font-weight:bold;
        letter-spacing:2px;
        text-transform:uppercase;
      }

      .capq-nav-link {
        display:flex;
        align-items:center;
        gap:12px;
        width:100%;
        padding:14px 12px;
        color:#F7F7F4;
        text-decoration:none;
        font-size:14px;
        border-radius:8px;
      }

      .capq-nav-link:hover {
        background:#292D33;
      }

      .capq-nav-link[aria-current="page"] {
        background:#3a3425;
        color:#D6B45C;
        font-weight:bold;
      }

      .capq-nav-icon {
        width:26px;
        text-align:center;
        color:#D6B45C;
        font-size:20px;
        flex-shrink:0;
      }

      .capq-nav-footer {
        border-top:1px solid #393c42;
        margin-top:8px;
        padding:12px;
        color:#A9ADB5;
        font-size:11px;
        text-align:center;
      }

      @media(max-width:480px) {
        .capq-nav-inner {
          padding:9px 15px;
        }

        .capq-nav-toggle {
          padding:10px 13px;
          font-size:13px;
        }

        .capq-nav-home {
          font-size:12px;
        }

        .capq-nav-dropdown {
          right:15px;
          width:calc(100vw - 30px);
        }
      }
    `;

    document.head.appendChild(style);

    const nav = document.createElement("nav");
    nav.id = "capqGlobalNav";
    nav.setAttribute(
      "aria-label",
      "CAPQ Pro main navigation"
    );

    const inner = document.createElement("div");
    inner.className = "capq-nav-inner";

    const home = document.createElement("a");
    home.className = "capq-nav-home";
    home.href = "index.html";
    home.textContent = "CAPQ PRO";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "capq-nav-toggle";
    toggle.textContent = "☰  Menu";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute(
      "aria-controls",
      "capqNavDropdown"
    );

    const dropdown = document.createElement("div");
    dropdown.id = "capqNavDropdown";
    dropdown.className = "capq-nav-dropdown";
    dropdown.hidden = true;

    const heading = document.createElement("div");
    heading.className = "capq-nav-heading";
    heading.textContent = "Navigate CAPQ Pro";

    dropdown.appendChild(heading);

    const currentPage =
      window.location.pathname.split("/").pop() ||
      "index.html";

    pages.forEach(page => {
      const link = document.createElement("a");
      link.className = "capq-nav-link";
      link.href = page.href;

      if (currentPage === page.href) {
        link.setAttribute("aria-current", "page");
      }

      const icon = document.createElement("span");
      icon.className = "capq-nav-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = page.icon;

      const label = document.createElement("span");
      label.textContent = page.label;

      link.append(icon, label);
      dropdown.appendChild(link);
    });

    const footer = document.createElement("div");
    footer.className = "capq-nav-footer";
    footer.textContent = "CAPQ Pro · Built for Barbers";

    dropdown.appendChild(footer);

    inner.append(home, toggle);
    nav.append(inner, dropdown);

    document.body.insertBefore(
      nav,
      document.body.firstChild
    );

    function closeMenu() {
      dropdown.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰  Menu";
    }

    function openMenu() {
      dropdown.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "✕  Close";
    }

    toggle.addEventListener("click", () => {
      if (dropdown.hidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    document.addEventListener("click", event => {
      if (!nav.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      buildMenu
    );
  } else {
    buildMenu();
  }
})();
