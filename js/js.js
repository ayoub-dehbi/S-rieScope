let data = [];

async function fetchdata() {
  const resp = await fetch("https://api.tvmaze.com/shows?page=0");
  if (!resp.ok) {
    console.error("no data to fetch");
  }

  const datare = await resp.json();
  for (let i = 0; i < 20; i++) data.push(datare[i]);
  displaySeries();
}
fetchdata();

// console.log(data);
// form input
// const list_serie =document.getElementById("list_serie")
// const list_serie =document.getElementById("list_serie")
// const list_serie =document.getElementById("list_serie")
// const list_serie =document.getElementById("list_serie")

// search sort
// const list_serie =document.getElementById("list_serie")
// const list_serie =document.getElementById("list_serie")
// const list_serie =document.getElementById("list_serie")

const number_serise = document.getElementById("number_serise");
const voide = document.getElementById("voide");

// list serie
const list_serie = document.getElementById("list_serie");

// displaySeries()

function displaySeries() {
  list_serie.innerHTML = "";

  if (data.length > 0) {
    number_serise.textContent = data.length + " séries affichées";
    voide.hidden = true;

    data.forEach((serie) => {
      console.log(serie);

      const div1 = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const div2 = document.createElement("div");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const summary = document.createElement("div");

      div1.setAttribute(
        "class",
        " pb-3 w-[450px] overflow-hidden border border-gray-600 rounded-2xl",
      );

      img.setAttribute(
        "class",
        " w-full h-60 shrink-0 object-cover overflow-hidden",
      );
      img.setAttribute("src", serie.image.original);
      img.setAttribute("alt", "image of the serie");

      h2.setAttribute("class", "px-3 pt-2 font-bold text-xl");
      h2.textContent = serie.name;

      div2.setAttribute("class", "px-3 flex gap-4 py-2");

      p1.setAttribute("class", "px-3 flex gap-4 py-2");
      p1.textContent = serie.status;

      p2.setAttribute("class", "px-3 flex gap-4 py-2");
      p2.textContent = serie.type;

      summary.setAttribute("class", "px-3 text-gray-500");
      summary.innerHTML = serie.summary;

      div2.append(p1, p2);

      div1.append(img, h2, div2, summary);

      list_serie.append(div1);
    });
  }
  // else {
  //   voide.hidden = false;
  //   number_serise.textContent = "0 série affichée";
  // }
  else voide.hidden = false;
  // console.log(data);
}
