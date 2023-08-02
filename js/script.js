// const API_KEY = "628c4a2b"
// const URL = `https://www.omdbapi.com/?s=thor&apikey=fc1fef96`

const search_input = document.querySelector("#search-input");
const movie_list = document.querySelector(".movie-list");
const movie_inform = document.querySelector('.movie-inform')

async function loadMovies(searchItem) {
  const URL = `https://www.omdbapi.com/?s=${searchItem}&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data)
  if (data.Response == "True") {
    displayMoviesList(data.Search);
    // console.log(data.Search);
  }
}

search_input.addEventListener("input", (e) => {
  e.preventDefault();
  let searchTerm = e.target.value.trim();
  if (searchTerm == "") {
    movie_list.innerHTML = "";
    movie_inform.innerHTML = ''
  } else {
    loadMovies(searchTerm);
  }
});



// function findMovies(){
//     let searchTerm = (search_input.value).trim()
//     console.log(searchTerm)
//     // loadMovies(searchTerm)
// }

function displayMoviesList(movies) {
  search_input.innerHTML = "";
  movie_list.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movie_list__item = document.createElement("li");
    movie_list__item.dataset.id = movies[idx].imdbID;
    movie_list__item.classList.add("movie-list__item");
    // console.log(movies[idx].Title, idx)
    if (movies[idx].Poster != "N/A") {
      movie_poster = movies[idx].Poster;
    } else {
      movie_poster = "./img/png/image_not_found.png";
    }
    movie_list__item.innerHTML = `
        <div class="movie__img">
            <img src=${movie_poster} alt="poster" height="300" width="300" id="movie__poster">
        </div>
        <p class="movie__title">${movies[idx].Title}</p>
        <p class="movie__year">Year: ${movies[idx].Year}</p>
    `;
    // console.log(movie_list__item)
    movie_list.append(movie_list__item);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const list_item = document.querySelectorAll(".movie-list__item");
  list_item.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id)
      movie_list.innerHTML = "";
      const result = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`
      );
      const movieDetails = await result.json();
      // console.log(movieDetails)
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  movie_inform.classList.remove('hidden')
  // movie_list.classList.add('hidden')
  movie_inform.classList.add('show')
  movie_inform.innerHTML = `
    <div class="movie-img">
      <img src=${(details.Poster != "N/A") ? details.Poster : "./img/png/image_not_found.png"} alt="" width="200" height="300" />
    </div>
    <div class="movie-details">
      <h2 class="movie-title">${details.Title}</h2>
      <p class="movie-year">Year: <span>${details.Year}</span></p>
      <p class="movie-genre">Genre: <span>${details.Genre}</span></p>
      <p class="movie-director">Director: <span>${details.Director}</span></p>
      <p class="movie-actors">
        Actors: <span>${details.Actors}</span>
      </p>
      <p class="movie-about"> About:
        <span>${details.Plot}</span>
      </p>

      <p class="movie-language">Language: <span>${details.Language}</span></p>
    </div>
  `
}
