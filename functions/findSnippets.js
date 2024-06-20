const User = require("../models/user");

const privateFind = async (req) => {
  const { prefix, username } = req.body;
  try {
    const userData = await User.findOne({ username });
    const snippetList = userData.private;
    const filteredList = snippetList.filter((snippet) =>
      snippet.keyword.startsWith(prefix)
    );
    const responsePayload = {
      statusCode: 200,
      message: "Success",
      numOfSnippets: filteredList.length,
      snippets: filteredList,
    };
    return responsePayload;
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

const publicFind = async (req) => {
  const { prefix, username } = req.body;
  try {
    let allUsers;
    if(username!="") allUsers = await User.find({username});
    else allUsers = await User.find();
    const allSnippets = allUsers.map((user) => user.public).flat();
    const filteredList = allSnippets.filter((snippet) =>
      snippet.keyword.startsWith(prefix)
    );
    const responsePayload = {
      statusCode: 200,
      message: "Success",
      numOfSnippets: filteredList.length,
      snippets: filteredList,
    };
    return responsePayload;
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

module.exports = { privateFind, publicFind };