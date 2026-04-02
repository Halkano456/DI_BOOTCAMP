import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        # If items is None, initialize as empty list
        self.items = items if items is not None else []
        
        # Ensure page_size is an integer (Type Casting)
        self.page_size = int(page_size)
        
        # Current page index (0-based internally)
        self.current_idx = 0
        
        # Calculate total pages using math.ceil
        # We use max(1, ...) to ensure at least 1 page exists even if items is empty
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1

    def get_visible_items(self):
        """Returns the slice of items for the current page."""
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        """Navigates to a specific page (1-based index)."""
        page_num = int(page_num)
        
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page number must be between 1 and {self.total_pages}")
        
        self.current_idx = page_num - 1
        return self # Allows for method chaining

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        """Bonus: Returns items on current page separated by newlines."""
        items = self.get_visible_items()
        return "\n".join(map(str, items))
    
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

# 1. Initial items
print(f"Initial: {p.get_visible_items()}") 
# Output: ['a', 'b', 'c', 'd']

# 2. Test navigation
p.next_page()
print(f"After next_page(): {p.get_visible_items()}") 
# Output: ['e', 'f', 'g', 'h']

# 3. Test last page
p.last_page()
print(f"Last page: {p.get_visible_items()}") 
# Output: ['y', 'z']

# 4. Test Method Chaining (Bonus)
# Move to page 1, then forward 3 times
result = p.first_page().next_page().next_page().next_page().get_visible_items()
print(f"Chained result: {result}") 
# Output: ['m', 'n', 'o', 'p']

# 5. Test Error Handling
try:
    p.go_to_page(10)
except ValueError as e:
    print(f"Caught expected error: {e}") 
    # Output: Page number must be between 1 and 7