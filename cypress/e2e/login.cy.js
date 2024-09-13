describe('login test', () => {
  const {EMAIL, PASSWORD, API_URL, WRONG_EMAIL, WRONG_PASSWORD} = Cypress.env();

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should not submit the form with invalid email and empty password', () => {
    cy.get('input[name="email"]').type(WRONG_EMAIL);
    cy.get('button[type="submit"]').click();
    cy.get('.MuiFormHelperText-root').should(
      'contain',
      'email must be a valid email'
    );
    cy.get('.MuiFormHelperText-root').should('contain', 'Password is required');
  });

  it('should not submit the form with invalid password and empty email', () => {
    cy.get('input[name="password"]').type(WRONG_PASSWORD);
    cy.get('button[type="submit"]').click();
    cy.get('.MuiFormHelperText-root').should('contain', 'Email is required');
  });

  it('should not submit the form with empty password and email', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.MuiFormHelperText-root').should('contain', 'Password is required');
    cy.get('.MuiFormHelperText-root').should('contain', 'Email is required');
  });

  it('should show loading state when submitting', () => {
    cy.intercept('POST', `${API_URL}/api/v1/users/login`, {
      body: {message: 'login successful'},
      delay: 1000,
    }).as('loginRequest');
    cy.get('button[type="submit"]').should('not.be.disabled');

    cy.get('input[name="email"]').type(EMAIL);
    cy.get('input[name="password"]').type(PASSWORD);
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.wait('@loginRequest');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should navigate to the forgot password page', () => {
    cy.get('a[href="/auth/forgot-password"]').click();
    cy.url().should('include', '/auth/forgot-password');
  });
});
