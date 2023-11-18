const libraryContainer = document.getElementById("libraryContainer");
const myLibrary = [];
const addBookModal = document.getElementById("addBookModal");
const modal = document.getElementById("addBookModal");
const newBookForm = document.querySelector("#newBookForm");
const newBookBtn = document.querySelector(".btn__newBook");
const addBookBtn = document.querySelector(".btn__addBook");
const cancelBtn = document.querySelector(".btn__cancelBook");

function Book(title, author, pages, haveIRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveIRead = haveIRead;

    if (haveIRead) {
        haveIRead = "Read";
    } else {
        haveIRead = "Unread";
    }

    this.sku = createRandomSKU();

    this.info = function () {
        return `${title} by ${author}, ${pages} pages; ${haveIRead}`;
    };
}

function createRandomSKU() {
    return Math.floor(10000000 + Math.random() * 90000000);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(book) {
    const sku = book.sku;
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index].sku === sku) {
            myLibrary.splice(index, 1);
            renderLibraryBooks(myLibrary);
        }
    }
}

function createDetailElement(className, label, content, heading = false) {
    const detail = document.createElement("div");
    // detail.className = className;
    detail.classList.add("detail", `detail__${className}`);

    const span = document.createElement("span");
    span.textContent = label;
    span.classList.add("label", `label__${className}`);

    let paragraph;
    if (!heading) {
        paragraph = document.createElement("p");
        paragraph.textContent = content;
        paragraph.classList.add("content", `content__${className}`);
    } else {
        paragraph = document.createElement("h2");
        paragraph.textContent = content;
        paragraph.classList.add("content", `content__${className}`);
    }

    detail.appendChild(span);
    detail.appendChild(paragraph);
    return detail;
}

function renderLibraryBooks(myLibrary) {
    libraryContainer.innerHTML = "";

    const frag = document.createDocumentFragment();

    myLibrary.forEach((book) => {
        frag.appendChild(createBookElement(book));
    });

    libraryContainer.appendChild(frag);
}

function createBookElement(book) {
    const article = document.createElement("article");
    const removeBtn = document.createElement("button");
    const switchContainer = document.createElement("div");
    const switchLabel = document.createElement("label");
    const switchSliderText = document.createElement("span");
    const switchCheckbox = document.createElement("input");
    const switchSlider = document.createElement("span");

    switchContainer.classList.add("switchContainer");
    switchLabel.classList.add("switch");
    switchSliderText.classList.add("slider-text");

    switchCheckbox.setAttribute("type", "checkbox");
    switchCheckbox.addEventListener("click", function () {
        if (book.haveIRead) {
            article.classList.remove("read");
            book.haveIRead = false;
        } else {
            article.classList.add("read");
            book.haveIRead = true;
        }
    });
    book.haveIRead == true
        ? (switchCheckbox.checked = true)
        : (switchCheckbox.checked = false);

    switchSlider.classList.add("slider", "round");

    switchSliderText.textContent = "Mark as read:";

    switchContainer.appendChild(switchSliderText);
    switchContainer.appendChild(switchLabel);
    switchLabel.appendChild(switchCheckbox);
    switchLabel.appendChild(switchSlider);

    removeBtn.innerHTML = "Remove Book";
    removeBtn.classList.add("btn", "btn__removeBookBtn");
    removeBtn.addEventListener("click", function () {
        removeBookFromLibrary(book);
    });

    article.className = "book";
    if (book.haveIRead) article.classList.add("read");

    article.setAttribute("data-sku", book.sku);
    article.appendChild(
        createDetailElement("title", "Title", book.title, true)
    );
    article.appendChild(createDetailElement("author", "Author", book.author));
    article.appendChild(
        createDetailElement("page-count", "Page count", book.pages)
    );
    article.appendChild(
        createDetailElement(
            "haveIRead",
            "Have I read this?",
            book.haveIRead ? "Yes" : "No"
        )
    );

    article.appendChild(switchContainer);

    article.appendChild(removeBtn);

    return article;
}

function openAddBookModal(modal) {
    modal.showModal(modal);
}

function closeAddBookModal(modal) {
    modal.close();
}

newBookForm.addEventListener("submit", function (e) {
    const title = newBookForm.querySelector("[name='form__bookTitle']");
    const author = newBookForm.querySelector("[name='form__author']");
    const pageCount = newBookForm.querySelector("[name='form__pageCount']");
    const haveIRead = newBookForm.querySelector("[name='haveIRead']").checked;

    if (e.submitter.formNoValidate) {
        closeAddBookModal(addBookModal);
        title.value = "";
        author.value = "";
        pageCount.value = "";
        return;
    }

    const newBook = new Book(
        title.value,
        author.value,
        pageCount.value,
        haveIRead
    );

    addBookToLibrary(newBook);

    renderLibraryBooks(myLibrary);

    title.value = "";
    author.value = "";
    pageCount.value = "";
});

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);

const tales = new Book(
    "Tales Of A Fourth Grade Nothing",
    "Judy Blume",
    109,
    true
);
addBookToLibrary(tales);

renderLibraryBooks(myLibrary);
