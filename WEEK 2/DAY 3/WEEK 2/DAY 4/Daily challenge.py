
import string
import re

class Text:
    def __init__(self, text):
        """Initializes the class with a string of text."""
        self.text = text

        def _get_words(self):
            """Helper method to clean and split text into lowercase words."""
            # We lower() the text to ensure 'Word' and 'word' are counted as the same.
            return self.text.lower().split()
    
        def word_frequency(self, word):
            """Counts occurrences of a specific word."""
            words = self._get_words()
            count = words.count(word.lower())
            return count if count > 0 else None
    
        def most_common_word(self):
            """Finds the most frequently occurring word."""
            words = self._get_words()
            if not words:
                return None
            
            counts = {}
            for w in words:
                counts[w] = counts.get(w, 0) + 1
            
            # Return the key with the maximum value
            return max(counts, key=counts.get)
    
        def unique_words(self):
            """Returns a list of all unique words in the text."""
            words = self._get_words()
            return list(set(words))
    
        @classmethod
        def from_file(cls, file_path):
            """Class method to instantiate the class using a file's content."""
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                return cls(content)
            except FileNotFoundError:
                print(f"Error: The file at {file_path} was not found.")
                return None
    
    
    class TextModification(Text):
        """Extended class with text cleaning methods."""
        
        def remove_punctuation(self):
            """Removes punctuation from the text."""
            self.text = self.text.translate(str.maketrans('', '', string.punctuation))
        
        def remove_special_characters(self):
            """Removes special characters from the text."""
            self.text = re.sub(r'[^a-zA-Z0-9\s]', '', self.text)
        
        def remove_stop_words(self):
            """Removes common stop words from the text."""
            stop_words = {'a', 'an', 'the', 'is', 'at', 'which', 'on', 'and', 'or', 'but', 'in', 'to', 'for', 'of', 'with', 'by', 'from'}
            words = self._get_words()
            cleaned_words = [w for w in words if w not in stop_words]
            self.text = ' '.join(cleaned_words)
    
    
# 1. Using the base class
sample_text = "Data science is great. Data is the new oil."
analyzer = Text(sample_text)

print(f"Unique Words: {analyzer.unique_words()}")
print(f"Frequency of 'data': {analyzer.word_frequency('data')}")
print(f"Most Common: {analyzer.most_common_word()}")

# 2. Using the modification class
cleaner = TextModification("Hello, world! This is a @test... right?")
cleaner.remove_punctuation()
cleaner.remove_special_characters()
cleaner.remove_stop_words()

print(f"Cleaned Text: {cleaner.text}")

