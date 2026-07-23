const myLibrary = [];

const books = document.querySelector(".books");

function Book(title, author, pageCount, yearPublished, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.yearPublished = yearPublished;
    this.read = read;
    this.id = crypto.randomUUID;
}

function addBookToLibrary(title, author, read) {
    const book = new Book(title, author, read);
    if (book instanceof Book) {
        myLibrary.push(book)
    }
}

function displayBooks() {
    for (const book of myLibrary) {
        const node = document.createElement("div");
        node.classList.toggle("book");
        node.id = (`book-${book.id}`);

        const bookTitle = document.createElement("p")
        bookTitle.textContent = book.title
        node.appendChild(bookTitle);

        const bookAuthor = document.createElement("p")
        bookAuthor.textContent = book.author
        node.appendChild(bookAuthor);

        const bookPageCount = document.createElement("p")
        bookPageCOunt.textContent = book.pageCount
        node.appendChild(bookPageCount);

        const bookYearPublished = document.createElement("p")
        bookYearPublished.textContent = book.yearPublished
        node.appendChild(bookYearPublished);

        const bookRead = document.createElement("p")
        bookRead.textContent = book.read
        node.appendChild(bookRead);
    }
}