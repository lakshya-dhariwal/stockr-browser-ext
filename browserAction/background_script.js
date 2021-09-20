// Put all the javascript code here, that you want to execute in background.

const apiKey = "f714527f1b2b14112ff1317e0c44bc08";
const galleryDiv = document.querySelector('.gallery');
const form = document.querySelector('.searchForm');
const search= document.querySelector('.searchInput')
const alertP = document.querySelector('.alert');
let list = ''
let symbol = '';


const url = `https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=f714527f1b2b14112ff1317e0c44bc08`;


form.addEventListener('submit',(e)=>{
   e.preventDefault();
   const ticker = search.value.toUpperCase() ;
   console.log('ticker');
   stockSearch(ticker);
   console.log('fetch');
})



//functions
async function stockSearch(ticker){
   try{
      const url = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${apiKey}`
      const dataFetch = await fetch(url,{
         method: 'GET' ,
         headers:{
            Accept : "application/json",
            Authorization: apiKey
         }
      });
      const data = await dataFetch.json();
      const price = data[0].price;
      const change = data[0].change.toFixed(2);;
      const perChange = data[0].changesPercentage.toFixed(2);
      const company = data[0].name;
      search.value = '';
      console.log('html');
      generateHtml(ticker ,company , price,change ,perChange);
   }catch(err){
      
      console.log(err);
      alert();
  
   }

}
function generateHtml(ticker ,company, price, change,perChange){
   const div = document.createElement('div');
   div.classList.add('stock');
   div.innerHTML=`<button class='x' ">X</button>
   <h2>$${ticker}<span>  ${company}</span></h2>
   <h3><span>Price :</span> $${price}</h3>`
   const changeH4 = document.createElement('h4');
  
   if(change<0){
      changeH4.classList.add('loss');
      symbol = "↓";
   }else{
      changeH4.classList.add('gain');
      symbol = "↑";
   }
   changeH4.innerText= `${change} (${perChange}%) ${symbol} today `;
  
   div.appendChild(changeH4);
   
   galleryDiv.prepend(div);
   list = '';
   list = galleryDiv.innerHTML;
   setLocal();
   xClick();
   
}
// function to show invalid ticker
function alert(){
   alertP.classList.add('hidden');
   alertP.getElementsByClassName.visiblity = 'visible';
   setTimeout(()=>{
      alertP.classList.remove('hidden');
      alertP.getElementsByClassName.visiblity = 'hidden';
   },4000);
}
//for x on stock card
function xClick(){
   try{let xBtns = document.querySelectorAll('.x');
   console.log('xClick');
   xBtns.forEach((e)=>{
      e.addEventListener("click",()=>{
         e.parentElement.remove();
         list= '';
         list = galleryDiv.innerHTML;
         setLocal();
      })
   })}catch(err){
       console.log('xClick');
       console.log(err);
   }
}

//
function getFromLocal(){
   if(localStorage.getItem('html')== null){
      localStorage.setItem('html',list)
   }else{
      list = localStorage.getItem('html');
      galleryDiv.innerHTML = list;

   }
}
function setLocal(){
   localStorage.setItem('html',list);
}

getFromLocal();
setInterval(() => {
   xClick();
}, 1000); 
//for x on stock card
// function xClick(){
//    let xBtns = document.querySelectorAll('.x');
//    console.log('xClick');
//    xBtns.forEach((e)=>{
//       e.addEventListener("click",()=>{
//          e.parentElement.remove();
//          list= '';
//          list = galleryDiv.innerHTML;
//          setLocal();
//       })
//    })
// }