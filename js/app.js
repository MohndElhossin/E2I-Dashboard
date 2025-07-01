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
  try {
    const res = await fetch(`views/${viewFile}`);
    const html = await res.text();
    console.log(html);
    document.getElementById("app").innerHTML = html;
  } catch (err) {
    document.getElementById("app").innerHTML = "<h2>View not found</h2>";
  }
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
    router(); // Load view based on hash
  }
});

// Handle navigation
window.addEventListener("hashchange", router);

