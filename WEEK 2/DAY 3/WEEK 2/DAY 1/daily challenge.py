class Farm:
    def __init__(self, farm_name):
        # Step 2: Initialize attributes
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        # Step 3 & Step 8: Logic to add animals
        # Handle kwargs first (Bonus Step 8)
        if kwargs:
            for name, qty in kwargs.items():
                self.animals[name] = self.animals.get(name, 0) + qty
        
        # Handle single animal call (original Step 3)
        if animal_type:
            self.animals[animal_type] = self.animals.get(animal_type, 0) + count

    def get_info(self):
        # Step 4: Format output string
        info = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            info += f"{animal} : {count}\n"
        
        info += "\n    E-I-E-I-0!"
        return info

    def get_animal_types(self):
        # Step 6: Return sorted list of keys
        return sorted(list(self.animals.keys()))

    def get_short_info(self):
        # Step 7: Format a summary string with pluralization
        animal_types = self.get_animal_types()
        plural_animals = []

        for animal in animal_types:
            # Add 's' if count > 1 (simplistic pluralization as per instructions)
            if self.animals[animal] > 1:
                plural_animals.append(f"{animal}s")
            else:
                plural_animals.append(animal)

        # Formatting the list into a sentence: "a, b and c"
        if len(plural_animals) > 1:
            animals_str = ", ".join(plural_animals[:-1]) + f" and {plural_animals[-1]}"
        else:
            animals_str = plural_animals[0]

        return f"{self.name}’s farm has {animals_str}."

# --- Test the Code ---

macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)

print(macdonald.get_info())

# --- Test Bonus Steps ---
print("\n--- Bonus Output ---")
print(macdonald.get_animal_types())
print(macdonald.get_short_info())

