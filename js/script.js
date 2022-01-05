const toDelete = {
    "articles": ['a', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'la', 'le', 'les', 'par', 'pour', 'sans', 'sous', 'sur', 'un', 'une '],
    "apostrophe": ["c'", "d'", "j'", "l'", "m'", "n'", "t'"]
}
let results = []
const input = "Poisson au gruyère la coco et au citron"

// Remove all irrelevant words

const searchValue = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ')

Object.entries(toDelete).forEach((array) => {

    if (array[0] === "articles") {
        array[1].forEach((wToDelete) => {
            searchValue.forEach( word => {
                if (word.includes(wToDelete) && (word === wToDelete)) {
                    searchValue.splice(searchValue.indexOf(word), 1) 
                }
            })
        })
    } else {
        array[1].forEach((wToDelete) => {
            searchValue.forEach( word => {
                if (word.includes(wToDelete)) {
                    searchValue[searchValue.indexOf(word)] = word.replace(`${wToDelete}`, '')
                }
            })
        }) 
    }
})


// Linear search implementation

const testFunction = (value) => {

    results = recipes.filter( (recipe) => {
        
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

    return results
}

console.log(input)
console.log(searchValue)
console.log(searchValue.map(value => testFunction(value)))



