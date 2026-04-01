my_fav_numbers = {7, 13, 21}
my_fav_numbers.add(42)
my_fav_numbers.add(100)

# Sets are unordered, so there is no "last" item. 
# To remove a specific one we just added:
my_fav_numbers.remove(100)

friend_fav_numbers = {3, 7, 9, 11}

# Use .union() or the | operator to concatenate
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_numbers)

basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")

apple_count = basket.count("Apples")
basket.clear()

print(f"Final basket: {basket}")
print(f"Apples appeared {apple_count} times.")

# Generating the sequence 1.5 to 5 with 0.5 steps
sequence = []
current = 1.5
while current <= 5:
    # We check if it ends in .0 to match the "mixed" integer/float look
    if current == int(current):
        sequence.append(int(current))
    else:
        sequence.append(current)
    current += 0.5

print(sequence)

# 1 to 20 inclusive
for i in range(1, 21):
    print(i)

# Even numbers 1 to 20
for i in range(1, 21):
    if i % 2 == 0:
            print(i)
    
    while True:
        name = input("Enter your name: ")
        if not name.isdigit() and len(name) >= 3:
            print("thank you")
            break
        else:
            print("Invalid input. Name must be at least 3 letters and no digits.")

            fav_fruits_str = input("Enter your favorite fruits separated by a space: ")
fav_fruits_list = fav_fruits_str.split()

choice = input("Enter the name of a fruit: ")

if choice in fav_fruits_list:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy it!")

    toppings = []
while True:
    topping = input("Enter a topping (or 'quit' to finish): ").lower()
    if topping == 'quit':
        break
    else:
        print(f"Adding {topping} to your pizza.")
        toppings.append(topping)

total_price = 10 + (len(toppings) * 2.5)
print(f"\nYour pizza with {', '.join(toppings)} costs ${total_price:.2f}")

# Main Ticket Program
total_cost = 0
ages = input("Enter the ages of the family members (separated by spaces): ").split()

for age in ages:
    age = int(age)
    if age < 3:
        total_cost += 0
    elif 3 <= age <= 12:
        total_cost += 10
    else:
        total_cost += 15

print(f"Total ticket cost: ${total_cost}")

# Bonus: Restricted Movie
teens = ["Alice", "Bob", "Charlie", "Dave"]
allowed_attendees = []

for person in teens:
    age = int(input(f"How old is {person}? "))
    if 16 <= age <= 21:
        allowed_attendees.append(person)

print(f"Final list of attendees: {allowed_attendees}")

