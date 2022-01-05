const toDelete = {
    "articles": ['a', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'la', 'le', 'les', 'par', 'pour', 'sans', 'sous', 'sur', 'un', 'une '],
    "apostrophe": ["c'", "d'", "j'", "l'", "m'", "n'", "t'"]
}
const results = []
const input = "tarte à l'oursin d'eau et lait de coco sur Crème brûlée"

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

console.log(input)
console.log(searchValue)


// Linear search implementation
const linearSearch = (array, value) => {
    for (let item of array) {
        if (item.includes(value)) {
            results.push(item)
        }
    }
    console.log(`J'ai ${results.length} résultats`)
    console.log(results)
    return results
}
