import { SearchResultComponent } from "./search-result.component";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPageComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [SearchResultComponent]
    }))

    it('Can be mounted?', () => {
        cy.mount(SearchResultComponent)
    })

    it('Can take a location and search term as inputs.', () => {
        cy.mount(SearchResultComponent)

        const location = 'Gainesville';
        const term = 's3cret';

        cy.get('input[id="location"]')
            .type(location)
        cy.get('input[id="term"')
            .type(term)
    })
})