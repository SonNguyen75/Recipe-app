import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RecipeModal from "./RecipeModal.js";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3001;

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://heavyarms75:thunder75@cluster0.w8w69v9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/list", async (req, res) => {
  const recipe = await RecipeModal.find();
  res.json(recipe);
});

app.get("/api/find", async (req, res) => {
  const recipe = await RecipeModal.findOne(res.body);
  res.send(recipe._id);
});

app.post("/api/create", async (req, res) => {
  try {
    const newRecipe = new RecipeModal(req.body);
    await newRecipe.save();
    res.send("Recipe created");
  } catch (error) {}
});

app.put("/api/update", async (req, res) => {
  await RecipeModal.updateOne({ _id: req.body._id }, req.body);
  console.log(req.body);
  res.send("Recipe updated");
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await RecipeModal.deleteOne({ _id: id });
    res.send("Recipe delete");
  } catch (error) {
    res.send("Recipe updated");
  }
});

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});
