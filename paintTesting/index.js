let canvas=document.getElementById("firstCanvas"); // Gets the canvas
let draw=canvas.getContext("2d"); // Allows to shorten calling the canvas
let ratio=window.innerWidth/window.innerHeight; // Easier than typing it out lots of times
let width=window.innerWidth;
let height = window.innerHeight;
canvas.height=window.innerHeight; // Setting canvas dimensions to screen
canvas.width=window.innerWidth; // Setting canvas dimensions to screen
let i=0; // Counter to move the drawer along
let color=[];
let k; //index for lists
let completed=0; //initialises the variable that determines when an r/g/b has finished
let directionChecker; //stores direction for later comparison
let index=0;
let shape = prompt(`normal, circle, diamond, or star?`); // Determines shape to draw

// Used to change the color order, not currently used
const reorder = ()=>
{
    let temp=order[0]
    order.shift()
    order.push(temp)
}

// Adds two components of hex codes together 
addHexColor = (c1,c2)=> 
{
    let hexStr=(parseInt(c1,16) + parseInt(c2,16)).toString(16);
    while(hexStr.length<2)
    {
        hexStr="0"+hexStr;
    }
    return hexStr
}

//  Loops the index so that if list[index] is uncallable, calls list[0] instead
checkIndex = (index)=>
{
    if (index==inputLength)
    {
        index=0;
    }
    else if (index==-1)
    {
        index=inputLength-1
    }
    return index
}

// Takes input from the user, and determines how many colors there are
let colors=prompt(`give me hex codes seperated by commas, or type random`);
let inputLength;
if (colors=="random")
{
    inputLength=prompt(`how many colors?`)
}
else
{
    inputLength=colors.split(",").length;
}

//Takes input of color order, and splits it into characters
let orderPrompt=prompt(`order the colors, r, g, b, no spaces, eg rgb`);
let order = [];
for (l=0;l<3;l++)
{
    order[l]=orderPrompt.charAt(l); //* set order to input  
}

// Initialises the list of colors, and seperates the list of hex codes into individual hex codes
const hexCodeList = new Array;
for (m=0;m<inputLength;m++)
{
    if (colors!="random")
    {
        hexCodeList[m]=colors.split(`,`)[m]; //* split color input into 2 hex codes
    }
    else
    {
        hexCodeList[m]=Math.floor(Math.random()*16777215).toString(16)
        console.log(hexCodeList[m])
        while (hexCodeList[m].length!=6)
        {
            hexCodeList[m]=hexCodeList[m]+"0";
        }
    }
}

// Splits each hex code into its rgb components, turns them into a list, and stores the list as an element of a list
for (aRandomCounter=0;aRandomCounter<inputLength;aRandomCounter++)
{
    let a=hexCodeList[aRandomCounter].slice(0,2);
    let b=hexCodeList[aRandomCounter].slice(2,4);
    let c=hexCodeList[aRandomCounter].slice(4,6);
    hexCodeList[aRandomCounter]=[a,b,c];
}

//Sets the initial paint color to the first inputted hex code
color[0]=hexCodeList[0][0];
color[1]=hexCodeList[0][1];
color[2]=hexCodeList[0][2];


drawFunction = ()=>
{
    index=checkIndex(index); // Ensures the index isn't outside the list
    draw.lineWidth=1; // Sets width of line to draw

    // Sets order to change colors. Completed increments, so that once a color is completed, the value of k changes
    if (order[completed]=="r") 
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


    if (color[k]!=hexCodeList[checkIndex(index+1)][k]) // If the color isnt the same as the next inputted color
    {
        if (color[k]<hexCodeList[checkIndex(index+1)][k]) // If it's smaller
        {
            color[k]=addHexColor(color[k],1); // Inrcease it by 1
            console.log(`${order[completed]} going up to ${hexCodeList[checkIndex(index+1)][k]}`)
        }
        else if (color[k]>hexCodeList[checkIndex(index+1)][k])  // Else if its bigger
        {
            color[k]=addHexColor(color[k],-1); // Subtract 1
            console.log(`${order[completed]} going down to ${hexCodeList[checkIndex(index+1)][k]}`)
        }
    }
    else //If the color is the same as the next inputted color
    {
        completed++; // Increment completed, so that the next rgb code changes
        if (completed==3) // If all colors have been fully changed
        {
            completed=0; //Set that no colors match
            index++; //Start comparing to the next color
        }
    }
    draw.strokeStyle="#"+color[0]+color[1]+color[2]; // Combine the components of the hex code
    draw.beginPath(); // Start drawing

    // Determines which shape to draw based on input
    if (shape=="normal")
    {
        draw.moveTo(0,i*ratio/16); // Move to top edge
        draw.lineTo(i*ratio/16,0); // Move to left edge
    }
    else if (shape=="circle")
    {
        draw.arc(width/2,height/2,i/16,0,2*Math.PI)
    }
    else if (shape=="diamond")
    {
        draw.moveTo(width/2,height/2-i/4)
        draw.lineTo(width/2+i/4,height/2)
        draw.lineTo(width/2,height/2+i/4)
        draw.lineTo(width/2-i/4,height/2)
        draw.lineTo(width/2,height/2-i/4)
    }
    else if (shape=="star")
    {
        draw.moveTo(width/2,height/2-i/4) // Start at top point
        draw.lineTo(width/2+i/16,height/2-i/16)
        draw.lineTo(width/2+i/4,height/2) // Right point
        draw.lineTo(width/2+i/4-i/8-i/16,height/2+i/8-i/16)
        draw.lineTo(width/2,height/2+i/4) // Bottom point
        draw.lineTo(width/2-i/8+i/16,height/2+i/4-i/8-i/16)
        draw.lineTo(width/2-i/4,height/2) // Left point
        draw.lineTo(width/2-i/4+i/8+i/16,height/2-i/16)
        draw.lineTo(width/2,height/2-i/4) // Top point
    }
    else
    {
        alert(`invalid shape`)
    }
    draw.stroke(); //draw the shape
    i++; // change position slightly
}