

const frm = document.querySelector(".frm");
const divek = document.querySelector("#divek");
const submit = document.querySelector(".submit");
const telInput = document.querySelector("#telInput");
const nameInput = document.querySelector("#nameInput");
const divWide = document.querySelector(".wideDiv");
const divSec = divWide.cloneNode(true);
const mainSection = document.querySelector(".list");


frm.addEventListener('submit', (event)=>{
    event.preventDefault();
})
submit.addEventListener("click", validate);
addEventsToTrashButton();

function addEventsToTrashButton(){
    const trashButton = document.querySelectorAll(".trashButton")
    for(let i = 0; i<trashButton.length; i++){
        trashButton[i].addEventListener("click", ()=>{
            trashButton[i].parentElement.parentElement.remove()
        });
    }
}

function validate(){
    let name = nameInput.value
    let tel = telInput.value
    nameInput.value = ""
    telInput.value = ""
    let name2 = /^[A-ZĘÓŁŚĄŻŹĆŃ]{1}[a-ząćżźęółśń]+[ ]*/.exec(name);
    let tel2 = tel.replace(/ /g, "");
    let tel3 = /[0-9]{9}/.exec(tel2)
    if (name2 != null && tel3 != null && tel2.toString().length == 9 && name2.toString().length == name.length){
        addSection(name2, tel3)
    }
    else{
        alert("Data is not correct.")
    }
}

function addSection(name,tel){
    /*let div = divSec.cloneNode(true)
    div.childNodes[1].childNodes[1].innerText = name;
    div.childNodes[1].childNodes[3].innerText = tel;
    div.childNodes[3].childNodes[1].addEventListener("click", ()=>{
        div.remove()
    });
    mainSection.appendChild(div);*/
    let div = `<div class="wideDiv">
    <div class="leftDiv">
        <label class="LabelNazwa label1">${name}</label>
        <label class="labelTelefon label1">${tel}</label>
    </div>
    <div class="rightDiv">
        <div class="trashButton">
            <div class="trash">
                <div class="trashIN"></div>
                <div class="trashIN2"></div>
            </div>
        </div>
    </div>
</div>`
    mainSection.innerHTML += div;
    addEventsToTrashButton();
}
