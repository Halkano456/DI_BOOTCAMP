# 1. Get user inputs
number = int(input("Enter a number: "))
length = int(input("Enter the desired length of the list: "))

# 2. Generate the list using a loop
multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)

# 3. Print output
print(multiples)

# 1. Ask the user for a string
word = input("Enter a word with consecutive duplicates: ")

# 2. Process the string
# We start with the first character already in our result
if not word:
    result = ""
else:
    result = word[0]

    # Loop through the string starting from the second character
    for char in word[1:]:
        # Compare current character to the LAST character added to result
        if char != result[-1]:
            result += char

# 3. Print the modified string
print(f"Modified string: {result}")

