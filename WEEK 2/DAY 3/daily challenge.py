import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must specify either a radius or a diameter.")

    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    @property
    def area(self):
        # Area = π * r^2
        return math.pi * (self.radius ** 2)

    def __str__(self):
        return f"Circle(radius={self.radius:.2f})"

    def __repr__(self):
        return f"Circle({self.radius})"

    def __add__(self, other):
        if isinstance(other, Circle):
            # Returns a new Circle instance with the combined radii
            return Circle(radius=self.radius + other.radius)
        return NotImplemented

    # Comparison methods
    def __eq__(self, other):
        if isinstance(other, Circle):
            return self.radius == other.radius
        return False

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.radius < other.radius
        return NotImplemented

    def __gt__(self, other):
        if isinstance(other, Circle):
            return self.radius > other.radius
        return NotImplemented
    
    # 1. Create circles
c1 = Circle(radius=5)
c2 = Circle(diameter=20) # radius will be 10

# 2. Query attributes
print(f"C1 Radius: {c1.radius}, Diameter: {c1.diameter}")
print(f"C2 Area: {c2.area:.2f}")

# 3. Addition (Dunder __add__)
c3 = c1 + c2
print(f"C3 (C1+C2): {c3}") # Expected radius: 15

# 4. Comparisons (Dunder __gt__ and __eq__)
print(f"Is C2 > C1? {c2 > c1}")  # True
print(f"Is C1 == C2? {c1 == c2}") # False

# 5. Sorting (Dunder __lt__)
circle_list = [Circle(radius=10), Circle(radius=2), Circle(radius=7)]
circle_list.sort()
print(f"Sorted circles: {circle_list}")

import turtle

def draw_circles(circles):
    screen = turtle.Screen()
    t = turtle.Turtle()
    t.speed(0)
    
    for circle in circles:
        t.penup()
        # Move turtle so circles don't overlap too much
        t.forward(circle.radius * 2.5) 
        t.pendown()
        # Turtle draws from the bottom edge of the circle
        t.circle(circle.radius * 5) # Multiplied by 5 just to make it visible
        
    screen.exitonclick()

# Example:
# draw_circles(circle_list)

