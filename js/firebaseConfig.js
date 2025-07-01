

// Define your hash-based routes
const routes = {
  "": "login.html",
  "#login": "login.html",
  "#dashboard": "dashboard.html",
  "#admin": "admin.html",
  "#signup": "signup.html"
};

const firebaseConfig = {
  apiKey: "AIzaSyCbQnXXpuUEB-4-8_cXdf27j3vugolcKBY",
  authDomain: "e2i-dashboard.firebaseapp.com",
  databaseURL: "https://e2i-dashboard-default-rtdb.firebaseio.com",
  projectId: "e2i-dashboard",
  storageBucket: "e2i-dashboard.firebasestorage.app",
  messagingSenderId: "243878495744",
  appId: "1:243878495744:web:68e9640f565808d7e97ae5"
};
firebase.initializeApp(firebaseConfig);

// Routing logic
async function loadView(viewFile) {
  try {
    const res = await fetch(`views/${viewFile}`);
    const html = await res.text();
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

