const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 4000;

const users = require('./api/users');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/users',users);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
