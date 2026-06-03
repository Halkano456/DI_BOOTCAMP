import random


def get_words_from_file(file_path):
    """Opens a file, reads its content, and splits it into a list of words."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            # split() without arguments handles spaces, tabs, and newlines automatically
            words = content.split()
            return words
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return []


def get_random_sentence(length):
    """Generates a random sentence of a specified length using the word list."""
    # Step 2: Call get_words_from_file
    words_list = get_words_from_file("words.txt")

    if not words_list:
        return "Could not generate sentence due to an empty or missing word list."

    # Select a random word from the list length times
    selected_words = []
    for _ in range(length):
        random_word = random.choice(words_list)
        selected_words.append(random_word)

    # Create a sentence and convert it to lowercase
    sentence = " ".join(selected_words).lower()

    # Optional: Capitalize the very first letter and add a period for a clean sentence structure
    return sentence.capitalize() + "."


def main():
    """Handles the main program flow and user input validation."""
    print("--- Welcome to the Random Sentence Generator ---")
    print("This program generates a random sentence based on a local word list.\n")

    user_input = input("Enter the desired sentence length (between 2 and 20): ")

    # Step 3: Input Validation
    # Check if the input is an integer
    if not user_input.isdigit():
        print("Error: Input must be a valid positive integer. Exiting program.")
        return

    length = int(user_input)

    # Check if it is between 2 and 20 (inclusive)
    if length < 2 or length > 20:
        print("Error: The length must be between 2 and 20 inclusive. Exiting program.")
        return

    # If valid, generate and print the sentence
    generated_sentence = get_random_sentence(length)
    print(f"\nGenerated Sentence:\n{generated_sentence}")


if __name__ == "__main__":
    main()import json

# Provided sample JSON string (fixed a small missing closing triple-quote from the prompt)
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

# Step 1: Load the JSON string into a Python dictionary
data = json.loads(sampleJson)

# Step 2: Access the nested "salary" key and print it
salary = data["company"]["employee"]["payable"]["salary"]
print(f"Accessed Salary: ${salary}")

# Step 3: Add the "birth_date" key to the "employee" dictionary
data["company"]["employee"]["birth_date"] = "1995-05-12"

# Step 4: Save the modified JSON to a file with indentation for readability
output_filename = "modified_employee.json"

with open(output_filename, "w", encoding="utf-8") as file:
    # indent=4 formats the output nicely rather than leaving it on a single line
    json.dump(data, file, indent=4)

print(f"\nSuccess! Modified JSON has been saved to '{output_filename}'.")

