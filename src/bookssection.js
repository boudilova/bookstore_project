const apiKey = "AIzaSyB5kQM3keU9PED6PrAwlBDzfKJCY50dWSQ";
const apiUrl = "https://www.googleapis.com/books/v1/volumes/";

const form = document.querySelector(".searchForm");
const resultWrapper = document.querySelector(".resultWrapper");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const searchValue = form.querySelector("#searchInput").value;
  const typeValue = form.querySelector("#typeInput").value;
  const yearValue = form.querySelector("#yearInput").value;

  const params = new URLSearchParams();
  params.append("key", apiKey);
  params.append("q", "subject:Business");
  params.append("printType", "books");
  params.append("startIndex", 0);
  params.append("maxResults", 6);
  params.append("langRestrict", 'en');
  /*
  fetch (`https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=AIzaSyB5kQM3keU9PED6PrAwlBDzfKJCY50dWSQ&printType=books&startIndex=0&maxResults=6&langRestrict=en`)
  .then(data=> data.json())
  .then(data => {
    //console.log(data.Response);
    console.log(data);

  })
*/
  fetch(`${apiUrl}?${params}`)
    .then(data => data.json())
    .then(data => {
      //console.log(data);
      //console.log(item[0]);
      clearResultOutput();
      const output = resultWrapper.querySelector(".resultOutput");
      console.log(data);
      //console.log(data.Response);
      
      //if (data.Response === "True") {
        data.items.forEach(book => {
          console.log(book.id);
         
          const bookTemplate = `
            <div class="bookItem">
              <img src=${book.volumeInfo.imageLinks.thumbnail} alt="${book.volumeInfo.title}" />
              <div class="bookInfo">
              <span class="bookItem_auth">${book.volumeInfo.authors}</span>
              <span class="bookItem_title">${book.volumeInfo.title}</span>
              <span class="bookItem_avgrate">${book.averageRating}</span>
              <span class="bookItem_rateCnt">${book.ratingsCount}</span>
              <span class="bookItem_descr">${cropTitle(book.volumeInfo.description,50)}</span>
              <span class="bookItem_price">${book.saleInfo.retailprice}</span>
              </div>
            </div>
          `;/**/
          console.log(bookTemplate)
          output.innerHTML += bookTemplate;
        });
      //} else {
      //  output.innerHTML = '<p>По вашему запросу ничего не нашлось</p>';
     // }
     console.log('before output') 
     showResultOutput();
     console.log('after output') 
     
  }).catch((err) => {
    console.log(err);
})
}

function cropTitle(str, size) {
  if (typeof(str)=="undefined")  {
    str=''
  }
  const title = str;
  if (title.length <= size) {
    return title;
  } else {
    return title.substr(0, size) + "...";
  }
}/*
function checkData(obj){
   readyObject.title = obj.volumeInfo.title 
   readyObject.authors = obj.volumeInfo.authors 
   obj.averageRating
   obj.ratingsCount
   obj.volumeInfo.description
}*//*
   <h3>${book.volumeInfo.title}</h3>
   <img src=${book.volumeInfo.imageLinks.thumbnail} alt="${book.volumeInfo.title}" />
   <span class="filmItem_auth">${book.volumeInfo.authors}</span>
   <span class="filmItem_title">${book.volumeInfo.title}</span>
   <span class="filmItem_avgrate">${book.averageRating}</span>
   <span class="filmItem_rateCnt">${book.ratingsCount}</span>
   <span class="filmItem_descr">${cropTitle(book.volumeInfo.description,50)}</span>
   <span class="filmItem_price">${book.saleInfo.retailprice}</span>
*/

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