const User = require("../models/user");

const getByCategory = async (req, res) => {
  let arr = [];
  const { category } = req.body;
  const categories = await User.find();
  categories.forEach((val) => {
    val.public.forEach((val1) => {
      const catArray = val1.category.split(" ");
      for (i of catArray) {
        if (i === category) {
          arr.push(val1);
        }
      }
    });
  });
  if (arr.length == 0) {
    return res.status(404).json({ message: "No snippets found" });
  } else {
    return res.json({ message: "Success", snippet: arr });
  }
};

const getByCategoryPrivate = async (req, res) => {
  let arr = [];
  const { category, username } = req.body;
  const categories = await User.find({ username });
  categories.forEach((val) => {
    val.private.forEach((val1) => {
      const catArray = val1.category.split(" ");
      for (i of catArray) {
        if (i === category) {
          arr.push(val1);
        }
      }
    });
  });
  if (arr.length == 0) {
    return res.status(404).json({ message: "No snippets found" });
  } else {
    return res.json({ message: "Success", snippet: arr });
  }
};

module.exports = { getByCategory, getByCategoryPrivate };
