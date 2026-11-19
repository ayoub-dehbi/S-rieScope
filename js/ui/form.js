import { create } from "../services/serieService.js";
import { update } from "../services/serieService.js";
import { getById } from "../services/serieService.js";
import { displaySeries } from "./cards.js";
import { set_genres } from "./cards.js";

let id_edite = 0;
const from = document.getElementById("from");

const serie_name = document.getElementById("name_of_the_serie");
const serie_language = document.getElementById("language_of_the_serie");
const genre = document.getElementById("genre");
const descr = document.getElementById("description");

export function isValid() {
  let valid = true;
  genre.classList.remove("border-red-600");
  genre.classList.add("border-gray-600");

  serie_name.classList.remove("border-red-600");
  serie_name.classList.add("border-gray-600");

  descr.classList.remove("border-red-600");
  descr.classList.add("border-gray-600");

  serie_language.classList.remove("border-red-600");
  serie_language.classList.add("border-gray-600");

  if (!genre.value.trim()) {
    genre.classList.remove("border-gray-600");
    genre.classList.add("border-red-600");
    valid = false;
  }
  if (!serie_language.value) {
    serie_language.classList.remove("border-gray-600");
    serie_language.classList.add("border-red-600");
    valid = false;
  }
  if (!serie_name.value) {
    serie_name.classList.remove("border-gray-600");
    serie_name.classList.add("border-red-600");
    valid = false;
  }
  if (!descr.value) {
    descr.classList.remove("border-gray-600");
    descr.classList.add("border-red-600");
    valid = false;
  }
  return valid;
}

export async function add_serie(data) {
  let serie_add = {};

  if (!isValid()) return;
  else {
    serie_add.name = serie_name.value;
    serie_add.genres = genre.value.split(",");
    serie_add.language = serie_language.value;
    serie_add.summary = descr.value;
    // serie_add.image = {
    //   original: "assets/img/no-image-silhouette-icon-vector.webp",
    // };
    if (id_edite == 0) {
      data.push(serie_add);
      create(serie_add);
      from.reset();
      displaySeries(data);
      set_genres(data);
    } else {
        console.log(await update(id_edite, serie_add));
    // update(id_edite, serie_add);
      let modif = data.find((el) => el.id == id_edite);
      modif.name = serie_name.value;
      modif.genres = genre.value.split(",");
      modif.language = serie_language.value;
      modif.summary = descr.value;
      id_edite = 0
    }
    from.reset();
    displaySeries(data);
    set_genres(data);
  }
}

export async function modifie_seeie(id) {
  id_edite = id;
  let sre = await getById(id)

  serie_name.value = sre.name;
  serie_language.value = sre.language;
  genre.value = sre.genres.join();
  descr.value = sre.summary;

}
