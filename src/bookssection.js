const apiKey = "AIzaSyB5kQM3keU9PED6PrAwlBDzfKJCY50dWSQ";
const apiUrl = "https://www.googleapis.com/books/v1/volumes/";

//const form = document.querySelector(".searchForm");

document.querySelector(".redEllipse").textContent=localStorage.length;
//s.textContent=  1* s.textContent + act;

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
          var btnStatus="BUY NOW";
          if (localStorage.getItem(book.id)!=null){
            btnStatus = "IN THE CART";
          }
         //console.log(book)
        //console.log(book.saleInfo.retailPrice)
        
         const bookTemplate = `
            <div class="bookItem">
              <img src=${checkImg(book.volumeInfo.imageLinks)} alt="${book.volumeInfo.title}" />
              <div class="bookInfo">
              <span class="bookItem_auth">${checkAuthors(book.volumeInfo.authors)}</span>
              <span class="bookItem_title">${checkItem(book.volumeInfo.title)}</span>
              <div class="bookItem_avgrate">${checkRating(book.volumeInfo.averageRating,book.volumeInfo.ratingsCount)}</div>
              <span class="bookItem_descr">${cropTitle(book.volumeInfo.description,80)}</span>
              <span class="bookItem_price">${checkPrice(book.saleInfo)}</span>
              <button class="btnCart ${btnStatus=="IN THE CART"? "inTheCart":""}" id="${book.id}">${btnStatus}</button>
              </div>
            </div>
          `;/**/
          output.innerHTML += bookTemplate;
         });
     //const btn = '<button class="moreButton"> more...</button>'    
     addCartBtn();
     addMoreButton();
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

function checkRating(num, rvw){
var rev=''
if(rvw>0){
  rev=' '+rvw+ ' reviews'
}
  const str1=`
<div class="ratingStars">
<div ${num>1 ? 'class="filledStar"' :'' }>★</div>
<div ${num>2 ? 'class="filledStar"' :'' }>★</div>
<div ${num>3 ? 'class="filledStar"' :'' }>★</div>
<div ${num>4 ? 'class="filledStar"' :'' }>★</div>
<div ${num>=5 ? 'class="filledStar"' :'' }>★</div>
<span class="bookItem_rateCnt"> ${rev} </span>
</div>`
return str1;
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
function checkPrice(obj){
if (typeof(obj.retailPrice)!=='undefined' ){
  return obj.retailPrice.amount + ' '+ obj.retailPrice.currencyCode;
 } else {
  return ''//obj.saleInfo.saleability;
 }
 
}
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

function addMoreButton(){
  const btn = resultWrapper.querySelector(".btnMore");
  //console.log(btn);
  if (btn===null){
    //console.log('no button')
    const btn = document.createElement("button");
    btn.textContent="LOAD MORE";
    resultWrapper.appendChild(btn); 
    btn.className="btnMore"  ;
    btn.classList.add("btnActive"); 
    //console.log(btn.classList);
    btn.addEventListener ("click",onClickBtn) ;  
    }
    else{
      //console.log('button exists')   
      btn.classList.add("btnActive")  ;   
    }   
  }
  
  
function addCartBtn (){
  btns = resultWrapper.querySelectorAll(".btnCart")
  btns.forEach((el)=> {el.addEventListener ("click",onClickCartBtn)
});
}

function onClickBtn (e) {
  e.preventDefault();
  obj=this;
   showBooks(e,obj);
 }
 
function changeCategory (obj) {
  const category=obj.parentElement;
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

function onClickCartBtn(e){
  e.preventDefault();
  const id=this.id;
  console.log(this);
  var act = 0;
  if ( localStorage.getItem(id)==null ) {
      console.log('set');
      localStorage.setItem(id,"1");
      this.innerHTML= "IN THE CART";
      this.classList.add("inTheCart")
      act=1;
  } else {
      console.log('remove')
      localStorage.removeItem(id);
      this.innerHTML= "BUY NOW";
      this.classList.remove("inTheCart")
      act=-1;
  }
    addBookToCartIcon(act);
  }

  function addBookToCartIcon(act) {
    s=document.querySelector(".redEllipse");
    s.textContent=  1* s.textContent + act;
    //console.log(s.textContent);
  }

  