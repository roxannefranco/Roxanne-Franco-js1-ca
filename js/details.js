// API variable
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
  const detailsDrink = document.querySelector("#single-cocktail");
  try {
    const response = await fetch(`${url}${id}`);
    const data = await response.json();

    const drink = data.drinks[0];
    // separate ingredients with comma
    let ingredients = "";
    for (let i = 1; i <= 15; i++) {
      if (drink["strIngredient" + i] != null) {
        ingredients += drink["strIngredient" + i] + ", ";
      }
    }
    // remove unnecessary comma and space
    ingredients = ingredients.slice(0, -2);

    const content = `
    <img width="400px" src="${drink.strDrinkThumb}"/>
    <h2>${drink.strDrink}</h2>
    <div><strong>Category:</strong> ${drink.strCategory}</div>
    <div><strong>Type:</strong> ${drink.strAlcoholic}</div>
    <div><strong>Glass:</strong> ${drink.strGlass}</div>
    <div><strong>Instructions:</strong> ${drink.strInstructions}</div>
    <div><strong>Ingredients:</strong> ${ingredients}</div>`;

    detailsDrink.innerHTML = content;

    // head title according to drink page
    const headTitle = document.querySelector("title");
    headTitle.innerHTML = drink.strDrink;
  } catch {
    detailsDrink.innerHTML = "Unknown error. Try again later.";
  }
}
