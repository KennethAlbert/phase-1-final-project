# phase-1-final-project


# LIKE A BOSS STORES

Like a boss stores is an online shopping  platform that gives window shoppers and customers a wide range of products to explore. 


## visit
For a breathtaking experience please visit https://like-a-boss-stores.netlify.app/


## Core Features

 users can:

1. See and interact with the  landing page, that changes opacity when the cursor moves in and off screen

in the index.js file there is a code that makes this possible;
In here we are basically looping through the pages,through the provided links in the ul li stored in the links variable;
The code ensures that the home page is the first li and that when we move away from it it blurs the background since the other pages will not cover the whole screen width.

we also have a close button that when clicked it triggers an event listener which redirects us to the home page in this case the first li in the loop.

   ```javascript
  const links = document.querySelectorAll('ul li');
const pages = document.querySelectorAll('.page');
const allBtns = document.querySelectorAll('.close-btn');

let selectedPageBtn = "";
for(let i = 0; i < links.length; i++){
    links[i].addEventListener('click', function(event){
        event.preventDefault();
        for(let i = 0; i < pages.length; i++){
            pages[i].style.display = "none";
        }
        pages[i].style.display = "block";
        selectedPageBtn = i;
        document.querySelector('header').style.filter = "blur(2px)";
    });
}

for(let i = 0; i < allBtns.length; i++){
    allBtns[i].addEventListener('click', function(){
        allBtns[i].parentElement.style.display = "none";
        document.querySelector('header').style.filter = "blur(0px)";
    });
}

   ```

2. see all products being offered for sale:in here we are using the fetch method to get fake products from  https://fakestoreapi.com/products and displaying them on the dom.

   ```
   GET /products
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
   ```

3.Adding products for other customers to buy 
```javascript
form.addEventListener('submit',handleSubmit)


function handleSubmit(e) {
    e.preventDefault();
    let productObject={
      title:e.target.productName.value,
      price: e.target.price.value,
      description: e.target.message.value,
      image: e.target.image.value,
      category: e.target.categery.value,
      }
  
      updatestore(productObject)
      renderToDom(productObject)
     
  //console.log(e.target.price)
    clear()
  }






  function clear() {
    productName.value=""
    productPrice.value=""
    productimage.value=""
    productCategory.value=""
    productDescription.value=""
  }




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
}````

in here we are adding an event listener to the form that when triggered a product is displayed on the dom which has similar capilities as the rest of the products

4 can add products into the cart which automatically calculates the quantity of the product selected and the price for the selected items.Can also remove products from the cart.
this can be initiated by the following code.
 
 ```javascript
 function addToCart(id) {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(complete=>{
        if (cart.some((item) => item.id === id)) {
           changeNumberOfUnits("plus", id);
            }
            else{
         const item = complete.find((card) => card.id === id);
         
         cart.push({
           ...item,
           numberOfUnits: 1,
         });
         
          }
          
        })
        updateCart(); 
        
         }
```

5.For the above features to be successful I have set out a function that inherites properties from other functions and passes them to other functions through this we can initiate an update feature to our public api;


````javascript
function updateCart() {
renderCartItems();
renderSubtotal();
updatestore();
          }

function updatestore(product){
  
        fetch(`https://fakestoreapi.com/products`,{
        method:"POST",
        body:JSON.stringify(
           {
           product
          }
          
        )
        
     })
        .then(res=>res.json())
        .then(json=>{product.id=json
        }
         
          )
}
````  