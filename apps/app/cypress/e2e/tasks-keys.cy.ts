describe('Task Input Focus and Creation', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login();
  });

  it('should focus on New Task input when pressing "n" key and create multiple tasks without losing focus', () => {
    // Press 'n' key to focus on the input
    cy.get('body').type('n');

    // Check if the input is focused
    cy.get('[data-testid=new-task-name]').should('have.focus');

    // Type first task name and press enter
    const taskName1 = 'New Test Task 1';
    cy.get('[data-testid=new-task-name]').type(`${taskName1}{enter}`);

    // Check if the first task was created
    cy.get('[data-testid=task-item]').first().should('contain.text', taskName1);

    // Check if the input is cleared and still focused
    cy.get('[data-testid=new-task-name]')
      .should('have.value', '')
      .and('have.focus');

    // Immediately type second task name without refocusing and press enter
    const taskName2 = 'New Test Task 2';
    cy.get('[data-testid=new-task-name]').type(`${taskName2}{enter}`);

    // Check if the second task was created
    cy.get('[data-testid=task-item]').first().should('contain.text', taskName2);

    // Check if the input is cleared and still focused after second task
    cy.get('[data-testid=new-task-name]')
      .should('have.value', '')
      .and('have.focus');

    // Verify both tasks are present
    cy.get('[data-testid=task-item]').should('have.length', 2);
    cy.get('[data-testid=task-item]').eq(0).should('contain.text', taskName2);
    cy.get('[data-testid=task-item]').eq(1).should('contain.text', taskName1);
  });

  it('should navigate through tasks using up and down arrow keys', () => {
    // Create three tasks
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    const selectedColor = 'rgb(157, 218, 251)';

    // Press 'n' key to focus on the input
    cy.get('body').type('n');

    tasks.forEach((task) => {
      cy.get('[data-testid=new-task-name]').type(`${task}{enter}`);
    });

    // Hit escape to blur the input
    cy.get('body').type('{esc}');

    // Press down arrow key to select the first task
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid=task-item]')
      .first()
      .should('have.css', 'background-color', selectedColor);

    // Press down arrow key again to select the second task
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid=task-item]')
      .eq(1)
      .should('have.css', 'background-color', selectedColor);

    // Press up arrow key to select the first task again
    cy.get('body').type('{uparrow}');
    cy.get('[data-testid=task-item]')
      .first()
      .should('have.css', 'background-color', selectedColor);

    // Press up arrow key again, selection should remain on the first task
    cy.get('body').type('{uparrow}');
    cy.get('[data-testid=task-item]')
      .first()
      .should('have.css', 'background-color', selectedColor);

    // Press down arrow key multiple times to reach the last task
    cy.get('body').type('{downarrow}{downarrow}');
    cy.get('[data-testid=task-item]')
      .last()
      .should('have.css', 'background-color', selectedColor);

    // Press down arrow key again, selection should remain on the last task
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid=task-item]')
      .last()
      .should('have.css', 'background-color', selectedColor);
  });

  it('should delete a selected task when pressing the delete key', () => {
    // Create three tasks
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    const selectedColor = 'rgb(157, 218, 251)';

    // Press 'n' key to focus on the input
    cy.get('body').type('n');

    tasks.forEach((task) => {
      cy.get('[data-testid=new-task-name]').type(`${task}{enter}`);
    });

    // Hit escape to blur the input
    cy.get('body').type('{esc}');

    // Press down arrow key to select the second task
    cy.get('body').type('{downarrow}{downarrow}');
    cy.get('[data-testid=task-item]')
      .eq(1)
      .should('have.css', 'background-color', selectedColor);

    // Press delete key to delete the selected task
    cy.get('body').type('{del}');

    // Verify that the second task has been deleted
    cy.get('[data-testid=task-item-title]').should('have.length', 2);
    cy.get('[data-testid=task-item-title]')
      .first()
      .should('contain.text', 'Task 3');
    cy.get('[data-testid=task-item-title]')
      .last()
      .should('contain.text', 'Task 1');

    // Verify that the selection moves to the next task (now 'Task 3')
    cy.get('[data-testid=task-item]')
      .last()
      .should('have.css', 'background-color', selectedColor);
  });
});
