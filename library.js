// Book class definition
class Book {
    constructor(title, author, available = true) {
      this.title = title;
      this.author = author;
      this.available = available;
    }
  }
  
  // Library object with book management methods
  const library = {
    books: [],
    
    addBook(title, author) {
      const book = new Book(title, author);
      this.books.push(book);
      console.log(`Added "${title}" by ${author} to the library`);
    },
    
    checkOutBook(title) {
      try {
        const book = this.books.find(book => book.title === title);
        if (!book) {
          throw new Error(`Book "${title}" not found in library`);
        }
        if (!book.available) {
          throw new Error(`Book "${title}" is already checked out`);
        }
        book.available = false;
        console.log(`Successfully checked out "${title}"`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    },
    
    getAvailableBooks() {
      const availableBooks = this.books.filter(book => book.available);
      console.log("\nAvailable books:");
      availableBooks.forEach(book => {
        console.log(`- "${book.title}" by ${book.author}`);
      });
      return availableBooks;
    }
  };
  
  // JSON data for new books
  const newBooks = `[
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    },
    {
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee"
    },
    {
      "title": "1984",
      "author": "George Orwell"
    }
  ]`;
  
  // Function to receive and process new books
  function receiveBooks(booksJSON) {
    try {
      const books = JSON.parse(booksJSON);
      console.log("\nReceiving new books:");
      books.forEach(book => {
        library.addBook(book.title, book.author);
      });
    } catch (error) {
      console.error("Error processing new books:", error.message);
    }
  }
  
  // Test the library system
  console.log(`There are currently ${library.books.length} books in the library's database.`);
  library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
  receiveBooks(newBooks);
  library.checkOutBook("Eloquent JavaScript");
  library.checkOutBook("Grokking the Coding Interview");
  library.getAvailableBooks();