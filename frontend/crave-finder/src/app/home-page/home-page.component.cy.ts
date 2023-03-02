import { HomePageComponent } from "./home-page.component";

describe('HomePageCompoennt', () => {
    it('Can be mounted?', () => {
        cy.mount(HomePageComponent)
    })

    it('Can take an input for search?', () => {
        cy.mount(HomePageComponent)

        const search = 'Good Food'

        cy.get('input[name="search"]').type(search)
    })
})