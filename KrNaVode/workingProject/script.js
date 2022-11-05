let body = document.getElementById("main");
let CirBGColOpt = document.getElementById("CirBGColOpt");
let CirBGOpacityOpt = document.getElementById("CirBGOpacityOpt");
let BGColOpt = document.getElementById("BGColOpt");
let borderOpt = document.getElementById("borderOpt");
let CPSOpt = document.getElementById("CPSOpt");
let ticOpt = document.getElementById("ticOpt");
let sizeOpt = document.getElementById("sizeOpt");
let optionsCont = document.getElementById("optionsCont");
let hider = document.getElementById("optionsHider");
let optionsName = document.getElementById("optID");
let borderWidthOpt = document.getElementById("borderWidthOpt");
let borderColorOpt = document.getElementById("borderColorOpt");
let borderOpacityOpt = document.getElementById("borderOpacityOpt");
let modOpt = document.getElementById("modOpt");
let randomDropsOpt = document.getElementById("randomDropsOpt");
let raindropSizeOpt = document.getElementById("raindropSizeOpt");
let raindropSpeedOpt = document.getElementById("raindropSpeedOpt");
let raindropNumberOpt = document.getElementById("raindropNumberOpt");
let rainbowOpt = document.getElementById("rainbowOpt");
let rainbowBrightnessOpt = document.getElementById("rainbowBrightnessOpt");
let rainbowColorfullnessOpt = document.getElementById("rainbowColorfullnessOpt");
let rainbowSpeedOpt = document.getElementById("rainbowSpeedOpt");


let cirSize = sizeOpt.value;
let startSize = 0;
let endSize = 0;
let sizeEnlargeSpeed = 1;
let sizeShrinkSpeed = 1;
let cirStartOpacity = 1;
let tic = 15 - ticOpt.value;
let circlesPerSecond = CPSOpt.value;
let fadeTime = 1000;
let opacityChangeSpeed = tic / fadeTime; 
let bodyCol = BGColOpt.value;
body.style.backgroundColor = bodyCol;
let cirBorderIsOn = true;
let borderWid = borderWidthOpt.value;
let cirCol = CirBGColOpt.value;
let cirColOpacity = CirBGOpacityOpt.value;
let borderCol = borderColorOpt.value;
let borderOpacity = borderOpacityOpt.value;

let raindropSize = raindropSizeOpt.value;
let raindropNumber = raindropNumberOpt.value;
let raindropSpeed = 15 - raindropSpeedOpt.value;

let rainbow = false;
let rbMaxCol = rainbowBrightnessOpt.value - 0;
let rbMinCol = 255 - rainbowColorfullnessOpt.value;
let rbCurCol = [rbMaxCol, rbMinCol, rbMinCol, 1];
let rbSpeed = rainbowSpeedOpt.value - 0;

let mod = modOpt.value;
let minMod = 1;
let maxMod = 2;

let base = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
function toBase16(x){
    let ans = "";
    if(x == 0) return "0";
    while(x > 0){
        ans += base[x%16];
        x = Math.floor(x/16);
    }
    let ans1 = "";
    for(let i = ans.length - 1; i >= 0; --i){
        ans1 += ans[i];
    }
    return ans1;
}

//изменение цвета радугой
function rainbowEffect(rbCol){
    if(rbCol[ rbCol[3] ] < rbMaxCol){
        rbCol[ rbCol[3] ] += rbSpeed;
    }
    else if(rbCol[ rbCol[3] ] >= rbMaxCol && rbCol[ (rbCol[3] + 2) % 3 ] > rbMinCol){
        rbCol[ (rbCol[3] + 2) % 3 ] -= rbSpeed;
        if(rbCol[ rbCol[3] ] >= rbMaxCol && rbCol[ (rbCol[3] + 2) % 3 ] <= rbMinCol){
            rbCol[3] = (rbCol[3] + 1) % 3;
        }
    }
    else{
        if(rbCol[ rbCol[3] ] >= rbMaxCol && rbCol[ (rbCol[3] + 2) % 3 ] <= rbMinCol){
            rbCol[3] = (rbCol[3] + 1) % 3;
        }
    }
}

function colArrTo16(array){
    let ans = "#";
    for(let i = 0; i < 3; ++i){
        let tmp = array[i];
        if(tmp > 255){
            tmp = 255;
        }
        if(tmp < 0){
            tmp = 0;
        }
        if(tmp >= 16){
            ans += toBase16(tmp);
        }
        else{
            ans += "0" + toBase16(tmp);
        }
    }
    
    return ans;
}

let cd = true;
document.addEventListener("mousemove", function(event){
    if(cd && AncBodyOrOpt(event.target) == body){
        cd = false;
        let circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.top = event.pageY + "px";
        circle.style.left = event.pageX + "px";

        //создание цвета
        if(rainbow){
            if(cirBorderIsOn){
                circle.style.borderWidth = borderWid + "px";
                circle.style.borderStyle = "solid";
                circle.style.borderColor = "rgba("+parseInt("0x"+borderCol[1]+borderCol[2])+","+parseInt("0x"+borderCol[3]+borderCol[4])+","+parseInt("0x"+borderCol[5]+borderCol[6])+","+borderOpacity+")";
            } 
            else circle.style.border = "";
            

            //изменение цвета
            rainbowEffect(rbCurCol);
            circle.style.backgroundColor = "rgba("+ (rbCurCol[0]) +","+ (rbCurCol[2] ) +","+ (rbCurCol[1] ) +","+cirColOpacity+")";
        }
        else{
            //стандарт
            if(cirBorderIsOn){
                circle.style.borderWidth = borderWid + "px";
                circle.style.borderStyle = "solid";
                circle.style.borderColor = "rgba("+parseInt("0x"+borderCol[1]+borderCol[2])+","+parseInt("0x"+borderCol[3]+borderCol[4])+","+parseInt("0x"+borderCol[5]+borderCol[6])+","+borderOpacity+")";
            } 
            else circle.style.border = "";

            circle.style.backgroundColor = "rgba("+ parseInt("0x" + cirCol[1] + cirCol[2]) +","+ parseInt("0x" + cirCol[3] + cirCol[4]) +","+ parseInt("0x" + cirCol[5] + cirCol[6]) +","+cirColOpacity+")";

        }



        body.appendChild(circle);
        let size = startSize;
        let flag = false;
        let cirOpacity = 1;
        let st = setInterval(() => {
            if(!flag){
                size = changeCir(circle, size, sizeEnlargeSpeed, event.pageX, event.pageY);
            }
            if(size > cirSize) flag = true;
            if(flag && (size < endSize)){
                body.removeChild(circle); //удаление круга
                clearInterval(st);
            }
            if(flag){ 
                if(mod == 1){
                    size = changeCir(circle, size, -1*sizeShrinkSpeed, event.pageX, event.pageY); // уменьшаются обратно
                }
                else if(mod == 2){
                    if(cirOpacity < 0){
                        body.removeChild(circle);
                        clearInterval(st);
                    }
                    else{
                        opacityChangeSpeed = sizeEnlargeSpeed / cirSize;
                        cirOpacity = cirFade(circle, cirOpacity, opacityChangeSpeed); //исчезают, увеличиваясь в 2 раза
                        size = changeCir(circle, size, sizeEnlargeSpeed, event.pageX, event.pageY);
                    }
                }
            }
        }, tic);

        setTimeout(() => {
            cd = true;
        }, 1000/circlesPerSecond);
    }
});

function AncBodyOrOpt(elem){
    if(elem == body || elem == optionsCont || elem == null){
        return(elem);
    }
    else{
        return(AncBodyOrOpt(elem.parentNode));
    }
}


function makeCircle(x, y, modIn, cirSizeIn, ticIn, cirCol){  //функция для реализации не в основном потоке (не от проведения мышкой), иначе возникают лаги
    let circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.top = y + "px";
    circle.style.left = x + "px";

    if(cirBorderIsOn){
        circle.style.borderWidth = borderWid + "px";
        circle.style.borderStyle = "solid";
        circle.style.borderColor = "rgba("+parseInt("0x"+borderCol[1]+borderCol[2])+","+parseInt("0x"+borderCol[3]+borderCol[4])+","+parseInt("0x"+borderCol[5]+borderCol[6])+","+borderOpacity+")";
    } 
    else circle.style.border = "";

    circle.style.backgroundColor = "rgba("+ parseInt("0x" + cirCol[1] + cirCol[2]) +","+ parseInt("0x" + cirCol[3] + cirCol[4]) +","+ parseInt("0x" + cirCol[5] + cirCol[6]) +","+cirColOpacity+")";

    body.appendChild(circle);
    let size = startSize;
    let flag = false;
    let cirOpacity = 1;
    let st = setInterval(() => {
        if(!flag){
            size = changeCir(circle, size, sizeEnlargeSpeed, x, y);
        }
        if(size > cirSizeIn) flag = true;
        if(flag && (size < endSize)){
            body.removeChild(circle); //удаление круга
            clearInterval(st);
        }
        if(flag){ 
            if(modIn == 1){
                size = changeCir(circle, size, -1*sizeShrinkSpeed, x, y); // уменьшаются обратно
            }
            else if(modIn == 2){
                if(cirOpacity < 0){
                    body.removeChild(circle);
                    clearInterval(st);
                }
                else{
                    opacityChangeSpeed = sizeEnlargeSpeed / cirSizeIn;
                    cirOpacity = cirFade(circle, cirOpacity, opacityChangeSpeed); //исчезают, увеличиваясь в 2 раза
                    size = changeCir(circle, size, sizeEnlargeSpeed, x, y);
                }
            }
        }
    }, ticIn);
}


function makeRandomDrop(size, ticIn, cirCol){
    let w = body.clientWidth;
    let h = body.clientHeight;
    makeCircle(Math.random()*w, Math.random()*h, 2, size, ticIn, cirCol);
}



function changeCir(circle, curSize, changeSpeed, midX, midY){
    circle.style.width = (curSize + changeSpeed) + "px";
    circle.style.height = (curSize + changeSpeed) + "px";
    circle.style.top = (midY - (curSize + changeSpeed) / 2) + "px";
    circle.style.left = (midX - (curSize + changeSpeed) / 2) + "px";
    return (curSize + changeSpeed);
}
function cirFade(circle, curOpacity, changeSpeed){
    circle.style.opacity = curOpacity - changeSpeed;
    return (curOpacity - changeSpeed);
}



hider.addEventListener("click", function(){
    if(hider.value == "hide"){
        hider.value = "open";
        optionsCont.style.visibility = "hidden";
        optionsName.style.color = "rgb(" + (255 - parseInt("0x" + bodyCol[1] + bodyCol[2]) ) + "," + (255 - parseInt("0x" + bodyCol[3] + bodyCol[4]) ) + "," + (255 - parseInt("0x" + bodyCol[5] + bodyCol[6]) ) + ")";
    }
    else if(hider.value == "open"){
        hider.value = "hide";
        optionsCont.style.visibility = "visible";
        optionsName.style.color = "rgb(0,0,0)";
    }
});



sizeOpt.addEventListener("mouseup", function(){
    cirSize = sizeOpt.value;
});



ticOpt.addEventListener("mouseup", function(){
    tic = 15 - ticOpt.value;
});



CPSOpt.addEventListener("mouseup", function(){
    circlesPerSecond = CPSOpt.value;
});



borderOpt.addEventListener("click", function(){
    if(borderOpt.checked) cirBorderIsOn = true;
    else cirBorderIsOn = false;
});



BGColOpt.addEventListener("change", function(){
    bodyCol = BGColOpt.value;
    body.style.backgroundColor = bodyCol;
});



CirBGColOpt.addEventListener("change", function(){
    cirCol = CirBGColOpt.value;
});
CirBGOpacityOpt.addEventListener("change", function(){
    cirColOpacity = CirBGOpacityOpt.value;
});

borderWidthOpt.addEventListener("change", function(){
    borderWid = borderWidthOpt.value;
});
borderColorOpt.addEventListener("change", function(){
    borderCol = borderColorOpt.value;
});
borderOpacityOpt.addEventListener("change", function(){
    borderOpacity = borderOpacityOpt.value;
});

modOpt.addEventListener("change", function(){
    let mv = modOpt.value;
    if(mv < minMod) mv = minMod;
    else if(mv > maxMod) mv = maxMod;
    else mv = Math.round(mv);
    mod = mv;
});


//работа с дождем
let rain;
let raining = false;

let rainCol = cirCol;
let rbRainCol = [rbMaxCol, rbMinCol, rbMinCol, 1];
randomDropsOpt.addEventListener("click", function(){
    if(randomDropsOpt.checked){
        rain = setInterval(() => {
            if(rainbow){
                rainbowEffect(rbRainCol);
                rainCol = colArrTo16(rbRainCol);
            }
            else{
                rainCol = cirCol;
            }

            makeRandomDrop(raindropSize, raindropSpeed, rainCol);
        }, 1000/raindropNumber);
        raining = true;
    }
    else{
        clearInterval(rain);
        raining = false;
    }
});

raindropSizeOpt.addEventListener("mouseup", function(){
    raindropSize = raindropSizeOpt.value;
});

raindropSpeedOpt.addEventListener("mouseup", function(){
    raindropSpeed = 15 - raindropSpeedOpt.value;
});

raindropNumberOpt.addEventListener("mouseup", function(){
    raindropNumber = raindropNumberOpt.value;
    if(raining){
        clearInterval(rain);
        rain = setInterval(() => {
            if(rainbow){
                rainbowEffect(rbRainCol);
                rainCol = colArrTo16(rbRainCol);
            }
            else{
                rainCol = cirCol;
            }

            makeRandomDrop(raindropSize, raindropSpeed, rainCol);
        }, 1000/raindropNumber);
    }
});

rainbowOpt.addEventListener("change", function(){
    if(rainbowOpt.checked) rainbow = true;
    else rainbow = false;
});

rainbowBrightnessOpt.addEventListener("change", function(){
    rbMaxCol = rainbowBrightnessOpt.value - 0;
});

rainbowColorfullnessOpt.addEventListener("change", function(){
    rbMinCol = 255 - rainbowColorfullnessOpt.value;
});

rainbowSpeedOpt.addEventListener("change", function(){
    rbSpeed = rainbowSpeedOpt.value - 0;
});