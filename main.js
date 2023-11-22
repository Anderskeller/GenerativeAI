const sendButton = document.getElementById("submitButton");
const resetButton = document.getElementById("reset");
const input = document.getElementById('story'); // Updated to match the input ID in your HTML
const spanGeneratedTravel = document.getElementById("travel-result");
const loadingSpan = document.getElementById("hidden-loading");

sendButton.addEventListener("click", function () {
    const travelDescriptionFromUser = input.value;
    loadingSpan.classList.remove('hidden');

    fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama2",
            prompt: input.value,
            stream: false
        })
    })
        .then(response => response.json())
        .then(responseText => {
            // Update the displayed result with the response from the chatbot
            spanGeneratedTravel.textContent = responseText.generated_text;
            loadingSpan.classList.add('hidden'); // Hide the loading indicator
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle errors here, e.g., display an error message to the user
            loadingSpan.classList.add('hidden'); // Hide the loading indicator in case of an error
        });
});

// Optionally, you can add a reset functionality
resetButton.addEventListener("click", function () {
    input.value = ""; // Clear the input field
    spanGeneratedTravel.textContent = ""; // Clear the displayed result
});
