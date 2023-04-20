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

// Project Components
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RestaurantService } from './restaurant.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { RateMenuComponent } from './rate-menu/rate-menu.component';


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
    RateMenuComponent

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
    MatToolbarModule

  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent],
})
export class AppModule { }
