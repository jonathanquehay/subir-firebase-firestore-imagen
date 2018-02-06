function redimensionar(dato, ancho, alto) {
    var Obimag = new Image(),
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext('2d'),
    xStart = 0,
    yStart = 0,
    aspectRadio,
    newWidth,
    newHight;
    Obimag.src = dato;
    canvas.width = ancho;
    canvas.height = alto;
    aspectRadio = Obimag.height / Obimag.width;
    if (Obimag.height<Obimag.width) {
        aspectRadio = Obimag.width/Obimag.height;
        newHight = height;
        newWidth = aspectRadio * height;
        xStart = -(newWidth-width) / 2;

        
    } else {
        newWidth=width;
        newHight=aspectRadio*width;
        yStart=-(newHight-height) / 2;
    }
    ctx.drawImage(Obimag, xStart, yStart, newWidth,newHight);
    return canvas.toDataURL("image/jpeg",0.75);
    
}