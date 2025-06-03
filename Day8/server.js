// const express = require('express');
import express from "express"
// const mongoose = require('mongoose');
// const path = require('path');
import mongoose from "mongoose"
import path from "path"
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public'))
})


const question_ans={"question1":4}

let db= await mongoose.connect("mongodb://localhost:27017/quiz").then(()=>console.log("chalgya")).catch((err)=>console.log(err));

const answerSchema= new mongoose.Schema({
    answer:Number
})
const User=mongoose.model('quiz',answerSchema,'answers')

app.post("/",async (req,res)=>{
    console.log(req.body)
    const answer=req.body.q1
    console.log({answer})
    // console.log(req.body)
    const newUser=new User({answer})
    if (answer!=question_ans.question1){
        // console.log(answer)
        // console.log({answer})
        res.send("Answer is incorrect")
        return
    }
    await newUser.save()
    res.send("correct answer")
    console.log("saved ")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
