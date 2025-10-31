// Menu Toggle
document.getElementById("hamburger").onclick = () => {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
};

// Edit Mode
let editing = false;
document.getElementById("editBtn").onclick = () => {
  editing = !editing;
  document.querySelectorAll(".editable").forEach(el => {
    el.contentEditable = editing;
    el.style.borderBottom = editing ? "1px dashed #9000ff" : "none";
  });
  alert(editing ? "Editing enabled" : "Editing disabled");
};

// Save
document.getElementById("saveBtn").onclick = () => {
  const data = {};
  document.querySelectorAll(".editable").forEach(el => {
    data[el.dataset.key] = el.innerText;
  });
  localStorage.setItem("portfolioData", JSON.stringify(data));
  alert("Changes saved!");
};

// Reset
document.getElementById("resetBtn").onclick = () => {
  localStorage.removeItem("portfolioData");
  location.reload();
};

// Load Data
window.onload = () => {
  const saved = localStorage.getItem("portfolioData");
  if (saved) {
    const data = JSON.parse(saved);
    document.querySelectorAll(".editable").forEach(el => {
      if (data[el.dataset.key]) el.innerText = data[el.dataset.key];
    });
  }
};

// Download PDF
document.getElementById("downloadBtn").onclick = () => {
  const content = document.getElementById("portfolioContent");
  html2pdf().from(content).save("Kushiruddin_Patan_Portfolio.pdf");
};

// Change Background
document.getElementById("changeBgBtn").onclick = () => {
  const colors = ["#2c0077", "#ff007f", "#0077ff", "#00ff99", "#ffb400"];
  const random = colors[Math.floor(Math.random() * colors.length)];
  document.querySelector(".neon-bg").style.background = `radial-gradient(circle at center, ${random}, #000)`;
};

// Change Profile Photo
document.getElementById("changeProfileBtn").onclick = () => {
  document.getElementById("imageUpload").click();
};

document.getElementById("imageUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("profilePhoto").src = reader.result;
      localStorage.setItem("profilePhoto", reader.result);
    };
    reader.readAsDataURL(file);
  }
});

// Load saved photo
window.addEventListener("load", () => {
  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) document.getElementById("profilePhoto").src = savedPhoto;
});
