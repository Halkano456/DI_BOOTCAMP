<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Giphy Random Fetcher</title>
</head>
<body>
    <form id="gifForm">
        <input type="text" id="category" placeholder="Enter a category (e.g. sun)" required>
        <button type="submit">Fetch Gif</button>
    </form>
    
    <button id="deleteAll">DELETE ALL</button>

    <div id="gifContainer"></div>

    <script src="script.js">
    const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById('gifForm');
const container = document.getElementById('gifContainer');
const deleteAllBtn = document.getElementById('deleteAll');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = document.getElementById('category').value;
    
    // Call the function to fetch and display
    await fetchRandomGif(category);
    
    // Clear input field
    document.getElementById('category').value = "";
});

async function fetchRandomGif(tag) {
    const url = `https://api.giphy.com/v1/gifs/random?tag=${tag}&api_key=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        
        // Giphy returns an empty array or object if no gif is found
        if (data.length === 0 || !data.images) {
            alert("No GIF found for that category!");
            return;
        }

        const gifUrl = data.images.fixed_height.url;
        createGifElement(gifUrl);

    } catch (error) {
        console.error("Failed to fetch GIF:", error);
    }
}

function createGifElement(url) {
    // Create a wrapper div for the gif and its delete button
    const gifWrapper = document.createElement('div');
    gifWrapper.style.margin = "10px";
    gifWrapper.style.display = "inline-block";

    const img = document.createElement('img');
    img.src = url;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "DELETE";
    deleteBtn.addEventListener('click', () => {
        gifWrapper.remove();
    });

    gifWrapper.appendChild(img);
    gifWrapper.appendChild(deleteBtn);
    container.appendChild(gifWrapper);
}

// Logic for the DELETE ALL button
deleteAllBtn.addEventListener('click', () => {
    container.innerHTML = "";
});
    </script>
</body>
</html>