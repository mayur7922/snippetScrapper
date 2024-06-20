const User = require("../models/user");

const addSnippet = async (req, res) => {
    const {status, username, category, keyword, code, scope, description} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user) return res.status(404).json({message: 'User not found'});
        const newSnippet = {
            category, keyword, code, scope, description
        };
        if(status=="private"){
            user.private.push(newSnippet);
            await user.save();
            res.json({message: 'Success', snippet: newSnippet});
        }else{
            user.public.push(newSnippet);
            user.private.push(newSnippet);
            await user.save();
            res.json({message: 'Success', snippet: newSnippet});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = addSnippet;