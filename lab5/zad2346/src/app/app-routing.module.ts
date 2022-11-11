import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { FormAddDishComponent } from './form-add-dish/form-add-dish.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'menu', component: MenuComponent },
  {path: 'addDish', component: FormAddDishComponent },
  {path: 'cart', component: CartComponent },
  {path: 'dishDetail', component: DishDetailComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DishDetailComponent, HomeComponent, MenuComponent, CartComponent, FormAddDishComponent ]
