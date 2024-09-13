const {jwtDecode} = require('jwt-decode');
const {ROLES} = require('../../src/shared/constants/roles');

const {VALID_TOKEN, INVALID_TOKEN} = Cypress.env();

describe('Register Page', () => {
  const validTokenUrl = `/auth/register/${VALID_TOKEN}`;
  const invalidTokenUrl = `/auth/register/${INVALID_TOKEN}`;

  it('displays error message for invalid token', () => {
    cy.visit(invalidTokenUrl);
    cy.get('#link_expired').should(
      'contain',
      'Invitation Link Expired. Please contact support and try again.'
    );
  });

  it('displays register form for valid token', () => {
    cy.visit(validTokenUrl);
    cy.get('#register_form').should('be.visible');
  });

  it('should show errors for empty fields', () => {
    cy.visit(validTokenUrl);

    cy.get('#firstName').clear();
    cy.get('#lastName').clear();
    cy.get('#password').clear();
    cy.get('#confirmPassword').clear();
    cy.get('#organizationName').clear();
    cy.get('#time_zone').clear();

    cy.get('button[type="submit"]').click();

    cy.get('.MuiFormHelperText-root').should(
      'contain',
      'At least 3 characters'
    );
    cy.get('.MuiFormHelperText-root').should(
      'contain',
      'At least 3 characters'
    );
    cy.get('.MuiFormHelperText-root').should('contain', 'Password is required');
    cy.get('.MuiFormHelperText-root').should(
      'contain',
      'Confirm Password is required'
    );
    cy.get('.MuiFormHelperText-root').should(
      'contain',
      'Organization name is required'
    );
    cy.get('.MuiFormHelperText-root').should('contain', 'Timezone is required');
  });

  it('displays form field based on role', () => {
    cy.visit(validTokenUrl);
    cy.url().then((url) => {
      const segments = url.split('/');
      const token = segments[segments.length - 1];
      const decodedToken = jwtDecode(token);
      const systemRole = decodedToken.systemRole;

      const {manager} = ROLES;
      if (systemRole === manager.value) {
        cy.get('#password').type('Abc123!abc');
        cy.get('#confirmPassword').type('Abc123!abc');
        cy.get('#organizationName').type('Doctor');
        cy.get('#time_zone').click();
        cy.get('li[role="option"]').first().click();
        cy.get('button[type="submit"]').click();
      } else {
        cy.get('#password').type('Abc123!abc');
        cy.get('#confirmPassword').type('Abc123!abc');
        cy.get('button[type="submit"]').click();
      }
    });
  });

  it('should redirect to login page when clicking the link', () => {
    cy.visit(validTokenUrl);
    cy.contains('Already have an account?').click();
    cy.url().should('include', '/auth/login');
  });
});
