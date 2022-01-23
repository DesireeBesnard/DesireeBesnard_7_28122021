class availableTags {
    constructor(tag) {
        this._tag = tag
    }

    displayAvailableTag() {
        const $wrapper = document.createElement('li')
        $wrapper.classList.add("options")
        const link = document.createElement("a")
        link.setAttribute("href", "#")
        link.classList.add("options-text")
        link.innerHTML = this._tag
        $wrapper.appendChild(link)
    return $wrapper
    }
}