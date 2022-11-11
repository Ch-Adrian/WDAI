
let cnt = 0;

const button1 = document.getElementsByClassName("btn1")[0];
const button2 = document.getElementsByClassName("btn2")[0];
const button3 = document.getElementsByClassName("btn3")[0];
const label1 = document.getElementById("lab1");

button2.addEventListener("click", () => {
    cnt = 0;
    button1.removeEventListener("click", btn1, false); 
}, false);

button3.addEventListener("click", () => {
    button1.addEventListener("click", btn1, false);
    label1.innerText = "Counter: " + cnt.toString();
}, false);

function btn1(){
    cnt += 1;
    label1.innerText = "Counter: " + cnt.toString();
}