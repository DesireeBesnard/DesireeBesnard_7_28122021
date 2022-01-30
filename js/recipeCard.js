class recipeCard {
    constructor(recipe) {
        this._recipe = recipe
        this.ingredientsList
    }

    createRecipeCard() {

        const list = document.createElement("ul")
        list.classList.add("list-unstyled", "recipe-ingredients")
        for (let i = 0; i < this._recipe.ingredients.length; i++) {
            const ingredient = this._recipe.ingredients[i].ingredient
            const node = document.createElement("li")
            node.innerHTML = ingredient
            list.appendChild(node)
        }

        const colLeft = document.createElement("div")
        colLeft.classList.add("col", "col-left")
        colLeft.appendChild(list)

        const colRight = `
            <div class="col col-right">
                <p>${this._recipe.description}</p>
            </div>
        `

        const description = document.createElement("div")
        description.classList.add("row", "description")
        description.append(colLeft)
        description.innerHTML += colRight

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        cardBody.innerHTML = `
            <header class="row d-flex justify-content-between">
                <h5 class="card-title">${this._recipe.name}</h5>
                <div class="font-weight-bold">
                    <span class="far fa-clock"></span> ${this._recipe.time} min
                </div>
            </header>
        `
        cardBody.appendChild(description)


        const $wrapper = document.createElement('div')
        $wrapper.classList.add("card", "rounded")
        const template = `
            <div class="imgContainer">
                <img src="assets/cocoLimonade.png" class="card-img-top" alt="">
            </div>
        `


        $wrapper.innerHTML = template
        $wrapper.appendChild(cardBody)
        return $wrapper
    }
}