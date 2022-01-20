const input = "coco"
const searchValue = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ')
let results = []
let tagIngredients = []
let tagAppliances = []
let tagUstensils = []

const quickSort = array => {
    if (array.length <= 1) {
        return array
    }
    const pivot = array[array.length - 1]
    const leftArr = []
    const rightArr = []

    for(let i=0; i < array.length-1;i++){
        if(array[i] < pivot){
        leftArr.push(array[i])
        }
        else{
        rightArr.push(array[i])
        }
    }

    return [...quickSort(leftArr) ,pivot,...quickSort(rightArr)]
}


const availableIngredients = () => {
    let array
    if (results.length === 0) {
        array = recipes
    } else {
        array = results
    }

    let ingredients = []
    array.forEach(recipe => {
        recipe.ingredients.forEach( item => {
            const ingredient = item.ingredient.toLowerCase()
            if (! ingredients.includes(ingredient)) {
                ingredients.push(ingredient)
            }
        })
    })
    ingredients = quickSort(ingredients)
    console.log(ingredients)
}

const availableUstensils = () => {
    let array
    if (results.length === 0) {
        array = recipes
    } else {
        array = results
    }

    let ustensils = []
    array.forEach( recipe => {
        recipe.ustensils.forEach( item => {
            const ustensil = item.toLowerCase() 
            if (! ustensils.includes(ustensil)) {
                ustensils.push(ustensil) 
            }
        })
    })
    ustensils = quickSort(ustensils)
    console.log(ustensils)
}

const availableAppliances = () => {
    let array
    if (results.length === 0) {
        array = recipes
    } else {
        array = results
    }

    let appliances = []
    array.forEach( recipe => {
        const appliance = recipe.appliance.toLowerCase()
        if (! appliances.includes(appliance)) {
            appliances.push(appliance)
        }
    })
    appliances = quickSort(appliances)
    console.log(appliances)
}

const mainSearch = searchValue => {

    let wToSearch = []
    const toDelete = Object.entries({
        "apostrophe": ["c'", "d'", "j'", "l'", "m'", "n'", "t'"],
        "punctuation": [",", ";", ":"],
        "articles": ['a', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'est', 'la', 'le', 'les', 'par', 'pour', 'sans', 'sous', 'sur', 'un', 'une']
    })

    const inArray = (array, word) => {
        for (let i = 0; i < array.length; i++) {
            const searchWord = array[i]
            if (searchWord === word) {
                return true
            } 
        }
        return false
    }
    
    const gotPunct = word => {
        for (let i = 0; i < toDelete[1][1].length; i++) {
            const wToDelete = toDelete[1][1][i];
            if (inArray(word, wToDelete) === true) {
                return true
            }  
        }
        return false
    }
    
    // Remove all irrelevant words
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
    console.log(`Mots à rechercher`, wToSearch)

    // Linear search implementation
    const findResults = (value) => {
        for (const recipe of recipes) {
    
            const regex = new RegExp(value)
    
            if ( (regex.test(recipe.name.toLowerCase()) === true) && (inArray(results, recipe) === false) ) {
                results[results.length] = recipe
            }
    
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i].ingredient.toLowerCase()
    
                if ( (regex.test(ingredient) === true) && (inArray(results, recipe) === false)) {
                    results[results.length] = recipe
                }
            }
    
            if ( (regex.test(recipe.description.toLowerCase()) === true) && (inArray(results, recipe) === false)) {
                results[results.length] = recipe
            }
        }
    }
    
    for (let i = 0; i < wToSearch.length; i++) {
        const word = wToSearch[i]
    
        findResults(word)
    }

    console.log(results)
    availableIngredients()
    availableUstensils()
    availableAppliances()
}

mainSearch(searchValue)
// availableIngredients()
// availableUstensils()
// availableAppliances()

const selectIngredient = document.querySelector(".selectIngredient")
const dropDownIngredient = document.querySelector(".selectIngredient .dropdown")
const listIngredients = document.querySelector("#listIngredients")
const selectUstensil = document.querySelector(".selectUstensil")
const dropDownUstensils = document.querySelector(".selectUstensil .dropdown")
const listUstensils = document.querySelector("#listUstensils")
const selectAppliance = document.querySelector(".selectAppliance")
const dropDownAppliances = document.querySelector(".selectAppliance .dropdown")
const listAppliances = document.querySelector("#listAppliances")

const options = document.querySelectorAll(".options a")
const optionsText = document.querySelector(".options-text")

document.addEventListener("click", e => {

    if (e.target === selectIngredient) {
        listIngredients.classList.toggle("d-none")
        if (listIngredients.className === "d-none") {
            dropDownIngredient.style.transform = "rotate(0deg)"
        } else {
            dropDownIngredient.style.transform = "rotate(180deg)"
        }

    } else if (e.target === selectUstensil) {
        listUstensils.classList.toggle("d-none")
        if (listUstensils.className === "d-none") {
            dropDownUstensils.style.transform = "rotate(0deg)"
        } else {
            dropDownUstensils.style.transform = "rotate(180deg)"
        }
    } else if (e.target === selectAppliance) {
        listAppliances.classList.toggle("d-none")
        if (listAppliances.className === "d-none") {
            dropDownAppliances.style.transform = "rotate(0deg)"
        } else {
            dropDownAppliances.style.transform = "rotate(180deg)"
        }
    }
})