const express = require("express");
const router = express.Router();
const addUser = require("../controllers/addUser");

const {findSnippets, getAllSnippets} = require("../controllers/findSnippets");
const addSnippet = require("../controllers/addSnippet");
const { getSnippetbyId, getIdbySnippet } = require("../controllers/getSnippet");
const updateSnippet = require("../controllers/updateSnippet");
const {getByCategory,getByCategoryPrivate }= require("../controllers/getBycategory");

router.route("/get/all").get(getAllSnippets);
router.route("/find").post(findSnippets);
router.route("/update").patch(updateSnippet);
router.route("/add/snippet").post(addSnippet);
router.route("/add/user").post(addUser);
router.route("/get/id").post(getIdbySnippet);
router.route("/get/snippet").post(getSnippetbyId);
router.route("/category").post(getByCategory);
router.route("/category/private").post(getByCategoryPrivate);

module.exports = router;
