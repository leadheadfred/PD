// height is 711 width is 1536
let canvas=document.getElementById("firstCanvas");
let canvas1=document.getElementById("secondCanvas");  
let ratio=window.innerWidth/window.innerHeight;
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
canvas1.height=window.innerHeight;
canvas1.width=window.innerWidth;
let draw=canvas.getContext("2d");
let draw1=canvas1.getContext("2d");
let i=0;
let allColorsCount=0;
addHexColor = (c1,c2)=>
{
    let hexStr=(parseInt(c1,16) + parseInt(c2,16)).toString(16);
    while(hexStr.length<2)
    {
        hexStr="0"+hexStr;
    }
    return hexStr
}
addWholeHexColor = (c1,c2) =>
{
    let hexStr=(parseInt(c1,16) + parseInt(c2,16)).toString(16);
    while(hexStr.length<6)
    {
        hexStr="0"+hexStr;
    }
    return hexStr
}
let colors=prompt(`give me 2 hex codes seperated by commas`);
let orderPrompt=prompt(`order the colors, r, g, b, no spaces`);
let order = [];
let anotherOrder = []
for (l=0;l<3;l++)
{
    order[l]=orderPrompt.charAt(l);
    anotherOrder[l]=orderPrompt.charAt(1);
}
let firstHexCode=colors.split(`,`)[0];
let secondHexCode=colors.split(`,`)[1];
let firstHexCodeSplit = [];
let secondHexCodeSplit = [];
let initialColor=[];
let red=false;
let green=false;
let blue=false;
let k;
let completed=0;
let add=1;
let done=false;
for (j=0;j<3;j++)
{
firstHexCodeSplit[j]=firstHexCode.slice(2*j,2*j+2);
secondHexCodeSplit[j]=secondHexCode.slice(2*j,2*j+2);
initialColor[j]=firstHexCode.slice(2*j,2*j+2);
}
console.log(secondHexCode);
// console.log(firstHexCodeSplit)
// console.log(initialColor)
drawFunction = ()=>
{
    draw.lineWidth=5;
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
    if (firstHexCodeSplit[k]!=secondHexCodeSplit[k] || done==true)
    {
        firstHexCodeSplit[k]=addHexColor(firstHexCodeSplit[k],add);
        console.log(completed,k);
    }
    else 
    {
        completed++;
    }
    if (firstHexCodeSplit[k]==initialColor[k])
    {
        console.log(k,firstHexCodeSplit[k],initialColor[k]);
        completed++;
    }
    if (firstHexCodeSplit[k].length<2)
    {
        firstHexCodeSplit[k]="0"+firstHexCodeSplit[k];
    }
    //console.log(firstHexCodeSplit[0]+firstHexCodeSplit[1]+firstHexCodeSplit[2] +"This")
    draw.strokeStyle="#"+firstHexCodeSplit[0]+firstHexCodeSplit[1]+firstHexCodeSplit[2];
    draw.beginPath();
    draw.moveTo(0,i*ratio/8);
    draw.lineTo(i*ratio/8,0);
    draw.stroke();
    i++;
    if (i==window.innerWidth)
    {
        i++;
    }
    if (firstHexCodeSplit[0]+firstHexCodeSplit[1]+firstHexCodeSplit[2]==secondHexCode)
    {
        add=add*(-1)
        done=true;
        completed=0;
    }
    else if (firstHexCodeSplit[0]+firstHexCodeSplit[1]+firstHexCodeSplit[2]==initialColor[0]+initialColor[1]+initialColor[2])
    {
        add=add*(-1)
        done=false;
        completed=0;
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