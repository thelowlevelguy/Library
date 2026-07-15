const lib = document.querySelector(".library")
const newBookBtn = document.querySelector(".newBook")
const container = document.querySelector(".container");
const dialogBook = document.querySelector("#dialog-book");
const addBtn = dialogBook.querySelector("#addBtn")

const myLibrary = [
  {
    name: "The Hobbit",
    autor: "J.R.R. Tolkien",
    descriptio: "A quiet hobbit is swept into an epic quest to reclaim a lost kingdom.\nAlong the way, he discovers courage and a powerful, mysterious ring.",
    readed: true
  },
  {
    name: "Atomic Habits",
    autor: "James Clear",
    descriptio: "A practical guide to breaking bad habits and building good ones.\nIt focuses on tiny, daily changes that compound into massive life results.",
    readed: false
  },
  {
    name: "1984",
    autor: "George Orwell",
    descriptio: "A chilling look at a dystopian society under constant government surveillance.\nIt follows one man's quiet rebellion against an all-powerful Big Brother.",
    readed: true
  },
  {
    name: "The Rust Programming Language",
    autor: "Steve Klabnik & Carol Nichols",
    descriptio: "The official guide to learning Rust, focusing on safety and speed.\nIt covers everything from basic syntax to advanced memory management.",
    readed: false
  }
];

function Book(name, autor, descriptio, readed) {
  // the constructor...
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

function displayBooks(myLibrary){
  myLibrary.forEach((book, index) => {
    createCard(book);
  })
}

function addNewBook(){
  const dialogForm = dialogBook.querySelector("#dialogForm");
  const name = dialogForm.querySelector("#name").value;
  const autor =  dialogForm.querySelector("#autor").value;
  const descriptio =  dialogForm.querySelector("#descriptio").value;
  const select =  dialogForm.querySelector("#completed");
  const completed = select.options[select.selectedIndex].text;

  console.log(name, autor, descriptio, completed)
  addBookToLibrary(name, autor, descriptio, completed)
  dialogForm.reset();
}

function deleteBook(){
}

function changeReadStatus(){
}

function createCard(book){

  const bookCard = document.createElement("div");
  bookCard.setAttribute("class", "bookCard");

  const nameDiv = document.createElement("div");
  const autorDiv = document.createElement("div");
  const descriptioDiv = document.createElement("div");
  const readedDiv = document.createElement("div");

  nameDiv.textContent = book.name;
  autorDiv.textContent = book.autor;
  descriptioDiv.textContent = book.descriptio;
  readedDiv.textContent = book.readed;

  bookCard.appendChild(nameDiv);
  bookCard.appendChild(descriptioDiv);
  bookCard.appendChild(autorDiv);
  bookCard.appendChild(readedDiv);

  lib.appendChild(bookCard);
}

displayBooks(myLibrary)
addBtn.addEventListener("click", addNewBook)

