const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://www.omdbapi.com/";

const featuredMovies = [
  {
    id: "tt0816692",
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
  },
  {
    id: "tt1375666",
    title: "Inception",
    year: 2010,
    rating: 8.8,
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    year: 2008,
    rating: 9.2,
  },
  {
    id: "tt1757678",
    title: "Avatar: Fire and Ash",
    year: 2025,
    rating: 7.2,
  },
  {
    id: "tt15398776",
    title: "Oppenheimer",
    year: 2023,
    rating: 8.2,
  },
  {
    id: "tt0137523",
    title: "Fight Club",
    year: 2003,
    rating: 8.8,
  },
];

const moviesContainer = document.querySelector(".movies-container");

const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector(".search-container");

const sectionTitle = document.querySelector(".section-title");

const loader = document.querySelector(".loader");

const movieData = document.querySelector(".movie-data");

const loadFeaturedMovies = async function () {
  const movies = await Promise.all(
    featuredMovies.map(async function (movie) {
      const movieInfo = await searchMoviesByID(movie.id);

      return {
        ...movie,
        poster: movieInfo.Poster,
      };
    }),
  );

  renderMovies(movies);
};

// Display Movies
const renderMovies = function (movies) {
  moviesContainer.innerHTML = "";
  movieData.innerHTML = "";

  // Creating movie card for each movie
  movies.forEach(function (movie) {
    const html = `
    <article class="movie-card" data-id="${movie.id}">
      <img
        class="movie-poster"
        src="${movie.poster}"
        alt="${movie.title} poster"
      />

      <div class="movie-content">
        <h2 class="movie-title">${movie.title}</h2>

        <div class="movie-meta">
          <span class="year">${movie.year}</span>
        </div>
      </div>
    </article>`;
    moviesContainer.insertAdjacentHTML("beforeend", html);
  });
};

// Handle search results and send to renderMovies(movie) for displayconst
const searchHandler = async function (event) {
  event.preventDefault();

  const movieName = searchInput.value.trim();

  if (!movieName) return;

  searchBtn.disabled = true;
  searchBtn.textContent = "Searching...";

  try {
    sectionTitle.textContent = "Search Results";
    loader.classList.remove("hidden");
    const moviesList = await searchMovies(movieName);

    if (moviesList === "No Movies Found!") {
      sectionTitle.textContent = "No Movies Found!";
      moviesContainer.innerHTML = "";
      movieData.innerHTML = "";
      return;
    }

    renderMovies(moviesList);
  } catch (error) {
    sectionTitle.textContent =
      "Unable to connect. Please check your internet connection and try again.";
    moviesContainer.innerHTML = "";
  } finally {
    loader.classList.add("hidden");
    searchBtn.disabled = false;
    searchBtn.textContent = "Search";
  }
};
searchForm.addEventListener("submit", searchHandler);

// Search OMDb and return a list of movies.
// Handling search results of APi Key
// OMDB API - https://www.omdbapi.com/?apikey=YOUR_KEY&s=Batman
// MY KEY - http://www.omdbapi.com/?i=tt3896198&apikey=66faaf80
const searchMovies = async function (movieName) {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${movieName}`);
  if (!response.ok) throw new Error("Failed to fetch movies.");

  const data = await response.json();

  if (data.Response === "False") return "No Movies Found!";

  const movies = data.Search.map(function (movie) {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster === "N/A" ? "./images/blank.jpg" : movie.Poster,
    };
  });
  return movies;
  // If an error occurs, JavaScript automatically propagates it to the caller.
  // So catch block is not required
};

const movieDetails = async function (event) {
  const card = event.target.closest(".movie-card");
  if (!card) return;

  const movieID = card.dataset.id;

  const movieInfo = await searchMoviesByID(movieID);
  renderMovieDetails(movieInfo);
};
moviesContainer.addEventListener("click", movieDetails);

const renderMovieDetails = function (movieInfo) {
  movieData.innerHTML = "";

  const html = `
  <article class="movie-details">

    <button class="close-btn">&times;</button>

    <div class="movie-details-top">

      <img 
        class="details-poster"
        src="${movieInfo.Poster}" 
        alt="${movieInfo.Title}"
      />

      <div class="movie-details-info">

        <h2>${movieInfo.Title}</h2>

        <p class="movie-basic-info">
          ${movieInfo.Year} • ${movieInfo.Rated} • ${movieInfo.Runtime}
        </p>

        <p class="movie-rating">
          ⭐ ${movieInfo.imdbRating}
        </p>

        <p class="movie-genre">
          ${movieInfo.Genre}
        </p>

      </div>

    </div>

    <div class="movie-plot">
      <h3>Plot</h3>
      <p>${movieInfo.Plot}</p>
    </div>

    <div class="movie-extra-info">
      <p><strong>Cast:</strong> ${movieInfo.Actors}</p>
      <p><strong>Director:</strong> ${movieInfo.Director}</p>
      <p><strong>Release Date:</strong> ${movieInfo.Released}</p>
      <p><strong>Language:</strong> ${movieInfo.Language}</p>
    </div>

  </article>`;

  movieData.insertAdjacentHTML("beforeend", html);
  movieData.classList.remove("hidden");
};

const closeMovieDetails = function () {
  movieData.classList.add("hidden");
};

movieData.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-btn")) {
    closeMovieDetails();
  }

  if (event.target === movieData) {
    closeMovieDetails();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMovieDetails();
  }
});

// Given an IMDb ID, fetch the detailed information for exactly one movie.
const searchMoviesByID = async function (movieID) {
  const response = await fetch(`${BASE_URL}?i=${movieID}&apikey=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch movies.");

  const data = await response.json();
  return data;
};

loadFeaturedMovies();
