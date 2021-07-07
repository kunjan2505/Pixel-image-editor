import { Picture } from "./Components/Picture.js"
import { draw } from "./Tools/draw.js"
import { fill } from "./Tools/fill.js"
import { rectangle } from "./Tools/rectangle.js"
import { pick } from "./Tools/color_picker.js"
import { circle } from "./Tools/circle.js"
import { ToolSelect } from "./Controlls/select_tool.js"
import { ColorSelect } from "./Controlls/select_color.js"
import { Clear } from "./Controlls/clear.js"
import { Save } from "./Controlls/save.js"
import { Undo } from "./Controlls/undo.js"
import { Editor } from "./Components/Editor.js"
import { maintain_state } from "./Components/utitlities.js"

const initial_state = {
    tool: "draw",
    color: "#000000",
    picture: Picture.empty(65, 150, "#f0f0f0"),
    done: [],
    done_at: 0
}

const Tools = {draw, fill, rectangle, circle, pick}
const Controls = [ToolSelect, ColorSelect, Save, Undo, Clear]

function start_editor({state = initial_state, tools = Tools, controls = Controls }){
    // Following method triggers state change and syncing across all components

    let dispatch = (action) => {
        state = maintain_state(state, action)
        App.syncState(state)
    }

    let App = new Editor(state, {tools, controls, dispatch})

    return App.dom
}

window.onload = () => document.body.appendChild(start_editor({}))
