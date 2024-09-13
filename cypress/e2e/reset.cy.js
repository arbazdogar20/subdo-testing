const {VALID_RESET_TOKEN, INVALID_TOKEN} = Cypress.env();

describe('Reset Password Page', () => {
  const validTokenUrl = `/auth/reset/${VALID_RESET_TOKEN}`;
  const invalidTokenUrl = `/auth/reset/${INVALID_TOKEN}`;

  it('displays error message for invalid token', () => {
    cy.visit(invalidTokenUrl);
    cy.get('#link_expired').should(
      'contain',
      'Password Reset Link Expired. Please request a new link.'
    );
    cy.get('button[type="button"]').click();
  });

  it('displays reset form for valid token', () => {
    cy.visit(validTokenUrl);
    cy.get('#reset_form').should('be.visible');
  });

  it('should show errors for empty fields', () => {
    cy.visit(validTokenUrl);
    cy.get('#password').clear();
    cy.get('#confirmPassword').clear();
    cy.get('button[type="submit"]').click();
    cy.get('.MuiFormHelperText-root').should('contain', 'Password is required');
    cy.get('.MuiFormHelperText-root').should(
      'contain',
      'Confirm Password is required'
    );
  });

  it('should show errors for password empty but confirm password not empty', () => {
    cy.visit(validTokenUrl);
    cy.get('#confirmPassword').type('Abc123!abc');
    cy.get('button[type="submit"]').click();
    cy.get('.MuiFormHelperText-root').should('contain', 'Password is required');
    cy.get('.MuiFormHelperText-root').should('contain', 'Passwords must match');
  });

  it('should show errors for password not empty but confirm password is empty', () => {
    cy.visit(validTokenUrl);
    cy.get('#password').type('Abc123!abc');
    cy.get('button[type="submit"]').click();
    cy.get('.MuiFormHelperText-root').should(
      'contain',
      'Confirm Password is required'
    );
  });

  it('submit reset form', () => {
    cy.visit(validTokenUrl);
    cy.get('#password').type('Abc123!abc');
    cy.get('#confirmPassword').type('Abc123!abc');
    cy.get('button[type="submit"]').click();
  });
});
