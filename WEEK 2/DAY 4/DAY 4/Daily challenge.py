import re
from collections import Counter

class Text:
    def __init__(self, text: str):
        """Initializes the Text object with a string."""
        self.text = text

    def _get_clean_words(self) -> list:
        """Helper method to split text into lowercase words for accurate analysis."""
        # Splits by whitespace and removes empty strings
        return [word.lower() for word in self.text.split() if word]

    def word_frequency(self, word: str):
        """Counts occurrences of a specific word (case-insensitive)."""
        words = self._get_clean_words()
        count = words.count(word.lower())
        
        if count == 0:
            return f"The word '{word}' was not found."
        return count

    def most_common_word(self) -> str:
        """Finds and returns the most frequent word in the text."""
        words = self._get_clean_words()
        if not words:
            return "Text is empty."
        
        # Using a dictionary to store word frequencies
        word_counts = {}
        for word in words:
            word_counts[word] = word_counts.get(word, 0) + 1
            
        # Find the key with the maximum value
        most_common = max(word_counts, key=word_counts.get)
        return most_common

    def unique_words(self) -> list:
        """Returns a list of all unique words in the text using a set."""
        words = self._get_clean_words()
        unique_set = set(words)
        return list(unique_set)

    @classmethod
    def from_file(cls, file_path: str):
        """Class method to instantiate Text directly from a file path."""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            return cls(content)
        except FileNotFoundError:
            print(f"Error: The file at {file_path} was not found.")
            return cls("")
        
        # --- Testing Part I: Simple String Analysis ---
sample_phrase = "Python is great and python is fun. Python, Python, Python!"
analyzer = Text(sample_phrase)

print("--- Text Analysis ---")
print("Frequency of 'python':", analyzer.word_frequency("python")) 
print("Most common word:", analyzer.most_common_word())
print("Unique words:", analyzer.unique_words())
print("-" * 20)

# --- Testing Part II: Text Modification (Inheritance) ---
dirty_text = "Hello, World! This is an awesome Python script... right? #coding $money"
modifier = (dirty_text)

print("\n--- Text Modification ---")
print("Original:", modifier.text)
print("Removed Punctuation:", modifier.remove_punctuation())
print("Removed Stop Words: ", modifier.remove_stop_words())

# Resetting text to show special character removal
modifier.text = "Hello World! @Python2026 #Awesome..."
print("Removed Special Chars:", modifier.remove_special_characters())
print("-" * 20)

# --- Testing Part II: Loading from a File ---
# (Assuming you have a file named 'sample.txt' in your directory)
# file_analyzer = Text.from_file("sample.txt")
# print(file_analyzer.text)