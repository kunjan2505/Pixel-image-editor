
let fill = ({x, y}, state, dispatch) => {
    let target = state.picture.get_pixel(x, y)
    let drawn = [{x, y, color: state.color}]

    const directions = [{dx: -1, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1}]

    // Following algorithm finds continous area with same color so that we can fill them with new color
    for(let done = 0; done < drawn.length; ++done){
        for(let {dx, dy} of directions){
            let new_x = drawn[done].x + dx
            let new_y = drawn[done].y + dy

            if(new_x >= 0 && new_x < state.picture.width && 
               new_y >= 0 && new_y < state.picture.height &&
               state.picture.get_pixel(new_x, new_y) == target &&
               !drawn.some(prop => prop.x == new_x && prop.y == new_y)){
                    drawn.push({x: new_x, y: new_y, color: state.color})
            }
        }
    }

    dispatch({picture: state.picture.draw(drawn)})
}

export{fill}