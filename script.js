const API_URL = "https://api.sheetbest.com/sheets/75cecd64-303e-43b7-a471-f829089cb818";

async function fetchArtifacts() {
  try {
    const response = await fetch(API_URL);
    const artifacts = await response.json();
    console.log("API'den gelen veri:", artifacts); // Veriyi kontrol edin
    displayArtifacts(artifacts);
  } catch (error) {
    console.error("Hata:", error);
    document.getElementById("museum-container").innerHTML = `
      <div style="color: red; padding: 20px;">
        <p>Veri yüklenemedi. Lütfen konsolu kontrol edin (F12 > Console).</p>
      </div>
    `;
  }
}

function displayArtifacts(artifacts) {
  const container = document.getElementById("museum-container");
  container.innerHTML = "";

  artifacts.forEach(artifact => {
    const artifactElement = document.createElement("div");
    artifactElement.className = "artifact";
    artifactElement.innerHTML = `
      <div>
        <h2>${artifact["Item"] || "İsim Yok"}</h2>
        <p><strong>Menşei:</strong> ${artifact["Origin of Place"] || "Bilinmiyor"}</p>
        <p><strong>Dönem:</strong> ${artifact["time period"] || "Bilinmiyor"}</p>
        <p><strong>Kültür:</strong> ${artifact["culture"] || "Bilinmiyor"}</p>
        <p><strong>Malzeme:</strong> ${artifact["material type"] || "Bilinmiyor"}</p>
      </div>
    `;
    container.appendChild(artifactElement);
  });
}

document.addEventListener("DOMContentLoaded", fetchArtifacts);
