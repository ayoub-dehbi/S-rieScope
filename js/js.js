// form input
const from = document.getElementById("from");

const serie_name = document.getElementById("name_of_the_serie");
const genre = document.getElementById("genre");
const descr = document.getElementById("description");

// search sort
const recherche = document.getElementById("recherche");
const sort_genre = document.getElementById("sort_genre");
const reinitialiser = document.getElementById("reinitialiser");

const number_serise = document.getElementById("number_serise");
const voide = document.getElementById("voide");

// list serie
const list_serie = document.getElementById("list_serie");

let data = [];
let genre_tab = [];
let id 

// displaySeries()
if (!JSON.parse(localStorage.getItem("data"))) {
  async function fetchdata() {
    const resp = await fetch("https://api.tvmaze.com/shows?page=0");
    if (!resp.ok) {
      console.error("no data to fetch");
    }

    const datare = await resp.json();
    for (let i = 0; i < 20; i++) data.push(datare[i]);
    localStorage.setItem("data", JSON.stringify(data));
    displaySeries(data);
    set_genres(data);
    id = 20;
    console.log(data);
    
  }
  fetchdata();
} else {
  data = JSON.parse(localStorage.getItem("data"));
  displaySeries(data);
  set_genres(data);
    console.log(data);

}

// displaySeries
function displaySeries(data) {
  list_serie.innerHTML = "";

  if (data.length > 0) {
    number_serise.textContent = data.length + " séries affichées";
    voide.hidden = true;

    data.forEach((serie) => {
      // console.log(serie);

      const div1 = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const div2 = document.createElement("div");
      const summary = document.createElement("P");

      div1.setAttribute(
        "class",
        " pb-3 w-[450px] overflow-hidden border border-gray-600 rounded-2xl",
      );

      img.setAttribute("class", "w-full h-80 object-cover overflow-hidden");
      img.setAttribute("src", serie.image.original)
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

      summary.setAttribute("class", "px-3 text-sm truncate text-gray-500");
      summary.textContent = serie.summary.replace(/<[^>]*>/g, "");
      div1.append(img, h2, div2, summary);

      list_serie.append(div1);
    });
  } else {
    voide.hidden = false;
    number_serise.textContent = "0 série affichée";
  }
}

// set genres
function set_genres(data) {
  let genre_tab = [];
  data.forEach((serie) => {
    serie.genres.forEach((genre) => {
      genre_tab.push(genre);
    });
  });
  genre_tab = [...new Set(genre_tab)];
  console.log(genre_tab);
  sort_genre.textContent = ""
  const option = document.createElement("option")
    option.setAttribute("value", "")
    option.setAttribute("class", "text-white bg-gray-800")
    option.textContent = "tous les goners"
    sort_genre.append(option)
    
  genre_tab.forEach(genre => {
    const option = document.createElement("option")
    option.setAttribute("value", genre)
    option.setAttribute("class", "text-white bg-gray-800")
    
    option.textContent = genre
    sort_genre.append(option)
  });
}

// valid
function isValid() {
  let valid = true;
  genre.classList.remove("border-red-600");
  genre.classList.add("border-gray-600");

  serie_name.classList.remove("border-red-600");
  serie_name.classList.add("border-gray-600");

  descr.classList.remove("border-red-600");
  descr.classList.add("border-gray-600");

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

// add serie
function add_serie() {
  let serie_add = {};

  if (!isValid()) return;
  else {
    serie_add.id = id++;
    serie_add.name = serie_name.value;
    serie_add.genres = genre.value.split(",");
    serie_add.summary = descr.value;
    serie_add.image = { original : "assets/img/no-image-silhouette-icon-vector.webp" }
    // serie_add.image = { original : "assets/img/267d0a8bd026e263f09fdc107125377b70a799ee.jpg" }

    data.unshift(serie_add);
    localStorage.setItem("data", JSON.stringify(data));
    from.reset();
    displaySeries(data);
    set_genres(data);
  }
}

// search and sort
function search_sort() {
  // search
  let search = recherche.value.toLowerCase().trim();
  let search_res = data.filter((res) =>
    res.name.toLowerCase().includes(search),
  );

  // sort by genre
  if(sort_genre.value)
    search_res = search_res.filter(genre => genre.genres.includes(sort_genre.value))

  displaySeries(search_res);
}
recherche.addEventListener("input", search_sort);
sort_genre.addEventListener("change", search_sort);
reinitialiser.addEventListener("click", (e) => {
  e.preventDefault();
  recherche.value = "";
  sort_genre.selectedIndex = 0;
  displaySeries(data);
});

from.addEventListener("submit", (e) => {
  e.preventDefault();
  add_serie();
});
