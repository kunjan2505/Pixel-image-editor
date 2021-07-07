import { PictureCanvas } from "./picture_canvas.js"
import { create } from "./utitlities.js"

let Editor = class Editor{

    // state := object with different state elements
    // config := object with tools (array of drawing tool functions), controls and dispatch function which handles change in state
    constructor(state, config){
        this.state = state
        let {tools, controls, dispatch} = config

        // We want to crate PictureCanvas object inside editor. For that we need event handler which will handle mouse down event
        let handler = pos => {
            let tool = tools[this.state.tool]
            let on_move = tool(pos, this.state, dispatch) // tool function will return event handler if we are click and dragging

            // We will return move handler if we are click and dragging
            if(on_move){
                let move_handler = pos => on_move(pos, this.state)
                return move_handler
            }
        }
        
        this.canvas = new PictureCanvas(state.picture, handler)

        this.controls = controls.map(control => new control(state, config))

        // Now we will wrap canvas dom and control elements in a div
        let new_line = create("br")
        let controls_dom = this.controls.reduce((a, b) => a.concat(" ", b.dom), [])

        this.dom = create("div", {}, this.canvas.dom, new_line, ...controls_dom)
    }

    syncState(state){
        this.state = state
        this.canvas.syncState(state.picture)

        for(let control of this.controls)
            control.syncState(state)
    }
}

export {Editor}