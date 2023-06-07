import { ReviewsPageComponent } from './reviews-page.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPageComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [ReviewsPageComponent]
    }))

    it('Can be mounted?', () => {
        cy.mount(ReviewsPageComponent)
    })

    it('Can take a location and search term as inputs.', () => {
        cy.mount(ReviewsPageComponent)

        const username = 'test123';

        cy.get('input[id="user-id-input"]')
            .type(username)
    })
})