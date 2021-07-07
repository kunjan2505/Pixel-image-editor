// Following method create html element <type> and assign properties to it and append children to it
// type := type of html element
// props := object of properties
// ...children := rest arguments which will be appended as children of our html element 
let create = (type, props, ...children) => {
    let dom = document.createElement(type)
    if(props) Object.assign(dom, props)
    
    for(let child of children)
        dom.appendChild(typeof child == "string" ? document.createTextNode(child) : child)

    return dom
}

// Scale of image
// We will multiply each pixcel by this scale
const scale = 7

// button id of left click
const left_click = 0

// Following method actually draw picture on screen.
// picture := object of class Picture
// canvas := element of type "canvas"
// scale := scale of picture
let draw_picture = (picture, canvas, scale) => {
    canvas.width = picture.width * scale
    canvas.height = picture.height * scale

    let cx = canvas.getContext("2d")

    for(let y = 0; y < picture.height; ++y){
        for(let x = 0; x < picture.width; ++x){
            cx.fillStyle = picture.get_pixel(x, y)             // Assign color to rectangle
            cx.fillRect(x * scale, y * scale, scale, scale)     // crate picture by filling rectangle with color
        }
    }
}

// Following method returns position of mouse pointer relative to the dom
// pos := mouse pointer event
// dom := element relative to which we want mouse position
// scale := scale of element
let get_position = (pos, dom, scale) => {
    let rect = dom.getBoundingClientRect()
    
    let dom_x = rect.left
    let dom_y = rect.top
    let mouse_x = pos.clientX
    let mouse_y = pos.clientY

    let pos_x = Math.floor((mouse_x - dom_x) / scale)
    let pos_y = Math.floor((mouse_y - dom_y) / scale)

    return {x: pos_x, y: pos_y}
}

// Following function takes back-up when called if last back-up was more than 1 second before
// It updates the state according to action argument and return new state
let maintain_state = (state, action) => {
    
    if(action.undo == true){
        if(state.done.length == 0)
            return false
        
        let state_changes = {picture: state.done[0], done: state.done.slice(1), done_at: 0}
        return Object.assign({}, state, state_changes)
    }

    else if(action.picture && state.done_at < Date.now() - 1000){
        let state_changes = {done: [state.picture, ...state.done], done_at: Date.now()}
        return Object.assign({}, state, action, state_changes)
    }

    else return Object.assign({}, state, action)
}

export {create, scale, left_click, draw_picture, get_position, maintain_state}