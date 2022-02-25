describe('App E2E Test', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: '/api/graphql'
    }).as('graphqlCall');
  });
  let items = [];
  it("Visit page, checks that it doesn't have any items.", () => {
    cy.visit('http://localhost:3000/');
    cy.wait('@graphqlCall');
    cy.get('h4').contains("No items to show, let's add some!");
  });
  it('Get items from fixture', () => {
    cy.fixture('AppE2E').then((data) => {
      items = data.ITEMS;
    });
  });
  it('Adds 8 items', async () => {
    for (let i = 0; i < items.length; i++) {
      cy.get('div.bodyContainer input').type(items[i]);
      cy.contains('Add Item').click();
      await new Promise((res, rej) => {
        cy.wait('@graphqlCall').then(() => {
          res();
        });
      });
      
      if (i === items.length - 1) {
        cy.wait(1000);
        cy.get('.item-component').should('have.length', 6);
        cy.get('.page-item-number').should('have.length', 2);
      }
    }
  });
  it('Go to the page #2', () => {
    cy.get('.page-item-next').click();
    cy.get('.item-component').should('have.length', 3);
  });
});
