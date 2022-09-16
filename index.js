require("dotenv").config();
const request = require("request-promise");
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const routerCustom = require("./src/routers/index");
const app = express();
//hake
routerCustom(app);

const port = process.env.PORT || 7500;
app.listen(port, () => {
    console.log("App is running at : ", port);
});
