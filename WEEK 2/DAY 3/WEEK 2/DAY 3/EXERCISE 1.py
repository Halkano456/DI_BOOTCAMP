class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    # Helper method to handle pluralization for string outputs
    def _format_output(self):
        # Adds an 's' if amount is not 1, unless it's shekel (which is typically pluralized as shekels/shekel depending on preference, but example uses 'shekel')
        plural = 's' if self.amount != 1 and self.currency == 'dollar' else ''
        return f"{self.amount} {self.currency}{plural}"

    def __str__(self):
        return self._format_output()

    def __repr__(self):
        return f"'{self._format_output()}'"

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        elif isinstance(other, int):
            return self.amount + other
        return NotImplemented

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        elif isinstance(other, int):
            self.amount += other
        else:
            return NotImplemented
        return self


# --- Testing Code ---
c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)
c4 = Currency('shekel', 10)

print(c1)        # 5 dollars
print(int(c1))   # 5
print(repr(c1))  # '5 dollars'

print(c1 + 5)    # 10
print(c1 + c2)   # 15
print(c1)        # 5 dollars

c1 += 5
print(c1)        # 10 dollars

c1 += c2
print(c1)        # 20 dollars

# Uncommenting this will raise the TypeError as expected:
# print(c1 + c3) # TypeError: Cannot add between Currency type <dollar> and <shekel>
def sum_and_print(num1, num2):
    result = num1 + num2
    print(f"The sum of {num1} and {num2} is: {result}")
    # Importing the specific function from func.py
from func import sum_and_print

# Calling the function
sum_and_print(12, 28)
import random
import string

def generate_random_string(length=5):
    # string.ascii_letters contains both 'abcdefghijklmnopqrstuvwxyz' and 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    letters = string.ascii_letters
    
    # Selecting 5 random characters and joining them into a string
    random_str = "".join(random.choice(letters) for _ in range(length))
    return random_str

print(generate_random_string())
import datetime

def display_current_date():
    # Gets the current date and time, then extracts just the date component
    current_date = datetime.datetime.now().date()
    print(f"Today's date is: {current_date}")

display_current_date()
import datetime

def time_until_new_year():
    now = datetime.datetime.now()
    
    # Calculate the upcoming year dynamically
    next_year = now.year + 1
    new_year_target = datetime.datetime(year=next_year, month=1, day=1, hour=0, minute=0, second=0)
    
    # Calculate the time difference (creates a timedelta object)
    time_left = new_year_target - now
    
    print(f"Time left until January 1st, {next_year}: {time_left}")

time_until_new_year()
import datetime

def minutes_lived(birthdate_str):
    """
    Accepts birthdate string in the format 'YYYY-MM-DD'
    Example: '1995-06-15'
    """
    # Parse the string into a datetime object
    birthdate = datetime.datetime.strptime(birthdate_str, "%Y-%m-%d")
    now = datetime.datetime.now()
    
    # Calculate difference
    difference = now - birthdate
    
    # Convert total seconds lived into minutes
    total_minutes = int(difference.total_seconds() / 60)
    
    print(f"You have lived for approximately {total_minutes:,} minutes!")

# Example usage:
minutes_lived("2000-01-01")
from faker import Faker

# Initialize the Faker instance
fake = Faker()

# Step 3: Create an empty list of users
users_list = []

# Step 4: Create a function to add users
def generate_fake_users(number_of_users):
    for _ in range(number_of_users):
        user_profile = {
            "name": fake.name(),
            "address": fake.address().replace("\n", ", "),  # replacing newlines for cleaner formatting
            "language_code": fake.language_code()
        }
        users_list.append(user_profile)

# Step 5: Call the function and print the users list
generate_fake_users(5)

# Pretty printing the resulting list of dictionaries
for user in users_list:
    print(user)