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