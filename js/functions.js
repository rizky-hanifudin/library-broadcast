const booksList = document.getElementById('booksList');
const searchBar = document.getElementById('searchBar');
let databaseBooks = [];
console.log(searchBar);

// Search Data
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredBooks = databaseBooks.filter((book) => {
  return (
    book.judul.toLowerCase().includes(searchString) ||
    book.penulis.toLowerCase().includes(searchString) ||
    book.pembaca.toLowerCase().includes(searchString)
    );
  
  });
  displayBooks(filteredBooks);
});

const loadBooks = async () => {
    try {
        const res = await fetch('/json/database.json');
        databaseBooks = await res.json();
        displayBooks(databaseBooks);
    } catch (err) {
        console.error(err);
    }
};

// Display Data
const displayBooks = (books) => {
    const htmlString = books
        .map((book) => {
            return `
            <li class="book">
                <h2 tabindex="1">Judul: ${book.judul}</h2>
                <p tabindex="2">Penulis: ${book.penulis}</p>
                <p tabindex="3">Pembaca: ${book.pembaca}</p>
                <button class="btn btn-second shop-item-button" type="button" tabindex="4">Detail</button>
                <button class="btn btn-primary shop-item-button" type="button" tabindex="5">Pesan</button>
            </li>
        `;
        })
        .join('');
    booksList.innerHTML = htmlString;
};

loadBooks();
