import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { DishRatingsComponent } from './dish-ratings/dish-ratings.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'restaurant/:name', component: MenuComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'search-results', component: SearchResultComponent},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'password', component: UserSettingsComponent}, 
  {path: 'new-password', component: NewPasswordComponent}, 
  {path: 'reviews', component: ReviewsPageComponent},
  {path: 'dish-ratings/:id', component: DishRatingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
