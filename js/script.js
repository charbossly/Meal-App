const urlapi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let mealsId = document.getElementById("meals");
let meals = [];

async function getmeal(search) {
  await fetch(urlapi + search)
    .then((response) => response.json())
    .then((data) => {
      meals = data.meals;
    });
}
async function displaymeals(search) {
  await getmeal(search);
  if (meals) {
    meals.map((item) => {
      let ingredients = [];
      for (i = 0; i < 21; i++) {
        if (item[`strIngredient${i}`]) {
          ingredients.push({
            ingredientnom: item["strIngredient" + i],
            quantite: item["strMeasure" + i],
          });
        }
      }
      return (mealsId.innerHTML += `
                            <div class="bg-white w-4/5 sm:w-3/5  md:w-full text-black border-gray-500 h-auto">
                            <img class="w-full h-64"src="${
                              item.strMealThumb
                            }" alt="" />
                            <div class="text-center">
                              <h3 class="text-center bold text-lg capitalize">${
                                item.strMeal
                              }</h3>
                              <p class="w-full text-sm"><b class="text-blue-300">Country :</b> ${
                                item.strArea
                              }<br/> <b class="text-blue-300">Category :</b>  ${
        item.strCategory
      }  </div><h4 class="text-center font-bold italic text-blue-600 capitalize mt-2 border-b-2 border-gray-300">Ingrédients</h4>
                              <ul class="mt-2 p-2">
                                 <li class="text-md italic">${ingredients
                                   .map(
                                     (i) =>
                                       "<b>" +
                                       i.ingredientnom +
                                       "</b>" +
                                       " -" +
                                       i.quantite +
                                       "<br/>"
                                   )
                                   .join("")}</li>
                              </ul>      ​​
                          </div> 
                          </div> `);
    });
  } else {
    document.getElementById("meals").innerHTML =
      "<div class='text-xl text-blue-800  col-span-full text-center'>Aucun résultat disponible</div>";
  }
}

function submit(e) {
  e.preventDefault();
  mealsId.innerHTML = "";
  displaymeals(document.getElementById("search").value);
}
// function submit1(e) {
//   meals = [];
//   submit(e);
// }

const formulaire = document.getElementById("formulaire");
formulaire.addEventListener("submit", submit);

let searchinput = document.getElementById("search");
// searchinput.addEventListener("input", submit1);
