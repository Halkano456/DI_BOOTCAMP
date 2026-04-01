import random

# 1. Ask the user for a string
user_input = input("Please enter a string of exactly 10 characters: ")

# 2. Check the Length of the String
if len(user_input) < 10:
    print("String not long enough.")
elif len(user_input) > 10:
    print("String too long.")
else:
    print("Perfect string")

    # 3. Print the First and Last Characters
    # Index 0 is the first, index -1 is the last
    print(f"First character: {user_input[0]}")
    print(f"Last character: {user_input[-1]}")

    # 4. Build the String Character by Character
    print("\nProgressive construction:")
    current_build = ""
    for char in user_input:
        current_build += char
        print(current_build)

    # 5. Bonus: Jumble the String
    # We turn the string into a list because strings are immutable (can't be changed in place)
    char_list = list(user_input)
    random.shuffle(char_list)
    jumbled_string = "".join(char_list)
    
    print(f"\nBonus - Jumbled string: {jumbled_string}")
    