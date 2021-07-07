import { create, scale, left_click, draw_picture, get_position } from "./utitlities.js"

 var PictureCanvas = class PictureCanvas{

    // picture := object of Picture class
    // event_handler := function that handles mousedown event
    constructor(picture, event_handler){
        let handler = {onmousedown: event => this.mouse(event, event_handler)}
        let type = "canvas"
        this.dom = create(type, handler)
        this.syncState(picture)
    }

    // Following method syncs the state of object when picture is modifoied 
    syncState(picture){
        if(this.picture == picture) return
        this.picture = picture

        draw_picture(this.picture, this.dom, scale)
    }
    
}

PictureCanvas.prototype.mouse = function(down_event, down_event_handler) {
    if(down_event.button != left_click)
        return

    let pos = get_position(down_event, this.dom, scale)
    let on_move = down_event_handler(pos);          // down_event_handler will return a move event handler function if we are click and dragging

    if(!on_move)
        return
    
    // Now we will create move handler for PictureCanvas which will invoke the above on_move function when we click and drag with new position
    // When we stop click-and-drag, we will remove move handler
    let move = move_event => {
        if(move_event.buttons == 0)                             // Check if we are pressing any mouse button
            this.dom.removeEventListener("mousemove", move)

        else{
            let new_pos = get_position(move_event, this.dom, scale)

            // Check if we have stopped moving
            if(new_pos.x == pos.x && new_pos.y == pos.y)
                return

            pos = new_pos
            on_move(pos)
        }
    }

    this.dom.addEventListener("mousemove", move)
} 

export { PictureCanvas };