// Load books from api
const searchBooks = () => {

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