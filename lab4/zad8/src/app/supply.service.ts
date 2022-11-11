import { Injectable } from '@angular/core';
import { Dish } from './dish';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  readonly kitchens: Array<string> = ['włoska','polska','indyjska', 'francuska', 'chińska', 'międzynarodowa'];
  readonly category: Array<string> = ['zupa', 'danie główne', 'sałatka', 'przystawka', 'deser', 'śniadanie'];
  readonly type: Array<string> = ['wegański', 'wegetariański', 'mięsny'];
  
  dishes: Array<Dish> = [];

  constructor(){

  }

  menuUpdate() {

    this.addDish("spaghetti al pomodoro",
    this.kitchens[0],
    this.type[0],
    this.category[1],
    "pomidory, makaron spaghetti, oliwa z oliwek, ser parmezan, bazylia",
    30,
    12,
    "Porcja świeżo ugotowanego makaronu wraz z sosem pomidorowym.",
    "http://localhost:4200/assets/images/spaghetti.jpg"
    );

    this.addDish("penne alla crudaiola",
    this.kitchens[0],
    this.type[1],
    this.category[1],
    "pomidorki koktajlowe, makaron penne rigate, ser mozzarella, bazylia, oliwa z oliwek",
    21,
    15,
    "Porcja świeżo ugotowanego makaronu penne z pomidorkami koktajlowymi.",
    "http://localhost:4200/assets/images/penne.jpg");

    this.addDish("kapuśniak",
    this.kitchens[1],
    this.type[2],
    this.category[0],
    "ziemniaki, kapusta, golonki cielęce, natka pietruszki, kminek",
    28,
    5,
    "Kapuśniak to zupa kojarzona w Polsce głównie z górskimi terenami, gdzie nazywana jest kwaśnicą. Tak naprawdę wariantów kapuśniaku jest wiele, pojawiają się nawet opcje wegetariańskie, w których wywar przyrządza się np. z grzybów.",
    "http://localhost:4200/assets/images/kapusniak.jpg");

    this.addDish("pyzy z mięsem",
    this.kitchens[1],
    this.type[2],
    this.category[1],
    "mielona łopatka wieprzowa, ziemniaki, jajko, mąka ziemniaczana, tymianek",
    3,
    13,
    "Potrawa kuchni polskiej w postaci dużych klusek ziemniaczanych lub drożdżowych, przyrządzanych w sposób charakterystyczny dla kuchni regionalnych",
    "http://localhost:4200/assets/images/pyzy.jpg");

    this.addDish("kurczak curry z wiórkami kokosowymi",
    this.kitchens[2],
    this.type[2],
    this.category[1],
    "piersi z kurczaka, ryż, curry, wiórki kokosowe, mąka, jogurt, cytryna, brzoskwinie",
    12,
    14,
    "Kurczak curry z wiórkami kokosowymi to kulinarna podróż po świecie. Jest połączeniem delikatnego smaku mięsa drobiowego, ostro-słodkiego smaku indyjskiego curry oraz aromatycznej nuty egzotycznego kokosa.",
    "http://localhost:4200/assets/images/kurczakCurry.jpg")

    this.addDish("indyjski płaski chleb – parathas",
    this.kitchens[2],
    this.type[0],
    this.category[3],
    "żytnia mąka, mąka pszenna, margaryna, oliwa z oliwek, kmin rzymski",
    20,
    6,
    "Narodowym pieczywem Indii są chlebki chapatki, spotykane również pod nazwą ćapati. Przypominają one nieco podpłomyki i przygotowuje się je z mąki razowej, wody oraz soli, a następnie piecze na gorącym kamieniu lub w nieszkliwionym, glinianym naczyniu o nazwie tava.",
    "http://localhost:4200/assets/images/parathas.jpg");

    this.addDish("creme brulee",
    this.kitchens[3],
    this.type[1],
    this.category[4],
    "śmietanka kremówka, żółtka, cukier, wanilia",
    30,
    7,
    "Creme brulee zaliczany jest do najbardziej popularnych francuskich deserów. Jest dość prosty w przygotowaniu, lecz wykwintny w smaku.",
    "http://localhost:4200/assets/images/brule.jpg");

    this.addDish("ratatouille",
    this.kitchens[3],
    this.type[0],
    this.category[1],
    "bakłażan, oliwa, cukinia, papryka, pomidory, bazylia, zioła prowansalskie",
    16,
    13,
    "Ratatouille to klasyczna potrawa francuska wywodząca się z Nicei. Podstawą są tutaj są najpierw podsmażane, a potem duszone sezonowe warzywa: papryka, cukinia, bakłażan, pomidory i cebula.",
    "http://localhost:4200/assets/images/ratatouille.jpg")

    this.addDish("sałatka z tuńczykiem",
    this.kitchens[4],
    this.type[2],
    this.category[2],
    "tuńczyk, kapusta pekińska, ogórek, cebula, szczypiorek, olej, oliwa",
    11,
    4,
    "Sałatka z tuńczykiem – idealna na lato i na zimę, na śniadanie oraz kolację – po prostu uniwersalna.",
    "http://localhost:4200/assets/images/salatkaTunczyk.jpg");

    this.addDish("chińskie sajgonki",
    this.kitchens[4],
    this.type[2],
    this.category[3],
    "filet z kurczaka, marchewka, cebula dymka, arkusz papieru ryżowego, olej",
    23,
    13,
    "Sajgonki, nazywane również naleśnikami wiosennymi, to jedno z najpopularniejszych dań kuchni chińskiej oraz tajskiej.",
    "http://localhost:4200/assets/images/sajgonki.jpg");

    this.addDish("omlet",
    this.kitchens[5],
    this.type[1],
    this.category[5],
    "jajko, masło, mleko, sól",
    35,
    4,
    "Omlet to potrawa przyrządzana z roztrzepanych jajek z odrobiną mleka, które po doprawieniu wylewa się na nagrzaną patelnię z masłem i smaży do ścięcia się masy. Można przygotować omlet na słodko jak i na słono.",
    "http://localhost:4200/assets/images/omlet.jpg");

    this.addDish("sałatka z suszonymi pomidorami i kurczakiem",
    this.kitchens[5],
    this.type[2],
    this.category[2],
    "makaron, suszone pomidory, kurczak, musztarda, ketchup, ziarna słonecznika",
    20,
    13,
    "Klasyczna sałatka makaronowa z dodatkem suszonych pomidorów i kurczaka.",
    "http://localhost:4200/assets/images/salatkaKurczak.jpg");
   }

   copy(): SupplyService{
     let s = new SupplyService();

    for(let d of s.getDishes()){
      this.dishes.push(d.copy());
    }
    
    return s;
   }

  addDish(
    name: string,
    kitchenType: string,
    dishtype: string,
    category: string,
    ingredients: string,
    amount: number,
    price: number,
    description: string,
    link: string
    ){

    this.dishes.push(new Dish(
      name,
      kitchenType,
      dishtype,
      category,
      ingredients,
      amount,
      price,
      description,
      link
    ));
  }


  getKitchens(){
    return this.kitchens;
  }

  getCategories(){
    return this.category;
  }

  getTypes(){
    return this.type;
  }

  getDishes(){
    return this.dishes;
  }

  removeDish(d: Dish){
    this.dishes.splice(this.dishes.indexOf(d), 1);
  }

}
