import supertest from "supertest";
import app from "../../../index";
import { User, Recipe } from "../../../database/models";
import { generateUser, generateRecipe } from "../../utils/generate";
describe("The create recipe process", () => {
  test("should create recipe and return recipe details", async () => {
    //arrange
    //create fake recipe
    const { user, access_token } = await generateUser();
    const fakeRecipe = await generateRecipe();

    // action
    const response = await supertest(app)
      .post("/api/v1/recipes")
      .send({ ...fakeRecipe, access_token });
    //make an authenticated request to create a recipe
    console.log(response.body);
    //assertion

    // make sure recipe is returned
    expect(response.status).toBe(201);
    expect(response.body.data.recipe.title).toBe(fakeRecipe.title);
    expect(response.body.data.recipe.description).toBe(fakeRecipe.description);
    // make sure recipe is in database
    const recipeFromDatabase = await Recipe.find({
      where: { title: response.body.data.recipe.title }
    });
    expect(recipeFromDatabase).toBeTruthy();
    //
  });
});
