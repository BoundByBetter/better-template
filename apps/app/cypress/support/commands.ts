/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// Cypress.Commands.add('clearAppState', () => {
//   // Clear localStorage
//   cy.window().then((win) => {
//     win.localStorage.clear();
//   });

//   // Clear IndexedDB (if you're using it)
//   cy.window().then((win) => {
//     const databases = win.indexedDB.databases();
//     databases.then((dbs) => {
//       dbs.forEach((db) => {
//         if (db.name) {
//           win.indexedDB.deleteDatabase(db.name);
//         }
//       });
//     });
//   });

//   // Reload the page to ensure a fresh state
//   cy.reload();
// });

// Cypress.Commands.addAll({
//   clearAppState: () => {},
// });
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<any>;
  }
}
Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:8081/');
  // if the Microsoft button is present, click it
  const button = cy.get('button').contains('Microsoft');
  if (button) {
    button.click();
  }
  cy.get('[data-testid="home-screen"]').should('exist');
});
