describe('Forget Password Page', () => {
  const {EMAIL} = Cypress.env();

  it('should show errors for empty fields', () => {
    cy.visit('/auth/forgot-password');

    cy.get('button[type="submit"]').click();

    cy.get('.MuiFormHelperText-root').should('contain', 'Email is required');
  });

  it('should navigate to forget password page with valid email', () => {
    cy.visit('/auth/forgot-password');
    cy.get('#email').type(EMAIL);
    cy.get('form').submit();
    cy.url().should('include', '/auth/forgot-password');
  });

  it('should redirect to login page when clicking the link', () => {
    cy.visit('/auth/forgot-password');
    cy.contains('Login').click();
    cy.url().should('include', '/auth/login');
  });
});
