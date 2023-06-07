import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordComponent } from './new-password.component';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ NewPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});