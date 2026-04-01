def display_message():
    print("I am learning about functions in Python.")

# Call the function
display_message()
def favorite_book(title):
    print(f"One of my favorite books is '{title}'.")
# Call the function with a book title
favorite_book("alice in wornderland")
def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")

describe_city("Reykjavik", "Iceland")
describe_city("Paris") # Uses the default "Unknown"
import random

def guess_random(user_number):
    random_number = random.randint(1, 100)
    
    if user_number == random_number:
        print("Success! You beat the odds.")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_number}")

guess_random(42)
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")

# Default shirt
make_shirt()
# Medium with default message
make_shirt(size="medium")
# Keyword arguments in different order
make_shirt(text="Code is Art", size="small")
magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']

def show_magicians(names):
    for name in names:
        print(name)

def make_great(names):
    # Loop using range to modify the list in place
    for i in range(len(names)):
        names[i] = f"{names[i]} the Great"

make_great(magician_names)
show_magicians(magician_names)
import random

def get_random_temp(month):
    # Bonus: Season-based temperatures
    if month in [12, 1, 2]: # Winter
        return round(random.uniform(-10, 5), 1)
    elif month in [6, 7, 8]: # Summer
        return round(random.uniform(24, 40), 1)
    else: # Spring/Autumn
        return round(random.uniform(6, 23), 1)

def main():
    month_input = int(input("Enter the month number (1-12): "))
    temp = get_random_temp(month_input)
    
    print(f"The temperature right now is {temp} degrees Celsius.")
    
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 < temp <= 23:
        print("Nice weather.")
    elif 23 < temp <= 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It’s really hot! Stay cool.")

main()



