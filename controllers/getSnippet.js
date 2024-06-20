const User=require("../models/user");


const getIdbySnippet=async(req,res)=>{
    const {username,keyword}=req.body;
    const findId=await User.findOne({username});
    if(!findId) return res.status(404).json({message: 'User not found/Keyword not found'});
    for (i in findId.private){
        if(findId.private[i].keyword===keyword){
            return res.json({message: 'Success', snippet: username+"_"+findId.private[i].keyword});
        }
    }
    return res.status(404).json({message: 'User not found/Keyword not found'});
};

const getSnippetbyId=async(req,res)=>{
    const {id,username}=req.body;
    const user=await User.findOne({username})
    const username1=id.split("_")[0];
    const finalId=id.split("_")[1];
    const findId=await User.findOne({username:username1});
    if(!findId) return res.status(404).json({message: 'Invalid Id'});
    for (i in findId.private){
        if(findId.private[i].keyword==finalId){
            const newObj={
                category:findId.private[i].category,
                keyword:findId.private[i].keyword,
                code:findId.private[i].code,
                scope:findId.private[i].scope,
                description:findId.private[i].description
            };
            user.private.push(newObj);
            await user.save()
            return res.json({message: 'Success', snippet: newObj});
        }
    }
    return res.status(404).json({message: 'Invalid Id'});
};


module.exports={getSnippetbyId,getIdbySnippet};