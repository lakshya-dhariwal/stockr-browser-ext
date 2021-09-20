// Put all the javascript code here, that you want to execute after page load.

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
setInterval(() => {
    xClick();
}, 1000); 
