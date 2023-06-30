import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPopupMessageComponent } from './confirmation-popup-message.component';

describe('ConfirmationPopupMessageComponent', () => {
  let component: ConfirmationPopupMessageComponent;
  let fixture: ComponentFixture<ConfirmationPopupMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationPopupMessageComponent]
    });
    fixture = TestBed.createComponent(ConfirmationPopupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
