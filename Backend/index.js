import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import RecipeModal from "./RecipeModal.js"

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = 3001

mongoose.connect('mongodb+srv://heavyarms75:thunder75@cluster0.w8w69v9.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.get('/api/list', async (req, res) => {
    const recipe = await RecipeModal.find()
    res.json(recipe)
})

app.post('/api/create', async (req, res) => {
    const newRecipe = new RecipeModal(req.body);
    await newRecipe.save();
    res.send('Recipe Posted')
})

app.put('/api/update', async (req, res) => {
    await RecipeModal.updateOne({_id: req.body._id}, req.body)
    console.log(req.body)
    res.send('Recipe updated')
})

app.delete('/api/delete', async (req, res) => {
    await RecipeModal.deleteOne({"_id": req.body._id})
    res.send('Recipe deleted')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})