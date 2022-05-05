// API variables
const url = "https://thecocktaildb.com/api/json/v1/1/lookup.php?i=";

// fetch ID from url parameters
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("id")) {
  const id = urlParams.get("id");
  getSingleCocktail(id);
} else {
  // in case user removes id from url
  const detailsDrink = document.querySelector("#single-cocktail");
  detailsDrink.innerHTML = `<li>Drink not found.<a class="button" href="index.html">Go back</a></li>`;
}

// Obtain a single cocktail
async function getSingleCocktail(id) {
  const response = await fetch(`${url}${id}`);
  const data = await response.json();

  const drink = data.drinks[0];

  const content = `
    <li><img width="400px" src="${drink.strDrinkThumb}"/></li>
    <li>${drink.strDrink}</li>
    <li>${drink.strCategory}</li>
    <li>${drink.strAlcoholic}</li>
    <li>${drink.strGlass}</li>
    <li>${drink.strInstructions}</li>`;

  const detailsDrink = document.querySelector("#single-cocktail");
  detailsDrink.innerHTML = content;

  // head title according to drink page
  const headTitle = document.querySelector("title");
  headTitle.innerHTML = drink.strDrink;
}
