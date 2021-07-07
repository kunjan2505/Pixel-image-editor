import { create } from "../Components/utitlities.js"

// Following class let the user pick color using color picker
class ColorSelect{
    constructor(state, { dispatch }){
        // we will create "input" dom element with type 'color' as propertity

        let type = "input"
        let change_handler = () => dispatch({color: this.input.value})
        let props = {type: "color", value: state.color, onchange: change_handler}

        this.input = create(type, props);
        this.dom = create("label", {}, "🎨 Color: ", this.input);
    }

    syncState(state){
        this.input.value = state.color
    }
}

export {ColorSelect}