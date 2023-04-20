import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMenuComponent } from './rate-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatMenuContent, MatMenuModule } from '@angular/material/menu';
import { MatFormField } from '@angular/material/form-field';
import { MAT_SELECT_SCROLL_STRATEGY, MAT_SELECT_SCROLL_STRATEGY_PROVIDER, MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgbRating, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RateMenuComponent', () => {
  let component: RateMenuComponent;
  let fixture: ComponentFixture<RateMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatMenuModule, MatAutocompleteModule, MatSelectModule, NgbRating, BrowserAnimationsModule],
    providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
 ],
      declarations: [ RateMenuComponent, MatMenuContent, MatFormField, MatSelect, ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
