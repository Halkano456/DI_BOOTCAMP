import React, { useState } from 'react';
import quotes from './quotes.json'; // Ensure the path to your downloaded file is correct

const RandomQuoteGenerator = () => {
  // 1. Logic to get a random item
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];

  // 2. Initialize State
  const [quote, setQuote] = useState(getRandomItem(quotes));
  const [color, setColor] = useState(getRandomItem(colors));

  // 3. The Function to Update UI
  const handleNewQuote = () => {
    let newQuote = getRandomItem(quotes);
    
    // Logic to prevent the same quote twice in a row
    while (newQuote.quote === quote.quote) {
      newQuote = getRandomItem(quotes);
    }

    setQuote(newQuote);
    setColor(getRandomItem(colors));
  };

  // 4. Dynamic Styles
  const themeStyle = {
    backgroundColor: color,
    transition: 'all 0.5s ease'
  };

  const textStyle = {
    color: color,
    transition: 'all 0.5s ease'
  };

  return (
    <div className="wrapper" style={themeStyle}>
      <div id="quote-box" style={{ padding: '40px', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h2 id="text" style={textStyle}>
          "{quote.quote}"
        </h2>
        <p id="author" style={textStyle}>
          - {quote.author}
        </p>
        <button 
          onClick={handleNewQuote} 
          style={{ ...themeStyle, color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default RandomQuoteGenerator;