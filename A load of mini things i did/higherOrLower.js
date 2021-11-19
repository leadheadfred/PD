document.onkeydown = function (f)
{
    //console.log(`working ${f.key}`);
}
let value;
let maxValue;
let coins=10;
let bet=1;
let reward;
let p;
let difference;
let iterations=0;
let lose=false;
let output;
let auto=true;
newValue = () =>
{
    value=Math.floor(maxValue*Math.random());
    document.getElementById("hello").innerHTML=value;
    document.getElementById("hello").style.fontSize = "1000%"
    probability()
    return value;
}
start = ()=>
{
    maxValue=prompt("whats the max value?");
    document.getElementById(`startButton`).style.display=`none`;
    document.getElementById(`higher`).style.display=`inline-block`
    document.getElementById(`lower`).style.display=`inline-block`
    document.getElementById(`bet+`).style.display=`inline-block`
    document.getElementById(`bet-`).style.display=`inline-block`
    document.getElementById(`automate`).style.display=`inline-block`
    document.getElementById(`reset`).style.display=`inline-block`
    document.getElementById("bet").innerHTML = `Your current bet is ${bet}`;
    document.getElementById("coins").innerHTML = `You have ${coins} coins`;
    newValue();
}
// display =()=>
// {
//     document.getElementById("hello").innerHTML=newValue();
//     document.getElementById("hello").style.fontSize = "1000%"
//     probability()
// }
probability = () =>
{
    chanceOfHigher=Math.round(((maxValue-value-1)*100)/maxValue);
    chanceOfLower=Math.round(((value-1)*100)/maxValue);
    document.getElementById("probability").innerHTML=`${chanceOfHigher}% chance of higher, ${chanceOfLower}% chance of lower`;
    p= [chanceOfHigher,chanceOfLower];
}
main = (higherOrLower) =>
{   
    oldValue=value;
    newValue();
    if (higherOrLower==`higher`)
    {
        if (oldValue<value)
        {
            output=`Correct!`;
            reward=(1+(100-p[0])/maxValue)*bet;
            //reward=bet;
        }
        else
        {
            output=`Incorrect!`;
            reward=0;
        }
    }
    else if (higherOrLower==`lower`)
    {
        if (oldValue>value)
        {
            output=`Correct!`;
            //reward=(1+(100-p[1])/maxValue)*bet;
            reward=bet;
        }
        else
        {
            output=`Incorrect!`;
            reward=0;
        }
    }
    if (bet<=coins)
    {
        coins=coins-bet;
    }
    if (bet>coins)
    {
        bet=coins;
        coins=0;
    }
    else if (coins<=0)
    {
        lose=true;
    }
    coins=Math.ceil(coins+2*reward);
    document.getElementById("bet").innerHTML = `Your current bet is ${bet}`;
    document.getElementById("coins").innerHTML = `You have ${coins} coins`;
    //alert(output);
}
betFunction = (increaseOrDecrease,numberOfTimes) =>
{
    //console.log(bet);
    if (increaseOrDecrease=="increase")
    {
        bet=bet+numberOfTimes;
        coins=coins-numberOfTimes;
    }
    else if (increaseOrDecrease=="decrease")
    {
        if (bet>0)
        {
            bet=bet-numberOfTimes;
            coins=coins-numberOfTimes;
        }
        else
        {
            alert(`negative bet`)
        }
    }
    document.getElementById("bet").innerHTML = `Your current bet is ${bet}`;
    document.getElementById("coins").innerHTML = `You have ${coins} coins`;
    //console.log("working");
}
automate=() =>
{
    console.log(auto);
    while (lose!=true && coins<1000)
    {
        iterations++;
        difference = p[0]-p[1];
        bet=1;
        betFunction("increase",Math.floor(difference/2));
        if (difference<10 && bet>1)
        {
            betFunction("decrease",1)
        }
        else
        {
        }
        //console.log(bet);
        if (p[0]>p[1])
        {
            main("higher")
        }
        else
        {
            main("lower")
        }
    }
    if (coins>=100)
    {
        output=`You won!`;
    }
    else
    {
        output=`You lose!`;
    }
    console.log(iterations)
    document.getElementById("winOrLoss").innerHTML = output;
    document.getElementById("iterations").innerHTML = `It took ${iterations} bets to reach 1000 coins`;
    document.getElementById(`winOrLoss`).style.display=`inline-block`;
    document.getElementById(`iterations`).style.display=`inline-block`
}

reset = ()=>
{
        document.getElementById(`startButton`).style.display=`none`;
        document.getElementById(`higher`).style.display=`inline-block`
        document.getElementById(`lower`).style.display=`inline-block`
        document.getElementById(`bet+`).style.display=`inline-block`
        document.getElementById(`bet-`).style.display=`inline-block`
        document.getElementById(`automate`).style.display=`inline-block`
        document.getElementById("bet").innerHTML = `Your current bet is ${bet}`;
        document.getElementById("coins").innerHTML = `You have ${coins} coins`;
        newValue();
        coins=10;
        bet=1;
        lose=false;
        iterations=0;
        document.getElementById("bet").innerHTML = `Your current bet is ${bet}`;
        document.getElementById("coins").innerHTML = `You have ${coins} coins`;
        document.getElementById(`winOrLoss`).style.display=`none`;
        document.getElementById(`iterations`).style.display=`none`;

}