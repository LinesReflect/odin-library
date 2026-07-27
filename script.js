const myLibrary = [];
const bookList = document.querySelector(".books");
const formDialog = document.getElementById("book-form-dialog");
const showFormDialogBtn = document.getElementById("show-form-dialog-btn");
const closeFormDialogBtn = document.getElementById("close-form-dialog-btn")
const bookForm = document.getElementById("book-form");
const formSubmitBtn = document.getElementById("form-submit-btn");

function Book({title, author, pageCount, yearPublished, read}) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.yearPublished = yearPublished;
    this.read = read;
}

function addBookToLibrary(book) {
    const newBook = new Book(book);
    if (newBook instanceof Book) {
        myLibrary.push(newBook)
    }
}

function createNodes(key, value) {
    const keyText = document.createElement("p");
    keyText.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}:`;

    const valueText = document.createElement("p");
    valueText.textContent = value

    const div = document.createElement("div");
    div.classList.toggle("book-details")
    div.append(keyText, valueText);

    return div
}

function displayBooks() {
    bookList.replaceChildren()

    for (const book of myLibrary) {
        const listNode = document.createElement("li");
        const bookContainerNode = document.createElement("div");
        bookContainerNode.classList.toggle("book");
        listNode.id = (`book-${book.id}`);

        for (const [key, value] of Object.entries(book)) {
            if (value !== book.id) {
                const childNodes = createNodes(key, value)
                bookContainerNode.appendChild(childNodes);
            }
        }

        const deleteBtn = createDeleteBtn(book.id)

        bookContainerNode.appendChild(deleteBtn)

        listNode.appendChild(bookContainerNode)
        bookList.appendChild(listNode)
    }
}

function createDeleteBtn(bookId) {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete from Library";
        deleteBtn.dataset.bookId = bookId
        deleteBtn.classList.toggle("delete-btn");

        return deleteBtn;
}

showFormDialogBtn.addEventListener("click", () => {
    formDialog.showModal();
})

closeFormDialogBtn.addEventListener("click", () => {
    formDialog.close()
})

function buildBook(formData) {
    const book = {
        title: formData.get("title"),
        author: formData.get("author"),
        pageCount: formData.get("page-count"),
        yearPublished: formData.get("year-published"),
        read: formData.get("read")
    }

    addBookToLibrary(book)

    
}

bookForm.addEventListener("submit", (e) => {
    const bookFormData = new FormData(bookForm, formSubmitBtn);
    if (e.submitter === formSubmitBtn) {
        e.preventDefault()
        buildBook(bookFormData);
        formDialog.close()
        bookForm.reset()
        displayBooks()
    }
})

function deleteBook(targetBook) {
    const index = myLibrary.indexOf(targetBook)

    if (index > -1) {
        myLibrary.splice(index, 1);
    }
}

bookList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const deleteBtn = e.target
        const book = myLibrary.find((b) => b.id === deleteBtn.dataset.bookId)
        deleteBook(book)
        displayBooks()
    }   
})