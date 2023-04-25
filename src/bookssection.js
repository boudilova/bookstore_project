const apiKey = "AIzaSyB5kQM3keU9PED6PrAwlBDzfKJCY50dWSQ";
const apiUrl = "https://www.googleapis.com/books/v1/volumes/";

//const form = document.querySelector(".searchForm");
const liEl = document.querySelectorAll(".liElement");
const resultWrapper = document.querySelector(".resultWrapper");

//form.addEventListener("submit", submitForm);

liEl.forEach((el)=> {el.addEventListener ("click",onClickUl)
});

function onClickUl (e) {
 e.preventDefault();
  showBooks(e,0,6);
}

function showBooks(e,startIndex,maxResult){
  
  const q= this.textContent;
  //const t = this.classList;
 
  if (startIndex==0){
    changeCategory (this)
  }
  const params = new URLSearchParams();
  params.append("key", apiKey);
  params.append("q", "subject:"+ q );
  params.append("printType", "books");
  params.append("startIndex", startIndex);
  params.append("maxResults", maxResult);
  //params.append("langRestrict", 'en');

  fetch(`${apiUrl}?${params}`)
    .then(data => data.json())
    .then(data => {
        clearResultOutput();
      const output = resultWrapper.querySelector(".resultOutput");
          data.items.forEach(book => {
          console.log(book.id);

         //console.log(book)
          const bookTemplate = `
            <div class="bookItem">
              <img src=${checkImg(book.volumeInfo.imageLinks)} alt="${book.volumeInfo.title}" />
              <div class="bookInfo">
              <span class="bookItem_auth">${checkAuthors(book.volumeInfo.authors)}</span>
              <span class="bookItem_title">${checkItem(book.volumeInfo.title)}</span>
              <span class="bookItem_avgrate">${checkRating(book.averageRating)}</span>
              <span class="bookItem_rateCnt">${checkItem(book.ratingsCount)}</span>
              <span class="bookItem_descr">${cropTitle(book.volumeInfo.description,100)}</span>
              <span class="bookItem_price">${checkItem(book.saleInfo.retailprice)}</span>
              </div>
            </div>
          `;/**/
          output.innerHTML += bookTemplate;
        });
     //const btn =     
     showResultOutput();
  }).catch((err) => {
    console.log(err);
})
}

function checkImg(str){
  //console.log(str);
  var res='';
  if (typeof(str)=='undefined'){
    //console.log('rrr')
    res='img/bg.png';
   } else {
  res=str.thumbnail;
}
   return res;
}

function checkRating(str){
return str;
}

function checkAuthors(str){
  var res="";
  if(str!='undefined'){
  //console.log(str);
  str.forEach((author)=>{
    if(res!=''){
      res=res+',';
    }
    res=res+author;
  //console.log(res);
  })
}
  return res;
};

function checkItem(str) {
  if (typeof(str)=="undefined"){
    str="";
  }
  return str;
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
}

function changeCategory (obj) {
  const category=obj.parentElement;
  if (category.querySelector(".active") !=null){
    category.querySelector(".active").classList.remove("active");
   }
  obj.classList.add("active");
}

function clearResultOutput() {
  resultWrapper.classList.remove("isShown");
  const output = resultWrapper.querySelector(".resultOutput");
  output.innerHTML = '';
}

function showResultOutput() {
  resultWrapper.classList.add("isShown");
}