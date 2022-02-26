fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
  .then((res) => res.json())
  .then((data) => byDefault(data.drinks));

const container = document.getElementById("container");
const byDefault = (datas) => {
  const output = datas
    .map((drink) => {
      return `
    <div class="card col-md-4" onclick="singleDetail('${drink.idDrink}')">
      <img src="${drink.strDrinkThumb}" class="card-img-top"/>
        <div class="card-body">
          <h2 class="card-title">${drink.strCategory}</h2>
          <p class="card-text">
            ${drink.strInstructions.slice(0, 20)}..See More
          </p>
        </div>
    </div>
    `;
    })
    .join("");
  container.innerHTML = output;
};

const details = document.getElementById("details");
const div = document.createElement("div");

const singleDetail = (id) => {
  console.log(id);
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data.drinks.find((newId) => {
        newId.idDrink === id;
        div.innerHTML = `<div class="card col-md-6 mx-auto">
           <img src="${newId.strDrinkThumb}" class="card-img-top"/>
            <div class="card-body">
            <h1>${newId.strDrink}</h1>
            <h2 class="card-title">${newId.strCategory}</h2>
            <h5>Ingredients: ${newId.strIngredient1},${newId.strIngredient2},${newId.strIngredient3}</h5>
            <p>${newId.strInstructions}</p>
            </div>
      </div>`;
        details.appendChild(div);
      });
    });
  container.textContent = "";
  details.textContent = "";
  searchList.textContent = "";
};

const searchList = document.getElementById("search");

const searchFood = async () => {
  const inputValue = document.getElementById("input").value.toLowerCase();
  if (inputValue === "" || inputValue < 0) {
    document.getElementById("para").classList.remove("d-none");
    container.textContent = "";
    document.getElementById("input").value = "";
  } else {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
    const data = await res.json();
    bySearch(data.drinks);
    document.getElementById("input").value = "";
    details.textContent = "";
  }
};

const bySearch = (datas) => {
  const searchRes = datas
    .map((list) => {
      return `<div class="card col-md-4" onclick="singleDetail('${list.idDrink}')">
        <img src="${list.strDrinkThumb}" class="card-img-top"/>
        <div class="card-body">
        <h1>${list.strDrink}</h1>
        <h2 class="card-title">${list.strCategory}</h2>
           <p>${list.strInstructions.slice(0, 10)}</p>
        </div>
  </div>`;
    })
    .join("");
  searchList.innerHTML = searchRes;
};
