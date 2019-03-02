const { generateFakeRecipe, generateUser } = require("../../utils/generate");
describe("the recipe action", () => {
  it("should favorite a recipe", () => {
    //arrange

    //setup first user, create recipe
    const user1 = generateUser();

    cy.request("POST", "http://localhost:5678/api/v1/users/signup", user1).then(
      response => {
        cy.window().then(window => {
          window.localStorage.setItem(
            "authedUser",
            JSON.stringify(response.body)
          );
        });
      }
    );
  });
});
