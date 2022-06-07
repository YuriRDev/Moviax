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
  for (let i = 1; i <= 4; i++) {
    // display lancamentos

    if (i < 4) {
      document.querySelector(
        `#filme-container-${i} .container .row .col-12 .movie-image`
      ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${filmesPopular[i].poster_path}`;

      document.querySelector(
        `#filme-container-${i} .movie-background`
      ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${filmesPopular[i].poster_path}`;
    }

    // display em destaque
    document.querySelector(
      `#filme-${i} img`
    ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${
      filmesPopular[i + 3].poster_path
    }`;
  }
};

getPopular();
