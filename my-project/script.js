// Bryant Martinez
// CWID: 886742121
// Bryantmartinez322@csu.fullerton.edu
// Movie DataBase Assingment



// ------------------------------- Config Required Variables, with APIkey ----------------------------------------------------------------------
const apiKey = '505776814e8c987c58807b64619e06c6'; 
const baseUrl = 'https://api.themoviedb.org/3';
let currentPage = 1;


// ------------------------------- DOM Elements Used && Referenced ----------------------------------------------------------------------------

const searchInput = document.getElementById('search');
const sortDropdown = document.getElementById('sort');
const movieContainer = document.querySelector('.body_container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentPageElement = document.getElementById('current'); 

// ------------------------------- Window Page Load-UP ------------------------------------------------------------------------------------------

window.addEventListener('load', () => {
    sortDropdown.value = ''; 
    fetchMovies(currentPage);
});
// ------------------------------- Fetch Movies From API Key For [SearchQuery, Sort] Requirements ------------------------------------------------

async function fetchMovies(page = 1, searchQuery = '', sortBy = '') {
    try {
        let url = `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`; 

        if (searchQuery) {
            url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
        }

        if (!searchQuery && sortBy) {
            url = `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0) {
            currentPageElement.textContent = `Page 0 of 0`;  
        } else {
            displayMovies(data.results);
            updatePagination(data.page, data.total_pages);
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
// ------------------------------- Display Movie Card Function ---------------------------------------------------------------------------

function displayMovies(movies) {
    movieContainer.innerHTML = ''; 
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="movie-poster" />
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average.toFixed(1)}</p>
        `;
        movieContainer.appendChild(movieCard);
    });
}
// ------------------------------- Update Button Pagination --- ---------------------------------------------------------------------------

function updatePagination(currentPageNum, totalPages) {
    if (totalPages > 0) {
        currentPageElement.textContent = `Page ${currentPageNum} of ${totalPages}`;
    } else {
        currentPageElement.textContent = `Page 0 of 0`;  
    }

    prevButton.classList.toggle('disabled', currentPageNum === 1);
    nextButton.classList.toggle('disabled', currentPageNum === totalPages || totalPages === 0);
    currentPage = currentPageNum;
}

// ------------------------------- Event Listeners for [Sort, Prev, Next, Search] Functions ---------------------------------------------------

searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value;
    fetchMovies(currentPage, searchQuery, sortDropdown.value); 
});

sortDropdown.addEventListener('change', () => {
    const sortBy = sortDropdown.value;
    fetchMovies(currentPage, searchInput.value, sortBy);  
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        fetchMovies(currentPage - 1, searchInput.value, sortDropdown.value);
    }
});

nextButton.addEventListener('click', () => {
    fetchMovies(currentPage + 1, searchInput.value, sortDropdown.value);
});
// ------------------------------- Fetch Movie Call ----------------------
fetchMovies(currentPage);
