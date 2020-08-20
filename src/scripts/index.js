// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";

// Import any additional modules you want to include below \/
import "regenerator-runtime/runtime";
/* import {
  getRequest
} from "./getRequest"
import {
  render,
  render2
} from "./render" */
// \/ All of your javascript should go here \/
let shoppingListArr = []
let data = [];
let data1 = [];
const load = document.querySelector(".load-page");
const searchInput = document.querySelector("#search");
const optionSelect = document.querySelectorAll(".select-option")
const randomBTN = document.querySelector("#random");
const submitBTN = document.querySelector("#submit");
const container = document.querySelector(".sss");
let shoppingList = document.querySelector(".shopping-list")
const shoppingIcon = document.querySelector(".fa-shopping-cart")



const init = evt => {
  let optionValue


  Array.from(optionSelect).map(item => {
    console.log(item)
    if (item.checked) optionValue = item.value


  });
  console.log(optionValue)
  if (searchInput.value === "") {
    alert("please fill the search field");
  } else {
    evt.preventDefault();
    container.textContent = "";
    getRequest(searchInput.value, optionValue).then(() =>
      optionValue === "i" ? render2(data) : render(data)
    );
  }

};

let random = async evt => {
  sessionStorage.clear();
  container.textContent = "";
  let response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  );

  data1 = [];
  let responseJSON = await response.json();

  data1.push(responseJSON.drinks[0]);
  render(data1);

};
//getCocktailByID;

//getIDbyIngredient

////////////////////render
let render2 = array => {
  let elementText = "";
  sessionStorage.clear();
  array.forEach(
    item =>
    (elementText =
      elementText +
      `<div class="card">
  <div class="img">
    <img src="${item.strDrinkThumb}" alt="" />
  </div>
  <div class="details">
    <h3>${item.strDrink}</h3>
    <span class="go-to-drink" id="${item.idDrink}">Go to drink <i class="fas fa-glass-cheers"></i> </span>
    
  </div>
</div>`)
  );

  container.insertAdjacentHTML("beforeend", elementText);

  container.scrollIntoView({
    behavior: "smooth",
    block: "start",

  })
};
let render = array => {
  sessionStorage.clear();
  container.innerHTML = "";
  let elementText = "";

  Array.from(array).forEach(item => {
    let finalIngredientsArr = [];
    let ingredientsArr = [
      item.strIngredient1,
      item.strIngredient2,
      item.strIngredient3,
      item.strIngredient4,
      item.strIngredient5,
      item.strIngredient6,
      item.strIngredient7,
      item.strIngredient8,
      item.strIngredient9,
      item.strIngredient10,
      item.strIngredient11,
      item.strIngredient12,
      item.strIngredient13,
      item.strIngredient14,
      item.strIngredient15
    ];
    ingredientsArr.forEach(item => {
      if (item !== null && item !== "") finalIngredientsArr.push(" " + item);
    });

    elementText =
      elementText +
      `<div class="card">
    <div class="img">
      <img src="${item.strDrinkThumb}" alt="" />
    </div>
    <div class="details">
      <h3>${item.strDrink}</h3>
      <p ><strong>Ingredients: </strong><p>${finalIngredientsArr}</p><button>add to shopping list</button></p>
      <span class="details__span">details <i class=" rotate fas fa-arrow-alt-circle-up"></i></span>
      <div  class ="instructions">
        <p >${item.strInstructions} </p>
      </div>
    </div>
  </div>`;
  });

  container.insertAdjacentHTML("beforeend", elementText);
  elementText = "";

  container.scrollIntoView({
    behavior: "smooth",
    block: "start",

  })

};
////////////getRequest
const getRequest = async (search, option) => {
  data = [];
  if (option === "i") {
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${option}=${search}`
    );
    let responseJSON = await response.json();
    await responseJSON.drinks.forEach(element => data.push(element));
  } else {
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?${option}=${search}`
    );
    let responseJSON = await response.json();
    await responseJSON.drinks.forEach(element => data.push(element));
  }

  sessionStorage.setItem("drinks", JSON.stringify(data));
};

submitBTN.addEventListener("click", init);



let changeClass1 = evt => {
  let card = evt.target.closest(".card")
  let instructions = card.querySelector(".instructions")

  let details = card.querySelector(".details__span")

  if (evt.target === details) {
    instructions.classList.toggle("instructions2")
    details.firstElementChild.classList.toggle("rotate")
  }
};

let goToDrink = async (evt) => {

  data1 = []
  if (evt.target.classList.contains("go-to-drink")) {
    console.log()
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${evt.target.id}`
    )
    let responseJSON = await response.json();
    console.log(responseJSON)
    data1.push((responseJSON.drinks[0]));
    render(data1)
  }
}
let renderShoppingList = () => {
  shoppingList.innerHTML = "";
  let listHTML = "";
  shoppingListArr.forEach(item => {
    listHTML += `<ul><strong>${item[0]}</strong>`
    for (let i = 1; i < item.length; i++) {
      listHTML += `<li>${item[i]}</li>`
    }
    listHTML += "</ul>"
  })
  shoppingList.insertAdjacentHTML("beforeend", listHTML)
  console.log(shoppingList)
}

let addToShoppingList = (evt) => {
  let card = evt.target.closest(".card")
  let shoppingBTN = card.querySelector("button")
  let drinkTitle = shoppingBTN.closest(".details").firstElementChild.textContent

  let shoppingItems = shoppingBTN.previousElementSibling.textContent
  let shoppingItemsArr = shoppingItems.split(",");
  shoppingItemsArr.unshift(drinkTitle)
  if (evt.target === shoppingBTN) shoppingListArr.push(shoppingItemsArr)
  console.log(shoppingListArr)
  //console.log(shoppingListArr[1])
  renderShoppingList()
}
shoppingListArr.forEach(item => console.log(item))


let showShoppingList = (evt) => {

  if (evt.target === shoppingIcon) {
    shoppingList.classList.toggle("shopping-list1")

  }
}


/* instructions.classList.replace("instructions", "instructions2") */
randomBTN.addEventListener("click", random);
container.addEventListener("click", goToDrink)
container.addEventListener("click", changeClass1);
container.addEventListener("click", addToShoppingList)

shoppingIcon.addEventListener("click", showShoppingList)