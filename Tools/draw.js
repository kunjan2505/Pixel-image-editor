
let draw = (pos, state, dispatch) => {
    
    // Following function dispatch an action to draw a single pixel
    let draw_pixel = ({x, y}, state) => {
        let drawn = [{x, y, color: state.color}]
        dispatch({picture: state.picture.draw(drawn)})
    }
    
    draw_pixel(pos, state)      // Calling above function to draw pixel at pos
    return draw_pixel           // returning draw_pixel so that user can continuosly draw by drag and drop
}

export {draw}