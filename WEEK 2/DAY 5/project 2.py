import random

class Game:
    def __init__(self):
        # Storing valid moves as a list for computer choice and validation
        self.valid_moves = ["rock", "paper", "scissors"]

    def get_user_item(self):
        """Asks the user for their move and validates the input."""
        while True:
            user_choice = input("Choose rock, paper, or scissors: ").strip().lower()
            if user_choice in self.valid_moves:
                return user_choice
            print("Invalid choice! Please type 'rock', 'paper', or 'scissors'.")

    def get_computer_item(self):
        """Randomly selects an item for the computer."""
        return random.choice(self.valid_moves)

    def get_game_result(self, user_item, computer_item):
        """Determines if the user wins, draws, or loses."""
        if user_item == computer_item:
            return "draw"
        
        # Dictionary mapping each move to what it beats
        rules = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        }
        
        # If the computer's item is what the user's item beats, user wins!
        if rules[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Executes one full round of the game and returns the result."""
        print("\n--- New Round ---")
        user_move = self.get_user_item()
        computer_move = self.get_computer_item()
        
        result = self.get_game_result(user_move, computer_move)
        
        # Display the round summary to the player
        print(f"You chose: {user_move.capitalize()}")
        print(f"Computer chose: {computer_move.capitalize()}")
        
        if result == "win":
            print("🎉 You won this round!")
        elif result == "loss":
            print("😢 The computer won this round.")
        else:
            print("🤝 It's a draw!")
            
        return result
    from game import Game

def get_user_menu_choice():
    """Displays the main menu, collects, and validates the user's choice."""
    print("\n========== MENU ==========")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")
    print("==========================")
    
    while True:
        choice = input("Enter your choice (1-3): ").strip()
        if choice in ["1", "2", "3"]:
            return choice
        print("Invalid option. Please enter 1, 2, or 3.")

def print_results(results):
    """Prints the final scoreboard nicely."""
    print("\n🏆 Final Score Summary 🏆")
    print(f"Wins:   {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws:  {results['draw']}")
    print("\nThank you for playing Rock, Paper, Scissors! Have a great day! 👋")

def main():
    # Initialize score tracking dictionary
    scores = {"win": 0, "loss": 0, "draw": 0}
    
    while True:
        menu_choice = get_user_menu_choice()
        
        if menu_choice == "1":
            # Instantiate the Game object from game.py
            current_game = Game()
            # Play a round and catch the outcome string
            outcome = current_game.play()
            # Update scores
            scores[outcome] += 1
            
        elif menu_choice == "2":
            print("\n📊 Current Scoreboard 📊")
            print(f"Wins: {scores['win']} | Losses: {scores['loss']} | Draws: {scores['draw']}")
            
        elif menu_choice == "3":
            print_results(scores)
            break

if __name__ == "__main__":
    main()
    