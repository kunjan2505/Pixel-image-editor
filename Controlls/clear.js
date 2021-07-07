import { Picture } from "../Components/Picture.js"
import { create } from "../Components/utitlities.js"

class Clear{
    constructor(state, { dispatch }){
        // We will create a button that will clear the editor screen when clicked

        let type = "button"
        let handler = event => {
            dispatch({picture: Picture.empty(65, 150, "#f0f0f0")})
        }

        this.dom = create(type, {onclick: handler}, "Clear all")
    }
    
    syncState(){

    }
}

export {Clear}