def display_message():
    print("I am learning about functions in Python.")

display_message()

def favorite_book(title):
    print(f"One of my favorite books is {title}.")

favorite_book("Alice in Wonderland")

def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")

describe_city("Reykjavik", "Iceland")
describe_city("Paris")

import random

def compare_numbers(user_num):
    random_num = random.randint(1, 100)
    
    if user_num == random_num:
        print("Success!")
    else:
        print(f"Fail! Your number: {user_num}, Random number: {random_num}")

compare_numbers(50)

def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")

# Default large shirt
make_shirt()

# Medium shirt, default message
make_shirt(size="medium")

# Any size, custom message
make_shirt("small", "Code is Life")

# Bonus: Keyword arguments (order doesn't matter here)
make_shirt(text="Hello!", size="extra-small")

magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']

def show_magicians(magicians):
    for name in magicians:
        print(name)

def make_great(magicians):
    # We use a range loop to modify the list in place
    for i in range(len(magicians)):
        magicians[i] = magicians[i] + " the Great"

make_great(magician_names)
show_magicians(magician_names)

import random

def get_random_temp(season):
    # Bonus: Return temperature based on season
    if season == "winter":
        return round(random.uniform(-10, 5), 1)
    elif season == "spring" or season == "autumn":
        return round(random.uniform(6, 23), 1)
    elif season == "summer":
        return round(random.uniform(24, 40), 1)
    else:
        return round(random.uniform(-10, 40), 1)

def main():
    # Ask for the month to determine season
    month = int(input("Enter the month number (1-12): "))
    
    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    else:
        season = "autumn"

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")

    # Temperature-Based Advice
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 < temp <= 23:
        print("Nice weather.")
    elif 23 < temp <= 32:
        print("A bit warm, stay hydrated.")
    elif temp > 32:
        print("It’s really hot! Stay cool.")
main()

