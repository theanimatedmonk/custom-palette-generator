const colorPicker = document.getElementById("color-picker");
const colorCalculator = document.getElementById("color-calculator"); 
const paletteList = document.getElementById("palette-list"); 

const primaryColors = document.querySelectorAll(".primary-color");
const primaryLightColor1 = document.getElementById("primary-light-color-1");
const primaryLightColors2 = document.querySelectorAll(".primary-light-color-2");

const complementaryLightColor1 = document.getElementById("complementary-light-color-1");
const complementaryLightColors2 = document.querySelectorAll(".complementary-light-color-2");

const triadic1LightColor1 = document.getElementById("triadic-1-light-color-1"); //triadic color 1
const triadic1LightColor2 = document.getElementById("triadic-1-light-color-2");

const triadic2LightColor1 = document.getElementById("triadic-2-light-color-1");  //triadic color 2
const triadic2LightColor2 = document.getElementById("triadic-2-light-color-2");

const tetradic1LightColor1 = document.getElementById("tetradic-1-light-color-1");  //tetradic color 1
const tetradic1LightColor2 = document.getElementById("tetradic-1-light-color-2");

const tetradic2LightColor1 = document.getElementById("tetradic-2-light-color-1"); //tetradic color 2
const tetradic2LightColor2 = document.getElementById("tetradic-2-light-color-2");

const tetradic3LightColor1 = document.getElementById("tetradic-3-light-color-1"); //tetradic color 3
const tetradic3LightColor2 = document.getElementById("tetradic-3-light-color-2");

const typographyColors = document.querySelectorAll(".typography-color");


//option palettes
const palettes = document.querySelectorAll(".palette");
const checkboxes = document.querySelectorAll(".checkbox");


// rgb to HEX code conversion
function rgbToHex(r,g,b) {
    // Ensure the values are within the 0-255 range
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    
    // Convert each component to a two-digit hexadecimal value
    const redHex = r.toString(16).padStart(2, '0');
    const greenHex = g.toString(16).padStart(2, '0');
    const blueHex = b.toString(16).padStart(2, '0');
    
    // Combine all three hexadecimal values into one string
    return `#${redHex}${greenHex}${blueHex}`;
}

// rgb to HSV code conversion
function rgbToHsv(r, g, b) {
    // Normalize RGB values to range [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;

    const M = Math.max(r, g, b);
    const m = Math.min(r, g, b);
    const delta = M - m;

    let h, s, v;

    // Compute Hue
    if (delta === 0) {
        h = 0; // Undefined, achromatic (gray)
    } else if (M === r) {
        h = ((g - b) / delta) % 6;  //if red is dominant then the difference between the green and blue channels determines the position within the red sector.
    } else if (M === g) {
        h = (b - r) / delta + 2;
    } else if (M === b) {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60); // Convert to degrees
    if (h < 0) h += 360;

    // Compute Saturation
    s = M === 0 ? 0 : delta / M;

    // Compute Value
    v = M;

    return {
        h: h, // Hue in degrees
        s: s, // Saturation as a decimal [0, 1]
        v: v  // Value as a decimal [0, 1]
    };
}

// hsv to rgb code conversion
function hsvToRgb(h, s, v) {
    let r, g, b;

    // Calculate sector
    let sector = Math.floor(h / 60);
    let f = (h / 60) - sector;

    // Intermediate values
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    // Assign RGB values based on the sector
    switch (sector) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
    }

    // Convert to 0–255 range
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// function for complementary color
function complementary(r,g,b){
    return {
    r: 255-r,
    g: 255-g,
    b: 255-b
}
}

function getTriadicColors(h, s, v) { //for triadic colors
    // Ensure hue is within [0, 360]
    let h1 = (h + 120) % 360;
    let h2 = (h + 240) % 360;

    return [
        { h:h, s:s, v:v},
        { h: h1, s: s, v: v },
        { h: h2, s: s, v: v }
    ];
}

function getTetradicColors(h, s, v) { //for tetradic colors
    // Ensure hue is within [0, 360]
    let h1 = (h + 90) % 360;
    let h2 = (h + 180) % 360;
    let h3 = (h + 270) % 360;

    return [
        { h:h, s:s, v:v},
        { h: h1, s: s, v: v },
        { h: h2, s: s, v: v },
        { h: h3, s: s, v: v }
    ];
}

// function for light color 1
function tonalLight1(r, g, b){
    return {
    r: Math.floor((255 * 6 + r) / 7),
    g: Math.floor((255 * 6 + g) / 7), 
    b: Math.floor((255 * 6 + b) / 7)
}
}

// function for light color 2
function tonalLight2(r, g, b){
    return {
    r: Math.floor((255 * 9.3 + r) / 10),
    g: Math.floor((255 * 9.3 + g) / 10), 
    b: Math.floor((255 * 9.3 + b) / 10)
}
}

//function for typography
function typography(r, g, b) {
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);  
    return brightness > 186 ? '#333333' : '#ffffff';
}


let complementaryShade;   // complementary color
let complementaryLightShade1;
let complementaryLightShade2;

let primaryLightShade1;
let primaryLightShade2;

let triadic1Shade;     // triadic colors
let triadic1LightShade1;
let triadic1LightShade2;

let triadic2Shade;
let triadic2LightShade1;
let triadic2LightShade2;

let tetradic1Shade    // tetradic colors
let tetradic1LightShade1;
let tetradic1LightShade2;

let tetradic2Shade
let tetradic2LightShade1;
let tetradic2LightShade2;

let tetradic3Shade
let tetradic3LightShade1;
let tetradic3LightShade2;

let typographyShade;


// Function to remove "palette-selected" class from all palettes
function clearPaletteSelection() {
    palettes.forEach(palette => palette.classList.remove("palette-selected"));
    palettes.forEach(palette => palette.classList.add("palette"));
    checkboxes.forEach(checkbox => checkbox.classList.add("hide"));
}

function calculateColor(e){
    e.preventDefault();

    // Extract the RGB values from the color picker
    const color = colorPicker.value;

    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);

    for (let primaryColor of primaryColors){
        primaryColor.style.backgroundColor = `${color}`;
    }

    
    for (let typographyColor of typographyColors){
        typographyShade = tonalLight1(red, green, blue);
        typographyColor.style.backgroundColor = `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`;
    }
   

    //palette 1

    primaryLightShade1 = tonalLight1(red, green, blue);
    primaryLightShade2 = tonalLight2(red, green, blue);
    primaryLightColor1.style.background=`${rgbToHex(primaryLightShade1.r, primaryLightShade1.g, primaryLightShade1.b)}`;
    //primaryLightColor2.style.background =`${rgbToHex(primaryLightShade2.r, primaryLightShade2.g, primaryLightShade2.b)}`;
    for (let primaryLightColor2 of primaryLightColors2){
        primaryLightColor2.style.backgroundColor = `${rgbToHex(primaryLightShade2.r, primaryLightShade2.g, primaryLightShade2.b)}`; }


    //palette 2
    complementaryShade = complementary(red, green, blue);
    complementaryLightShade1 = tonalLight1(complementaryShade.r, complementaryShade.g, complementaryShade.b);
    complementaryLightShade2 = tonalLight2(complementaryShade.r, complementaryShade.g, complementaryShade.b);

    complementaryLightColor1.style.background=`${rgbToHex(complementaryLightShade1.r, complementaryLightShade1.g, complementaryLightShade1.b)}`;
    //complementaryLightColor2.style.background =`${rgbToHex(complementaryLightShade2.r, complementaryLightShade2.g, complementaryLightShade2.b)}`;
    for (let complementaryLightColor2 of complementaryLightColors2){
        complementaryLightColor2.style.backgroundColor = `${rgbToHex(complementaryLightShade2.r, complementaryLightShade2.g, complementaryLightShade2.b)}`; } 

    //palette 3
    const hsvPrimary = rgbToHsv(red, green, blue);

    const triadicColors = getTriadicColors(hsvPrimary.h, hsvPrimary.s, hsvPrimary.v);
    triadic1Shade = hsvToRgb(triadicColors[1].h, triadicColors[1].s, triadicColors[1].v);

    triadic1LightShade1 = tonalLight1(triadic1Shade.r, triadic1Shade.g, triadic1Shade.b);
    triadic1LightShade2 = tonalLight2(triadic1Shade.r, triadic1Shade.g, triadic1Shade.b);

    triadic1LightColor1.style.background=`${rgbToHex(triadic1LightShade1.r, triadic1LightShade1.g, triadic1LightShade1.b)}`;
    triadic1LightColor2.style.background=`${rgbToHex(triadic1LightShade2.r, triadic1LightShade2.g, triadic1LightShade2.b)}`;

    //palette 4
    triadic2Shade = hsvToRgb(triadicColors[2].h, triadicColors[2].s, triadicColors[2].v);

    triadic2LightShade1 = tonalLight1(triadic2Shade.r, triadic2Shade.g, triadic2Shade.b);
    triadic2LightShade2 = tonalLight2(triadic2Shade.r, triadic2Shade.g, triadic2Shade.b);

    triadic2LightColor1.style.background=`${rgbToHex(triadic2LightShade1.r, triadic2LightShade1.g, triadic2LightShade1.b)}`;
    triadic2LightColor2.style.background=`${rgbToHex(triadic2LightShade2.r, triadic2LightShade2.g, triadic2LightShade2.b)}`;


    //palette 5
    const tetradicColors = getTetradicColors(hsvPrimary.h, hsvPrimary.s, hsvPrimary.v)
    tetradic1Shade = hsvToRgb(tetradicColors[1].h, tetradicColors[1].s, tetradicColors[1].v)

    tetradic1LightShade1 = tonalLight1(tetradic1Shade.r, tetradic1Shade.g, tetradic1Shade.b);
    tetradic1LightShade2 = tonalLight2(tetradic1Shade.r, tetradic1Shade.g, tetradic1Shade.b);

    tetradic1LightColor1.style.background=`${rgbToHex(tetradic1LightShade1.r, tetradic1LightShade1.g, tetradic1LightShade1.b)}`;
    tetradic1LightColor2.style.background=`${rgbToHex(tetradic1LightShade2.r, tetradic1LightShade2.g, tetradic1LightShade2.b)}`;

    //palette 6
    tetradic2Shade = hsvToRgb(tetradicColors[2].h, tetradicColors[2].s, tetradicColors[2].v)

    tetradic2LightShade1 = tonalLight1(tetradic2Shade.r, tetradic2Shade.g, tetradic2Shade.b);
    tetradic2LightShade2 = tonalLight2(tetradic2Shade.r, tetradic2Shade.g, tetradic2Shade.b);

    tetradic2LightColor1.style.background=`${rgbToHex(tetradic2LightShade1.r, tetradic2LightShade1.g, tetradic2LightShade1.b)}`;
    tetradic2LightColor2.style.background=`${rgbToHex(tetradic2LightShade2.r, tetradic2LightShade2.g, tetradic2LightShade2.b)}`;

    //palette 7
    tetradic3Shade = hsvToRgb(tetradicColors[3].h, tetradicColors[3].s, tetradicColors[3].v)

    tetradic3LightShade1 = tonalLight1(tetradic3Shade.r, tetradic3Shade.g, tetradic3Shade.b);
    tetradic3LightShade2 = tonalLight2(tetradic3Shade.r, tetradic3Shade.g, tetradic3Shade.b);

    tetradic3LightColor1.style.background=`${rgbToHex(tetradic3LightShade1.r, tetradic3LightShade1.g, tetradic3LightShade1.b)}`;
    tetradic3LightColor2.style.background=`${rgbToHex(tetradic3LightShade2.r, tetradic3LightShade2.g, tetradic3LightShade2.b)}`;



    paletteList.classList.remove('hide'); //hide palette list 
    clearPaletteSelection(); //remove selected-palette class

} 

colorCalculator.addEventListener('submit', calculateColor);


function changeTemplatePalette(selectedPaletteNumber){

    const color = colorPicker.value;
        const red = parseInt(color.slice(1, 3), 16);
        const green = parseInt(color.slice(3, 5), 16);
        const blue = parseInt(color.slice(5, 7), 16);

        palettes.forEach((palette, index)=>{
            if(selectedPaletteNumber === 1+index){
                palette.classList.add('palette-selected');
                palette.classList.remove('palette');
            }
            else {
                palette.classList.remove('palette-selected');
                palette.classList.add('palette');
            }
        })

        checkboxes.forEach( (checkbox, index) => {
                if (selectedPaletteNumber === 1+index) {
                    checkbox.classList.remove('hide');
                }
                else{
                    checkbox.classList.add('hide');
                }
        }

        )

    if(selectedPaletteNumber === 1 ){
        
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(primaryLightShade1.r, primaryLightShade1.g, primaryLightShade1.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(primaryLightShade2.r, primaryLightShade2.g, primaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color',`${typography(typographyShade.r, typographyShade.g, typographyShade.b)}` );
        document.documentElement.style.setProperty('--template-typography-light-color',`${typography(red, green, blue)}` );
    }

    else if (selectedPaletteNumber === 2){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(complementaryLightShade1.r, complementaryLightShade1.g, complementaryLightShade1.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(complementaryLightShade2.r, complementaryLightShade2.g, complementaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 3){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(triadic1LightShade1.r, triadic1LightShade1.g, triadic1LightShade1.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(triadic1LightShade2.r, triadic1LightShade2.g, triadic1LightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 4){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(triadic2LightShade1.r, triadic2LightShade1.g, triadic2LightShade1.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(triadic2LightShade2.r, triadic2LightShade2.g, triadic2LightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 5){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(tetradic1LightShade1.r, tetradic1LightShade1.g, tetradic1LightShade1.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(tetradic1LightShade2.r, tetradic1LightShade2.g, tetradic1LightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 6){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(tetradic2LightShade1.r, tetradic2LightShade1.g, tetradic2LightShade1.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(tetradic2LightShade2.r, tetradic2LightShade2.g, tetradic2LightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 7){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(tetradic3LightShade1.r, tetradic3LightShade1.g, tetradic3LightShade1.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(tetradic3LightShade2.r, tetradic3LightShade2.g, tetradic3LightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 8){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(complementaryLightShade2.r, complementaryLightShade2.g, complementaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(primaryLightShade2.r, primaryLightShade2.g, primaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 9){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(primaryLightShade2.r, primaryLightShade2.g, primaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(primaryLightShade2.r, primaryLightShade2.g, primaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 

    else if (selectedPaletteNumber === 10){
     
        document.documentElement.style.setProperty('--template-primary-color', color);
        document.documentElement.style.setProperty('--template-background-1-color', `${rgbToHex(complementaryLightShade2.r, complementaryLightShade2.g, complementaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-background-2-color', `${rgbToHex(complementaryLightShade2.r, complementaryLightShade2.g, complementaryLightShade2.b)}`);
        document.documentElement.style.setProperty('--template-typography-dark-color', `${typography(typographyShade.r, typographyShade.g, typographyShade.b)}`);
        document.documentElement.style.setProperty('--template-typography-light-color', `${typography(red, green, blue)}` );
    } 
}

palettes.forEach((palette, index)=>{
    palette.addEventListener('click', ()=> changeTemplatePalette(index+1));
})