
// We will consider every picture in form of rectangle of cells with same/different colors
// We can represent any shape using this by manipulating colors of some cells

let Picture = class Picture{

    // height := height of rectangle containing picture
    // width := width of rectangle containing picture
    // pixels := array of colors (size = height * width) in six digit hexadecimal format
    constructor(height, width, pixels){
        this.height = height
        this.width = width
        this.pixels = pixels
    }

    // Foloowing static method can be called to create empty picture with given color and size
    // This method will be property of class, not of object instance
    static empty(height, width, color){ 
        let pixels = new Array(height * width).fill(color)
        return new Picture(height, width, pixels)
    }

    // Following method returns the color of pixcel of cell (x, y) in picture
    get_pixel(x, y){
        return this.pixels[x + y * this.width]
    }

    // Following method creates copy of current object instance and modify some cells given in input and return new object
    draw(pixels){
        let copy = this.pixels.slice()

        for(let {x, y, color} of pixels)
            copy[x + y * this.width] = color;

        return new Picture(this.height, this.width, copy)
    }
}

export {Picture}