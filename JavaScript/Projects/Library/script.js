/* 
instructions:
Library Project
Instructions
Step 1:
If you haven’t already, set up a Git repository for your project with skeleton HTML/CSS and JS files. From here on out, we’ll assume that you have already done this.
Step 2:
All of your book objects are going to be stored in an array, so you’ll need a constructor for books.

Then, add a separate function to the script (not inside the constructor) that can take some arguments, create a book from those arguments, and store the new book object into an array.

Also, all of your book objects should have a unique id, which can be generated using crypto.randomUUID(). This ensures each book has a unique and stable identifier, preventing issues when books are removed or rearranged.

Your code should look something like this (we’re showing only a basic skeleton without function parameters):

    const myLibrary = [];

    function Book() {
    // the constructor...
    }

    function addBookToLibrary() {
    // take params, create a book then store it in the array
    }
Step 3:
Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
While it might look easier to manipulate the display of the books directly rather than store their data in an array first, from here forward, you should think of these responsibilities separately. We’ll delve deeper into this concept later, but when developing applications, we want the flexibility to recreate elements (like our library and its books) in various ways using the same underlying data. Therefore, consider the logic for displaying books to the user and the book structures that hold all information as distinct entities. This separation will enhance the maintainability and scalability of your code.
Step 4:
Add a “New Book” button that brings up a form allowing users to input the details for the new book and add it to the library: author, title, number of pages, whether it’s been read and anything else you might want.

How you decide to display this form is up to you. For example, you may wish to have a form show in a sidebar or you may wish to explore dialogs and modals using the <dialog> tag.

However you do this, you will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the submit input tries to send the data to a server by default. This is where event.preventDefault(); will come in handy. Check out the documentation for event.preventDefault and see how you can solve this issue!

Step 5:
Add a button on each book’s display to remove the book from the library.
You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the unique id of the respective book object.
Step 6:
Add a button on each book’s display to change its read status.
To facilitate this you will want to create Book prototype function that toggles a book instance’s read status.
NB: No need for persistent storage

You’re not required to add any type of storage to save the information between page reloads.
*/

const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.querySelector('.library-container');
    libraryContainer.innerHTML = ''; // Clear the container before displaying books

    myLibrary.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.setAttribute('data-id', book.id);

        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <div class="book-buttons">
                <button class="remove-book-btn">Remove</button>
                <button class="toggle-read-btn">Toggle Read</button>
            </div>
        `;

        libraryContainer.appendChild(bookElement);
    });
}

document.querySelector('.new-book-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);

    // Clear form fields after submission
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
});

//toggle and remove buttons event delegation
document.querySelector('.library-container').addEventListener('click', function (event) {
    const bookElement = event.target.closest('.book');
    if (!bookElement) return; // Clicked outside a book element

    if (event.target.classList.contains('remove-book-btn')) {
        const bookId = bookElement.getAttribute('data-id');
        removeBookFromLibrary(bookId);
    }

    if (event.target.classList.contains('toggle-read-btn')) {
        const bookId = bookElement.getAttribute('data-id');
        toggleBookReadStatus(bookId);
    }
});

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
}

function toggleBookReadStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.read = !book.read;
        displayBooks();
    }
}

document.querySelector('.add-book-btn').addEventListener('click', function () {
    document.querySelector('.new-book-form').style.display = 'flex';
});
