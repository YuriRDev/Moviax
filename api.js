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
  console.log(movieInfoData);
  // image
  document.querySelector(
    "body > main > div.container.movie-basic > div > div > img"
  ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieInfoData.poster_path}`;
  // texts
  document.getElementById("title").innerHTML = movieInfoData.title;
  document.getElementById("sinopse").innerHTML = movieInfoData.overview;
  document.getElementById("avaliacao").innerHTML = movieInfoData.vote_average;
  document.getElementById(
    "avaliacao_total"
  ).innerHTML = `${movieInfoData.vote_count} avaliações`;

  //componentes
  document.querySelector("#tags").innerHTML = "";
  movieInfoData.genres.map((item) => {
    document
      .querySelector("#tags")
      .insertAdjacentHTML("beforeend", `<div class="tag">${item.name}</div>`);
  });
  // estudios
  document.querySelector("#producao").innerHTML = "";
  movieInfoData.production_companies.map((item) => {
    document
      .querySelector("#producao")
      .insertAdjacentHTML("beforeend", `<p>${item.name}</p>`);
  });
};

const displaySearchMovies = (info) => {
  console.log(info);
  document.querySelector("#movies-display");
  info.results.map((item) => {
    const htmlAppend = `
    <div class="col-3 movie-search">
    <img
      src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}"
    />
    <div class="bottom">
      <h3>${item.title}</h3>
      <div class="avaliacao">
        <div class="star">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.7801 0.528221C6.92977 0.0675659 7.58148 0.0675676 7.73115 0.528223L9.07317 4.65853C9.14011 4.86454 9.33209 5.00402 9.5487 5.00402H13.8916C14.3759 5.00402 14.5773 5.62383 14.1855 5.90853L10.672 8.4612C10.4968 8.58852 10.4234 8.81421 10.4904 9.02022L11.8324 13.1505C11.9821 13.6112 11.4548 13.9942 11.063 13.7095L7.54952 11.1569C7.37427 11.0295 7.13698 11.0295 6.96173 11.1569L3.44828 13.7095C3.05643 13.9942 2.52919 13.6112 2.67886 13.1505L4.02088 9.02022C4.08782 8.8142 4.01449 8.58852 3.83925 8.4612L0.325796 5.90853C-0.0660603 5.62383 0.135329 5.00402 0.61969 5.00402H4.96255C5.17916 5.00402 5.37114 4.86454 5.43808 4.65853L6.7801 0.528221Z"
              fill="#F9A400"
            />
          </svg>
        </div>
        <p>${item.vote_average}</p>
      </div>
    </div>
  </div>
    `;

    document
      .querySelector("#movies-display")
      .insertAdjacentHTML("beforeend", htmlAppend);
  });
};

const searchMovie = () => {
  /*
    https://api.themoviedb.org/3/search/movie?api_key=d98a3066cf3cfae0c371bb89d5f3f2e6&language=pt-BR&query=macaco&year=2000&region=004
  */

  const titleQuery = document.querySelector("#title-query").value;

  const anoQuery = document.querySelector("#ano").value;
  const regionQuery = document.querySelector("#loc").value;

  if (titleQuery) {
    const apiURL = `    https://api.themoviedb.org/3/search/movie?api_key=d98a3066cf3cfae0c371bb89d5f3f2e6&language=pt-BR&query=${titleQuery}${
      anoQuery != "" ? `&year=${anoQuery}` : ""
    }${regionQuery != "" ? `&region=${regionQuery}` : ""}`;

    // console.log(apiURL);

    const url = apiURL;
    fetch(url)
      .then((res) => res.json())
      .then((out) => {
        document.querySelector("#movies-display").innerHTML = "";
        displaySearchMovies(out);
      })
      .catch((err) => console.log("error!"));
  } else {
    console.log("Voce tem que digitar algo");
  }
};
