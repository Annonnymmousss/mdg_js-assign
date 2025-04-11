const express = require('express');
const URLrouter = require("./routes/urlroute")
const dotenv = require('dotenv');

const path = require('path');
const app = express()
dotenv.config();
const PORT = process.env.PORT||3000

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/" , URLrouter)





app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
