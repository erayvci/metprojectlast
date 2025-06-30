const API_URL = "https://api.sheetbest.com/sheets/75cecd64-303e-43b7-a471-f829089cb818";

async function fetchArtifacts() {
  try {
    const response = await fetch(API_URL);
    const artifacts = await response.json();
    console.log("Gelen veri:", artifacts); // 👈 Konsolda veriyi kontrol edin
    displayArtifacts(artifacts);
  } catch (error) {
    console.error("Hata:", error);
  }
}

function displayArtifacts(artifacts) {
  const container = document.getElementById("museum-container");
  
  artifacts.forEach(artifact => {
    const artifactElement = document.createElement("div");
    artifactElement.className = "artifact";
    artifactElement.innerHTML = `
      <img src="${artifact.image_link}" alt="${artifact.name}">
      <div>
        <h2>${artifact.name}</h2>
        <p><strong>Description:</strong> ${artifact.short_description}</p>
        <p><strong>Findspot:</strong> ${artifact.findspot}</p>
        <p><strong>Date:</strong> ${artifact.date}</p>
        <p><strong>Museum:</strong> ${artifact.museum}</p>
      </div>
    `;
    container.appendChild(artifactElement);
  });
}

document.addEventListener("DOMContentLoaded", fetchArtifacts);
