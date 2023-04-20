import { UserRegistrationComponent } from './user-registration.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserRegistrationComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [UserRegistrationComponent]
    }))

    it('Can be mounted?', () => {
        cy.mount(UserRegistrationComponent)
    })

    it('Can take a username and password as inputs.', () => {
        cy.mount(UserRegistrationComponent)

        const username = 'testuser123';
        const password = 's3cret';

        cy.get('input[name="username"]')
            .type(username)
        cy.get('input[name="password"]')
            .type(password)
    })
})