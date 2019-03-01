import supertest from "supertest";
import app from "../../../index";
import { User, Recipe } from "../../../database/models";
import { generateUser, generateRecipe } from "../../utils/generate";

describe("The delete recipe endpoint", () => {
  test("deletes recipe from database and returns recipe", async () => {
    //arrange
    let { access_token, user } = await generateUser();

    const fakeRecipe = generateRecipe();
    const recipe = await Recipe.create({ ...fakeRecipe, userId: user.id });
    const response = await supertest(app)
      .delete(`/api/v1/recipes/${recipe.id}`)
      .send({
        access_token
      });

    console.log(response.body);
    expect(response.status).toBe(200);

    const recipeFromDatabase = await Recipe.findAll({
      where: { id: recipe.id }
    });
    expect(recipeFromDatabase.length).toBe(0);
  });
});
