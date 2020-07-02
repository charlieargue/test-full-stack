const FE_URL = 'http://localhost:3000/'
// --------------
// --------------
// ATTENTION: these tests must be run in order (so do not activate cypress PARALLEL runs until refactored)
// --------------
// --------------
describe('User Tests', () => {
    const beforeName = 'Howard Simon'
    const afterName = 'New Guy'

    // --------------
    beforeEach(() => {
        cy.visit(FE_URL)
    })

    // --------------
    it('User exists on dashboard', () => {
        cy.contains(beforeName)
    })

    // --------------
    it('Can get click a user and get a modal', () => {
        cy.contains(beforeName).click()
        cy.contains('Edit User')
    })

    // --------------
    it('Can save users name and user list should immediately reflect that', () => {
        cy.contains(beforeName).click()

        cy.get('#formName')
            .type('{selectall}{backspace}')
            .type(afterName)
            .type('{enter}')

        cy.contains('Edit User').should('not.be.visible')

        cy.contains(beforeName).should('not.be.visible')
    })

    // --------------
    it('Can put things back', () => {
        cy.contains(afterName).click()

        cy.get('#formName')
            .type('{selectall}{backspace}')
            .type(beforeName)
            .type('{enter}')

        cy.contains('Edit User').should('not.be.visible')

        cy.contains(beforeName).should('be.visible')
    })

    // --------------
    it('User names must be unique', () => {
        cy.contains(beforeName).click()

        cy.get('#formName')
            .type('{selectall}{backspace}')
            .type('Kieslowski')
            .type('{enter}')

        // click save
        cy.get('#btnSaveUserForm').click()

        // remain in modal, see toast error msg
        cy.contains('Edit User').should('be.visible')

        cy
            .get('.toast')
            .contains('🚨Duplicate: Names must be unique!')
    })

    // --------------
    it('No results raises toast message', () => {
        // search for "cat"
        cy
            .get('#searchForm')
            .type('cat')

        cy
            .get('.toast')
            .contains('🚨No results: Please try again!')
    })

    // --------------
    it('Dashboard initially shows 6 cards and can load more until toast message', () => {
        // expect 6 results
        cy
            .get('.card')
            .its('length')
            .should('be.eq', 6)

        // load more (expect 12)
        cy.get('#btnLoadMore').click()
        cy.wait(1000)
        cy
            .get('.card')
            .its('length')
            .should('be.eq', 12)

        // scrolling should work, so button Load More should be visible
        cy.get('#btnLoadMore').should('be.visible')

        // load more (expect 13 total)
        cy.get('#btnLoadMore').click()
        cy.wait(1000)
        cy
            .get('.card')
            .its('length')
            .should('be.eq', 13)

        // scrolling should work, so button Load More should be visible
        cy.get('#btnLoadMore').should('be.visible')

        // one more click should result in toast message
        cy.get('#btnLoadMore').click()

        cy
            .get('.toast')
            .contains('🚨No results: Please try again!')
    })

    // --------------
    it('Searching works as expected (and resets correctly)', () => {
        // search for "Bob"
        cy
            .get('#searchForm')
            .type('Bob')

        // wait
        cy.wait(1000)

        // expect 2 results
        cy
            .get('.card')
            .its('length')
            .should('be.eq', 2)

        // clear search form, should see 6 cards again
        cy
            .get('#searchForm')
            .type('{selectall}{backspace}')
        cy.wait(1000)
        cy
            .get('.card')
            .its('length')
            .should('be.eq', 6)

    })


    // --------------
    it('No locations found for map raises toast message', () => {

        cy.contains(beforeName).click()
        cy.contains('Edit User')

        cy.get('#formAddress')
            .type('{selectall}{backspace}')
            .type('asdflkjasdlkfj')

        // cy.wait(500)

        cy
            .get('.toast')
            .contains('🚨Location not found, please try again!')
    })
})