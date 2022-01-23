class recipeCard {
    constructor(recipe) {
        this._recipe = recipe
        this.ingredientsList
    }

    createRecipeCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add("card", "rounded")
        const template = `
            <div class="imgContainer">
                <img src="assets/cocoLimonade.png" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <header class="row d-flex justify-content-between">
                    <h5 class="card-title">${this._recipe.name}</h5>
                    <div class="font-weight-bold"><span class="far fa-clock"></span>${this._recipe.time} min</div>
                </header>
                <div class="row">
                    <div class="col col-left">
                        <ul class="list-unstyled recipe-ingredients"></ul>
                    </div>
                    <div class="col col-right">
                        <p>${this._recipe.description}</p>
                    </div>
                </div>
            </div>
        `
        $wrapper.innerHTML = template
        return $wrapper
    }
}