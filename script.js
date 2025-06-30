const API_URL = "https://sheet.best/api/sheets/75cecd64-303e-43b7-a471-f829089cb818";

async function fetchArtifacts() {
  try {
    console.log("Fetching data from API...");
    const response = await fetch(API_URL);
    
    // Check if API response is successful
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const artifacts = await response.json();
    console.log("API response data:", artifacts);
    
    // Check if data exists
    if (!artifacts || artifacts.length === 0) {
      throw new Error("API returned empty data");
    }
    
    displayArtifacts(artifacts);
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage(error.message);
  }
}

function displayArtifacts(artifacts) {
  const container = document.getElementById("museum-container");
  container.innerHTML = ""; // Clear previous content

  artifacts.forEach(artifact => {
    const artifactElement = document.createElement("div");
    artifactElement.className = "artifact";
    
    artifactElement.innerHTML = `
      <div class="image-container">
        <img src="${artifact.image_link || 'https://via.placeholder.com/200'}" 
             alt="${artifact.Item || 'Artifact image'}"
             onerror="this.onerror=null;this.src='https://via.placeholder.com/200'">
      </div>
      <div class="info-container">
        <h2>${artifact.Item || "Untitled Artifact"}</h2>
        <p><strong>Origin:</strong> ${artifact["Origin of Place"] || "Unknown"}</p>
        <p><strong>Period:</strong> ${artifact["time period"] || "Unknown"}</p>
        <p><strong>Culture:</strong> ${artifact.culture || "Unknown"}</p>
        <p><strong>Material:</strong> ${artifact["material type"] || "Unknown"}</p>
        ${artifact.met_page ? `
          <a href="${artifact.met_page}" target="_blank" class="met-link">
            🔍 View on MET Museum
          </a>
        ` : ""}
      </div>
    `;
    container.appendChild(artifactElement);
  });
}

function displayErrorMessage(message) {
  const container = document.getElementById("museum-container");
  container.innerHTML = `
    <div class="error-message">
      <h3>Data Loading Failed</h3>
      <p>${message}</p>
      <p>Please check the console (F12 > Console) for details.</p>
    </div>
  `;
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", fetchArtifacts);
