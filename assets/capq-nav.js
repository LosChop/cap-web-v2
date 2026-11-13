
(() => {
  "use strict";

  if (document.getElementById("capq-menu-root")) return;

  const GOLD = "#D6B45C";

  const pages = [
    {
      label: "Barber Dashboard",
      href: "barber-dashboard.html"
    },
    {
      label: "My Barber Connect",
      href: "barber-connect.html"
    },
    {
      label: "Barber Connect Directory",
      href: "barber-directory.html"
    },
    {
      label: "Customer Check-In",
      href: "checkin.html"
    }
  ];

  const style = document.createElement("style");
  style.textContent = `
    #capq-menu-root {
      position: relative;
      flex: 0 0 auto;
      z-index: 1000;
      font-family: Arial, Helvetica, sans-serif;
    }

    #capq-menu-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 40px;
      padding: 9px 12px;
      background: #292D33;
      color: ${GOLD};
      border: 1px solid #786434;
      border-radius: 9px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    #capq-menu-button:hover,
    #capq-menu-button:focus-visible {
      border-color: ${GOLD};
      outline-color: ${GOLD};
    }

    #capq-menu-button .capq-menu-icon {
      font-size: 19px;
      line-height: 1;
    }

    #capq-menu-panel {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: min(270px, calc(100vw - 30px));
      padding: 8px;
      background: #1C1F24;
      border: 1px solid #786434;
      border-radius: 12px;
      box-shadow: 0 15px 40px rgba(0,0,0,.5);
      z-index: 1001;
    }

    #capq-menu-panel[hidden] {
      display: none !important;
    }

    #capq-menu-panel a {
      display: block;
      padding: 13px 12px;
      color: #F7F7F4;
      text-decoration: none;
      font-size: 14px;
      border-radius: 8px;
    }

    #capq-menu-panel a:hover,
    #capq-menu-panel a:focus-visible {
      background: #292D33;
      color: ${GOLD};
    }

    #capq-menu-panel a[aria-current="page"] {
      background: #302A1D;
      color: ${GOLD};
      font-weight: bold;
    }

    .capq-header-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      flex: 0 0 auto;
    }

    @media (max-width: 550px) {
      #capq-menu-button {
        width: 42px;
        min-width: 42px;
        padding: 9px;
      }

      #capq-menu-button .capq-menu-label {
        display: none;
      }

      .capq-header-actions {
        gap: 6px;
      }
    }
  `;

  document.head.appendChild(style);

  // Find the existing page header.
  const header =
    document.querySelector("main > header") ||
    document.querySelector("header.topbar") ||
    document.querySelector("header");

  if (!header) {
    console.warn("CAPQ Menu: Page header not found.");
    return;
  }

  const root = document.createElement("div");
  root.id = "capq-menu-root";

  const button = document.createElement("button");
  button.id = "capq-menu-button";
  button.type = "button";
  button.setAttribute("aria-label", "Open navigation menu");
  button.setAttribute("aria-haspopup", "true");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "capq-menu-panel");

  const icon = document.createElement("span");
  icon.className = "capq-menu-icon";
  icon.textContent = "☰";
  icon.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "capq-menu-label";
  label.textContent = "Menu";

  button.append(icon, label);

  const panel = document.createElement("nav");
  panel.id = "capq-menu-panel";
  panel.setAttribute("aria-label", "CAPQ navigation");
  panel.hidden = true;

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  pages.forEach(page => {
    const link = document.createElement("a");
    link.href = page.href;
    link.textContent = page.label;

    if (currentPage === page.href) {
      link.setAttribute("aria-current", "page");
    }

    panel.appendChild(link);
  });

  root.append(button, panel);

  // Put the menu beside Sign Out, when available.
  const signout =
    header.querySelector("#signout") ||
    header.querySelector(".signout");

  if (signout) {
    const actions = document.createElement("div");
    actions.className = "capq-header-actions";

    signout.parentNode.insertBefore(actions, signout);
    actions.append(root, signout);
  } else {
    // On other pages, place it inside the existing header.
    const actions = document.createElement("div");
    actions.className = "capq-header-actions";

    const existingRightLink =
      header.querySelector(".back") ||
      header.querySelector(".home");

    if (existingRightLink) {
      existingRightLink.parentNode.insertBefore(
        actions,
        existingRightLink
      );
      actions.append(root, existingRightLink);
    } else {
      actions.appendChild(root);
      header.appendChild(actions);
    }
  }

  function setOpen(open) {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  }

  button.addEventListener("click", () => {
    setOpen(panel.hidden);
  });

  document.addEventListener("click", event => {
    if (!root.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) {
      setOpen(false);
      button.focus();
    }
  });
})();
