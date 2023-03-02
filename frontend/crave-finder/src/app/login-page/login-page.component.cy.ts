import { LoginPageComponent } from "./login-page.component";


describe('LoginPageComponent', () => {
    it('Can be mounted?', () => {
        cy.mount(LoginPageComponent)
    })

    it('Can take a username and password as inputs.', () => {
        cy.mount(LoginPageComponent)

        const username = 'testuser123';
        const password = 's3cret';

        cy.get('input[name="username"]')
            .type(username)
        cy.get('input[name="password"]')
            .type(password)
    })
})