const lib = document.querySelector(".library")
const newBookBtn = document.querySelector(".newBook")
const container = document.querySelector(".container");
const dialogBook = document.querySelector("#dialog-book");
const dialogForm = dialogBook.querySelector("#dialogForm");

const myLibrary = [
  {
    id: "1",
    name: "The Hobbit",
    autor: "J.R.R. Tolkien",
    descriptio: "A quiet hobbit is swept into an epic quest to reclaim a lost kingdom.\nAlong the way, he discovers courage and a powerful, mysterious ring.",
    readed: "finish",
  },
  {
    id: "2",
    name: "Atomic Habits",
    autor: "James Clear",
    descriptio: "A practical guide to breaking bad habits and building good ones.\nIt focuses on tiny, daily changes that compound into massive life results.",
    readed: "finish",
  },
  {
    id: "3",
    name: "1984",
    autor: "George Orwell",
    descriptio: "A chilling look at a dystopian society under constant government surveillance.\nIt follows one man's quiet rebellion against an all-powerful Big Brother.",
    readed: "finish",
  },
  {
    id: "4",
    name: "The Rust Programming Language",
    autor: "Steve Klabnik & Carol Nichols",
    descriptio: "The official guide to learning Rust, focusing on safety and speed.\nIt covers everything from basic syntax to advanced memory management.",
    readed: "pending"
  }
];

function Book(name, autor, descriptio, readed) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.autor = autor;
  this.descriptio = descriptio
  this.readed = readed;
}

function addBookToLibrary(name, autor, descriptio, readed) {
  // take params, create a book then store it in the array
  const book = new Book(name, autor, descriptio, readed);
  myLibrary.push(book);
  createCard(book);
}

function displayBooks(){
  myLibrary.forEach((book) => {
    createCard(book);
  })
}

function addNewBook(event){
  event.preventDefault();
  const formData = new FormData(dialogForm);
  const name = formData.get("name")
  const autor = formData.get("autor")
  const descriptio = formData.get("descriptio")
  const select = formData.get("status")

  addBookToLibrary(name, autor, descriptio, select)
  dialogForm.reset();
}

function deleteBook(event){
  const id = event.target.parentElement.getAttribute("data-id");
  myLibrary.forEach((book, index) => {
    if (book.id == id){
      //syntax for finding a data attribute propriety using querySelector
      const child = document.querySelector(`[data-id="${id}"]`);
      lib.removeChild(child);
      myLibrary.splice(index, 1);
    }
  })
}

function changeReadStatus(event){
    const parent = event.target.parentElement;
    const readStatus = parent.querySelector(".readStatus")
    readStatus.textContent = readStatus.textContent == "pending" ? "finish" : "pending"
}

function createCard(book){

  const bookCard = document.createElement("div");
  bookCard.setAttribute("class", "bookCard");
  bookCard.setAttribute("data-id", `${book.id}`)

  const nameDiv = document.createElement("div");
  const autorDiv = document.createElement("div");
  const descriptioDiv = document.createElement("div");
  const readedDiv = document.createElement("div");

  const readStatusBtn = document.createElement("button")
  const deleteBtn = document.createElement("button")

  nameDiv.textContent = book.name;
  autorDiv.textContent = book.autor;
  descriptioDiv.textContent = book.descriptio;
  readedDiv.textContent = book.readed;

  readedDiv.setAttribute("class", "readStatus")
  readStatusBtn.setAttribute("class", "readStatusBtn");
  deleteBtn.setAttribute("class", "deleteBookBtn")
  readStatusBtn.textContent = "Mark as read";
  deleteBtn.textContent = "Delete";

  bookCard.appendChild(nameDiv);
  bookCard.appendChild(descriptioDiv);
  bookCard.appendChild(autorDiv);
  bookCard.appendChild(readedDiv);
  bookCard.appendChild(readStatusBtn);
  bookCard.appendChild(deleteBtn)

  lib.appendChild(bookCard);
}

// Options for the observer (which mutations to observe)
const config = {attributes: true, childList: true, subtree: true};
// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList){
    if (mutation.type === "childList" || mutation.type === "attributes") {
      const deleteBtn = document.querySelectorAll(".deleteBookBtn")
      const readStatusBtn = document.querySelectorAll(".readStatusBtn")
      deleteBtn.forEach((button) => {
        button.addEventListener("click", deleteBook)
      })
       readStatusBtn.forEach((button) => {
        button.addEventListener("click", changeReadStatus)
      })
    }
  }
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)
// Start observing the target node for configured mutations
observer.observe(container, config)

displayBooks()
dialogForm.addEventListener("submit", addNewBook)