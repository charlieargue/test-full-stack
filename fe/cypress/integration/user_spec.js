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
    it('Can get users on dashboard', () => {
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
        cy.pause()
        // cy.contains('Edit User').should('not.be.visible')
        
        // cy.contains(beforeName).should('be.visible')
    })
})