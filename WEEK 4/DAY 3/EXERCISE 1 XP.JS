<form action="index.html" method="GET">
    <label for="name">Name:</label>
    <input type="text" id="name" name="firstname">
    
    <label for="message">Message:</label>
    <textarea id="message" name="user_message"></textarea>
    
    <button type="submit">Send</button>
</form>
<form action="index.html" method="POST">
    <input type="text" name="firstname">
    <textarea name="user_message"></textarea>
    <button type="submit">Send</button>
</form>

<script>
    const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      // ... rest of the object
  },
}

// 1. Convert to a standard JSON string
const marioJSON = JSON.stringify(marioGame);
console.log(marioJSON);

// 2. Convert and "Pretty Print" 
// The 'null' is for a replacer function, and '2' is the number of spaces for indentation
const prettyMarioJSON = JSON.stringify(marioGame, null, 2);
console.log(prettyMarioJSON);
</script>