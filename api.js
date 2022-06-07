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
      })
    )
    .catch((err) => console.log("error!"));
};

const handleDisplay = () => {
  for (let i = 1; i <= 4; i++) {
    console.log(
      (document.querySelector(
        `#filme-${i} img`
      ).src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${filmesPopular[i].poster_path}`)
    );
  }
};

getPopular();
