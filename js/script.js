const recipesContainer = document.querySelector(".recipes-container");

const input = "coco";
let results = [];
const searchValue = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ');

const mainSearch = searchValue => {

    let wToSearch = [];
    const toDelete = Object.entries({
        "apostrophe": ["c'", "d'", "j'", "l'", "m'", "n'", "t'"],
        "punctuation": [",", ";", ":"],
        "articles": ['a', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'est', 'la', 'le', 'les', 'par', 'pour', 'sans', 'sous', 'sur', 'un', 'une']
    });

    const inArray = (array, word) => {
        for (let i = 0; i < array.length; i++) {
            const searchWord = array[i];
            if (searchWord === word) {
                return true;
            } 
        }
        return false;
    };

    const gotPunct = word => {
        for (let i = 0; i < toDelete[1][1].length; i++) {
            const wToDelete = toDelete[1][1][i];
            if (inArray(word, wToDelete) === true) {
                return true;
            }  
        }
        return false;
    };
    
    // Remove all irrelevant words
    for (let index = 0; index < toDelete.length; index++) {
        let category = toDelete[index];
        let items = category[1];
    
        if (category[0] === "apostrophe") {
            for (let i = 0; i < items.length; i++) {
                const wToDelete = items[i];
    
                for (let j = 0; j < searchValue.length; j++) {
                    let word = searchValue[j];
    
                    if (inArray(word, "'") === true) {
                        for (let i = 0; i < toDelete[0][1].length; i++) {
    
                            const toModify = new RegExp(wToDelete);
    
                            if (toModify.test(word) === true) {
                                const modifWord = word.replace(wToDelete, "");
                                searchValue[j] = modifWord;
                            }
                        }
                    }
                }
    
            }
        } else if (category[0] === "punctuation") {
            for (let i = 0; i < items.length; i++) {
                const wToDelete = items[i];
    
                for (let j = 0; j < searchValue.length; j++) {
                    let word = searchValue[j];
    
                    if (gotPunct(word) === true) {
                        for (let i = 0; i < toDelete[1][1].length; i++) {
    
                            const toModify = new RegExp(wToDelete);
    
                            if (toModify.test(word) === true) {
                                const modifWord = word.replace(wToDelete, "");
    
                                searchValue[j] = modifWord;
                            }
                        }
                    }
                }
            }
        } else if (category[0] === "articles") {
            for (let i = 0; i < items.length; i++) {
                const wToDelete = items[i];
                
                for (let j = 0; j < searchValue.length; j++) {
                    let word = searchValue[j];
              
                    if ((inArray(toDelete[2][1], word) === false) && (inArray(wToSearch, word) === false) ) {
                        wToSearch[wToSearch.length] = word;
                    }
                }
            }
        } 
    }

    const findResults = (value) => {
        for (const recipe of recipes) {
    
            const regex = new RegExp(value);
    
            if ( (regex.test(recipe.name.toLowerCase()) === true) && (inArray(results, recipe) === false) ) {
                results[results.length] = recipe;
            }
    
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i].ingredient.toLowerCase();
    
                if ( (regex.test(ingredient) === true) && (inArray(results, recipe) === false)) {
                    results[results.length] = recipe;
                }
            }
    
            if ( (regex.test(recipe.description.toLowerCase()) === true) && (inArray(results, recipe) === false)) {
                results[results.length] = recipe;
            }
        }
    };
    
    for (let i = 0; i < wToSearch.length; i++) {
        const word = wToSearch[i];
    
        findResults(word);
    }

    console.log(results);

    // if (results.length !== 0) {
    //     recipesContainer.innerHTML = "";
    //     for (let i = 0; i < results.length; i++) {
    //         const recipe = results[i];
    //         const Template = new recipeCard(recipe);
    //         recipesContainer.appendChild(
    //             Template.createRecipeCard()
    //         );
    //     }
    // } else {
    //     recipesContainer.innerHTML = "Aucune recette ne correspond à votre critère…";
    // }
};

mainSearch(searchValue);




