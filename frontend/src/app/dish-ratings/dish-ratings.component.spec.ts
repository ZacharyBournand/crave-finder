import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishRatingsComponent } from './dish-ratings.component';

describe('DishRatingsComponent', () => {
  let component: DishRatingsComponent;
  let fixture: ComponentFixture<DishRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishRatingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
