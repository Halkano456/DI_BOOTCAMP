const url = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("JS Object received:", data);
    })
    .catch(error => {
        console.error("There was an error fetching the gifs:", error);
    });

    const sunUrl = "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(sunUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch sun gifs");
        }
    })
    .then(data => console.log(data))
    .catch(err => console.error(err));

    async function getStarWarsShip() {
    try {
        const response = await fetch("https://www.swapi.tech/api/starships/9/");
        
        if (!response.ok) {
            throw new Error(`Problem fetching ship: ${response.status}`);
        }

        const objectStarWars = await response.json();
        console.log(objectStarWars.result);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

getStarWarsShip();

