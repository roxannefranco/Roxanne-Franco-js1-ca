// API variable
const url = "https://thecocktaildb.com/api/json/v1/1";

// Add letters to search buttons
const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let content = "";
for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  content += `<a href="index.html?letter=${letter.toLowerCase()}" class="button">${letter}</a>`;
}

const letterSearch = document.querySelector("#letter-search");
letterSearch.innerHTML = content;

// Obtain cocktails by first letter
async function getAllByFirstLetter(letter) {
  const cocktailsList = document.querySelector("#cocktails tbody");
  const loading = document.querySelector(".lds-ring");
  try {
    const response = await fetch(`${url}/search.php?f=${letter}`);
    const data = await response.json();

    // Remove loading indicator after fetch is done
    loading.remove();

    if (data.drinks != null) {
      let drinks = "";
      for (let i = 0; i < data.drinks.length; i++) {
        const drink = data.drinks[i];
        drinks += `<tr>
      <td><img width="100px" src="${drink.strDrinkThumb}"/></td>
        <td>${drink.strDrink}</td>
        <td>${drink.strCategory}</td>
        <td>${drink.strAlcoholic}</td>
        <td><a class="button" href="details.html?id=${drink.idDrink}">Details</a></td>
      </tr>`;
      }

      cocktailsList.innerHTML = drinks;
    } else {
      // empty td tags as placeholder for empty results
      cocktailsList.innerHTML = "<tr><td>No drinks with this letter.</td><td></td><td></td><td></td><td></td></tr>";
    }
  } catch (e) {
    cocktailsList.innerHTML = "<tr><td>Unknown error. Try again later.</td><td></td><td></td><td></td><td></td></tr>";
    // Remove loading indicator after fetch is done
    loading.remove();
  }
}

// Verify if key letter is present in url parameters
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("letter")) {
  const letter = urlParams.get("letter");
  getAllByFirstLetter(letter);
} else {
  getAllByFirstLetter("a");
}
