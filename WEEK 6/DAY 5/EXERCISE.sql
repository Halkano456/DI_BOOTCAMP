const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🎸', name: 'Guitar' },
];

let gameState = {
    score: 0,
    currentEmoji: null
};

// Helper to get random distractors
const getOptions = (correctName) => {
    let options = [correctName];
    while (options.length < 4) {
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(randomEmoji)) options.push(randomEmoji);
    }
    return options.sort(() => Math.random() - 0.5); // Shuffle
};

// GET: Start/Next Round
app.get('/game/next', (req, res) => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    gameState.currentEmoji = randomEmoji;
    
    res.json({
        emoji: randomEmoji.emoji,
        options: getOptions(randomEmoji.name),
        score: gameState.score
    });
});

// POST: Check Guess
app.post('/game/guess', (req, res) => {
    const { guess } = req.body;
    const isCorrect = guess === gameState.currentEmoji.name;

    if (isCorrect) {
        gameState.score += 10;
    } else {
        gameState.score = Math.max(0, gameState.score - 5);
    }

    res.json({
        correct: isCorrect,
        correctName: gameState.currentEmoji.name,
        newScore: gameState.score
    });
});

app.listen(PORT, () => console.log(`Game running at http://localhost:${PORT}`));

<!DOCTYPE html>
<html>
<head>
    <title>Emoji Guessing Game</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding-top: 50px; }
        #emoji-display { font-size: 5rem; margin: 20px; }
        button { padding: 10px 20px; margin: 5px; cursor: pointer; }
        #feedback { font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Guess the Emoji!</h1>
    <div id="score-board">Score: <span id="score">0</span></div>
    <div id="emoji-display"></div>
    <div id="options-container"></div>
    <div id="feedback"></div>

    <script>
        async function loadNextRound() {
            const response = await fetch('/game/next');
            const data = await response.json();
            
            document.getElementById('emoji-display').innerText = data.emoji;
            document.getElementById('score').innerText = data.score;
            document.getElementById('feedback').innerText = '';
            
            const container = document.getElementById('options-container');
            container.innerHTML = '';
            
            data.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.innerText = opt;
                btn.onclick = () => submitGuess(opt);
                container.appendChild(btn);
            });
        }

        async function submitGuess(guess) {
            const response = await fetch('/game/guess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guess })
            });
            const result = await response.json();
            
            const feedback = document.getElementById('feedback');
            if (result.correct) {
                feedback.innerText = "✅ Correct!";
                feedback.style.color = "green";
            } else {
                feedback.innerText = `❌ Wrong! It was ${result.correctName}`;
                feedback.style.color = "red";
            }

            setTimeout(loadNextRound, 1500); // Load next after delay
        }

        loadNextRound(); // Initial start
    </script>
</body>
</html>




    

