class SelectedTags {
    constructor (tag) {
        this._tag = tag
    }

    displaySelectedTag() {
        const $wrapper = document.createElement("span")
        $wrapper.innerHTML = this._tag
        
        return $wrapper
    }

} 