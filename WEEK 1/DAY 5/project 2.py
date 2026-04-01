# Step 1: Get Input
input_string = input("Enter a comma-separated string: ")

# Step 2: Split the String
# This creates a list: ['without', 'hello', 'bag', 'world']
word_list = input_string.split(',')

# Step 3: Sort the List
word_list.sort()

# Step 4: Join the Sorted List
# This takes the list and puts a comma between each item
result = ",".join(word_list)

# Step 5: Print the Result
print(result)

def longest_word(sentence):
    # Step 2: Split the Sentence into Words
    words = sentence.split()
    
    # Step 3: Initialize Variables
    # We start with an empty string as our current longest
    winner = ""
    
    # Step 4: Iterate Through the Words
    for word in words:
        # Step 5: Compare Word Lengths
        # We use '>' so that if lengths are equal, we keep the first one found
        if len(word) > len(winner):
            winner = word
            
    # Step 6: Return the Longest Word
    return winner

# Test Cases
print(longest_word("Margaret's toy is a pretty doll."))      # Margaret's
print(longest_word("A thing of beauty is a joy forever."))   # forever.
print(longest_word("Forgetfulness is by all means powerless!")) # Forgetfulness

