const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const allRoutes = require("./routes");
app.use(allRoutes)

app.listen(PORT, () =>
  console.log(`App listening to smoov soundz at http://localhost:${PORT}`)
);


