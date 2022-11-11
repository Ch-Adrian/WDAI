import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestauracjaComponent } from './restauracja/restauracja.component';
import { FormAddDishComponent } from './form-add-dish/form-add-dish.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DescriptionComponent } from './description/description.component';
import { ModifyButtonsComponent } from './modify-buttons/modify-buttons.component';
import { FilterComponent } from './filter/filter.component';
import { RateStarComponent } from './rate-star/rate-star.component';
import { CartComponent } from './cart/cart.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { FormAddReviewComponent } from './form-add-review/form-add-review.component';
import { environment } from 'src/environments/environment';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

@NgModule({
  declarations: [
    AppComponent,
    RestauracjaComponent,
    FormAddDishComponent,
    DescriptionComponent,
    ModifyButtonsComponent,
    FilterComponent,
    RateStarComponent,
    CartComponent,
    SearchPipePipe,
    MenuComponent,
    HomeComponent,
    ShoppingListComponent,
    DishDetailComponent,
    FormAddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
