const User = require("../models/user");

const addUser = async (req, res) => {
    const {username} = req.body;

    try {
        const userExist = await User.findOne({username});
        if(userExist) return res.status(400).json({message: 'User already exists'});
        
        const user = await User.create({username});
        res.status(201).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = addUser;