const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

// mongoose.connect('mongodb://localhost:27017/Testing', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error(' MongoDB connection error:', err));
mongoose.connect('mongodb://localhost:27017/Testing')
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error(' MongoDB connection error:', err));



const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema, 'usernames&passwords'); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(200).json({ message: ' User saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' Server error' });
  }
});


app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
