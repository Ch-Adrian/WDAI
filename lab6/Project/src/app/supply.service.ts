import { Injectable } from '@angular/core';
import { Dish, IAmDish } from './dish';
import {  deleteDoc, updateDoc, collectionData, docData, Firestore, doc, addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './user';

export interface IAmString{
  id?: string;
  str: string;
}

export class Str implements IAmString{
  id?: string;
  str: string;
  constructor(s: string){ this.str = s;}
}

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  // readonly kitchens: Array<string> = ['włoska','polska','indyjska', 'francuska', 'chińska', 'międzynarodowa'];
  // readonly category: Array<string> = ['zupa', 'danie główne', 'sałatka', 'przystawka', 'deser', 'śniadanie'];
  // readonly type: Array<string> = ['wegański', 'wegetariański', 'mięsny'];


  kitchens: Array<string> = [];
  category: Array<string> = [];
  type: Array<string> = [];
  dishes: Array<Dish> = [];

  constructor(private firestore: Firestore){
    this.getFireKitchens();
    this.getFireCategories();
    this.getFireTypes();
    this.getFireDishes();
  }

  
  // addCollection(){

  //   // this.menuUpdate();
  //   // for(let k of this.kitchens){
  //   //   this.addStr('kitchens', new Str(k));
  //   // }
  //   // for(let k of this.category){
  //   //   this.addStr('categories', new Str(k));
  //   // }
  //   // for(let k of this.type){
  //   //   this.addStr('types', new Str(k));
  //   // }
  // }

  addStr(where: string, what: IAmString){
    const ref = collection(this.firestore, where);
        return addDoc(ref, {...what});
  }

//   menuUpdate() {

//     this.addDish("spaghetti al pomodoro",
//     this.kitchens[0],
//     this.type[0],
//     this.category[1],
//     "pomidory, makaron spaghetti, oliwa z oliwek, ser parmezan, bazylia",
//     30,
//     12,
//     "Porcja świeżo ugotowanego makaronu wraz z sosem pomidorowym.",
//     ["assets/dishes/spaghetti/img1.jpg", 
//     "assets/dishes/spaghetti/img2.jpg",
//     "assets/dishes/spaghetti/img3.jpg"]
//     );

//     this.addDish("penne alla crudaiola",
//     this.kitchens[0],
//     this.type[1],
//     this.category[1],
//     "pomidorki koktajlowe, makaron penne rigate, ser mozzarella, bazylia, oliwa z oliwek",
//     21,
//     15,
//     "Porcja świeżo ugotowanego makaronu penne z pomidorkami koktajlowymi.",
//     ["assets/dishes/penne/img1.jpg",
//   "assets/dishes/penne/img2.jpg",
// "assets/dishes/penne/img3.jpg"]);

//     this.addDish("kapuśniak",
//     this.kitchens[1],
//     this.type[2],
//     this.category[0],
//     "ziemniaki, kapusta, golonki cielęce, natka pietruszki, kminek",
//     28,
//     5,
//     "Kapuśniak to zupa kojarzona w Polsce głównie z górskimi terenami, gdzie nazywana jest kwaśnicą. Tak naprawdę wariantów kapuśniaku jest wiele, pojawiają się nawet opcje wegetariańskie, w których wywar przyrządza się np. z grzybów.",
//     ["assets/dishes/kapusniak/img1.jpg",
//   "assets/dishes/kapusniak/img2.jpg",
// "assets/dishes/kapusniak/img3.jpg"]);

//     this.addDish("pyzy z mięsem",
//     this.kitchens[1],
//     this.type[2],
//     this.category[1],
//     "mielona łopatka wieprzowa, ziemniaki, jajko, mąka ziemniaczana, tymianek",
//     3,
//     13,
//     "Potrawa kuchni polskiej w postaci dużych klusek ziemniaczanych lub drożdżowych, przyrządzanych w sposób charakterystyczny dla kuchni regionalnych",
//     ["assets/dishes/pyzy/img1.jpg",
//   "assets/dishes/pyzy/img2.jpg",
// "assets/dishes/pyzy/img3.jpg"]);

//     this.addDish("kurczak curry z wiórkami kokosowymi",
//     this.kitchens[2],
//     this.type[2],
//     this.category[1],
//     "piersi z kurczaka, ryż, curry, wiórki kokosowe, mąka, jogurt, cytryna, brzoskwinie",
//     12,
//     14,
//     "Kurczak curry z wiórkami kokosowymi to kulinarna podróż po świecie. Jest połączeniem delikatnego smaku mięsa drobiowego, ostro-słodkiego smaku indyjskiego curry oraz aromatycznej nuty egzotycznego kokosa.",
//     ["assets/dishes/kurczakCurry/img1.jpg",
//   "assets/dishes/kurczakCurry/img2.jpg",
// "assets/dishes/kurczakCurry/img3.jpg"])

//     this.addDish("indyjski płaski chleb – parathas",
//     this.kitchens[2],
//     this.type[0],
//     this.category[3],
//     "żytnia mąka, mąka pszenna, margaryna, oliwa z oliwek, kmin rzymski",
//     20,
//     6,
//     "Narodowym pieczywem Indii są chlebki chapatki, spotykane również pod nazwą ćapati. Przypominają one nieco podpłomyki i przygotowuje się je z mąki razowej, wody oraz soli, a następnie piecze na gorącym kamieniu lub w nieszkliwionym, glinianym naczyniu o nazwie tava.",
//     ["assets/dishes/parathas/img1.jpg",
//   "assets/dishes/parathas/img2.jpg",
// "assets/dishes/parathas/img3.jpg"]);

//     this.addDish("creme brulee",
//     this.kitchens[3],
//     this.type[1],
//     this.category[4],
//     "śmietanka kremówka, żółtka, cukier, wanilia",
//     30,
//     7,
//     "Creme brulee zaliczany jest do najbardziej popularnych francuskich deserów. Jest dość prosty w przygotowaniu, lecz wykwintny w smaku.",
//     ["assets/dishes/brule/img1.jpg",
//   "assets/dishes/brule/img2.jpg",
// "assets/dishes/brule/img3.jpg"]);

//     this.addDish("ratatouille",
//     this.kitchens[3],
//     this.type[0],
//     this.category[1],
//     "bakłażan, oliwa, cukinia, papryka, pomidory, bazylia, zioła prowansalskie",
//     16,
//     13,
//     "Ratatouille to klasyczna potrawa francuska wywodząca się z Nicei. Podstawą są tutaj są najpierw podsmażane, a potem duszone sezonowe warzywa: papryka, cukinia, bakłażan, pomidory i cebula.",
//     ["assets/dishes/ratatouille/img1.jpg",
//   "assets/dishes/ratatouille/img2.jpg",
// "assets/dishes/ratatouille/img3.jpg"])

//     this.addDish("sałatka z tuńczykiem",
//     this.kitchens[4],
//     this.type[2],
//     this.category[2],
//     "tuńczyk, kapusta pekińska, ogórek, cebula, szczypiorek, olej, oliwa",
//     11,
//     4,
//     "Sałatka z tuńczykiem – idealna na lato i na zimę, na śniadanie oraz kolację – po prostu uniwersalna.",
//     ["assets/dishes/salatkaTunczyk/img1.jpg",
//   "assets/dishes/salatkaTunczyk/img2.jpg",
// "assets/dishes/salatkaTunczyk/img3.jpg"]);

//     this.addDish("chińskie sajgonki",
//     this.kitchens[4],
//     this.type[2],
//     this.category[3],
//     "filet z kurczaka, marchewka, cebula dymka, arkusz papieru ryżowego, olej",
//     23,
//     13,
//     "Sajgonki, nazywane również naleśnikami wiosennymi, to jedno z najpopularniejszych dań kuchni chińskiej oraz tajskiej.",
//     ["assets/dishes/sajgonki/img1.jpg",
//   "assets/dishes/sajgonki/img2.jpg",
// "assets/dishes/sajgonki/img3.jpg"]);

//     this.addDish("omlet",
//     this.kitchens[5],
//     this.type[1],
//     this.category[5],
//     "jajko, masło, mleko, sól",
//     35,
//     4,
//     "Omlet to potrawa przyrządzana z roztrzepanych jajek z odrobiną mleka, które po doprawieniu wylewa się na nagrzaną patelnię z masłem i smaży do ścięcia się masy. Można przygotować omlet na słodko jak i na słono.",
//     ["assets/dishes/omlet/img1.jpg",
//   "assets/dishes/omlet/img2.jpg",
// "assets/dishes/omlet/img3.jpg"]);

//     this.addDish("sałatka z suszonymi pomidorami i kurczakiem",
//     this.kitchens[5],
//     this.type[2],
//     this.category[2],
//     "makaron, suszone pomidory, kurczak, musztarda, ketchup, ziarna słonecznika",
//     20,
//     13,
//     "Klasyczna sałatka makaronowa z dodatkem suszonych pomidorów i kurczaka.",
//     ["assets/dishes/salatkaKurczak/img1.jpg",
//   "assets/dishes/salatkaKurczak/img2.jpg",
// "assets/dishes/salatkaKurczak/img3.jpg"]);
//    }

  
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
    this.removeFireDish(d);
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
    link: string[]
    ){
    let d = new Dish(
      name,
      kitchenType,
      dishtype,
      category,
      ingredients,
      amount,
      price,
      description,
      link
    );
    d.rate = [];
    d.reviews = [];
    this.dishes.push(d);

    this.addFireDish(
      name,
      kitchenType,
      dishtype,
      category,
      ingredients,
      amount,
      price,
      description,
      link,
      d
      );
  }

  getFireDishes(){
    const dishesRef = collection(this.firestore, 'dishes');
    const dishesArr =  collectionData(dishesRef, {idField: 'id'}) as Observable<IAmDish[]>;
    let response: Array<Dish> = []; 
    dishesArr.subscribe(res => {
      this.dishes = [];
      for(let d of res){
        let dish = new Dish("","","","","",1,1,"",[""]);
        dish.setThis(d);
        this.dishes.push(dish);
        // console.log(dish.rate);
      }
    });
  }

  getFireDishById(id: string): Observable<IAmDish>{
    const dishDocRef = doc(this.firestore, `dishes/${id}`);
    return docData(dishDocRef, { idField: 'id'}) as Observable<IAmDish>;
  }

  addFireDish(
        name: string,
        kitchenType: string,
        dishtype: string,
        category: string,
        ingredients: string,
        amount: number,
        price: number,
        description: string,
        link: string[]
        , d: Dish){
    
        let dish = {
          name,
          kitchenType,
          dishtype,
          category,
          ingredients,
          amount,
          price,
          description,
          link
        };

        const dishesRef = collection(this.firestore, 'dishes');
        let t = addDoc(dishesRef, dish).then( data =>{
          d.id = data.id;
          this.updateFireDish(d, {id: d.id});
          this.updateFireDish(d, {rate: []});
          this.updateFireDish(d, {reviews: []});
        });
        return t;
      }

  removeFireDish(dish: IAmDish){
    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return deleteDoc(dishDocRef);
  }

  updateDishesAgain(){
    this.dishes.forEach( dish =>{
      dish.rate = [];
      dish.reviews = [];
      this.updateFireDish(dish, {rate: []});
      this.updateFireDish(dish, {reviews: []});
    })
  }

  updateFireDish(dish: IAmDish, obj: any){
    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return updateDoc(dishDocRef, obj);
  }
  
  getFireKitchens(){
    const kitchensRef = collection(this.firestore, 'kitchens');
    const kitchensArr =  collectionData(kitchensRef, {idField: 'id'}) as Observable<IAmString[]>;
    kitchensArr.subscribe(res => {
      this.kitchens = [];
      res.forEach( d => this.kitchens.push(d.str));
    });
  }

  getFireCategories(){
    const categoriesRef = collection(this.firestore, 'categories');
    const categoriesArr =  collectionData(categoriesRef, {idField: 'id'}) as Observable<IAmString[]>;
    categoriesArr.subscribe(res => {
      this.category = [];
      res.forEach( d => this.category.push(d.str));
    });
  }

  getFireTypes(){
    const typesRef = collection(this.firestore, 'types');
    const typesArr =  collectionData(typesRef, {idField: 'id'}) as Observable<IAmString[]>;
    typesArr.subscribe(res => {
      this.type = [];
      res.forEach( d => this.type.push(d.str));
    });
  }

  }
