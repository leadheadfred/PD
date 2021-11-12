// height is 711 width is 1536
let canvas=document.getElementById("firstCanvas"); //* The main canvas 
let canvas1=document.getElementById("secondCanvas");  //* a WIP canvas
let ratio=window.innerWidth/window.innerHeight; //* allows for shorter value storage, how quickly the painter moves across the page
canvas.height=window.innerHeight;//*setting canvas dimensions to screen
canvas.width=window.innerWidth;
canvas1.height=window.innerHeight;
canvas1.width=window.innerWidth;
let draw=canvas.getContext("2d"); //*allows to shorten calling the canvas
let draw1=canvas1.getContext("2d");
let i=0; //* counter to move the drawer along
let allColorsCount=0; //* counter that stores all the colors for WIP project
addHexColor = (c1,c2)=> //* function to add 2 hex numbers that was copy pasted cause i couldnt get it to work :(
{
    let hexStr=(parseInt(c1,16) + parseInt(c2,16)).toString(16);
    while(hexStr.length<2)
    {
        hexStr="0"+hexStr;
    }
    return hexStr
}
addWholeHexColor = (c1,c2) => //* above function but for a 6 digit hex instead of a 2 digit
{
    let hexStr=(parseInt(c1,16) + parseInt(c2,16)).toString(16);
    while(hexStr.length<6)
    {
        hexStr="0"+hexStr;
    }
    return hexStr
}
let colors=prompt(`give me 2 hex codes seperated by commas`); //* user input for initial and final colors
let orderPrompt=prompt(`order the colors, r, g, b, no spaces`); //* user input for initial order
let order = []; //*initialise order
for (l=0;l<3;l++)
{
    order[l]=orderPrompt.charAt(l); //* set order to input
}
let firstHexCode=colors.split(`,`)[0]; //* split color input into 2 hex codes
let secondHexCode=colors.split(`,`)[1];
let firstHexCodeSplit = []; //* initialise lists to store rgb hex codes
let secondHexCodeSplit = [];
let initialColor=[];
let k; //*index for lists
let completed=0; //*initialises the variable that determines when an r/g/b has finished
let direction=0; //* tells whether to compare color to initial or final color
let directionChecker; //*stores direction for later comparison
for (j=0;j<3;j++) //* splits hex code into rgb
{
firstHexCodeSplit[j]=firstHexCode.slice(2*j,2*j+2);
secondHexCodeSplit[j]=secondHexCode.slice(2*j,2*j+2);
initialColor[j]=firstHexCode.slice(2*j,2*j+2);
}
drawFunction = ()=>
{
    directionChecker=direction;
    draw.lineWidth=2;
    if (order[completed]=="r") //* determines whether r/g/b should be changing
    {
        k=0;
    }
    else if (order[completed]=="g")
    {
        k=1;
    }
    else if (order[completed]=="b")
    {
        k=2;
    }
    if (direction==0) //* if going forward
    {
        if (firstHexCodeSplit[k]!=secondHexCodeSplit[k]) //* if the changing color code isnt the second code
        {
            if (firstHexCodeSplit[k]<secondHexCodeSplit[k]) //* if its smaller
            {
                firstHexCodeSplit[k]=addHexColor(firstHexCodeSplit[k],1); //* add
            }
            else
            {
                firstHexCodeSplit[k]=addHexColor(firstHexCodeSplit[k],-1); //* subtract
            }
        }
        else 
        {
            completed++; //* if the hex code is the same, go to the next list index
        }
    }
    else if (direction==1) //* if going backward
    {
        if (firstHexCodeSplit[k]!=initialColor[k]) //* if the changing color code isnt the same as the initial given color
        {
            if (firstHexCodeSplit[k]>initialColor[k]) //* if the chanigng color code is bigger than the initial given color
            {
                firstHexCodeSplit[k]=addHexColor(firstHexCodeSplit[k],-1); //* decrease the color code by 1
            }
            else if (firstHexCodeSplit[k]<initialColor[k]) //* if the changing color code is smaller than the initial code
            {
                firstHexCodeSplit[k]=addHexColor(firstHexCodeSplit[k],1) //* increase it by 1
            }
        }
        else
        {
            completed++; //* else increase list index to go to next r/g/b
        }
    }
    draw.strokeStyle="#"+firstHexCodeSplit[0]+firstHexCodeSplit[1]+firstHexCodeSplit[2]; //* color of the stroke
    draw.beginPath(); //* start drawing
    draw.moveTo(0,i*ratio/8); //* move to top edge
    draw.lineTo(i*ratio/8,0); //*move to left edge
    draw.stroke(); //*draw line
    i++; //* change position slightly
    if (firstHexCodeSplit[0]+firstHexCodeSplit[1]+firstHexCodeSplit==secondHexCode) //* if changing color equals second color
    {
        completed=0; //* reset index
        direction=(direction+1)%2 //* change direction
    }
    else if (firstHexCodeSplit[0]+firstHexCodeSplit[1]+firstHexCodeSplit[2]==initialColor[0]+initialColor[1]+initialColor[2])
    {
        completed=0; //* reset index
        direction=(direction+1)%2 //* change direction
    }
    if (directionChecker!=direction) //* if direction has changed
    {
        let temp=order[0]
        order.shift()
        order.push(temp) //* shuffle order
    }
}

let colorToPaint=000000;
let pos=0;
allColors = ()=>
{
    if (allColorsCount<16777216)
    {
        draw1.strokeStyle="#"+colorToPaint
        draw1.beginPath();
        draw1.moveTo(pos,0);
        draw1.lineTo(pos,711);
        draw1.stroke();
        colorToPaint= addWholeHexColor(colorToPaint,100);
        console.log(`The hex code of your color is${colorToPaint}`)
        pos++;
    } 
}