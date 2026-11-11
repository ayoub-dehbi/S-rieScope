// form input
const from = document.getElementById("from");

const serie_name = document.getElementById("name_of_the_serie");
const genre = document.getElementById("genre");
const descr = document.getElementById("description");

// search sort
// const list_serie = document.getElementById("list_serie")
// const list_serie = document.getElementById("list_serie")
// const list_serie = document.getElementById("list_serie")

const number_serise = document.getElementById("number_serise");
const voide = document.getElementById("voide");

// list serie
const list_serie = document.getElementById("list_serie");

let data = [];
let id;

// displaySeries()
if (!JSON.parse(localStorage.getItem("data"))) {
  async function fetchdata() {
    const resp = await fetch("https://api.tvmaze.com/shows?page=0");
    if (!resp.ok) {
      console.error("no data to fetch");
    }

    const datare = await resp.json();
    for (let i = 0; i < 2; i++) data.push(datare[i]);
    localStorage.setItem("data", JSON.stringify(data));
    displaySeries();
    id = 20;
  }
  fetchdata();
} else {
  data = JSON.parse(localStorage.getItem("data"));
  displaySeries();
}

function displaySeries() {
  list_serie.innerHTML = "";

  data = JSON.parse(localStorage.getItem("data"));

  if (data.length > 0) {
    number_serise.textContent = data.length + " séries affichées";
    voide.hidden = true;

    data.forEach((serie) => {
      // console.log(serie);

      const div1 = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const div2 = document.createElement("div");
      const summary = document.createElement("div");

      div1.setAttribute(
        "class",
        " pb-3 w-[450px] overflow-hidden border border-gray-600 rounded-2xl",
      );

      img.setAttribute(
        "class",
        " w-full h-60 shrink-0 object-cover overflow-hidden",
      );
      img.setAttribute(
        "src",
        serie.image
          ? serie.image.original
          : "assets/img/267d0a8bd026e263f09fdc107125377b70a799ee.jpg",
      );
      img.setAttribute("alt", "image of the serie");

      h2.setAttribute("class", "px-3 pt-2 font-bold text-xl");
      h2.textContent = serie.name;

      div2.setAttribute("class", "px-3 flex gap-4 py-2");

      serie.genres.forEach((genre) => {
        const p1 = document.createElement("p");
        p1.setAttribute(
          "class",
          " text-gray-400 bg-gray-800 rounded-2xl px-3 flex gap-4 py-1",
        );
        p1.textContent = genre;
        div2.append(p1);
      });

      summary.setAttribute("class", "px-3 text-gray-500");
      summary.innerHTML = serie.summary.slice(0, 100);

      div1.append(img, h2, div2, summary);

      list_serie.append(div1);
    });
  } else {
    voide.hidden = false;
    number_serise.textContent = "0 série affichée";
  }
}

function isValid() {
  let valid = true;
  genre.classList.remove("border-red-600");
  genre.classList.add("border-gray-600");

  serie_name.classList.remove("border-red-600");
  serie_name.classList.add("border-gray-600");

  descr.classList.remove("border-red-600");
  descr.classList.add("border-gray-600");

  console.log("test");

  if (!genre.value.trim()) {
    genre.classList.remove("border-gray-600");
    genre.classList.add("border-red-600");
    valid = false;
    console.log(valid);
  }
  if (!serie_name.value) {
    serie_name.classList.remove("border-gray-600");
    serie_name.classList.add("border-red-600");
    valid = false;
    console.log(valid);
  }
  if (!descr.value) {
    descr.classList.remove("border-gray-600");
    descr.classList.add("border-red-600");
    valid = false;
    console.log(valid);
  }
  return valid;
}

function add_serie() {
  let serie_add = {};

  if (!isValid()) return;
  else {
    let genre_value = genre.value.split(" ");

    serie_add.id = id++;
    serie_add.name = serie_name.value;
    serie_add.genres = genre_value;
    serie_add.summary = descr.value;

    data.push(serie_add);
    localStorage.setItem("data", JSON.stringify(data));
    from.reset();
    displaySeries();
  }
}
from.addEventListener("submit", (e) => {
  e.preventDefault();
  add_serie();
});
