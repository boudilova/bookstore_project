(()=>{var e={460:()=>{const e="AIzaSyB5kQM3keU9PED6PrAwlBDzfKJCY50dWSQ",t="https://www.googleapis.com/books/v1/volumes/",n=document.querySelectorAll(".liElement"),o=document.querySelector(".resultWrapper");var a=0,s="";function r(e){e.preventDefault(),obj=this,s=obj.textContent,a=0,l(0,obj)}function l(n,r){0==a&&function(e){const t=e.parentElement;null!=t.querySelector(".active")&&t.querySelector(".active").classList.remove("active"),e.classList.add("active")}(r);const l=new URLSearchParams;l.append("key",e),l.append("q","subject:"+s),l.append("printType","books"),l.append("startIndex",a),l.append("maxResults",6),console.log(s),fetch(`${t}?${l}`).then((e=>e.json())).then((e=>{!function(){o.classList.remove("isShown");const e=o.querySelector(".resultOutput");e.querySelector(".btnActive"),e.innerHTML=""}();const t=o.querySelector(".resultOutput");e.items.forEach((e=>{console.log(e.id);const n=`\n            <div class="bookItem">\n              <img src=${a=e.volumeInfo.imageLinks,void 0===a?"img/bg.png":a.thumbnail} alt="${e.volumeInfo.title}" />\n              <div class="bookInfo">\n              <span class="bookItem_auth">${function(e){var t="";return"undefined"!=e&&e.forEach((e=>{""!=t&&(t+=","),t+=e})),t}(e.volumeInfo.authors)}</span>\n              <span class="bookItem_title">${i(e.volumeInfo.title)}</span>\n              <span class="bookItem_avgrate">${e.averageRating}</span>\n              <span class="bookItem_rateCnt">${i(e.ratingsCount)}</span>\n              <span class="bookItem_descr">${function(e,t){void 0===e&&(e="");const n=e;return n.length<=80?n:n.substr(0,80)+"..."}(e.volumeInfo.description)}</span>\n              <span class="bookItem_price">${i(e.saleInfo.retailprice)}</span>\n              <button class="btnCart cart_${e.id}">buy</button>\n              </div>\n\n            </div>\n          `;var a;t.innerHTML+=n,btnCart=o.querySelector(`.cart_${e.id}`),btnCart.addEventListener("click",u),console.log(btnCart)})),function(){const e=o.querySelector(".btnMore");if(null===e){const e=document.createElement("button");e.textContent="Show next pack",o.appendChild(e),e.className="btnMore",e.classList.add("btnActive"),e.addEventListener("click",c)}else e.classList.add("btnActive")}(),a+=6,o.classList.add("isShown")})).catch((e=>{console.log(e)}))}function i(e){return void 0===e&&(e=""),e}function c(e){e.preventDefault(),obj=this,l(0,obj)}function u(e){e.preventDefault(),console.log("listen"),localStorage.setItem("id","1"),console.log(localStorage.getItem("231zxc"))}n.forEach((e=>{e.addEventListener("click",r)}))},765:()=>{let e=[{url:"img/banner1.png",title:""},{url:"img/banner2.png",title:""},{url:"img/banner3.png",title:""}];let t={dots:!0,titles:!1,autoplay:!0,autoplayInterval:5e3};document.addEventListener("DOMContentLoaded",(function(){!function(t){if(!e||!e.length)return;t=t||{titles:!1,dots:!0,autoplay:!1};let n=document.querySelector(".slider__images"),o=document.querySelector(".slider__dots");function a(a){n.querySelector(".active").classList.remove("active"),n.querySelector(".n"+a).classList.add("active"),t.dots&&(o.querySelector(".active").classList.remove("active"),o.querySelector(".n"+a).classList.add("active")),t.titles&&function(t){e[t].title&&(n.querySelector(".slider__images-title").innerText=s(e[t].title,50))}(a)}function s(e,t){return e.length<=t?e:e.substr(0,t)+"..."}e.forEach(((t,o)=>{let a=`<div class="image n${o} ${0===o?"active":""}" style="background-image:url(${e[o].url});" data-index="${o}"></div>`;n.innerHTML+=a})),t.dots&&(e.forEach(((e,t)=>{let n=`<div class="slider__dots-item n${t} ${0===t?"active":""}" data-index="${t}"></div>`;o.innerHTML+=n})),o.querySelectorAll(".slider__dots-item").forEach((e=>{e.addEventListener("click",(function(){a(this.dataset.index)}))}))),t.titles&&function(){let t=`<div class="slider__images-title">${e[0].title}</div>`;n.innerHTML+=s(t,50)}(),t.autoplay&&setInterval((()=>{let t=+n.querySelector(".active").dataset.index;a(t===e.length-1?0:t+1)}),t.autoplayInterval)}(t)}))}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(765),n(460)})()})();