// const input = "Délice de citron à l'oignon au, gruyère et dés de lait de coco c'est lourd d'des"
const input = "coco"
const searchValue = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ')
// console.log(searchValue)

const toDelete = Object.entries({
    "apostrophe": ["c'", "d'", "j'", "l'", "m'", "n'", "t'"],
    "punctuation": [",", ";", ":"],
    "articles": ['a', 'au', 'aux', 'avec', 'dans', 'de', 'des', 'du', 'en', 'et', 'est', 'la', 'le', 'les', 'par', 'pour', 'sans', 'sous', 'sur', 'un', 'une']
})
let wToSearch = []

let results = []

const inArray = (array, word) => {
    for (let i = 0; i < array.length; i++) {
        const searchWord = array[i]
        if (searchWord === word) {
            return true
        } 
    }
    return false
}

const gotApostrophe = word => {
    for (let i = 0; i < toDelete[0][1].length; i++) {
        const apostrophe = toDelete[0][1][i];
        const regex = new RegExp(apostrophe);
        if (regex.test(word) === true) {
            console.log("gotApostrophe === true")
            return true
        }
    }
    console.log("gotApostrophe === false")
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

const findResults = (value) => {
    for (const recipe of recipes) {

        const regex = new RegExp(value)

        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i].ingredient.toLowerCase()

            if ( (regex.test(ingredient) === true) && (inArray(results, recipe) === false)) {
                results[results.length] = recipe
            }
        }

        if ( (regex.test(recipe.description.toLowerCase()) === true) && (inArray(results, recipe) === false)) {
            results[results.length] = recipe
        }

        for (let i = 0; i < recipe.ustensils.length; i++) {
            const ustensil = recipe.ustensils[i].toLowerCase()

            if ( (regex.test(ustensil.toLowerCase()) === true) && (inArray(results, recipe) === false) ) {
                results[results.length] = recipe
            }
        }
    }
}

console.log(wToSearch)

for (let i = 0; i < wToSearch.length; i++) {
    const word = wToSearch[i]

    findResults(word)
}

console.log(results)








// Need to sort the array before searching
// sort algorithms
const testArray = ["sonnaille", "nature", "lait", "trémie", "magasin", "glycocolle", "lait de vache", "somnambule", "cocotte", "sierra", "torpille", "verser", "ronger", "cocotier", "genou", "douze", "mouette", "stop", "entrepôt", "coco", "antiacide", "tapisserie", "lait de coco", "terrasses" , "astronome", "commissaire", "cocon", "poker"]

// bubble sort implementation / a proscrire
const bubbleSort = (array) => {

    const arr = array.slice()
    let swap = false

    while (!swap) {
        swap = true
        for (let i = 0; i < arr.length -1; i++ ) {
            if (arr[i] > arr[i+1]) {
               swap = false
               let tmp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = tmp
                // [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
            }
        } 
    }
    return arr
}

// selection sort implementation / Plutôt sur petits tableau mais tri par insertion préférable
const selectionSort = (array) => {

    const arr = [...array]

    for (let i = 0; i < arr.length; i++) {
        let lowest = i

        for (let j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j
            }
        }

        if (lowest !== i) {
            [arr[i], arr[lowest]] = [arr[lowest], arr[i]]
        }
    }

    return arr
}

// insertion sort implementation / tri de données en temps réel + petits tableaux + tableaux presque triés / Pas pour les grands tableaux non triés

const insertionSort = (array) => {

    const arr = [...array]

    for (let i = 1; i < arr.length; i++) {
      let currentValue = arr[i]
      let j
      for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
        arr[j + 1] = arr[j]
      }
      arr[j + 1] = currentValue
    }
    return arr
}

const mergeSort = (array) => {

    const arr = [...array]

    const merge = (left, right) => {
        let sortedArray = []
    
        while (left.length && right.length) {
            // Insert the smallest item into sortedArr
            if (left[0] < right[0]) {
              sortedArray.push(left.shift())
            } else {
              sortedArray.push(right.shift())
            }
        }
    
        return [...sortedArray, ...left, ...right]
    }

    if (arr.length <= 1) {
        return arr
    }

    let mid = Math.floor(arr.length / 2)
    // Recursive calls
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

const quickSort = (array) => {
    
    const arr = [...array]
    const pivot = arr[arr.length -1]
    const leftArr = []
    const rightArr = []

    if (arr.length === 1) {
        return arr
    }

    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) {
            leftArr.push(array[i])
        } else {
            rightArr.push(array[i])
        }
    }

    if (leftArr.length > 0 && rightArr.length > 0) {
        return [...quickSort(leftArr), ...[pivot], ...quickSort(rightArr)]
    } else if (leftArr.length > 0) {
        return [...quickSort(leftArr), ...[pivot]]
    } else {
        return [...[pivot], ...quickSort(rightArr)]
    }
}

// console.log(testArray) 
// console.log(bubbleSort(testArray))
// console.log(selectionSort(testArray))
// console.log(insertionSort(testArray))
// console.log(mergeSort(testArray))
// console.log(quickSort(testArray))


function binarySearch(arr, target) {
    let start = 0
    let end = arr.length - 1
    const results = []
     
    while (start <= end) {
      let middle = Math.floor((start + end) / 2)
      if (arr[middle] < target) {
        // Search the right half
        start = middle + 1
      } else if (arr[middle] > target) {
        // Search the left half
        end = middle - 1
      } else if (arr[middle] === target) {
        // Found target
        return middle
      }
    }
    // Target not found
    return -1
}