
let filled_rectangle = (start, state, dispatch) => {

    // In following function we are not taking state as an argument because we don't want to crate multiple rectangles while dragging
    let draw_rect = pos => {
        // calculating top left and bottom right co-ordinated of rectangle
        let start_x = Math.min(pos.x, start.x)
        let start_y = Math.min(pos.y, start.y)
        let end_x = Math.max(pos.x, start.x)
        let end_y = Math.max(pos.y, start.y)
        let drawn = []

        for(let y = start_y; y <= end_y; ++y){
            for(let x = start_x; x <= end_x; ++x){
                drawn.push({x, y, color: state.color})
            }
        }

        dispatch({picture: state.picture.draw(drawn)})
    }

    draw_rect(start);
    return draw_rect;
}

export {filled_rectangle}