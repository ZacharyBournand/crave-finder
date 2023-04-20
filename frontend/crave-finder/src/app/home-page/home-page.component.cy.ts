import { HomePageComponent } from "./home-page.component";
import { MountConfig } from "cypress/angular"
import { MatMenuModule } from "@angular/material/menu"
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomePageCompoennt', () => {
    const config: MountConfig<HomePageComponent> = {
        imports: [MatMenuModule]
    }

    beforeEach(() => {TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [HomePageComponent],
        });
    });

    it('Can be mounted?', () => {
        cy.mount(HomePageComponent, config)
    })
})