/// <reference types="cypress" />

describe('posts', () => {
  beforeEach(() => {
    // Nothing here yet.
  });

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newPost = 'This is a test';
    cy.clearLocalStorage();
    cy.login();

    cy.get('[data-testid=new-post-name]').type(`${newPost}{enter}`);

    cy.get('[data-testid=post-item]')
      .should('have.length.above', 0)
      .first()
      .should('contain.text', newPost);
  });
});
