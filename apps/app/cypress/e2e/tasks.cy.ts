/// <reference types="cypress" />

describe('tasks', () => {
  beforeEach(() => {
    // Nothing here yet.
  });

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newTask = 'This is a test';
    cy.clearLocalStorage();
    cy.login();

    cy.get('[data-testid=new-task-name]').type(`${newTask}{enter}`);

    cy.get('[data-testid=task-item]')
      .should('have.length.above', 0)
      .first()
      .should('contain.text', newTask);
  });
});
