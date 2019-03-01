// import supertest from "supertest";
// import app from "../../../index";
// import { User, Recipe } from "../../../database/models";
// import { generateUser, generateRecipe } from "../../utils/generate";

// describe("The getRecipe endpoint", () => {
//   test("get a single recipe by id", async () => {
//     //arrange
//     let { access_token, user } = await generateUser();

//     const fakeRecipe = generateRecipe();
//     const recipe = await Recipe.create({ ...fakeRecipe, userId: user.id });
//     const response = await supertest(app)
//       .get(`/api/v1/recipes/${recipe.id}`)
//       .send({
//         access_token
//       });

//     console.log(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.recipe.title).toBe(fakeRecipe.title);
//   });

//   test("returns a 404 if recipe is not found", async () => {
//     //arrange
//     let { access_token, user } = await generateUser();

//     const fakeRecipe = generateRecipe();
//     const recipe = await Recipe.create({ ...fakeRecipe, userId: user.id });
//     const response = await supertest(app)
//       .get(`/api/v1/recipes/${recipe.id}`)
//       .send({
//         access_token
//       });

//     console.log(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.recipe.title).toBe(fakeRecipe.title);
//   });
// });
