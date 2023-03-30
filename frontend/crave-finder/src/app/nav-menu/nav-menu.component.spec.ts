import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from "@angular/material/menu"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuComponent } from './nav-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [ NavMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component);
  });
});
