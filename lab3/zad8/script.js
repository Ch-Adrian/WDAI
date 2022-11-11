
const bollon = document.querySelector(".bal");
const outer = document.querySelector(".outer");
const body = document.querySelector("body");
const contextmenu = document.querySelector(".contextMenu");
const imgBal = document.querySelector(".imgBal")

document.addEventListener("contextmenu", (e)=>{
    e.preventDefault();
    reserMenu();
})

imgBal.addEventListener('contextmenu', (e)=>{
    //alert(e.code)
    //alert(e.code)
    e.preventDefault();
    if(e.ctrlKey){
        contextmenu.style.top = e.clientY + "px";
        contextmenu.style.left= e.clientX + "px";
        let prc = parseInt(/[0-9]+/.exec(bollon.style.fontSize))/15;
        if(isNaN(prc)) { prc = 5.0;}
        contextmenu.innerHTML = prc.toFixed(1)+"%";
        contextmenu.style.opacity = "100%";
    }
    e.stopPropagation(); 
}, false)

document.addEventListener('keydown', farrowUp, false)

document.addEventListener('keydown', farrowDown, false)

document.addEventListener("keydown", function(e){
    if(["ArrowUp", "ArrowDown"].indexOf(e.code) > -1){
        e.preventDefault();
    }
}, false);

function farrowUp(e){
    if(["ArrowUp"].indexOf(e.code) > -1){
        let str = /[0-9]+/.exec(bollon.style.fontSize);
        let strTop = /[0-9]+/.exec(outer.style.top);
        //let strLeft = /[0-9]+/.exec(bollon.style.left);
        let str2 = parseInt(str)
        if(str != null && str2 > 1400){
            bollon.innerHTML = "&#128165;";
            document.removeEventListener("keydown", farrowDown);
            document.removeEventListener("keydown", farrowUp);
        }
        if(str == null){
            bollon.style.fontSize = "130%";
            outer.style.top = "50%";
        }else{
            let greater = parseInt(str) + 160; 
            bollon.style.fontSize = greater.toString() + "%";
            let lower = parseInt(strTop) - 5;
            //let lowerLeft = parseInt(strLeft);
            outer.style.top = lower.toString() + "%";
            //bollon.style.left = lowerLeft.toString() + "%";
        }
    }
    reserMenu();
}

function farrowDown(e){
    if(["ArrowDown"].indexOf(e.code) > -1){
        let str = /[0-9]+/.exec(bollon.style.fontSize);
        let strTop = /[0-9]+/.exec(outer.style.top);
        //let strLeft = /[0-9]+/.exec(bollon.style.left);
        if(str == null){
            bollon.style.fontSize = "100%";
            outer.style.top = "50%";
        }
        else if(str >= 200){
            let greater = parseInt(str) - 160; 
            bollon.style.fontSize = greater.toString() + "%";
            let lower = parseInt(strTop) + 5;
            //let lowerLeft = parseInt(strLeft);
            outer.style.top = lower.toString() + "%";
            //bollon.style.left = lowerLeft.toString() + "%";
        }
    }
    reserMenu();
}

function reserMenu(){
    contextmenu.style.opacity = "0%";
    contextmenu.style.top = 0 + "px";
    contextmenu.style.left= 0 + "px"; 
}