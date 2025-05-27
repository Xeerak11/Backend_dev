import mongoose from "mongoose";
import express from "express";
import { Todo } from "./models/Todo.js";

// let conn = await mongoose.connect("mongodb://localhost:27017/todo")
try {
  await mongoose.connect("mongodb://localhost:27017/todo");
  console.log(" Connected to MongoDB");
} catch (err) {
  console.error(" MongoDB connection error:", err);
}
const app = express()
const port = 3000


app.get('/',async (req, res) => {

    const todo = new Todo({  desc: "Description of this todo", isDone: false, days: Math.floor(Math.random() * 45 + 5* Math.random()) })
    await todo.save() 
    console.log(todo)
    res.send('Hello World!')
})

app.get('/a', async (req, res) => { 
    let todo = await Todo.findOne({})
    console.log(todo)
    res.json({title: todo.title, desc: todo.desc})
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})