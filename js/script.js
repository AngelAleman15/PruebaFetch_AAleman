const cocktailList = document.getElementById('cocktails');
let letter = "a";

const abcList = document.querySelector('.abc-list');
abcList.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('abcbtn')) {
        letter = e.target.textContent.trim().toLowerCase();
        const activeBtn = document.querySelector('.abcbtnactive');
        if (activeBtn) {
            activeBtn.classList.remove('abcbtnactive');
        }
        e.target.classList.add('abcbtnactive');
        cocktailList.innerHTML = '';
        getCocktails();
    }
});

cocktailList.addEventListener('click', (e) => {
    const cocktailItem = e.target.closest('.cocktail-item');
    if (cocktailItem) {
        const drinkName = cocktailItem.dataset.drinkName;
        const instructions = cocktailItem.dataset.instructions;
        const ingredients = cocktailItem.dataset.ingredients;
        const alcoholic = cocktailItem.dataset.alcoholic;
        const category = cocktailItem.dataset.category;
        const glass = cocktailItem.dataset.glass;
        
        Swal.fire({
            title: `<div style="color: #2c3e50; font-size: 1.5em; margin-bottom: 10px;">🍸 ${drinkName}</div>`,
            html: `
                <div style="text-align: left; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c3e50;">
                    <!-- Información básica con diseño de tarjetas -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 20px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; border-radius: 12px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <div style="font-size: 1.2em; margin-bottom: 5px;">🍹</div>
                            <div style="font-size: 0.8em; opacity: 0.9;">Tipo</div>
                            <div style="font-weight: bold; font-size: 0.9em;">${alcoholic}</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 12px; border-radius: 12px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <div style="font-size: 1.2em; margin-bottom: 5px;">📂</div>
                            <div style="font-size: 0.8em; opacity: 0.9;">Categoría</div>
                            <div style="font-weight: bold; font-size: 0.9em;">${category}</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 12px; border-radius: 12px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <div style="font-size: 1.2em; margin-bottom: 5px;">🥃</div>
                            <div style="font-size: 0.8em; opacity: 0.9;">Copa</div>
                            <div style="font-weight: bold; font-size: 0.9em;">${glass}</div>
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 18px; border-radius: 15px; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <h4 style="color: #2c3e50; margin: 0 0 12px 0; font-size: 1.1em; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #fff; padding: 6px; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🧪</span>
                            Ingredientes
                        </h4>
                        <div style="background: rgba(255,255,255,0.7); padding: 12px; border-radius: 10px; line-height: 1.6; font-size: 0.95em;">
                            ${ingredients}
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 18px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <h4 style="color: #2c3e50; margin: 0 0 12px 0; font-size: 1.1em; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #fff; padding: 6px; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📋</span>
                            Instrucciones de preparación
                        </h4>
                        <div style="background: rgba(255,255,255,0.7); padding: 12px; border-radius: 10px; line-height: 1.7; font-size: 0.95em;">
                            ${instructions}
                        </div>
                    </div>
                </div>
            `,
            confirmButtonText: '<i class="fas fa-arrow-left"></i> Volver',
            confirmButtonColor: '#667eea',
            width: '750px',
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
                popup: 'animate__animated animate__zoomOut'
            },
            backdrop: `
                rgba(102,126,234,0.4)
                url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='4'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")
                center / 100px 100px
            `
        });
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
        
        // Extraer ingredientes
        let ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                const ingredientText = measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim();
                ingredients.push(ingredientText);
            }
        }
        
        // Almacenar datos en el elemento
        cocktailItem.dataset.drinkName = drink.strDrink;
        cocktailItem.dataset.instructions = drink.strInstructionsES || drink.strInstructions || "No hay instrucciones disponibles";
        cocktailItem.dataset.ingredients = ingredients.length > 0 ? ingredients.join(', ') : "No hay ingredientes disponibles";
        cocktailItem.dataset.alcoholic = drink.strAlcoholic || "N/A";
        cocktailItem.dataset.category = drink.strCategory || "N/A";
        cocktailItem.dataset.glass = drink.strGlass || "N/A";
        
        let cocktailTitle = document.createElement('h3');
        cocktailTitle.textContent = drink.strDrink;
        
        let imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        let cocktailimg = document.createElement('img');
        cocktailimg.className = 'cocktail-img';
        cocktailimg.draggable = false;
        cocktailimg.src = drink.strDrinkThumb + "/small";
        cocktailimg.alt = drink.strDrink;

        imageContainer.appendChild(cocktailimg);
        
        cocktailItem.appendChild(cocktailTitle);
        cocktailItem.appendChild(imageContainer);
        cocktailList.appendChild(cocktailItem);
    });
}       