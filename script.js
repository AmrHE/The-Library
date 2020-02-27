let cardContainer = document.getElementById('card-container');
let modal = document.getElementById('input-modal');
let buttons = document.getElementsByClassName('jsBtn');
let formTitle = document.getElementById('title');
let formAuthor = document.getElementById('author');
let formPages = document.getElementById('pages');
let formRead = document.getElementById('read');


addListeners = () => {
    for(i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', buttonFunction)
    }
}

// library array containing all the book objects
let myLibrary = [
	{
		title: 'The Lord Of The Rings',
		author: 'J.R.R Tolkien',
		pages: 1137,
		read: true,
	},
	{
		title: 'A Tale of Two Citites',
		author: 'Charles Dickens',
		pages: 341,
		read: false,
	},
];




//Constructor for creating the book objects
function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


//Function that adds the new book to myLibrary
function addBookToLibrary(title, author, pages, read){
    let newBook = new book(title, author, pages, read);
    myLibrary.push(newBook)
}

// render function, checks rendered or assigns, adds data-attribute to card
render = () => {
    for(i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].rendered){
            continue;
        } else{
            let newCard = document.createElement('div');
            let delButton = document.createElement('button');
            let cardH3 = document.createElement('h4');
			let cardH4 = document.createElement('h5');
            let pages = document.createElement('h6');
            let readButton = document.createElement('button');

            newCard.className = 'book-card';
            newCard.setAttribute('data-array-ref', i);
            delButton.classList = 'del-button jsBtn';
            delButton.innerHTML = '&times;';
            delButton.setAttribute('name', 'delete');
			cardH3.innerText = 'Title: ' + myLibrary[i].title;
			cardH4.innerText = 'Author: ' + myLibrary[i].author;
            pages.innerText = 'Pages: ' + myLibrary[i].pages;
            if (myLibrary[i].read) {
				readButton.textContent = 'Read';
				readButton.classList = 'read jsBtn';
				readButton.setAttribute('name', 'read');
			} else {
				readButton.textContent = 'Unread';
				readButton.classList = 'unread jsBtn';
				readButton.setAttribute('name', 'unread')
            }
            myLibrary[i].rendered = true;
			newCard.appendChild(delButton);
			newCard.appendChild(cardH3);
			newCard.appendChild(cardH4);
			newCard.appendChild(pages);
			newCard.appendChild(readButton);
			cardContainer.prepend(newCard);
        }
    }

    addListeners();    
}


//Set button functions
buttonFunction = (event) => {
    switch (event.target.name) {
        case 'new-book':
                modal.style.display='block';
            break;

        case 'cancel':
            modal.style.display='none';
            cleraValues();
            break;

        case 'submit':
            submitBook();
            modal.style.display='none';
            break;

        case 'read':
            readToggle(event);
            break;

        case 'unread':
            readToggle(event);
            break;
            
        case 'delete':
            let parent = event.target.parentNode;
            deleteBook(parent);
            updateDataAttr();
            break;
    }
}

//acctivating the subimt button
submitBook = () =>{
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
    render();
    addListeners();
    cleraValues();
}

// activating the delete button
deleteBook = (parent) => {
    let arrayIndex = parent.getAttribute('data-array-ref');
    myLibrary.splice(arrayIndex, 1);
    parent.remove();
}

//failing to use book.prototype - below seems retarded?
readToggle = (event) => {
    let card = event.target.parentNode;
    let cardArrayIndex = card.getAttribute('data-array-ref');
    if(myLibrary[cardArrayIndex].read) {
        myLibrary[cardArrayIndex].read = false;
        event.target.classList='unread jsBtn';
        event.target.innerText='Unread'
    } else{
        myLibrary[cardArrayIndex].read = true;
        event.target.classList = 'read jsBtn';
        event.target.innerText = 'Read'
    }
}

cleraValues = () => {
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formRead.checked = false;
}

updateDataAttr = () => {
    let cards = document.getElementsByClassName('bookcard');
    let cardsArr = Array.from(cards);
    cardsArr.reverse();
    for(i = 0; i < cardsArr.length; i++) {
        cardsArr[i].setAttribute('data-array-ref', i)
    }
}

//call the functions
addListeners();
addBookToLibrary('Atomic Habits', 'James Clear', 306, false);
render();


// const book1 = new book('Atomic Habits', 'James Clear', '306' ,'In Progress' );

