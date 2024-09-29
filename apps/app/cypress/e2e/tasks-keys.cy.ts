describe('Task Input Focus, Creation, Navigation, and Deletion', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login();
  });

  it('should handle task creation, navigation, and deletion using keyboard shortcuts', () => {
    // 1. Press n, validate add task input focused
    cy.log('1. Press n, validate add task input focused');
    cy.get('body').type('n');
    cy.get('[data-testid=new-task-name]').should('have.focus');

    // 2. Enter 3 tasks, validate three tasks added
    cy.log('2. Enter 3 tasks, validate three tasks added');
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    tasks.forEach((task) => {
      cy.get('[data-testid=new-task-name]').type(`${task}{enter}`);
    });
    cy.get('[data-testid=task-item]').should('have.length', 3);

    // 3. Press escape, validate add task input blurred
    cy.log('3. Press escape, validate add task input blurred');
    cy.get('body').type('{esc}');
    cy.get('[data-testid=new-task-name]').should('not.have.focus');

    // 4. Press down arrow, validate first task selected
    cy.log('4. Press down arrow, validate first task selected');
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid=task-item]')
      .first()
      .should('have.css', 'background-color', 'rgb(157, 218, 251)');

    // 5. Press down arrow, validate second task selected
    cy.log('5. Press down arrow, validate second task selected');
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid=task-item]')
      .eq(1)
      .should('have.css', 'background-color', 'rgb(157, 218, 251)');

    // 6. Press up arrow, validate first task selected
    cy.log('6. Press up arrow, validate first task selected');
    cy.get('body').type('{uparrow}');
    cy.get('[data-testid=task-item]')
      .first()
      .should('have.css', 'background-color', 'rgb(157, 218, 251)');

    // 7. Press up arrow, validate add task input focused
    cy.log('7. Press up arrow, validate add task input focused');
    cy.get('body').type('{uparrow}');
    cy.get('[data-testid=new-task-name]').should('have.focus');

    // 8. Press down arrow twice, validate second task selected
    cy.log('8. Press down arrow twice, validate second task selected');
    cy.get('body').type('{downarrow}');
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid=task-item]')
      .eq(1)
      .should('have.css', 'background-color', 'rgb(157, 218, 251)');

    // 9. Press del, validate second task deleted
    cy.log('9. Press del, validate second task deleted');
    cy.get('body').type('{del}');
    cy.get('[data-testid=task-item]').should('have.length', 2);
    cy.get('[data-testid=task-item-title]')
      .first()
      .should('contain.text', 'Task 3');
    cy.get('[data-testid=task-item-title]')
      .last()
      .should('contain.text', 'Task 1');
  });
});
