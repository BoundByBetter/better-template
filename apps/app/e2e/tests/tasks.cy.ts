/// <reference types="cypress" />

describe('Task Input Focus, Creation, Navigation, Deletion, and Details', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login();
  });

  it('should handle task creation, navigation, deletion, and details viewing', () => {
    // 1. Create 3 tasks
    cy.log('1. Create 3 tasks');
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    tasks.forEach((task) => {
      cy.get('[data-testid=new-task-name]').click().type(task);
      cy.get('[data-testid=new-task-submit]').click();
    });
    cy.get('[data-testid=task-item]').should('have.length', 3);

    // 2. Validate task details on large screens
    cy.log('2. Validate task details on large screens');
    cy.viewport(1200, 800);
    cy.reload();
    cy.get('[data-testid=task-item]').first().click();
    cy.get('[data-testid=task-details]').should('be.visible');
    cy.get('[data-testid=task-list]').should('be.visible');
    cy.get('[data-testid=task-details-title]').should('contain.text', 'Task 3');

    // 3. Validate task details on smaller screens
    cy.log('3. Validate task details on smaller screens');
    cy.viewport(800, 600);
    cy.reload();
    cy.get('[data-testid=task-item]').eq(1).click();
    cy.get('[data-testid=task-details]').should('be.visible');
    cy.get('[data-testid=task-details-title]').should('contain.text', 'Task 2');

    // 4. Close task details on smaller screens
    cy.log('4. Close task details on smaller screens');
    cy.get('[data-testid=task-details-close]').click();
    cy.get('[data-testid=task-list]').should('be.visible');
    cy.get('[data-testid=task-details]').should('not.exist');

    // 5. Delete a task
    cy.log('5. Delete a task');
    cy.get('[data-testid=task-item-delete]').first().click();
    cy.get('[data-testid=task-item]').should('have.length', 2);
    cy.get('[data-testid=task-item-title]')
      .first()
      .should('contain.text', 'Task 2');
    cy.get('[data-testid=task-item-title]')
      .last()
      .should('contain.text', 'Task 1');
  });
});
