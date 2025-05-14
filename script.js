//  інформація про браузер і ОС
function getSystemInfo() {
  const info = {
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    theme: localStorage.getItem("theme") || "not set"
  };

  const list = document.getElementById("info-list");
  if (!list) return;

  for (const key in info) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${info[key]}`;
    list.appendChild(li);
  }
}

//  коментарі
fetch("https://jsonplaceholder.typicode.com/posts/7/comments")
  .then((response) => response.json())
  .then((comments) => {
    const commentsList = document.getElementById("comments-list");

    comments.forEach((comment) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${comment.name}</strong> (${comment.email}):<br />
        ${comment.body}
      `;
      commentsList.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Error fetching comments:", error);
  });

//  модальне вікно через 60 секунд
setTimeout(() => {
  document.getElementById("feedback-modal").style.display = "block";
}, 60000);

// Закриття модального вікна
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("feedback-modal").style.display = "none";
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("feedback-modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Теми
function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-toggle").checked = true;
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    document.getElementById("theme-toggle").checked = false;
    localStorage.setItem("theme", "light");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const hour = new Date().getHours();
    const mode = hour >= 7 && hour < 21 ? "light" : "dark";
    setTheme(mode);
  }

  themeToggle.addEventListener("change", (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  });

  getSystemInfo();
});
