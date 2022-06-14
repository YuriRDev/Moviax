const imagePath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

let filmesPopular = [];

const popularCallback = (data) => {
  console.log(data.results);
};

const getPopular = () => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=d98a3066cf3cfae0c371bb89d5f3f2e6&language=pt-BR";

  fetch(url)
    .then((res) => res.json())
    .then((out) =>
      out.results.map((item) => {
        filmesPopular.push(item);
        setTimeout(() => {
          handleDisplay();
        }, 10);
      })
    )
    .catch((err) => console.log("error!"));
};

const handleDisplay = () => {
  // window.location.href = "detalhes.html?id=idhere"

  for (let i = 1; i <= 4; i++) {
    // display lancamentos

    if (i < 4) {
      document.querySelector(
        `#filme-container-${i} .container .row .col-12 .movie-image`
      ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${filmesPopular[i].poster_path}`;

      document.getElementsByClassName("movie-link")[
        i - 1
      ].href = `detalhes.html?id=${filmesPopular[i].id}`;

      document.querySelector(
        `#filme-container-${i} .movie-background`
      ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${filmesPopular[i].poster_path}`;

      document.querySelector(
        `#filme-container-${i} > div.container > div > div.col-12.col-lg-6.col-xl-6.movie-container > div:nth-child(1) > h1`
      ).innerHTML = filmesPopular[i].title;

      if (filmesPopular[i].overview.length > 300) {
        document.querySelector(
          `#filme-container-${i} > div.container > div > div.col-12.col-lg-6.col-xl-6.movie-container > div:nth-child(1) > p`
        ).innerHTML = `${filmesPopular[i].overview.substring(0, 300)}...`;
      } else {
        document.querySelector(
          `#filme-container-${i} > div.container > div > div.col-12.col-lg-6.col-xl-6.movie-container > div:nth-child(1) > p`
        ).innerHTML = `${filmesPopular[i].overview}`;
      }

      document.querySelector(
        `#filme-container-${i} > div.container > div > div.col-12.col-lg-6.col-xl-6.movie-container > div:nth-child(2) > p.movie-desc`
      ).innerHTML = filmesPopular[i].release_date;
    }

    // display em destaque
    document.querySelector(
      `#filme-${i} img`
    ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${
      filmesPopular[i + 3].poster_path
    }`;
    document.querySelector(`#filme-${i}`).href = `detalhes.html?id=${
      filmesPopular[i + 3].id
    }`;
  }
};

const loadMoreMovies = () => {
  const queryChildren = `#destaque > div > div > div.row.movies-display-container`;

  for (let i = 0; i < 4; i++) {
    const filmeAtual = filmesPopular[i + 8];
    const moviestring = `<a href="detalhes.html?id=${
      filmesPopular[i + 8].id
    }" class="image-component col-6 col-lg-3 col-xl-3" id="filme-${i + 5}">
    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${
      filmeAtual.poster_path
    }" class="movie-display-image">
  </a>`;

    document
      .querySelector(queryChildren)
      .insertAdjacentHTML("beforeend", moviestring);
  }

  document
    .querySelector("#destaque > div > div > div.btn-sec-container")
    .remove();
};

//
//
//
/////////////////////////
//////// INFO PAGE //////
/////////////////////////
//
//
//

let movieInfoData = {};

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const getMovieData = () => {
  const movieId = getParameterByName("id");
  console.log(movieId);

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=d98a3066cf3cfae0c371bb89d5f3f2e6&language=pt-BR`;
  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      movieInfoData = out;
      handleInfoDisplay();
    })
    .catch((err) => console.log("error!"));
};

const handleInfoDisplay = () => {
  console.log(movieInfoData)
};
