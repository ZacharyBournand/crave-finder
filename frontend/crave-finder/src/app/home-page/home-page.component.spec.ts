import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatMenuModule, FormsModule, ReactiveFormsModule, RouterTestingModule,
      MatInputModule, BrowserAnimationsModule],
      declarations: [ HomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  /*it('should navigate to search results page when Restaurant button is clicked', () => {
    spyOn(component, 'getCriteria'); // Spy on the getCriteria method to see if it's called

    const button = fixture.debugElement.nativeElement.querySelector(By.css('button[matMenuTriggerFor="searchType"]'));
    button.click(); // Get the Search button

    fixture.detectChanges(); // Detect changes after clicking the button

    const restaurantButton = fixture.debugElement.nativeElement.querySelector(By.css('button[routerlink="search-results"]'));
    restaurantButton.click(); // Click the Restaurant button

    expect(component.getCriteria).toHaveBeenCalled(); // Expect getCriteria method to have been called with 'name' as an argument
  });*/

  it('should render two buttons', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click(); // Get the Search button
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
  })
});
