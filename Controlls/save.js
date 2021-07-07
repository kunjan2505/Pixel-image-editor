import { create, draw_picture } from "../Components/utitlities.js"

var Save = class Save{
    constructor(state){
        // We will create an element of type button and register onclick handler on it

        this.picture = state.picture
        let type = "button"

        let handler = () => this.save()
        this.dom = create(type, {onclick: handler }, "💾 Save")
    }

    save(){
        let canvas = create("canvas")   // create an empty canvas
        draw_picture(this.picture, canvas, 10)

        let link_prop = {href: canvas.toDataURL(), download: "image.png"}
        let link = create("a", link_prop)

        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    syncState(state){
        this.picture = state.picture
    }
}

export {Save}