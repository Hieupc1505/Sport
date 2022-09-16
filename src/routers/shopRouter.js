const route = require("express").Router();
const shopController = require("../controllers/shopController");
route.get("/search/:keyword", shopController.getSearch);

module.exports = route;
