const User = require("../models/user");

const updateSnippet = async (req, res) => {
  const { username, keyword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) res.status(404).json({ message: "User not found" });

    const private = user.private;
    const public = user.public;
    if (!public && !private) res.status(404).json({ message: "Snippet not found" });
    
    public.forEach(async (snippet) => {
      if (snippet.keyword === keyword) {
        user.public.remove(snippet);
        user.public.push(req.body);
      }
    });

    private.forEach(async (snippet) => {
      if (snippet.keyword === keyword) {
        user.private.remove(snippet);
        user.private.push(req.body);
      }
    });
    
    await user.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateSnippet;