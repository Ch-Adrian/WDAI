
let wsk = 0;

const arrowRight = document.querySelector(".right");
const arrowLeft = document.querySelector(".left");
const randomButton = document.querySelector(".random");
const roundedImage = document.querySelector(".roundedImg")
const nameE = document.querySelector(".name");
const position = document.querySelector(".position");
const text = document.querySelector(".text");

const photo1 = "images/man.jpg"
const photo2 = "images/man2.jpg"
const photo3 = "images/woman.jpg"

const arrImages = [photo1, photo2, photo3];
const arrTexts = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic beatae repudiandae quo consequatur exercitationem eaque dicta ipsa! Expedita ab facilis ex quae minima a, quidem debitis ratione eius voluptas impedit, consectetur in quisquam quibusdam cumque, vitae facere illo quam fuga. Ullam rem quidem accusamus ducimus temporibus veniam, aut alias et voluptate corporis perferendis illo. Recusandae molestias mollitia perspiciatis, unde quis tenetur iure? Tempora quis, corrupti nemo dolor corporis quibusdam deserunt delectus quidem optio? Nemo perspiciatis culpa, voluptatum recusandae quibusdam tenetur consequatur magnam et. Ex, ea tenetur atque laudantium illo quo.",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eius earum expedita consequatur aut accusantium, iusto eos provident ut dolorem reiciendis, ea animi voluptates repudiandae nulla. Asperiores, voluptate aperiam illum itaque vitae libero. Provident, animi ratione! Vel id nulla architecto! Nesciunt ipsam esse perferendis beatae, nemo explicabo recusandae corrupti, rerum ad, sint porro quibusdam vitae fuga quam commodi qui iure fugiat? Non ipsam, ea corporis modi voluptatem, neque suscipit quia, tenetur magni pariatur deleniti veritatis mollitia tempore qui quod incidunt eius enim quidem vitae omnis officiis beatae adipisci. Voluptatem, ullam.",
"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi earum esse, eligendi, eaque commodi dolorem, cum provident autem repudiandae dolorum omnis tempore ipsam aliquid accusamus dolor reiciendis obcaecati temporibus pariatur quod hic deleniti ducimus fuga. Numquam facilis perspiciatis necessitatibus impedit soluta ratione deserunt expedita veritatis inventore, quis, rem pariatur veniam minima incidunt est. Placeat exercitationem dolorem maiores provident magnam ex sed ullam reiciendis quisquam odio eos alias voluptates, ab quod asperiores iste laborum corporis recusandae, rem modi aperiam optio. Laudantium quia delectus harum? Illo aliquid ea sit sint nesciunt?"];
const arrName = ["Jan Kowalski", "Piotr Piotrowski", "Anna Nowak"];
const arrPos = ["INTERN","SOFTWARE ENGINEER","WEB DESIGNER"];

arrowRight.addEventListener('click', changePersonForward, false);
arrowLeft.addEventListener('click', changePersonBackward, false);
randomButton.addEventListener('click', changePersonRandom, false);

function changePersonRandom(){
    wsk = (wsk + Math.floor((Math.random() * 100) + 1))%3;
    changePerson();
}

function changePersonForward(){
    wsk = (wsk+1)%3;
    changePerson();
}

function changePersonBackward(){
    wsk = (wsk+2)%3;
    changePerson();
}

function changePerson(){
    roundedImage.src = arrImages[wsk];
    nameE.innerHTML = arrName[wsk];
    position.innerHTML = arrPos[wsk];
    text.innerHTML = arrTexts[wsk];
}