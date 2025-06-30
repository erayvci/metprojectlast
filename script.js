const API_URL = "https://api.sheetbest.com/sheets/75cecd64-303e-43b7-a471-f829089cb818";

async function fetchArtifacts() {
  try {
    // CORS desteği için ek header
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const artifacts = await response.json();
    console.log("API Yanıtı:", artifacts); // Konsolda veriyi kontrol edin
    
    if (!artifacts || artifacts.length === 0) {
      throw new Error("API boş veri döndürdü!");
    }
    
    displayArtifacts(artifacts);
  } catch (error) {
    console.error("Kritik Hata:", error);
    document.getElementById("museum-container").innerHTML = `
      <div style="color: red; padding: 20px; border: 1px solid red;">
        <h3>Hata Oluştu!</h3>
        <p>${error.message}</p>
        <p>Lütfen konsolu kontrol edin (F12 > Console).</p>
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
    
    // Eser bilgilerini göster (API'deki key'lerle birebir eşleşmeli)
    artifactElement.innerHTML = `
      <div>
        <h2>${artifact["A"] || "İsim Yok"}</h2>
        <p><strong>Origin:</strong> ${artifact["B"] || "Bilinmiyor"}</p>
        <p><strong>Time:</strong> ${artifact["C"] || "Bilinmiyor"}</p>
        <p><strong>Category:</strong> ${artifact["D"] || "Bilinmiyor"}</p>
        <p><strong>Material:</strong> ${artifact["E"] || "Bilinmiyor"}</p>
        <p><strong>Picture:</strong> ${artifact["F"] || "Bilinmiyor"}</p>
        <p><strong>Link:</strong> ${artifact["G"] || "Bilinmiyor"}</p>

      </div>
      <hr>
    `;
    container.appendChild(artifactElement);
  });
}

// Sayfa yüklendiğinde çalıştır
window.addEventListener("load", fetchArtifacts);
