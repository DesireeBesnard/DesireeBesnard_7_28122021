const input = "coco l'"
const searchValue = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ')
console.log(searchValue)

const toDelete = Object.entries({
    "articles": ['a', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'la', 'le', 'les', 'par', 'pour', 'sans', 'sous', 'sur', 'un', 'une '],
    "apostrophe": ["c'", "d'", "j'", "l'", "m'", "n'", "t'"],
    "punctuation": [",", ";", ":"]
})

let results = []




// Remove all irrelevant words
toDelete.forEach((array) => {

    if (array[0] === "articles") {
        array[1].forEach((wToDelete) => {
            searchValue.forEach( word => {
                if ((word === wToDelete)) {
                    searchValue.splice(searchValue.indexOf(word), 1) 
                }
            })
        })
    } else if (array[0] === "apostrophe") {
        array[1].forEach((wToDelete) => {
            searchValue.forEach( word => {
                if (word === wToDelete) {
                    searchValue.splice(searchValue.indexOf(word), 1) 
                } else if (word.includes(wToDelete)) {
                    searchValue[searchValue.indexOf(word)] = word.replace(`${wToDelete}`, '')
                } 
            })
        }) 
    } else {
        array[1].forEach((wToDelete) => {
            searchValue.forEach( word => {
                if (word === wToDelete) {
                    searchValue.splice(searchValue.indexOf(word), 1) 
                } else {
                    searchValue[searchValue.indexOf(word)] = word.replace(`${wToDelete}`, '')
                }
            })
        })
    }
})
console.log(`Mots à rechercher`, searchValue)


// Linear search implementation
const findResults = (value) => {

    let result = recipes.filter( recipe => {
        
        return (
            recipe.ingredients.some( item => {
                item.ingredient.toLowerCase().includes(value)
            })  || 
            recipe.description.toLowerCase().includes(value) || 
            recipe.ustensils.some( item => {
                item.toLowerCase().includes(value)
            })
        )
    })

    return result
}

const tmpResults = searchValue.map(value => {
    let result = findResults(value)
    return result
})

// flat array and remove duplicates recipes
results = [...new Set(tmpResults.flat())]
console.log(results)
