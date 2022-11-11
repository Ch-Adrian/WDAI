
let value = 0
let propagation = true;

const blok1 = document.querySelector("#blok1");
const blok2 = document.querySelector("#blok2");
const blok3 = document.querySelector("#blok3");
const art = document.querySelector("#art");
const lab1 = document.querySelector("#lab1");
const val = document.querySelector("#val");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");

blok1.addEventListener("click", fun1);

blok2.addEventListener("click", fun2);

blok3.addEventListener("click", fun3);

btn1.addEventListener("click", funBtn1);

btn2.addEventListener("click", funBtn2);

function fun1(e){
    value += 1;
    val.innerHTML = value.toString();
    lab1.innerHTML = "nacisnąłeś niebieski o wartości 1";
    update();
}

function fun2(e){
    value += 2;
    val.innerHTML = value.toString();
    lab1.innerHTML = "nacisnąłeś czerwony o wartości 2";
    stopBubble(e);
    update();
}

function fun3(e){
    value += 5;
    val.innerHTML = value.toString();
    lab1.innerHTML = "nacisnąłeś żółty o wartości 5";
    stopBubble(e);
    update();
}

function update(){
    if(value > 50){
        stopBlok3();
    }
    else if(value > 30){
        stopBlok2();
    }
}

function stopBlok2(){
    blok2.style.backgroundColor = "grey";
    blok2.removeEventListener("click", fun2);
    blok2.addEventListener("click", stopBubble);
}

function stopBlok3(){
    blok3.style.backgroundColor = "grey";
    blok3.removeEventListener("click", fun3);
    blok3.addEventListener("click", stopBubble);
}

function stopBubble(e) {
    if(!propagation){
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }
}

function funBtn1(){
    propagation = !propagation;
    if(!propagation){
        btn1.innerHTML = "Stop propagation";
    }
    else{
        btn1.innerHTML = "Start propagation";
    }
}

function funBtn2(){
    value = 0;
    val.innerHTML = value.toString();
    blok2.style.backgroundColor = "red";
    blok3.style.backgroundColor = "gold";
    if(!propagation){
        funBtn1();
    }
    blok2.removeEventListener("click", fun2);
    blok2.removeEventListener("click", stopBubble);
    blok3.removeEventListener("click", fun3);
    blok3.removeEventListener("click", stopBubble);
    blok2.addEventListener("click", fun2);
    blok3.addEventListener("click", fun3);
    
}

