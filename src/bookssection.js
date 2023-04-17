const apiKey = "da102ad5";
const apiUrl = "https://www.omdbapi.com/";

const form = document.querySelector(".searchForm");
const resultWrapper = document.querySelector(".resultWrapper");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const searchValue = form.querySelector("#searchInput").value;
  const typeValue = form.querySelector("#typeInput").value;
  const yearValue = form.querySelector("#yearInput").value;

    fetch (`https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=AIzaSyB5kQM3keU9PED6PrAwlBDzfKJCY50dWSQ&printType=books&startIndex=0&maxResults=6&langRestrict=en`)
  .then(data=> data.json())
  .then(data => {
    //console.log(data.Response);
    console.log(data);

  })

  const params = new URLSearchParams();
  params.append("apikey", apiKey);
  params.append("s", searchValue);
  params.append("type", typeValue);
  params.append("y", yearValue);

  fetch(`${apiUrl}?${params}`)
    .then(data => data.json())
    .then(data => {
      clearResultOutput();
      const output = resultWrapper.querySelector(".resultOutput");
      if (data.Response === "True") {
        data.Search.forEach(film => {
          const filmTemplate = `
            <div class="filmItem">
              <h3>${film.Title}</h3>
              <img src=${film.Poster} alt="${film.Title}" />
              <p class="filmItem_year">${film.Year}</p>
            </div>
          `;
          output.innerHTML += filmTemplate;
        });
      } else {
        output.innerHTML = '<p>По вашему запросу ничего не нашлось</p>';
      }
      showResultOutput();
  })
}


  /*
  const params = new URLSearchParams();
  params.append("apikey", apiKey);
  params.append("s", searchValue);
  params.append("type", typeValue);
  params.append("y", yearValue);

  fetch(`${apiUrl}?${params}`)
    .then(data => data.json())
    .then(data => {
      clearResultOutput();
      const output = resultWrapper.querySelector(".resultOutput");
      if (data.Response === "True") {
        data.Search.forEach(film => {
          const filmTemplate = `
            <div class="filmItem">
              <h3>${film.Title}</h3>
              <img src=${film.Poster} alt="${film.Title}" />
              <p class="filmItem_year">${film.Year}</p>
            </div>
          `;
          output.innerHTML += filmTemplate;
        });
      } else {
        output.innerHTML = '<p>По вашему запросу ничего не нашлось</p>';
      }
      showResultOutput();
  })
}
*/
function clearResultOutput() {
  resultWrapper.classList.remove("isShown");
  const output = resultWrapper.querySelector(".resultOutput");
  output.innerHTML = '';
}

function showResultOutput() {
  resultWrapper.classList.add("isShown");
}