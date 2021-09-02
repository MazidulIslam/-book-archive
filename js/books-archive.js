// Load books from api
const searchBooks = () => {
    // spinner appear and hide search result
    toggleDisplay('block', 'none');
    resultNotFoundStyle('none');

    // get search text 
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;
    searchInput.value = '';
    
    // get books api url 
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
}
// toggle spinner and display
const toggleDisplay = (spinnerDisplayStyle, resultDisplayStyle) => {
    document.getElementById('spinner').style.display = spinnerDisplayStyle;
    document.getElementById('result').style.display = resultDisplayStyle;
}
// toggle result not found 
const resultNotFoundStyle = notFound => {
    document.getElementById('not-found').style.display = notFound;
}
// Count search result 
const totalSearchCount = (totalBooks) => {
    const displaySearchCount = document.getElementById('search-count');
    displaySearchCount.textContent = '';
    const searchCountDiv = document.createElement('div');
    searchCountDiv.classList.add('total-books');
    searchCountDiv.innerHTML = `
    <div class="w-100 mx-auto bg-success text-white p-1 mb-3">
        <h2 class="text-center">Total Found ${totalBooks.length} books</h2>
    </div>`;
    displaySearchCount.appendChild(searchCountDiv);
}
// Display Books 
const displayBooks = (books) => {
    // display search count 
    totalSearchCount(books);
    // display books
    const displayBooksResult = document.getElementById('display-books');
    displayBooksResult.textContent = '';
    if (books.length === 0) {
        resultNotFoundStyle('block');
    } else {
        resultNotFoundStyle('none');
        books.forEach( book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        if (!book.cover_i) {
            url = `images/no-book.png`;
        } else {
            url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        }
        div.innerHTML = `
            <div class="card shadow hover-overlay">
                <img src="${url}" class="card-img-top" alt="..."  style="height: 200px;">
                <div class="card-body" style="height: 350px; overflow: hidden;">
                    <h5 class="card-title">Title: ${book.title}</h5>
                    <h6 class="card-title">Author: ${book.author_name ? book.author_name : 'Unkonwn'}</h6>
                    <h6 class="card-title">Publish Year: ${book.first_publish_year? book.first_publish_year : 'Unkonwn Publish Year'}</h6>
                    <p class="card-text">${book.first_sentence? book.first_sentence[0].slice(0, 100) : 'First sentence is not available in the book api. '}</p>
                </div>
            </div>`;
        displayBooksResult.appendChild(div);            
    })
    }
    // // hide spinner and appear search result
    toggleDisplay('none', 'block');
}
