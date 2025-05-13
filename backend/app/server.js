const express = require('express'); // 
const mongoose = require('mongoose');   
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.sd3rncw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("Conectat la MongoDB"))
  .catch(err => console.error(err));

const commentsRoutes = require('./routes/CommentRoute.js');


app.use('/api/comments', commentsRoutes);

app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
});