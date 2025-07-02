// Define your hash-based routes
const routes = {
  "": "login.html",
  "#login": "login.html",
  "#dashboard": "dashboard.html",
  "#admin": "admin.html",
  "#signup": "signup.html"
};

// Routing logic
async function loadView(viewFile) {
  const res = await fetch(`views/${viewFile}`);
  const html = await res.text();
  const app = document.getElementById("app");
  app.innerHTML = html;

  // Execute any <script> tags inside the view
  const scripts = app.querySelectorAll("script");
  scripts.forEach(script => {
    const newScript = document.createElement("script");
    if (script.src) {
      newScript.src = script.src;
    } else {
      newScript.textContent = script.textContent;
    }
    document.body.appendChild(newScript);
  });
}

function router() {
  const hash = location.hash || "#login";
  const view = routes[hash] || "login.html";
  loadView(view);
}

// Check site status from Firebase before loading any view
firebase.database().ref("siteStatus").once("value").then(snapshot => {
  if (snapshot.val() === "disabled") {
    loadView("maintenance.html");
  } else {
    console.log("Site is enabled, loading view...");
    router(); // Load view based on hash
  }
});

// Handle navigation
window.addEventListener("hashchange", router);

