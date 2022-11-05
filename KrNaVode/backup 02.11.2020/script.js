let body = document.getElementById("main");

let cirSize = 100;
let startSize = 0;
let endSize = 0;
let sizeEnlargeSpeed = 1;
let sizeShrinkSpeed = 1;
let cirStartOpacity = 1;
let tic = 10;
let circlesPerSecond = 100;
let fadeTime = 1000;
let opacityChangeSpeed = tic / fadeTime;

let cd = true;
document.addEventListener("mousemove", function(event){
    if(cd){
        cd = false;
        let circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.top = event.pageY + "px";
        circle.style.left = event.pageX + "px";
        body.appendChild(circle);
        let size = startSize;
        let flag = false;
        let cirOpacity = 1;
        let st = setInterval(() => {
            if(!flag){
                // circle.style.width = size + "px";
                // circle.style.height = size + "px";
                // circle.style.top = (event.pageY - size/2) + "px";
                // circle.style.left = (event.pageX - size/2) + "px";
                size = changeCir(circle, size, sizeEnlargeSpeed, event.pageX, event.pageY);
            }
            if(size > cirSize) flag = true;
            if(flag && (size < endSize)){
                body.removeChild(circle); //удаление круга
                clearInterval(st);
            }
            if(flag){ 
                //size = changeCir(circle, size, -1*sizeShrinkSpeed, event.pageX, event.pageY); // уменьшаются обратно

                if(cirOpacity < 0){
                    body.removeChild(circle);
                    clearInterval(st);
                }
                else{
                    cirOpacity = cirFade(circle, cirOpacity, opacityChangeSpeed); //исчезают
                    size = changeCir(circle, size, sizeEnlargeSpeed, event.pageX, event.pageY);
                }
            }
        }, tic);
        setTimeout(() => {
            cd = true;
        }, 1000/circlesPerSecond);
    }
});

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