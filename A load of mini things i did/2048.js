console.log("hello there");
document.onkeydown = function (f)
{
    spawn();
    console.log(f.key);
}
function pos()
{
  let pos =Math.floor(16*Math.random);
  return pos;
}
function spawn()
{
    let i = 0;
    var img = document.createElement("img");
    img.src = "./Images/2.png";
    var src = document.getElementById("2");
    src.appendChild(img);
    document.getElementById("2").style.top="1000px";
    console.log("spawn works")
}