import math

class Circle:
    def __init__(self, radius: float):
        self.radius = radius

    @classmethod
    def from_diameter(cls, diameter: float):
        """Alternative constructor allowing creation via diameter."""
        return cls(diameter / 2)

    @property
    def diameter(self) -> float:
        """Getter for diameter."""
        return self.radius * 2

    @diameter.setter
    def diameter(self, value: float):
        """Setter for diameter (automatically updates radius)."""
        self.radius = value / 2

    @property
    def area(self) -> float:
        """Computes and returns the area of the circle."""
        return math.pi * (self.radius ** 2)

    # --- Dunder (Magic) Methods ---

    def __repr__(self) -> str:
        """Official string representation of the object."""
        return f"Circle(radius={self.radius})"

    def __str__(self) -> str:
        """User-friendly string representation."""
        return f"Circle with Radius: {self.radius:.2f}, Diameter: {self.diameter:.2f}, Area: {self.area:.2f}"

    def __add__(self, other: 'Circle') -> 'Circle':
        """Adds two circles together based on their radii."""
        if not isinstance(other, Circle):
            return NotImplemented
        return Circle(self.radius + other.radius)

    def __eq__(self, other: object) -> bool:
        """Checks if two circles are equal based on radius."""
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius == other.radius

    def __lt__(self, other: 'Circle') -> bool:
        """Checks if this circle is smaller than another (required for sorting)."""
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius

    def __gt__(self, other: 'Circle') -> bool:
        """Checks if this circle is larger than another."""
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius > other.radius
        # 1. Creation by radius or diameter
c1 = Circle(3)                  # Created via radius
c2 = Circle.from_diameter(8)    # Created via diameter (radius will be 4)
c3 = Circle(3)                  # Clone of c1 for equality test

print("--- 1. Initialization & Attribute Querying ---")
print(f"c1 -> Radius: {c1.radius}, Diameter: {c1.diameter}")
print(f"c2 -> Radius: {c2.radius}, Diameter: {c2.diameter}")

# 2. Compute Area & Print Attributes (__str__ / __repr__)
print("\n--- 2. Area & String Representations ---")
print(f"c1 Area: {c1.area:.4f}")
print(repr(c1))  # __repr__
print(c1)        # __str__

# 3. Add two circles (__add__)
print("\n--- 3. Adding Circles ---")
c4 = c1 + c2
print(f"c1 + c2 = {c4} (Radius should be 3 + 4 = 7)")

# 4 & 5. Comparisons (__gt__ and __eq__)
print("\n--- 4 & 5. Comparisons ---")
print(f"Is c2 bigger than c1? (4 > 3): {c2 > c1}")
print(f"Is c1 equal to c3? (3 == 3): {c1 == c3}")
print(f"Is c1 equal to c2? (3 == 4): {c1 == c2}")

# 6. Sorting a list of circles (__lt__)
print("\n--- 6. Sorting Circles ---")
circles_list = [Circle(10), Circle(2), Circle(5), Circle(7)]
print("Before sorting:", circles_list)
circles_list.sort()
import turtle

def draw_circles(sorted_circles):
    # Setup screen
    screen = turtle.Screen()
    screen.title("Sorted Circles")
    
    t = turtle.Turtle()
    t.speed(3)
    
    # Starting position
    x_offset = -200
    
    for circle in sorted_circles:
        t.penup()
        # Turtle draws circles from the bottom edge, so adjust y to line them up
        t.goto(x_offset, -circle.radius * 10) 
        t.pendown()
        
        # Multiply radius by 10 just so they are large enough to see clearly
        t.circle(circle.radius * 10) 
        
        # Move forward for the next circle
        x_offset += (circle.diameter * 10) + 20 

    turtle.done()

# Run the visualizer with our sorted list
draw_circles(circles_list)
