const apiKey = "AIzaSyB5kQM3keU9PED6PrAwlBDzfKJCY50dWSQ";
const apiUrl = "https://www.googleapis.com/books/v1/volumes/";

//const form = document.querySelector(".searchForm");


const liEl = document.querySelectorAll(".liElement");
const resultWrapper = document.querySelector(".resultWrapper");
var startIndex= 0;
var q='';
//form.addEventListener("submit", submitForm);

liEl.forEach((el)=> {el.addEventListener ("click",onClickUl)
});

function onClickUl (e) {
 e.preventDefault();
 obj=this;
 q= obj.textContent;
 //console.log(obj);
  startIndex=0;
  showBooks(e,obj);
}

function showBooks(e,obj){
  //console.log(startIndex);

  if (startIndex==0){
    changeCategory (obj)
  }

  //const maxResult=6;
  const params = new URLSearchParams();
  params.append("key", apiKey);
  params.append("q", "subject:"+ q );
  params.append("printType", "books");
  params.append("startIndex", startIndex);
  params.append("maxResults", 6);
  //params.append("langRestrict", 'en');
  console.log(q);

  fetch(`${apiUrl}?${params}`)
    .then(data => data.json())
    .then(data => {
      //console.log(maxResult);
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
              <span class="bookItem_descr">${cropTitle(book.volumeInfo.description,80)}</span>
              <span class="bookItem_price">${checkItem(book.saleInfo.retailprice)}</span>
              <button class="btnCart">buy</button>
              </div>

            </div>
          `;/**/
          output.innerHTML += bookTemplate;
        });
     //const btn = '<button class="moreButton"> more...</button>'    
     addButton();
     startIndex=startIndex+6 ;
     //console.log('after show'+startIndex);
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

function addButton(){
  const btn = resultWrapper.querySelector(".btnMore");
  console.log(btn);
  if (btn===null){
    console.log('no button')
    const btn = document.createElement("button");
    btn.textContent="Show next pack";
    resultWrapper.appendChild(btn); 
    btn.className="btnMore"  ;
    btn.classList.add("btnActive"); 
    console.log(btn.classList);
    btn.addEventListener ("click",onClickBtn) ;  
    }
    else{
      console.log('button exists')   
      btn.classList.add("btnActive")  ;   
    }
    //btn.classList.add("btnActive")  ; 
   
  }
  
   

function onClickBtn (e) {
  //console.log(startIndex)
  e.preventDefault();
  obj=this;
  //console.log(obj);
   //console.log('func'+startIndex);
   showBooks(e,obj);
 }
 
function changeCategory (obj) {
  const category=obj.parentElement;
  //console.log(category.querySelector(".active"));
  if (category.querySelector(".active") != null ) {
    category.querySelector(".active").classList.remove("active");
   }
  obj.classList.add("active");
}

function clearResultOutput() {
  resultWrapper.classList.remove("isShown");
  const output = resultWrapper.querySelector(".resultOutput");
  const btn=output.querySelector(".btnActive");
    
  //btn.classList.remove("btnActive")
  output.innerHTML = '';
      //console.log(btn);
   
}

function showResultOutput() {
  //console.log('bshowResultOutput'+startIndex);
  resultWrapper.classList.add("isShown");

}