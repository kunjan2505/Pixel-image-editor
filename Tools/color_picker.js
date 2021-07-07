
// Following function pick color at cuurent mouse position
let pick = (pos, state, dispatch) => {
    dispatch({color: state.picture.get_pixel(pos.x, pos.y)})
}

export {pick}