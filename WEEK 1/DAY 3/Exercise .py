keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Using the dict() constructor with zip
result = dict(zip(keys, values))
print(result)

family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0

for name, age in family.items():
    price = 0
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    
    print(f"{name.capitalize()} has to pay ${price}.")
    total_cost += price

print(f"Total cost for the family: ${total_cost}")

# 1. Create the dictionary
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# 2. Manipulations
brand["number_stores"] = 2  # Change value
print(f"Zara sells clothes for {', '.join(brand['type_of_clothes'][:-1])} and {brand['type_of_clothes'][-1]}.")

brand["country_creation"] = "Spain" # Add key

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

brand.pop("creation_date") # Delete key

print(f"Last competitor: {brand['international_competitors'][-1]}")
print(f"US major colors: {brand['major_color']['US']}")
print(f"Number of keys: {len(brand)}")
print(f"All keys: {brand.keys()}")

# Bonus
more_on_zara = {"creation_date": 1975, "number_stores": 10000}
brand.update(more_on_zara)
print(f"Updated store count: {brand['number_stores']}")

users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Map characters to indices
# Result: {"Mickey": 0, "Minnie": 1, ...}
disney_users_A = {user: index for index, user in enumerate(users)}
print(disney_users_A)

# 2. Map indices to characters
# Result: {0: "Mickey", 1: "Minnie", ...}
disney_users_B = {index: user for index, user in enumerate(users)}
print(disney_users_B)

# 3. Sorted alphabetically then mapped to indices
# Result: {"Ariel": 0, "Donald": 1, ...}
sorted_users = sorted(users)
disney_users_C = {user: index for index, user in enumerate(sorted_users)}
print(disney_users_C)

