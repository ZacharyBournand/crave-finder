import { HomePageComponent } from "./home-page.component";
import { MountConfig } from "cypress/angular"
import { MatMenuModule } from "@angular/material/menu"

describe('HomePageCompoennt', () => {
    const config: MountConfig<HomePageComponent> = {
        imports: [MatMenuModule]
    }
    it('Can be mounted?', () => {
        cy.mount(HomePageComponent, config)
    })

    it('Can take an input for search?', () => {
        cy.mount(HomePageComponent, config)

        const search = 'Good Food'

        cy.get('input[name="search"]').type(search)
    })
})