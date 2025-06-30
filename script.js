// Sheet.best JSON URL'sini buraya yapıştırın
const API_URL = "https://api.sheetbest.com/sheets/75cecd64-303e-43b7-a471-f829089cb818";

async function fetchArtifacts() {
  try {
    const response = await fetch(API_URL);
    const artifacts = await response.json();
    displayArtifacts(artifacts);
  } catch (error) {
    console.error("Veri çekme hatası:", error);
  }
}

function displayArtifacts(artifacts) {
  const container = document.getElementById("museum-container");
  
  artifacts.forEach(artifact => {
    const artifactElement = document.createElement("div");
    artifactElement.className = "artifact";
    artifactElement.innerHTML = `
      <img src="${artifact.imageLink}" alt="${artifact.name}">
      <div>
        <h2>${artifact.name}</h2>
        <p><strong>Description:</strong> ${artifact.shortDescription}</p>
        <p><strong>Findspot:</strong> ${artifact.findspot}</p>
        <p><strong>Date:</strong> ${artifact.date}</p>
      </div>
    `;
    container.appendChild(artifactElement);
  });
}

// Sayfa yüklendiğinde verileri çek
document.addEventListener("DOMContentLoaded", fetchArtifacts);
