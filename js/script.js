const cocktailList = document.getElementById('cocktails');
let letter = "a";

const abcList = document.querySelector('.abc-list');
abcList.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('abcbtn')) {
        letter = e.target.textContent.trim().toLowerCase();
        cocktailList.innerHTML = '';
        getCocktails();
    }
});

const getCocktails = async () => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letter);
    const data = await response.json();
    
    console.log(data);
    listadoCocktails(data.drinks);
}

getCocktails();

function listadoCocktails(drinks) {
    drinks.forEach(drink => {
        let cocktailItem = document.createElement('div');
        cocktailItem.className = 'cocktail-item';
        
        let cocktailTitle = document.createElement('h3');
        cocktailTitle.textContent = drink.strDrink;
        
        let imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        let cocktailimg = document.createElement('img');
        cocktailimg.className = 'cocktail-img';
        cocktailimg.draggable = false;
        cocktailimg.src = drink.strDrinkThumb + "/small";
        cocktailimg.alt = drink.strDrink;

        let cocktailDescription = document.createElement('div');
        cocktailDescription.className = 'cocktail-description';
        
        let alcoholicInfo = document.createElement('p');
        alcoholicInfo.innerHTML = `<strong>Alcohólico:</strong> ${drink.strAlcoholic || "N/A"}`;
        alcoholicInfo.style.color = drink.strAlcoholic === "Alcoholic" ? "red" : "green";
        alcoholicInfo.className = 'category';

        let categoryInfo = document.createElement('p');
        categoryInfo.innerHTML = `<strong>Categoría:</strong> ${drink.strCategory || "N/A"}`;
        categoryInfo.className = 'category';

        let glassInfo = document.createElement('p');
        glassInfo.innerHTML = `<strong>Copa:</strong> ${drink.strGlass || "N/A"}`;
        glassInfo.className = 'category';

        let instructionsInfo = document.createElement('p');
        instructionsInfo.innerHTML = `<strong>Instrucciones:</strong> ${drink.strInstructionsES || drink.strInstructions || "N/A"}`;

        cocktailDescription.appendChild(alcoholicInfo);
        cocktailDescription.appendChild(categoryInfo);
        cocktailDescription.appendChild(glassInfo);
        cocktailDescription.appendChild(instructionsInfo);

        imageContainer.appendChild(cocktailimg);
        imageContainer.appendChild(cocktailDescription);
        
        cocktailItem.appendChild(cocktailTitle);
        cocktailItem.appendChild(imageContainer);
        cocktailList.appendChild(cocktailItem);
    });
}       