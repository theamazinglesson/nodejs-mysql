const express =require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const conn = require('./config/db.js');
const playerRoute = require('./routes/players.js');
const app = express();







app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));



conn.connect((err)=>{
  if(err) throw err;
  console.log("Db is connected successfully: ", conn.threadId);
})






app.use('/api', playerRoute);





app.listen(5000, ()=> console.log("server is running on port : "+5000));
