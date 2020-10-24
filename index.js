require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 8080 } = process.env;
app.get("/", function (req, res) {
    res.send("Hello")
})
app.use("/mangas", require('./app/routes/mangas'));

app.listen(PORT, function () {
    console.log('App listening in port', PORT);
});
