import random

def get_words_from_file(file_path):
    """Step 1: Reads words from a file and returns them as a list."""
    try:
        with open(file_path, "r") as file:
            content = file.read()
            # split() handles spaces, tabs, and newlines automatically
            words_list = content.split()
            return words_list
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return []

def get_random_sentence(length):
    """Step 2: Picks random words and builds a lowercase sentence."""
    words = get_words_from_file("words.txt")
    
    if not words:
        return "Could not generate sentence (word list is empty)."

    selected_words = []
    for _ in range(length):
        selected_words.append(random.choice(words))
    
    # Join list into string and convert to lowercase
    sentence = " ".join(selected_words).lower()
    return sentence

def main():
    """Step 3: Handles user interaction and validation."""
    print("--- Welcome to the Random Sentence Generator ---")
    
    user_input = input("How many words should the sentence have (2-20)? ")

    # Input Validation
    try:
        length = int(user_input)
        if 2 <= length <= 20:
            # Valid input
            result = get_random_sentence(length)
            print(f"\nGenerated Sentence: {result}")
        else:
            print("Error: Please enter a number between 2 and 20.")
    except ValueError:
        print("Error: That's not a valid integer!")

if __name__ == "__main__":
    main()

    import json

sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

# Step 1: Load the JSON string
data = json.loads(sampleJson)

# Step 2: Access the nested “salary” key
salary = data["company"]["employee"]["payable"]["salary"]
print(f"Current Salary: {salary}")

# Step 3: Add the “birth_date” key to the "employee" dictionary
data["company"]["employee"]["birth_date"] = "1992-05-15"

# Step 4: Save the modified JSON to a file
file_name = "modified_employee.json"
try:
    with open(file_name, "w") as json_file:
        # indent=4 makes the file human-readable
        json.dump(data, json_file, indent=4)
    print(f"Success! Modified JSON saved to {file_name}")
except Exception as e:
    print(f"An error occurred while saving: {e}")

    