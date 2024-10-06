/// <reference types="cypress" />

describe('persistence', () => {
  beforeEach(() => {
    // Nothing here yet.
  });

  it('tasks are persisted across sessions', () => {
    // We'll store our item text in a variable so we can reuse it
    cy.clearLocalStorage();
    cy.login();

    const newTask = 'This is a test';
    cy.get('[data-testid=new-task-name]').type(`${newTask}{enter}`);

    cy.get('[data-testid=task-item]')
      .should('have.length.above', 0)
      .first()
      .should('contain.text', newTask);
    // Close browser and then reopen it to verify task still visible.
    cy.reload();
    // Wait for up to 10 seconds for the task to appear.
    cy.get('[data-testid=task-item]', { timeout: 10000 })
      .should('have.length.above', 0)
      .first()
      .should('contain.text', newTask);
  });
});
