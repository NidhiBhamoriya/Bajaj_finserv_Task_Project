// script.js
document.getElementById("jsonForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const jsonInput = document.getElementById("jsonInput").value;
    const fileInput = document.getElementById("fileInput").files[0];
    const dropdownContainer = document.getElementById("dropdownContainer");
    const responseContainer = document.getElementById("responseContainer");
    const responseData = document.getElementById("responseData");
  
    // Validate JSON Input
    let jsonData;
    try {
      jsonData = JSON.parse(jsonInput);
    } catch (err) {
      alert("Invalid JSON input.");
      return;
    }
  
    // Prepare Payload
    const formData = new FormData();
    formData.append("data", JSON.stringify(jsonData.data));
    if (fileInput) {
      formData.append("file", fileInput);
    }
  
    // Make API Request
    try {
      const response = await fetch("https://your-backend-url.com/bfhl", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
  
      // Populate Dropdown and Response
      dropdownContainer.style.display = "block";
      responseContainer.style.display = "block";
      responseData.textContent = JSON.stringify(result, null, 2);
  
      // Handle Dropdown Filtering
      dropdownContainer.addEventListener("change", () => {
        const filters = Array.from(
          dropdownContainer.querySelectorAll("input:checked")
        ).map((input) => input.value);
  
        const filteredResponse = {};
        if (filters.includes("alphabets")) filteredResponse.alphabets = result.alphabets;
        if (filters.includes("numbers")) filteredResponse.numbers = result.numbers;
        if (filters.includes("highest_lowercase")) filteredResponse.highest_lowercase_alphabet = result.highest_lowercase_alphabet;
  
        responseData.textContent = JSON.stringify(filteredResponse, null, 2);
      });
    } catch (err) {
      alert("Error connecting to the backend.");
      console.error(err);
    }
  });
  