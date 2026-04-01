# Initial data
menu = {
    "espresso": 7.0,
    "latte": 12.0,
    "cappuccino": 10.0
}

def show_menu(menu_dict):
    """Print all drinks and prices."""
    if not menu_dict:
        print("\nThe menu is empty.")
    else:
        print("\nCurrent menu:")
        for drink, price in menu_dict.items():
            print(f"{drink} - {float(price)}₪")

def add_item(menu_dict):
    """Add a new drink to the menu."""
    name = input("Enter new drink name: ").lower()
    if name in menu_dict:
        print("Item already exists!")
    else:
        try:
            price = float(input("Enter price: "))
            if price < 0:
                print("Invalid price. Cannot be negative.")
            else:
                menu_dict[name] = price
                print(f'"{name}" added!')
        except ValueError:
            print("Invalid input. Please enter a numerical value for the price.")

def update_price(menu_dict):
    """Change the price of an existing drink."""
    name = input("Which drink do you want to update? ").lower()
    if name in menu_dict:
        try:
            new_price = float(input("Enter the new price: "))
            if new_price < 0:
                print("Invalid price.")
            else:
                menu_dict[name] = new_price
                print("Price updated!")
        except ValueError:
            print("Invalid input.")
    else:
        print("Item not found.")

def delete_item(menu_dict):
    """Remove a drink from the menu."""
    name = input("Which drink do you want to delete? ").lower()
    if name in menu_dict:
        del menu_dict[name]
        print("Item deleted!")
    else:
        print("Item not found.")

def show_options():
    """Print the available actions."""
    print("\nWhat would you like to do?")
    print("1. Show menu")
    print("2. Add item")
    print("3. Update price")
    print("4. Delete item")
    print("5. Exit")

def apply_discount(menu_dict, percent):
    """Reduces every price in the menu by a percentage."""
    multiplier = (100 - percent) / 100
    for drink in menu_dict:
        menu_dict[drink] *= multiplier
    print(f"Applied a {percent}% discount to all items!")

def run_coffee_shop():
    """Main controller loop of the program."""
    while True:
        show_options()
        choice = input("> ")

        if choice == "1":
            show_menu(menu)
        elif choice == "2":
            add_item(menu)
        elif choice == "3":
            update_price(menu)
        elif choice == "4":
            delete_item(menu)
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")

# Start the program
if __name__ == "__main__":
    run_coffee_shop()