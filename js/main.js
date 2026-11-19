import { getAll } from "./services/serieService.js";
import { getById } from "./services/serieService.js";
import { create } from "./services/serieService.js";
import { update } from "./services/serieService.js";
import { remove } from "./services/serieService.js";

import { displaySeries } from "./ui/cards.js";
import { add_serie } from "./ui/form.js";

// form input
const from = document.getElementById("from");

const serie_name = document.getElementById("name_of_the_serie");
const serie_language = document.getElementById("language_of_the_serie");
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

// let params = {
//   name: "Les Explorateurs",
//   language: "French",
//   genres: ["Documentary"],
//   //   "summary" :"sjhasfahsckajshcua",
//   //   "image" : {
//   //       original: "assets/img/no-image-silhouette-icon-vector.webp",
//   //     }
// };
let data = [];
init();
async function init() {
  data = await getAll();
  // console.log(data);
  displaySeries(data);

}


from.addEventListener("submit", (e) => {
  e.preventDefault();
  add_serie(data);
});


















// function isValid() {
//   let valid = true;
//   genre.classList.remove("border-red-600");
//   genre.classList.add("border-gray-600");

//   serie_name.classList.remove("border-red-600");
//   serie_name.classList.add("border-gray-600");

//   descr.classList.remove("border-red-600");
//   descr.classList.add("border-gray-600");

//   serie_language.classList.remove("border-red-600");
//   serie_language.classList.add("border-gray-600");

//   if (!genre.value.trim()) {
//     genre.classList.remove("border-gray-600");
//     genre.classList.add("border-red-600");
//     valid = false;
//   }
//   if (!serie_language.value) {
//     serie_language.classList.remove("border-gray-600");
//     serie_language.classList.add("border-red-600");
//     valid = false;
//   }
//   if (!serie_name.value) {
//     serie_name.classList.remove("border-gray-600");
//     serie_name.classList.add("border-red-600");
//     valid = false;
//   }
//   if (!descr.value) {
//     descr.classList.remove("border-gray-600");
//     descr.classList.add("border-red-600");
//     valid = false;
//   }
//   return valid;
// }

// function add_serie() {
//   let serie_add = {};

//   if (!isValid()) return;
//   else {

//     serie_add.name = serie_name.value;
//     serie_add.genres = genre.value.split(",");
//     serie_add.language = serie_language.value;
//     // serie_add.summary = descr.value;
//     // serie_add.image = {
//     //   original: "assets/img/no-image-silhouette-icon-vector.webp",
//     // };

//     data.push(serie_add);
//     create(serie_add)
//     from.reset();
//     displaySeries(data);
//     set_genres(data);
//   }
// }

// displaySeries
// function displaySeries(data) {
//   list_serie.innerHTML = "";

//   if (data.length > 0) {
//     number_serise.textContent = data.length + " séries affichées";
//     voide.hidden = true;

//     data.forEach((serie) => {
//       // console.log(serie);

//       const div1 = document.createElement("div");
//       const img = document.createElement("img");
//       const h2 = document.createElement("h2");
//       const div2 = document.createElement("div");
//       const p = document.createElement("p");
//       const span = document.createElement("span");
//       const summary = document.createElement("P");

//       const imageURL =
//         serie.image?.original ||
//         "assets/img/no-image-silhouette-icon-vector.webp";

//       div1.setAttribute(
//         "class",
//         " pb-3 w-[450px] overflow-hidden border border-gray-600 rounded-2xl",
//       );

//       img.setAttribute("class", "w-full h-80 object-cover overflow-hidden");
//       img.setAttribute(
//         "src",
//         serie.image?.original ||
//           "assets/img/no-image-silhouette-icon-vector.webp",
//       );
//       img.setAttribute("alt", "image of the serie");

//       h2.setAttribute("class", "px-3 pt-2 font-bold text-xl");
//       h2.textContent = serie.name;

//       div2.setAttribute("class", "px-3 flex gap-4 py-2");

//       serie.genres.forEach((genre) => {
//         const p1 = document.createElement("p");
//         p1.setAttribute(
//           "class",
//           " text-gray-400 bg-gray-800 rounded-2xl px-3 flex gap-4 py-1",
//         );
//         p1.textContent = genre;
//         div2.append(p1);
//       });
//       p.setAttribute(
//         "class",
//         "item-center text-gray-200 font-bold px-3 flex items-center gap-2 py-1",
//       );
//       p.textContent = "language : ";

//       span.setAttribute("class", "text-gray-400 px-1 flex ");
//       span.textContent = serie.language;

//       summary.setAttribute("class", "px-3 text-sm truncate text-gray-500");
//       summary.textContent = serie.summary || "";
//       p.append(span);
//       div1.append(img, h2, div2, p, summary);

//       list_serie.append(div1);
//     });
//     set_genres(data);
//   } else {
//     voide.hidden = false;
//     number_serise.textContent = "0 série affichée";
//     set_genres(data);
//   }
// }
// function set_genres(data) {
//   genre_tab = [];
//   data.forEach((serie) => {
//     serie.genres.forEach((genre) => {
//       genre_tab.push(genre);
//     });
//   });
//   genre_tab = [...new Set(genre_tab)];
//   sort_genre.textContent = "";
//   const option = document.createElement("option");
//   option.setAttribute("value", "");
//   option.setAttribute("class", "text-white bg-gray-800");
//   option.textContent = "tous les goners";
//   sort_genre.append(option);
//   if (genre_tab.length > 1) {
//     genre_tab.forEach((genre) => {
//       const option = document.createElement("option");
//       option.setAttribute("value", genre);
//       option.setAttribute("class", "text-white bg-gray-800");

//       option.textContent = genre;
//       sort_genre.append(option);
//     });
//   }
// }

