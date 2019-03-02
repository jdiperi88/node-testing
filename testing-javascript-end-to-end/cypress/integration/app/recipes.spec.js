const generate = require("../../utils/generate");
describe("The recipe creation process", () => {
  it("should create a recipe for the user", () => {
    //arrange
    const fakeRecipe = generate.fakeRecipe();
    beforeEach(() => {
      const fakeUser = generate.fakeUser();
      cy.request(
        "POST",
        "http://localhost:5678/api/v1/users/signup",
        fakeUser
      ).then(response => {
        cy.window().then(window => {
          window.localStorage.setItem(
            "authedUser",
            JSON.stringify(response.body)
          );
        });
      });
    });

    cy.contains("Create recipe").click();
    cy.get("[data-testid=recipeTitle]").type(fake.fakeRecipe.timeToCook);
    cy.get("[data-testid=recipeTimeToCook]").type(fake.fakeRecipe.timeToCook);
    cy.get("[data-testid=recipedescription]").type(fake.fakeRecipe.description);
    cy.get("[data-testid=recipeIngredients-0]").type(
      fake.fakeRecipe.ingredients[0]
    );
    cy.contains("Add ingredient").click();
    cy.get("[data-testid=recipeIngredients-1]").type(
      fake.fakeRecipe.ingredients[1]
    );

    cy.get("[data-testid=recipeProcedure-0]").type(
      fake.fakeRecipe.Procedure[0]
    );
    cy.contains("Add procedure").click();

    cy.get("[data-testid=recipeProcedure-1]").type(
      fake.fakeRecipe.Procedure[1]
    );

    cy.contains("Publish Id").click();

    // assertions
    cy.url().should("contain", "recipe");

    cy.contains(fake.recipe.title);
    cy.contains(fake.recipe.description);
    cy.contains(fake.recipe.timeToCook);
    cy.contains(fake.recipe.ingredients[0]);
  });
});
