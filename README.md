# 🎬 Cine Search

A movie search web application built with HTML, CSS, and JavaScript using the OMDb API.

## Features

- Search for movies using the OMDb API
- Display featured movies on the homepage
- View movie posters, titles, and release years
- View detailed information for a selected movie
- Movie details displayed in a modal
- Close the modal using the close button, clicking outside the modal, or pressing Escape
- Loading indicator during movie searches
- Responsive design for different screen sizes

## Tech Stack

- **HTML5** — Page structure and semantic markup
- **CSS3** — Styling, responsive layout, animations, and modal design
- **JavaScript (ES6+)** — Application logic, DOM manipulation, event handling, and API requests
- **OMDb API** — Movie search and movie details

## Project Structure

```text
movie-search/
├── index.html      # Main HTML structure
├── script.js       # Application logic and API integration
├── style.css       # Styling and responsive design
├── .gitignore      # Files excluded from Git
└── README.md       # Project documentation
```

## How It Works

### 1. Featured Movies

When the application loads, a predefined list of featured movies is used.

Each movie has an IMDb ID, which is used to request its information from the OMDb API. The poster URL returned by the API is then used to display the featured movie cards.

### 2. Movie Search

When a user submits a movie name, the application sends a search request to the OMDb API.

The returned results are converted into simplified movie objects containing:

- IMDb ID
- Movie title
- Release year
- Poster URL

These objects are then used to generate the movie cards dynamically.

### 3. Movie Details

When a user clicks a movie card, its IMDb ID is retrieved from the card's `data-id` attribute.

The application then requests detailed information for that specific movie from the OMDb API.

The returned information is displayed in a modal containing:

- Poster
- Title
- Year
- Age rating
- Runtime
- IMDb rating
- Genre
- Plot
- Cast
- Director
- Release date
- Language

### 4. Modal Interaction

The movie details modal can be closed in three ways:

- Click the close button
- Click outside the movie details box
- Press the `Escape` key

### 5. Loading State

A loading spinner is displayed while a movie search request is being processed.

## Getting Started

### Prerequisites

You will need:

- A web browser
- An OMDb API key
- A code editor such as VS Code

### Installation

1. Clone the repository:

```bash
git clone https://github.com/saipraneeth96/movie-search.git
```

## Future Improvements

- Add pagination for search results
- Add movie genre filtering
- Add search suggestions
- Add favorites or watchlist functionality
- Improve accessibility
- Add additional movie ratings such as Metascore and Rotten Tomatoes
- Add smoother modal and page transitions

## License

This project is created for learning and portfolio purposes.
