/* 
Instructions:

Write a constructor for making “Book” objects. 
We will revisit this in the next project. 
Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.

Put a function info() into the constructor that can report the book info like so:
*/

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
    }
}

const book1 = new book('The Hobbit', 'J.R.R. Tolkien', 310, true);
const book2 = new book('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);

console.log(book1.info());
console.log(book2.info());
