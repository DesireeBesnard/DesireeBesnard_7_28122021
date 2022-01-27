class availableTags {
    constructor(tag) {
        this._tag = tag
    }

    displayAvailableIngredient() {
        const $wrapper = document.createElement('li')
        $wrapper.classList.add("options")
        const link = document.createElement("a")
        link.setAttribute("href", "#")
        link.setAttribute("category", "ingredient")
        link.classList.add("options-text")
        link.innerHTML = this._tag
        $wrapper.appendChild(link)
    return $wrapper
    }

    displayAvailableUstensil() {
        const $wrapper = document.createElement('li')
        $wrapper.classList.add("options")
        const link = document.createElement("a")
        link.setAttribute("href", "#")
        link.setAttribute("category", "ustensil")
        link.classList.add("options-text")
        link.innerHTML = this._tag
        $wrapper.appendChild(link)
    return $wrapper
    }

    displayAvailableAppliances() {
        const $wrapper = document.createElement('li')
        $wrapper.classList.add("options")
        const link = document.createElement("a")
        link.setAttribute("href", "#")
        link.setAttribute("category", "appliance")
        link.classList.add("options-text")
        link.innerHTML = this._tag
        $wrapper.appendChild(link)
    return $wrapper
    }
}