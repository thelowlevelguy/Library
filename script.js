const booksContainer = document.querySelector(".books")
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
  renderBooks();
}

function renderBooks(){
  booksContainer.textContent = "";
  myLibrary.forEach((book) => {
    createCard(book);
  })
}

function addNewBook(event){
  event.preventDefault();
  const formData = new FormData(dialogForm);
  addBookToLibrary(
    formData.get("name"),
    formData.get("autor"),
    formData.get("descriptio"),
    formData.get("status")
  )
  dialogBook.close();
  dialogForm.reset();
}

function handleClick(event) {
  const parent = event.target;
  if (parent.closest(".deleteBookBtn")){
    const id = parent.parentElement.getAttribute("data-id");
    const child = document.querySelector(`[data-id="${id}"]`);
    const bookIndex = myLibrary.findIndex(book => book.id === id);
    if (bookIndex > -1){
        myLibrary.splice(bookIndex, 1);
        booksContainer.removeChild(child);
    }
    //renderBooks()
  }else if (parent.closest(".readStatusBtn")){
    const readStatus = parent.parentElement.querySelector(".readStatus")
    readStatus.textContent = readStatus.textContent == "pending" ? "finish" : "pending"
  }
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

  booksContainer.appendChild(bookCard);
}

dialogForm.addEventListener("submit", addNewBook);
booksContainer.addEventListener("click", handleClick);
renderBooks()