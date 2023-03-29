import { NavMenuComponent } from "./nav-menu.component"
import { MountConfig } from "cypress/angular"
import { MatMenuModule } from "@angular/material/menu"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('NavMenuComponent', () => {
    const config: MountConfig<NavMenuComponent> = {
        imports: [MatMenuModule, BrowserAnimationsModule]
    } 

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [NavMenuComponent]
    }))

    it('Can be mounted?', () => {
        cy.mount(NavMenuComponent, config)
    })

    it('Shows new menu after being clicked?', () => {
        cy.mount(NavMenuComponent, config)

        cy.get('button').click()
        cy.wait(1000)
        cy.get('a').should('be.visible')
    })
})