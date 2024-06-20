const User = require("../models/user");
const { privateFind, publicFind } = require("../functions/findSnippets");

const findSnippets = async (req, res) => {
  let responsePayload;
  try {
    if (req.body.status === "public") {
      responsePayload = await publicFind(req);
    } else {
      responsePayload = await privateFind(req);
    }
    res.status(responsePayload.statusCode).json(responsePayload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllSnippets = async (req, res) => {
  try {
    const allUsers = await User.find();
    const allSnippets = allUsers.map((user) => {
      return user.public;
    }).flat();
    const responsePayload = {
      statusCode: 200,
      message: "Success",
      snippet: allSnippets,
    };
    res.status(responsePayload.statusCode).json(responsePayload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { findSnippets, getAllSnippets };
