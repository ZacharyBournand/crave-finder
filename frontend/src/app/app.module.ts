// Core Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

// Angular Materials
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule,  } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Project Components
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RestaurantService } from './restaurants.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { RateMenuComponent } from './rate-menu/rate-menu.component';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import { DishRatingsComponent } from './dish-ratings/dish-ratings.component';
import { ConfirmationPopupMessageComponent } from './confirmation-popup-message/confirmation-popup-message.component';
import { DecimalLimitPipe } from './decimal-limit.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MenuComponent,
    NavMenuComponent,
    HomePageComponent,
    LoginPageComponent,
    SearchResultComponent,
    UserRegistrationComponent,
    UserSettingsComponent,
    NewPasswordComponent,
    ReviewsPageComponent,
    RateMenuComponent,
    PopupMessageComponent,
    DishRatingsComponent,
    ConfirmationPopupMessageComponent,
    DecimalLimitPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent],
})
export class AppModule { }
