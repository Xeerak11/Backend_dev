import express from "express";
import path from "path";
import mongoose from "mongoose"
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
let db= await mongoose.connect("mongodb://localhost:27015/day9").then(()=>console.log("chalgya")).catch((err)=>console.log(err));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



const vote_schema = new mongoose.Schema({
  option: String,     
  votes: {
    type: Number,
    default: 0
  }
});


const vote_model=mongoose.model('day9',vote_schema,'voting')

// app.post("/vote/OPTION_ID_B",async(req,res)=>{
//   console.log(req.body)
//    res.redirect('/')

// })

// app.post("/vote/OPTION_ID_A",async(req,res)=>{
//   console.log(req.body)
//   res.redirect('/')
// })

// app.post("/vote/OPTION_ID_C",async(req,res)=>{
//   console.log(req.body)
//    res.redirect('/')
// })

app.post("/vote/:option", async (req, res) => {
  const optionId = req.params.option; 


  let vote = await vote_model.findOne({ option: optionId });


  if (!vote) {
    vote = new vote_model({ option: optionId, votes: 1 });
  } else {
    vote.votes += 1;
  }

  await vote.save();
  res.redirect('/');
});

app.get('/results', async (req, res) => {
  const votes = await vote_model.find(); 

  let html = `<h1>Vote Results</h1><ul>`;
  votes.forEach(v => {
    html += `<li>Option ${v.option}: ${v.votes} votes</li>`;
  });
  html += `</ul><a href="/">Back to voting</a>`;

  res.send(html);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

