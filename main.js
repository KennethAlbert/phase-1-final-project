//setting global variables

let productName=document.querySelector('form #productName');
let productPrice= document.querySelector('form #price')
let productimage=  document.querySelector('form #image')
let productCategory=document.querySelector('form #categery')
let productDescription=document.querySelector('form #message')
let form=document.querySelector('form')

let cards=document.querySelector('#cards');
let price=document.querySelector('.card #price');
let catergory=document.querySelector('.card #catergory');
let title=document.querySelector('.card h1');
let cardImg=document.querySelector('.card img');
let description=document.querySelector('.card p');
let cartValue=document.querySelector('#cart-btn i')
let addCartbtn=document.querySelector('#addCart');
let subTotal=document.querySelector('.total p')

//function that render to the dom
function renderToDom(object) {
  document.querySelector('#cards').innerHTML+=`<div class="card">
   <h1 class="title">${object.title}</h1>
   <img src=${object.image}  class="images" alt="" >    
   <p>${object.description}</p>
   <p id="catergory">${object.category}</p>
   <p id="price">$ ${object.price} </p>
   <div id="card-buttons">
   <button class="button-cards addCart" onclick="addToCart(${object.id})" >Buy me</button>
   </div>
   </div>`
   
}

//function that render to the dom in cart
function renderCartDom(item) {
    document.querySelector('#cardCart').innerHTML+=`
    <div class="card">
    <h1 class="title">${item.title}</h1>
    <img src=${item.image}  class="images" alt="" >    
    <p>${item.description}</p>
    <p id="catergory">${item.category}</p>
    <p id="price">$ ${item.price} </p>
    <div id="card-buttons">
    <button class="button-complete"  id="remove" onclick="removeItemFromCart(${item.id})">Remove from cart</button>
    <div class="btn-plus button-bardge" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
    <button class="button-bardge">${item.numberOfUnits}</button>
    <div class="btn-minus button-bardge" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
    </div>
    </div>
    `
}
//fetching products from the fake Api store
function fetchProducts() {   
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(complete=>{
    complete.forEach(cards => {
       let list;
       list=`<div class="card">
       <h1 class="title">${cards.title}</h1>
       <img src=${cards.image}  class="images" alt="" >    
       <p>${cards.description}</p>
       <p id="catergory">${cards.category}</p>
       <p id="price">$ ${cards.price} </p>
       <div id="card-buttons">
       <button class="button-cards addCart" onclick="addToCart(${cards.id})" >Buy me</button>
       </div>
       </div>`
       document.querySelector('#cards').innerHTML+=list
    
    });  
    })}