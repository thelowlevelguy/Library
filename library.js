import {Book} from "./book.js";

const booksContainer = document.querySelector(".books")
const dialogBook = document.querySelector("#dialog-book");
const dialogForm = dialogBook.querySelector("#dialogForm");

class Library {
  constructor (){
    this.books = [
      new Book(
        "The Hobbit",
        "J.R.R. Tolkien",
        "A quiet hobbit is swept into an epic quest to reclaim a lost kingdom.\nAlong the way, he discovers courage and a powerful, mysterious ring.",
        "finish",
      ),
      new Book(
        "Atomic Habits",
        "James Clear",
        "A practical guide to breaking bad habits and building good ones.\nIt focuses on tiny, daily changes that compound into massive life results.",
        "finish",
      ),
      new Book(
        "1984",
        "George Orwell",
        "A chilling look at a dystopian society under constant government surveillance.\nIt follows one man's quiet rebellion against an all-powerful Big Brother.",
        "finish",
      ),
      new Book(
        "The Rust Programming Language",
        "Steve Klabnik & Carol Nichols",
        "The official guide to learning Rust, focusing on safety and speed.\nIt covers everything from basic syntax to advanced memory management.",
        "pending"
      )
    ];
  }

  addBookToLibrary(name, autor, description, status) {
    // take params, create a book then store it in the array
    const newBook = new Book(name, autor, description, status);
    this.books.push(newBook);
    return newBook;
  }

  addNewBook(){
    const formData = new FormData(dialogForm);
    this.addBookToLibrary(formData.get("name"),formData.get("autor"),formData.get("description"),formData.get("status"));
    dialogBook.close();
    dialogForm.reset();
  }

  handleClick(event) {
      const parent = event.target;
      if (parent.closest(".deleteBookBtn")){
        const id = parent.parentElement.getAttribute("data-id");
        const child = document.querySelector(`[data-id="${id}"]`);
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex > -1){
            this.books.splice(bookIndex, 1);
            booksContainer.removeChild(child);
        }
      }else if (parent.closest(".readStatusBtn")){
        const readStatus = parent.parentElement.querySelector(".readStatus")
        readStatus.textContent = readStatus.textContent == "pending" ? "finish" : "pending"
      }
  }

  createCard(book){
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "bookCard");
    bookCard.setAttribute("data-id", `${book.id}`)

    const nameDiv = document.createElement("div");
    const autorDiv = document.createElement("div");
    const descriptionDiv = document.createElement("div");
    const statusDiv = document.createElement("div");

    const readStatusBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")

    nameDiv.textContent = book.name;
    autorDiv.textContent = book.autor;
    descriptionDiv.textContent = book.description;
    statusDiv.textContent = book.status;

    statusDiv.setAttribute("class", "readStatus")
    readStatusBtn.setAttribute("class", "readStatusBtn");
    deleteBtn.setAttribute("class", "deleteBookBtn")
    readStatusBtn.textContent = "Mark as read";
    deleteBtn.textContent = "Delete";

    bookCard.appendChild(nameDiv);
    bookCard.appendChild(descriptionDiv);
    bookCard.appendChild(autorDiv);
    bookCard.appendChild(statusDiv);
    bookCard.appendChild(readStatusBtn);
    bookCard.appendChild(deleteBtn)

    booksContainer.appendChild(bookCard);
  }

   renderBooks(){
    booksContainer.textContent = "";
    this.books.forEach((book) => {
      this.createCard(book);
    })
  }

  init(){
    dialogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addNewBook();
      this.renderBooks()
    });

    booksContainer.addEventListener("click", (e) => this.handleClick(e));
    this.renderBooks();
  }
}

const library = new Library();
library.init()
