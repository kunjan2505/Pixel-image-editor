import { create } from "../Components/utitlities.js"

// Following class provide functionality to revert changes in state of editor
class Undo{
    constructor(state, { dispatch }){
        // We will create an element of type button and register onclick handler on it

        let type = "button"
        let handler = () => dispatch({undo: true})
        let props = {onclick: handler, disabled: state.done.length == 0}

        this.dom = create(type, props, "⮪ Undo")
    }

    syncState(state){
        this.dom.disabled = state.done.length == 0
    }
}

export {Undo}
