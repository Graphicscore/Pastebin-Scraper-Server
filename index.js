var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

connection.connect();

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/api/stats', function (req, res) {
  connection.query('SELECT sum(size) AS size,count(*) AS count FROM pastes;', function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]);
  });
});

app.get('/api/read/:key', function (req, res) {
  var key = req.params.key;
  if(key.length != null && key.length > 0){
    console.log("Doing");
    var sql = "SELECT * FROM pastes WHERE paste_key LIKE " + connection.escape(key) + ";";
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      res.send(results[0]);
    });
  }else{
    res.send("{}")
  }

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



//connection.end();
