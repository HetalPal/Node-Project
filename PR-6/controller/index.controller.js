const blog = require('../model/blog.model');

exports.home = async(req,res)=>{
    return res.redirect("/dashboard");
};

exports.dashboard = async(req,res)=>{
    try{
        return res.render("dashboard", {user:null});
    }catch(err){
        console.log(error)
        return res.redirect("/");
    }
};