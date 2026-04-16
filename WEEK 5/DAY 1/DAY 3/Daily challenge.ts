interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // Optional property
}

class Library {
  private books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | string {
    const book = this.books.find(b => b.isbn === isbn);
    return book ? book : "Book not found.";
  }

  // Helper method to allow child classes access to the titles
  protected getAllBooks(): Book[] {
    return this.books;
  }
}

class DigitalLibrary extends Library {
  public readonly website: string;

  constructor(website: string) {
    super(); // Calls the constructor of the parent Library class
    this.website = website;
  }

  public listBooks(): string[] {
    return this.getAllBooks().map(book => book.title);
  }
}

// Create an instance of DigitalLibrary
const myCityLibrary = new DigitalLibrary("https://city-digital-lib.com");

// Add books to the library
myCityLibrary.addBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0743273565",
  publishedYear: 1925,
  genre: "Classic Literature"
});

myCityLibrary.addBook({
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  isbn: "978-0547928227",
  publishedYear: 1937
  // Genre is omitted here to demonstrate it is optional
});

// 1. Print the Library Website
console.log(`Welcome to: ${myCityLibrary.website}`);

// 2. Get specific book details
console.log("Searching for ISBN 978-0547928227:");
console.log(myCityLibrary.getBookDetails("978-0547928227"));

// 3. List all book titles
console.log("All available titles:");
console.log(myCityLibrary.listBooks());

