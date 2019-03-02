const server = require("../utils/setup");

describe("the recipe action", () => {
  it("should favorite a recipe", () => {
    //arrange

    //setup first user, create recipe
    const user1 = generateUser();
    const recipe1 = generateFakeRecipe();
    cy.request("POST", "http://localhost:5678/api/v1/users/signup", user1).then(
      response => {
        cy.request(
          "POST",
          "http://localhost:5678/api/v1/users/recipes",
          recipe1
        ).then();
      }
    );
  });
});
