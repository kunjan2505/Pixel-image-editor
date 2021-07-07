import { create } from "../Components/utitlities.js"
 
// Following class crate list of tools and keep track of current tool

class ToolSelect{
    constructor(state, {tools, dispatch}){ 
        // we will create dom element of types "select" and list all tools under it and wrap inside anothor lable element.
        let type = "option"
        let tool_names = Object.keys(tools)
        let tool_name_doms = tool_names.map(name => create(type, {selected: name == state.tool}, name))
        
        type = "select"
        let change_handler = () => dispatch({tool: this.select.value})

        this.select = create(type, {onchange: change_handler}, ...tool_name_doms)
        this.dom = create("label", {}, "🖌 Tool: ", this.select)
    }

    syncState(state){
        this.select.value = state.tool
    }
}

export {ToolSelect}