const express = require('express');
const conn = require('../config/db.js');
const router = express.Router();

// https://dev.to/nurofsun/building-simple-rest-api-with-express-js-and-mysql-140p
router.get('/players', (req, res, next)=>{
  const sql = "SELECT * FROM players";

  // res.send("<h1>Hello world</h1>");

  conn.query(sql, (err, result)=>{
    if(err) throw err;

    // res.status(200).json({result});
    // console.log(result);
    res.render('index', {players: result});
  });
});




router.get('/players/add', (req, res, next)=>{
  res.render('add.ejs');
});

router.post('/players/add', (req, res, next)=>{
  // INSERT INTO `players`(`id`, `name`, `club`) VALUES ('[value-1]','[value-2]','[value-3]')
  const values = [
    req.body.name,
    req.body.club
  ]
  let sql = "INSERT INTO players(name, club) VALUES (?)";
  conn.query(sql, [values], function(err, result){
     if (err) throw err;
     console.log("successfully inserted");
     res.redirect('/api/players');
  });
  // res.send("<h1>Hello world</h1>");
  // res.status(200).json({"Message": "Success"});
});




router.get('/players/update/:id', (req, res, next)=>{
  // INSERT INTO `players`(`id`, `name`, `club`) VALUES ('[value-1]','[value-2]','[value-3]')
  const {name, club} = req.body;
  let sql = `SELECT id, name, club FROM players WHERE id=?`;
  conn.query(sql, [req.params.id],  function(err, result){
     if (err) throw err;
     console.log(result);
     res.render('edit.ejs', {player: result[0]})     ;
  });
  // res.send("<h1>Hello world</h1>");
  // res.status(200).json({"Message": "Success"});
});


router.put('/players/update/:id', (req, res, next)=>{
  // INSERT INTO `players`(`id`, `name`, `club`) VALUES ('[value-1]','[value-2]','[value-3]')

console.log("update player");

  const {name, club} = req.body;
  console.log(name, club);
  let sql = `UPDATE players SET name='${name}', club='${club}' WHERE id=?`;
  conn.query(sql, [req.params.id],  function(err, result){
     if (err) throw err;
     console.log("successfully updated", result);
     res.redirect('/api/players');
  });
  // res.send("<h1>Hello world</h1>");
  // res.status(200).json({"Message": "Success"});
});







// let sql = `DELETE FROM players WHERE id=?`;
router.delete('/players/delete/:id', (req, res, next)=>{
  // INSERT INTO `players`(`id`, `name`, `club`) VALUES ('[value-1]','[value-2]','[value-3]')
  console.log(req.params.id);

console.log("update player");
  const sql = `DELETE FROM players WHERE id=?`;
  conn.query(sql, [req.params.id],  function(err, result){
     if (err) throw err;
     console.log("successfully updated", result);
     res.redirect('/api/players');
  });
  // res.send("<h1>Hello world</h1>");
  // res.status(200).json({"Message": "Success"});
});







// router.put('players/update', (req, res, next)=>{})






module.exports = router;
