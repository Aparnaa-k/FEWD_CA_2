document.addEventListener("DOMContentLoaded", () => {
  const recipesLink = document.getElementById("recipesLink");
  const searchInput = document.getElementById("searchInput");

  fetchRandomRecipes();

  recipesLink.addEventListener("click", () => {
    fetchRandomRecipes();
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm = searchInput.value;
      fetchRecipes(searchTerm);
    }
  });

  function fetchRandomRecipes() {
    document.getElementById("category").innerText = "Today's Recipe";

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => {
        displayRecipes([data.meals[0]]);
      })
      .catch((err) => {
        console.error("Error fetching random recipes:", err);
      });
  }

  function fetchRecipes(category = "latest") {
    document.getElementById("category").innerText =
      category === "latest"
        ? "Latest Dishes"
        : `Search Results for "${category}":`;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json())
      .then((data) => {
        displayRecipes(data.meals);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
      });
  }

  function displayRecipes(meals) {
  const displayBox = document.getElementById("display-box");

  displayBox.innerHTML = "";

  meals.forEach((meal) => {
    const box = document.createElement("div");
    box.classList.add("box");

    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.addEventListener("click", () => togglePopup(meal));
    box.appendChild(img);

    const h2 = document.createElement("h2");
    h2.innerText = meal.strMeal;
    box.appendChild(h2);

    displayBox.appendChild(box);
  });
}

function togglePopup(meal) {
  const popup = document.getElementById("popup-id");
  const popupImg = document.getElementById("popup-img");
  const mealName = document.getElementById("meal-Name");
  const popupIngredient = document.getElementById("popup-Ingredient");
  
  popupImg.src = meal.strMealThumb;
  mealName.innerText= `${meal.strMeal}`;

  
  const ingredientsList = document.getElementById("popup-Ingredient");
  document.getElementById("head").innerText = "Ingredients List:";  
  ingredientsList.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && measure) {
      const listItem = document.createElement("ol");
      listItem.innerText = `${measure} ${ingredient}`;
      ingredientsList.appendChild(listItem);
    }
  }

  popup.style.display = popup.style.display === "block" ? "none" : "block";
  }
   
});

function closePopup() {
  const popup = document.getElementById("popup-id");
  popup.style.display = "none";
}

