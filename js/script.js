const searchInput = document.querySelector(".search")
const searchButton = document.querySelector(".fas .fa-search")

const selectedIngredients = document.querySelector(".selected_ingredients")
const ingredientsInput = document.querySelector("#ingredientsInput")
const selectIngredient = document.querySelector(".selectIngredient")
const dropDownIngredient = document.querySelector(".selectIngredient .dropdown")
const listIngredients = document.querySelector("#listIngredients")

const selectedUstensils = document.querySelector(".selected-ustensils")
const ustensilsInput = document.querySelector("#ustensilsInput")
const selectUstensil = document.querySelector(".selectUstensil")
const dropDownUstensils = document.querySelector(".selectUstensil .dropdown")
const listUstensils = document.querySelector("#listUstensils")

const selectedAppliances = document.querySelector(".selected-appliances")
const appliancesInput = document.querySelector("#appliancesInput")
const selectAppliance = document.querySelector(".selectAppliance")
const dropDownAppliances = document.querySelector(".selectAppliance .dropdown")
const listAppliances = document.querySelector("#listAppliances")

const recipesContainer = document.querySelector(".recipes-container")

let results = []
let ingredients = []
let ustensils = []
let appliances = []
let tagIngredients = []
let tagUstensils = []
let tagAppliances = []


// put every field needed in lowercase
for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    recipe.name = recipe.name.toLowerCase()
    for (let i = 0; i < recipe.ingredients.length; i++) {
        recipe.ingredients[i].ingredient = recipe.ingredients[i].ingredient.toLowerCase()
    }
    recipe.description = recipe.description.toLowerCase()
    for (let i = 0; i < recipe.ustensils.length; i++) {
        recipe.ustensils[i] = recipe.ustensils[i].toLowerCase()
    }
    for (let i = 0; i < recipe.appliance.length; i++) {
        recipe.appliance[i] = recipe.appliance[i].toLowerCase()
    }
}


// helper functions 

// check if an item is in the array 
const inArray = (array, word) => {
    for (let i = 0; i < array.length; i++) {
        const searchWord = array[i]
        if (searchWord === word) {
            return true
        } 
    }
    return false
}

// sort available tags 
const quickSort = array => {
    if (array.length <= 1) {
        return array
    }
    const pivot = array[array.length - 1]
    const leftArr = []
    const rightArr = []

    for(let i=0; i < array.length-1;i++){
        if(array[i] < pivot){
            leftArr[leftArr.length] = array[i]
        }
        else{
            rightArr[rightArr.length] = array[i]
        }
    }

    return [...quickSort(leftArr), pivot,...quickSort(rightArr)]
}

// available tags 
const availableIngredients = () => {

    const regex = new RegExp(ingredientsInput.value)

    let array
    if ((results.length === 0) || (searchInput.value.length === 0)) {
        array = recipes
    } else {
        array = results
    }

    ingredients = []

    for (let i = 0; i < array.length; i++) {
        const recipe = array[i]

        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i].ingredient
            if ((inArray(ingredients, ingredient) === false) && (inArray(tagIngredients, ingredient) === false)) {
                ingredients[ingredients.length] = ingredient
            }  
        }
    }
    ingredients = quickSort(ingredients)


    listIngredients.innerHTML = ""

    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i]

        if (regex.test(ingredient) === true) {
            const Template = new availableTags(ingredient)
            listIngredients.appendChild(Template.displayAvailableIngredient())
        }
    }
}

// available tags 
const availableUstensils = () => {
    const regex = new RegExp(ustensilsInput.value)

    let array
    if ((results.length === 0) || (searchInput.value.length === 0)) {
        array = recipes
    } else {
        array = results
    }

    ustensils = []

    for (let i = 0; i < array.length; i++) {
        const recipe = array[i]
        for (let i = 0; i < recipe.ustensils.length; i++) {
            const ustensil = recipe.ustensils[i]
            if ((inArray(ustensils, ustensil) === false) && (inArray(tagUstensils, ustensil) === false)) {
                ustensils[ustensils.length] = ustensil
            }
        } 
    }
    ustensils = quickSort(ustensils)


    listUstensils.innerHTML = ""

    for (let i = 0; i < ustensils.length; i++) {
        const ustensil = ustensils[i]

        if (regex.test(ustensil) === true) {
            const Template = new availableTags(ustensil)
            listUstensils.appendChild(Template.displayAvailableUstensil())
        }
    }
}

// display available tags 
const availableAppliances = () => {
    const regex = new RegExp(appliancesInput.value)

    let array
    if ((results.length === 0) || (searchInput.value.length === 0)) {
        array = recipes
    } else {
        array = results
    }

    appliances = []

    for (let i = 0; i < array.length; i++) {
        const recipe = array[i];

        for (let i = 0; i < recipe.appliance.length; i++) {
            const appliance = recipe.appliance[i]
            if ((inArray(appliances, appliance) === false) && (inArray(tagAppliances, appliance) === false)) {
                appliances[appliances.length] = appliance
            }
        }  
    }
    appliances = quickSort(appliances)


    listAppliances.innerHTML = ""

    for (let i = 0; i < appliances.length; i++) {
        const appliance = appliances[i]

        if (regex.test(appliance) === true ) {
            const Template = new availableTags(appliance)
            listAppliances.appendChild(Template.displayAvailableAppliances())
        }
    }
}
// helper functions end


// main functions

// displays recipes resulting from the main search 
const mainSearch = searchValue => {

    // reset arrays and html 
    tagIngredients = []
    tagUstensils = []
    tagAppliances = []
    selectedIngredients.innerHTML = ""
    selectedUstensils.innerHTML = ""
    selectedAppliances.innerHTML = ""
    let wToSearch = []


    const toDelete = Object.entries({
        "apostrophe": ["c'", "d'", "j'", "l'", "m'", "n'", "t'"],
        "punctuation": [",", ";", ":"],
        "articles": ['a', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'est', 'la', 'le', 'les', 'par', 'pour', 'sans', 'sous', 'sur', 'un', 'une']
    })
    
    const gotPunct = word => {
        for (let i = 0; i < toDelete[1][1].length; i++) {
            const wToDelete = toDelete[1][1][i];
            if (inArray(word, wToDelete) === true) {
                return true
            }  
        }
        return false
    }

    // Remove all irrelevant words or apostrophe
    for (let index = 0; index < toDelete.length; index++) {
        let category = toDelete[index]
        let items = category[1]
    
        if (category[0] === "apostrophe") {
            for (let i = 0; i < items.length; i++) {
                const wToDelete = items[i]
    
                for (let j = 0; j < searchValue.length; j++) {
                    let word = searchValue[j]
    
                    if (inArray(word, "'") === true) {
                        for (let i = 0; i < toDelete[0][1].length; i++) {
    
                            const toModify = new RegExp(wToDelete)
    
                            if (toModify.test(word) === true) {
                                const modifWord = word.replace(wToDelete, "")
                                searchValue[j] = modifWord
                            }
                        }
                    }
                }
    
            }
        } else if (category[0] === "punctuation") {
            for (let i = 0; i < items.length; i++) {
                const wToDelete = items[i]
    
                for (let j = 0; j < searchValue.length; j++) {
                    let word = searchValue[j]
    
                    if (gotPunct(word) === true) {
                        for (let i = 0; i < toDelete[1][1].length; i++) {
    
                            const toModify = new RegExp(wToDelete)
    
                            if (toModify.test(word) === true) {
                                const modifWord = word.replace(wToDelete, "")
    
                                searchValue[j] = modifWord
                            }
                        }
                    }
                }
            }
        } else if (category[0] === "articles") {
            for (let i = 0; i < items.length; i++) {
                const wToDelete = items[i]
                
                for (let j = 0; j < searchValue.length; j++) {
                    let word = searchValue[j]
              
                    if ((inArray(toDelete[2][1], word) === false) && (inArray(wToSearch, word) === false) ) {
                        wToSearch[wToSearch.length] = word
                    }
                }
            }
        } 
    }


    // Linear search algorithm implementation
    const findResults = (value) => {
        results.length = 0
        for (const recipe of recipes) {
    
            const regex = new RegExp(value)
    
            if ( (regex.test(recipe.name) === true) && (inArray(results, recipe) === false) ) {
                results[results.length] = recipe
            }
    
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i].ingredient
    
                if ( (regex.test(ingredient) === true) && (inArray(results, recipe) === false)) {
                    results[results.length] = recipe
                }
            }
    
            if ( (regex.test(recipe.description) === true) && (inArray(results, recipe) === false)) {
                results[results.length] = recipe
            }
        }
    }
    
    // iterate over each search word
    for (let i = 0; i < wToSearch.length; i++) {
        const word = wToSearch[i]
        findResults(word)
    }

    if (results.length !== 0) {
        recipesContainer.innerHTML = ""
        for (let i = 0; i < results.length; i++) {
            const recipe = results[i]
            const Template = new recipeCard(recipe)
            recipesContainer.appendChild(
                Template.createRecipeCard()
            )
        }
    } else {
        recipesContainer.innerHTML = "Aucune recette ne correspond à votre critère…"
    }
}


const searchByTag = () => {

    recipesContainer.innerHTML = ""
    const newResults = []

    // if a main search has been done before iterate on the results otherwise on recipes array
    let array
    if ((results.length === 0) && (searchInput.value.length === 0)) {
        array = recipes
    } else {
        array = results
    }

    for (const recipe of array) {

        let gotAllIngredients = true
        let gotAllUstensils = true
        let gotAllAppliances = true

        const recipeIngredients = []
        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i].ingredient
            recipeIngredients[recipeIngredients.length] = ingredient
        }

        for (let i = 0; i < tagIngredients.length; i++) {
            const tagIngredient = tagIngredients[i]

            if (inArray(recipeIngredients, tagIngredient) === false) {
                gotAllIngredients = false
            }
        }

        for (let i = 0; i < tagUstensils.length; i++) {
            const tagUstensil = tagUstensils[i]

            if (inArray(recipe.ustensils, tagUstensil) === false) {
                gotAllUstensils = false
            }
        }

        for (let i = 0; i < tagAppliances.length; i++) {
            const tagAppliance = tagAppliances[i]
            if (inArray(recipe.appliance, tagAppliance) === false) {
                gotAllAppliances = false
            }
        }

        if ((gotAllIngredients === true) && (gotAllUstensils === true) && (gotAllAppliances === true)) {
            newResults[newResults.length] = recipe
        }
    }
    
    if (newResults.length === 0) {

        if ((tagIngredients.length !== 0) || (tagUstensils.length !== 0) || (tagAppliances.length !== 0)) {
            recipesContainer.innerHTML = "Aucune recette ne correspond à votre critère…"
        }
    } else {
        for (let i = 0; i < newResults.length; i++) {
            const recipe = newResults[i]
            const Template = new recipeCard(recipe)
            recipesContainer.appendChild(
                Template.createRecipeCard()
            )
        }
    }
}
// main functions end


// event handlers 

searchInput.addEventListener("input", () => {
    if (searchInput.value.length === 0) {
        if ((selectedIngredients.innerHTML === "") && (selectedUstensils.innerHTML === "") && (selectedAppliances.innerHTML === "")) {
            results = []
            recipesContainer.innerHTML = ""
            availableIngredients()
            availableUstensils()
            availableAppliances()
        } else if ((selectedIngredients.innerHTML !== "") || (selectedUstensils.innerHTML !== "") || (selectedAppliances.innerHTML !== "")) {
            results = []
            recipesContainer.innerHTML = ""
            searchByTag()
            availableIngredients()
            availableUstensils()
            availableAppliances()
        }
    } else {
        if (searchInput.value.length > 2) {
            const searchValue = searchInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ')
            mainSearch(searchValue)
        }
    }
})

searchInput.addEventListener("search", () => {
    if (searchInput.value.length > 2) {
        const searchValue = searchInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ')
        mainSearch(searchValue)
    }
})

ingredientsInput.addEventListener("input", () => {
    availableIngredients()
})

ustensilsInput.addEventListener("input", () => {
    availableUstensils()
})

appliancesInput.addEventListener("input", () => {
    availableAppliances()
})

document.addEventListener("click", e => {

    // if click on the a magnifying glass's input field 
    if (e.target.className === "fas fa-search") {
        if (searchInput.value.length > 2) {
            const searchValue = searchInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ')
            mainSearch(searchValue)
        }
    }

    if (e.target === selectIngredient) {
        listIngredients.classList.toggle("d-none")
        if (listIngredients.className === "d-none") {
            dropDownIngredient.style.transform = "rotate(0deg)"
            ingredientsInput.placeholder = "Ingrédient"
            ingredientsInput.style.borderRadius = "5px"
        } else {
            dropDownIngredient.style.transform = "rotate(180deg)"
            ingredientsInput.placeholder = "Rechercher un ingrédient"
            ingredientsInput.style.borderRadius = "5px 5px 0 0"
        }
        availableIngredients()

    } else if (e.target.getAttribute("category") === "ingredient") {
        selectedIngredients.innerHTML = ""
        ingredientsInput.value = "" 

        if (inArray(tagIngredients, e.target.innerHTML) === false) {
            tagIngredients[tagIngredients.length] = e.target.innerHTML
            availableIngredients()
            for (let i = 0; i < tagIngredients.length; i++) {
                const tagIngredient = tagIngredients[i]
                const selectedIngredient = new SelectedTags(tagIngredient).displaySelectedTag()
                selectedIngredient.classList.add("selected-ingredient","far","fa-times-circle", "mr-3")
                selectedIngredients.appendChild(selectedIngredient)
            }
        }
        searchByTag()

    } else if (e.target.classList.contains("selected-ingredient")) {

        if (searchInput.value.length === 0) {
            if ((selectedIngredients.innerHTML === "") && (selectedUstensils.innerHTML === "") && (selectedAppliances.innerHTML === "")) {
                recipesContainer.innerHTML = ""
            }
        }

        selectedIngredients.innerHTML = ""
        const newTagIngredients = []
        for (let i = 0; i < tagIngredients.length; i++) {
            const tagIngredient = tagIngredients[i]
            if (tagIngredient !== e.target.innerHTML) {
                newTagIngredients[newTagIngredients.length] = tagIngredient
            }
        }
        tagIngredients = newTagIngredients
        for (let i = 0; i < tagIngredients.length; i++) {
            const tagIngredient = tagIngredients[i]
            const selectedIngredient = new SelectedTags(tagIngredient).displaySelectedTag()
            selectedIngredient.classList.add("selected-ingredient","far","fa-times-circle", "mr-3")
            selectedIngredients.appendChild(selectedIngredient)
        }
        searchByTag()
        availableIngredients()


    } else if (e.target === selectUstensil) {
        listUstensils.classList.toggle("d-none")
        if (listUstensils.className === "d-none") {
            dropDownUstensils.style.transform = "rotate(0deg)"
            ustensilsInput.placeholder = "Ustensils"
            ustensilsInput.style.borderRadius = "5px"
        } else {
            availableUstensils()
            dropDownUstensils.style.transform = "rotate(180deg)"
            ustensilsInput.placeholder = "Rechercher un ustensil"
            ustensilsInput.style.borderRadius = "5px 5px 0 0"
        }

    }  else if (e.target.getAttribute("category") === "ustensil") {
        selectedUstensils.innerHTML = ""

        if (inArray(tagUstensils, e.target.innerHTML) === false) {
            tagUstensils[tagUstensils.length] = e.target.innerHTML
            availableUstensils()
            for (let i = 0; i < tagUstensils.length; i++) {
                const tagUstensil = tagUstensils[i]
                const selectedUstensil = new SelectedTags(tagUstensil).displaySelectedTag()
                selectedUstensil.classList.add("selected-ustensil","far","fa-times-circle", "mr-3")
                selectedUstensils.appendChild(selectedUstensil)
            }
        }
        searchByTag()

    } else if (e.target.classList.contains("selected-ustensil")) {
        selectedUstensils.innerHTML = ""
        const newTagUstensils = []
        for (let i = 0; i < tagUstensils.length; i++) {
            const tagUstensil = tagUstensils[i]
            if (tagUstensil !== e.target.innerHTML) {
                newTagUstensils[newTagUstensils.length] = tagUstensil
            }
        }
        tagUstensils = newTagUstensils
        for (let i = 0; i < tagUstensils.length; i++) {
            const tagUstensil = tagUstensils[i]
            const selectedUstensil = new SelectedTags(tagUstensil).displaySelectedTag()
            selectedUstensil.classList.add("selected-ustensil","far","fa-times-circle", "mr-3")
            selectedUstensils.appendChild(selectedUstensil)
        }
        searchByTag()
        availableUstensils()

        if (searchInput.value.length === 0) {
            if ((selectedIngredients.innerHTML === "") && (selectedUstensils.innerHTML === "") && (selectedAppliances.innerHTML === "")) {
                recipesContainer.innerHTML = ""
            }
        }

    } else if (e.target === selectAppliance) {
        listAppliances.classList.toggle("d-none")
        if (listAppliances.className === "d-none") {
            dropDownAppliances.style.transform = "rotate(0deg)"
            appliancesInput.placeholder = "Appareils"
            appliancesInput.style.borderRadius = "5px"
        } else {
            availableAppliances()
            dropDownAppliances.style.transform = "rotate(180deg)"
            appliancesInput.placeholder = "Rechercher un appareil"
            appliancesInput.style.borderRadius = "5px 5px 0 0"
        }

    } else if (e.target.getAttribute("category") === "appliance") {
        selectedAppliances.innerHTML = ""

        if (inArray(tagAppliances, e.target.innerHTML) === false) {
            tagAppliances[tagAppliances.length] = e.target.innerHTML
            availableAppliances()
            for (let i = 0; i < tagAppliances.length; i++) {
                const tagAppliance = tagAppliances[i]
                const selectedAppliance = new SelectedTags(tagAppliance).displaySelectedTag()
                selectedAppliance.classList.add("selected-appliance","far","fa-times-circle", "mr-3")
                selectedAppliances.appendChild(selectedAppliance)
                
            }
        }
        searchByTag()

    } else if (e.target.classList.contains("selected-appliance")) {
        selectedAppliances.innerHTML = ""
        const newTagAppliances = []
        for (let i = 0; i < tagAppliances.length; i++) {
            const tagAppliance = tagAppliances[i]
            if (tagAppliance !== e.target.innerHTML) {
                newTagAppliances[newTagAppliances.length] = tagAppliance
            }
        }
        tagAppliances = newTagAppliances
        for (let i = 0; i < tagAppliances.length; i++) {
            const tagAppliance = tagAppliances[i]
            const selectedAppliance = new SelectedTags(tagAppliance).displaySelectedTag()
            selectedAppliance.classList.add("selected-appliance","far","fa-times-circle", "mr-3")
            selectedAppliances.appendChild(selectedAppliance)
        }
        searchByTag()
        availableAppliances()

        if (searchInput.value.length === 0) {
            if ((selectedIngredients.innerHTML === "") && (selectedUstensils.innerHTML === "") && (selectedAppliances.innerHTML === "")) {
                recipesContainer.innerHTML = ""
            }
        }
    }
})