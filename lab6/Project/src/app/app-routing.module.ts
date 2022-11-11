import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CartComponent } from './cart/cart.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { FormAddDishComponent } from './form-add-dish/form-add-dish.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent , canActivate: [AuthGuard]},
  {path: 'addDish', component: FormAddDishComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent , canActivate: [AuthGuard]},
  {path: 'dishDetail', component: DishDetailComponent, canActivate: [AuthGuard]},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'adminView', component: AdminViewComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignInComponent,SignUpComponent,AdminViewComponent,DishDetailComponent, HomeComponent, MenuComponent, CartComponent, FormAddDishComponent ]
