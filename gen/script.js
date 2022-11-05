let canvas = document.getElementById("field");
let ctx = canvas.getContext('2d');
let wid = 300;
let hgt = 300;
canvas.style.width = wid + "px";
canvas.style.height = hgt + "px";

let dots = [];
let dotssurv = [];
class dot{
    constructor(){
        this.x = parseInt(Math.random() * wid, 10);
        this.y = parseInt(Math.random() * hgt, 10);
        dots.push(this);
    }
    newdot(){
        let sec = dotssurv[ (dotssurv.indexOf(this) + parseInt(Math.random() * dotssurv.length) % dotssurv.length, 10) ];
        let child = new dot();
        child.x = (this.x + sec.x) / 2;
        child.y = (this.y + sec.y) / 2;
        dots.push(child);
    }
    newdotmut(){
        let sec = dotssurv[ (dotssurv.indexOf(this) + parseInt(Math.random() * dotssurv.length) % dotssurv.length, 10) ];
        let child = new dot();
        child.x = (this.x + sec.x) / 2 + Math.random() * wid * 0.6 - wid * 0.6 / 2;
        child.y = (this.y + sec.y) / 2 + Math.random() * hgt * 0.6 - hgt * 0.6 / 2;
        dots.push(child);
    }
}