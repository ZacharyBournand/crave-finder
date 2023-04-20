import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsPageComponent } from './reviews-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('ReviewsPageComponent', () => {
  let component: ReviewsPageComponent;
  let fixture: ComponentFixture<ReviewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ ReviewsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
