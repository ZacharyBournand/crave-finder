import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { UserRatingComponent } from './user-rating/user-rating.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'restaurant/:name', component: MenuComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'search-results/:name', component: MenuComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'search-results', component: SearchResultComponent},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'reviews', component: ReviewsPageComponent},
  {path: 'reviews/:name', component: UserRatingComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
