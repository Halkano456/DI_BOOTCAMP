// 1. Create an array of objects for planets and their moons
const planets = [
    { name: "Mercury", color: "gray", moons: 0 },
    { name: "Venus", color: "orange", moons: 0 },
    { name: "Earth", color: "blue", moons: 1 },
    { name: "Mars", color: "red", moons: 2 },
    { name: "Jupiter", color: "brown", moons: 79 },
    { name: "Saturn", color: "yellow", moons: 82 },
    { name: "Uranus", color: "lightblue", moons: 27 },
    { name: "Neptune", color: "darkblue", moons: 14 }
];

// 2. Select the section where planets will be appended
const listPlanets = document.querySelector(".listPlanets");

// 3. Loop through the planets array
planets.forEach((planet) => {
    // Create the planet div
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.style.backgroundColor = planet.color;
    planetDiv.textContent = planet.name;

    // 4. Bonus: Create the moons
    for (let i = 0; i < planet.moons; i++) {
        const moonDiv = document.createElement("div");
        moonDiv.classList.add("moon");
        
        // Position moons so they don't all stack on top of each other
        // We use a bit of math to spread them out around the planet
        moonDiv.style.left = (i * 15) + "px"; 
        
        planetDiv.appendChild(moonDiv);
    }

    // 5. Append the planet (and its moons) to the section
    listPlanets.appendChild(planetDiv);
});
