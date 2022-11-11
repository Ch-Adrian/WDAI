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
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
