import { remove } from "../services/serieService.js";
import { modifie_seeie } from "./form.js"

let genre_tab = [];


export function displaySeries(data) {
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
      const p = document.createElement("p");
      const span = document.createElement("span");
      const summary = document.createElement("P");

      const div_b = document.createElement("div");
      const button_delet = document.createElement("button")
      const button_modifie = document.createElement("button")



      div1.setAttribute(
        "class",
        " pb-3 w-[450px] overflow-hidden border border-gray-600 rounded-2xl",
      );

      img.setAttribute("class", "w-full h-80 object-cover overflow-hidden");
      img.setAttribute("src", serie.image?.original || "assets/img/no-image-silhouette-icon-vector.webp" );
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
      p.setAttribute(
        "class",
        "item-center text-gray-200 font-bold px-3 flex items-center gap-2 py-1",
      );
      p.textContent = "language : ";

      span.setAttribute("class", "text-gray-400 px-1 flex ");
      span.textContent = serie.language;

      summary.setAttribute("class", "px-3 text-sm truncate text-gray-500");
      summary.textContent = serie.summary || "";
      p.append(span);

      div_b.setAttribute("class","flex gap-4 p-3")

      button_delet.setAttribute("class"," cursor-pointer font-semibold px-3 py-1 text-black bg-red-300 rounded-xl")
      button_delet.textContent = "Supprimer"
      button_delet.addEventListener("click",(e)=>{
        e.preventDefault()
        remove(serie.id)
        data = data.filter(el => el.id != serie.id)
        displaySeries(data)
      })
      
      
      button_modifie.setAttribute("class","cursor-pointer font-semibold px-3 py-1 text-black bg-blue-300 rounded-xl")
      button_modifie.textContent = "Modifie"
      button_modifie.addEventListener("click",(e)=>{
        e.preventDefault()
        modifie_seeie(serie.id)
        
      })


      div_b.append(button_modifie,button_delet)

      div1.append(img, h2, div2, p, summary, div_b);

      list_serie.append(div1);


    });
    set_genres(data);
  } else {
    voide.hidden = false;
    number_serise.textContent = "0 série affichée";
    set_genres(data);
  }
}
export function set_genres(data) {
  genre_tab = [];
  data.forEach((serie) => {
    serie.genres.forEach((genre) => {
      genre_tab.push(genre);
    });
  });
  genre_tab = [...new Set(genre_tab)];
  sort_genre.textContent = "";
  const option = document.createElement("option");
  option.setAttribute("value", "");
  option.setAttribute("class", "text-white bg-gray-800");
  option.textContent = "tous les goners";
  sort_genre.append(option);
  if (genre_tab.length > 1) {
    genre_tab.forEach((genre) => {
      const option = document.createElement("option");
      option.setAttribute("value", genre);
      option.setAttribute("class", "text-white bg-gray-800");

      option.textContent = genre;
      sort_genre.append(option);
    });
  }
}