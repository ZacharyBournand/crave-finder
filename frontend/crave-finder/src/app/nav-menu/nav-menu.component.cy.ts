import { NavMenuComponent } from "./nav-menu.component"
import { MountConfig } from "cypress/angular"
import { MatMenuModule } from "@angular/material/menu"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('NavMenuComponent', () => {
    const config: MountConfig<NavMenuComponent> = {
        imports: [MatMenuModule, BrowserAnimationsModule]
    } 
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