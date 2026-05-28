class AnagramChecker:
    def __init__(self, filename):
        """Step 1: Load the word list and store in lowercase."""
        try:
            with open(filename, 'r') as file:
                # Read lines, strip whitespace, and convert to lowercase
                self.word_list = {line.strip().lower() for line in file if line.strip()}
        except FileNotFoundError:
            print(f"Error: The file {filename} was not found.")
            self.word_list = set()

    def is_valid_word(self, word):
        """Step 2: Check if word exists in the dictionary."""
        return word.lower() in self.word_list

    def is_anagram(self, word1, word2):
        """Step 3: Compare sorted characters to identify anagrams."""
        w1 = word1.lower().replace(" ", "")
        w2 = word2.lower().replace(" ", "")
        return sorted(w1) == sorted(w2)

    def get_anagrams(self, word):
        """Step 4: Find all anagrams in the word list, excluding the word itself."""
        word = word.lower()
        anagrams = []
        
        for candidate in self.word_list:
            if candidate != word and self.is_anagram(word, candidate):
                anagrams.append(candidate)
        
        return anagrams
    
    from anagram_checker import AnagramChecker

def main():
    # Initialize the checker (Ensure 'wordlist.txt' exists in your folder)
    checker = AnagramChecker('wordlist.txt')
    
    print("--- 📝 Welcome to the Anagram Finder 📝 ---")

    while True:
        # Step 2 & 3: Menu Loop and Input
        print("\nOptions: [1] Check a word [2] Exit")
        choice = input("Select an option: ").strip()

        if choice == '2':
            print("Goodbye!")
            break
        
        if choice == '1':
            user_word = input("Enter a single word: ").strip()

            # Validation: Check if it's a single alphabetic word
            if not user_word.isalpha():
                print("⚠️ Invalid input. Please enter only letters (no spaces or numbers).")
                continue

            # Step 4: Find and Display Anagrams
            if checker.is_valid_word(user_word):
                print(f"\nWORD: '{user_word.upper()}'")
                print("Status: This is a valid dictionary word.")
                
                found_anagrams = checker.get_anagrams(user_word)
                
                if found_anagrams:
                    # Formatted display of results
                    formatted_list = ", ".join(found_anagrams)
                    print(f"Anagrams found: {formatted_list}")
                else:
                    print("No anagrams found for this word.")
            else:
                print(f"⚠️ '{user_word}' is not in the word list.")
        else:
            print("Invalid choice. Please enter 1 or 2.")

if __name__ == "__main__":
    main()

    