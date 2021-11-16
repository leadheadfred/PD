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
const reorder = (direction,directionChecker)=>
{
    if (directionChecker!=direction) //* if direction has changed
    {
        let temp=order[0]
        order.shift()
        order.push(temp) //* shuffle order
    }
}
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
modulo = (num1,num2)=>
{
    let output;
    if (num1<0)
    {
        output=num2+num1
    }
    else
    {
        output=num1%num2;
    }
    return output
}
let colors=prompt(`give me hex codes seperated by commas, or type random`); //* user input for initial and final colors
let orderPrompt=prompt(`order the colors, r, g, b, no spaces, eg rgb`); //* user input for initial order
let order = []; //*initialise order
let firstHexCode;
let secondHexCode;
let inputLength=colors.split(",").length;
const hexCodeList = new Array;
const hexCodeListSplit = new Array;
for (l=0;l<3;l++)
{
    order[l]=orderPrompt.charAt(l); //* set order to input  
}
for (m=0;m<inputLength;m++)
{
    if (colors!="random")
    {
        hexCodeList[m]=colors.split(`,`)[m]; //* split color input into 2 hex codes
    }
    else
    {
        firstHexCode=Math.floor(Math.random()*16777215).toString(16);
        secondHexCode=Math.floor(Math.random()*16777215).toString(16);
    }
}
for (aRandomCounter=0;aRandomCounter<inputLength;aRandomCounter++)
{
    let a=hexCodeList[aRandomCounter].slice(0,2);
    let b=hexCodeList[aRandomCounter].slice(2,4);
    let c=hexCodeList[aRandomCounter].slice(4,6);
    hexCodeList[aRandomCounter]=[a,b,c];
}
let initialColor=[];
let firstHexCodeSplit = []; //* initialise lists to store rgb hex codes
let secondHexCodeSplit = [];
initialColor[0]=hexCodeList[0][0];
initialColor[1]=hexCodeList[0][1];
initialColor[2]=hexCodeList[0][2];
let k; //*index for lists
let completed=0; //*initialises the variable that determines when an r/g/b has finished
let direction=0; //* tells whether to compare color to initial or final color
let directionChecker; //*stores direction for later comparison
let index=0;
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
        if (hexCodeList[index][k]!=hexCodeList[modulo(index+1,inputLength)][k]) //* if the changing color code isnt the second code
        {
            if (hexCodeList[index][k]<hexCodeList[modulo(index+1,inputLength)][k]) //* if its smaller
            {
                hexCodeList[index][k]=addHexColor(hexCodeList[index][k],1); //* add
                console.log(`${order[completed]} going up`)
            }
            else 
            {
                hexCodeList[index][k]=addHexColor(hexCodeList[index][k],-1); //* subtract
                console.log(`${order[completed]} going down`)

            }
        }
        else 
        {
            completed++; //* if the hex code is the same, go to the next list index
            if (completed==4)
            {
                console.log("here1")
           }
        }
    }
    else if (direction==1) //* if going backward
    {
        if (hexCodeList[index][k]!=hexCodeList[modulo(index-1,inputLength)][k]) //* if the changing color code isnt the same as the initial given color
        {
            if (hexCodeList[index][k]>hexCodeList[modulo(index-1,inputLength)][k]) //* if the chanigng color code is bigger than the initial given color
            {
                hexCodeList[index][k]=addHexColor(hexCodeList[index][k],-1); //* decrease the color code by 1
                console.log(`${order[completed]} going down here`)

            }
            else if (hexCodeList[index][k]<hexCodeList[modulo(index-1,inputLength)][k]) //* if the changing color code is smaller than the initial code
            {
                hexCodeList[index][k]=addHexColor(hexCodeList[index][k],1) //* increase it by 1
                console.log(`${order[completed]} going up`)
            }
        }
        else
        {
            completed++; //* else increase list index to go to next r/g/b
            //console.log(completed)
            console.log(k,index,hexCodeList[index][k],hexCodeList[modulo(index-1,inputLength)][k] + "here")
            //!looping here
        }
    }
    draw.strokeStyle="#"+hexCodeList[index][0]+hexCodeList[index][1]+hexCodeList[index][2]; //* color of the stroke
    draw.beginPath(); //* start drawing
    draw.moveTo(0,i*ratio/8); //* move to top edge
    draw.lineTo(i*ratio/8,0); //*move to left edge
    draw.stroke(); //*draw line
    i++; //* change position slightly
    let a=hexCodeList[index];
    let b=hexCodeList[modulo(index+1,inputLength)]
    if (completed==4)
    {
        console.log(hexCodeList[index],hexCodeList[modulo(index+1,inputLength)]);
        console.table(a)
        console.table(b)
        if((hexCodeList[index] == hexCodeList[modulo(index+1,inputLength)]))
        {
            console.log('the error is elsewhere')
        }
    }
   if (hexCodeList[index] == hexCodeList[modulo(index+1,inputLength)]) //* if changing color equals second color
    {
        completed=0; //* reset index
        direction=(direction+1)%2 //* change direction
        console.log(hexCodeList[index],hexCodeList[index+1] + "changing direction here")
        console.log("def should show something here")
    }
    
    else if (hexCodeList[index]==initialColor)
    {
        //!this is wrong
        index++;    
        k++;
        completed=0; //* reset index
        direction=(direction+1)%2 //* change direction
        console.log("changing direction here isntead near the error")
    }
    //reorder(direction,directionChecker); //* Changes rgb order
}

let colorToPaint=000000;
let pos=0;
allColors = ()=>
{
    if (allColorsCount<16777216)
    {
        console.log(colorToPaint);
        draw1.lineWidth=0.5;
        draw1.strokeStyle="#"+colorToPaint
        draw1.beginPath();
        draw1.moveTo(pos/4,0);
        draw1.lineTo(pos/4,711);
        draw1.stroke();
        colorToPaint= addWholeHexColor(colorToPaint,10);
        //console.log(`The hex code of your color is${colorToPaint}`)
        pos++;
    } 
}