
    const sendButton = document.getElementById("submitButton");
    const resetButton = document.getElementById("reset");
    const input = document.getElementById('generate');
    const spanGeneratedTravel = document.getElementById("travel-result");
    const loadingSpan = document.getElementById("hidden-loading");


    sendButton.addEventListener("click", function () {
        const travelPlanerDescription = input.value;
        loadingSpan.classList.remove('hidden');


        fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama2",
                prompt: travelPlanerDescription,
                stream: false
            })
        })
            .then(response => response.json())
            .then(responseText => {
                const hasTravelKeywords = containsTravelKeywords(responseText.response);
                if (hasTravelKeywords) {

                    spanGeneratedTravel.innerText = responseText.response.substring(0, 900);
                } else {

                    spanGeneratedTravel.innerText = "I'm sorry, I couldn't generate a travel plan description for that input. Please try again.";
                }
                loadingSpan.classList.add('hidden');
            })
            .catch(error => {
                console.error("Error:", error);

                loadingSpan.classList.add('hidden');
            });
    });


    function containsTravelKeywords(response) {
        const travelKeywords = ["beach", "sun", "city", "rainforest", "snow", "Mountain", "spa", "Safari", "Culture", "Hiking", "camping", "backpacking", "diving", "skiing", "Nature", "tropical"];
        const lowercasedResponse = response.toLowerCase();

        return travelKeywords.some(keyword => lowercasedResponse.includes(keyword.toLowerCase()));
    }



    resetButton.addEventListener("click", function () {
        input.value = "";
        spanGeneratedTravel.textContent = "";
    });