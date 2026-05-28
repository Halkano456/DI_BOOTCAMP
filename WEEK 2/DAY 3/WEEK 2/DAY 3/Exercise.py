class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        # Returns a readable string: "5 dollars"
        suffix = 's' if self.amount != 1 else ''
        return f"{self.amount} {self.currency}{suffix}"

    def __repr__(self):
        # For this exercise, repr is expected to match the str output
        suffix = 's' if self.amount != 1 else ''
        return f"{self.amount} {self.currency}{suffix}"

    def __int__(self):
        return self.amount

    def __add__(self, other):
        # Handle adding an integer
        if isinstance(other, int):
            return self.amount + other
        
        # Handle adding another Currency object
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        
        return NotImplemented

    def __iadd__(self, other):
        # For c1 += 5
        if isinstance(other, int):
            self.amount += other
        elif isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        return self
    
    def sum_two_numbers(self, a, b):
        print(a + b)

        import string
import random

def generate_random_string(length=5):
    # letters includes both uppercase and lowercase
    letters = string.ascii_letters 
    result = ""
    for _ in range(length):
        result += random.choice(letters)
    print(result)

generate_random_string()

from datetime import date

def display_current_date():
    today = date.today()
    print(f"Today's date is: {today}")

display_current_date()

from datetime import datetime

def time_until_new_year():
    now = datetime.now()
    next_year = now.year + 1
    new_year = datetime(next_year, 1, 1)
    
    delta = new_year - now
    print(f"The time left until Jan 1st is {delta}")

time_until_new_year()

from datetime import datetime

def minutes_lived(birthdate_str):
    # Format: YYYY-MM-DD
    birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
    now = datetime.now()
    
    difference = now - birthdate
    # total_seconds() / 60 gives minutes
    minutes = int(difference.total_seconds() / 60)
    
    print(f"You have lived for approximately {minutes:,} minutes.")

# Example usage:
# minutes_lived("1995-05-20")

from faker import Faker

fake = Faker()
users = []

def add_users(how_many):
    for _ in range(how_many):
        user_data = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user_data)

add_users(5)
for user in users:
    print(user)

    