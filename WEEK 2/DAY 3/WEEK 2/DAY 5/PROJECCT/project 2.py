import random

class Game:
    def get_user_item(self):
        """Step 2: Get and validate user choice."""
        valid_choices = ['rock', 'paper', 'scissors']
        while True:
            user_choice = input("Choose rock, paper, or scissors: ").lower().strip()
            if user_choice in valid_choices:
                return user_choice
            print("Invalid choice. Please try again.")

    def get_computer_item(self):
        """Step 3: Randomly select the computer's move."""
        return random.choice(['rock', 'paper', 'scissors'])

    def get_game_result(self, user_item, computer_item):
        """Step 4: Determine the winner based on RPS rules."""
        if user_item == computer_item:
            return "draw"
        
        # Dictionary of what beats what
        winners = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        }
        
        if winners[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Step 5: Execute one round and return the result."""
        user_move = self.get_user_item()
        computer_move = self.get_computer_item()
        result = self.get_game_result(user_move, computer_move)
        
        print(f"\nYou chose: {user_move}")
        print(f"Computer chose: {computer_move}")
        print(f"Result: You {result}!")
        
        return result
    
    from game import Game

def get_user_menu_choice():
    """Step 6: Display menu and get validated choice."""
    print("\n--- Main Menu ---")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")
    
    while True:
        choice = input("Select an option (1-3): ").strip()
        if choice in ['1', '2', '3']:
            return choice
        print("Please enter 1, 2, or 3.")

def print_results(results):
    """Step 7: Format and display the final tally."""
    print("\n--- Final Score Summary ---")
    print(f"Wins:   {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws:  {results['draw']}")
    print("\nThank you for playing!")

def main():
    """Step 8: The main program engine."""
    # Initialize score dictionary
    scores = {"win": 0, "loss": 0, "draw": 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == '1':
            # Create a new Game object and play
            new_round = Game()
            outcome = new_round.play()
            # Update scores
            scores[outcome] += 1
            
        elif choice == '2':
            print(f"\nCurrent Scoreboard: {scores}")
            
        elif choice == '3':
            print_results(scores)
            break

if __name__ == "__main__":
    main()

    