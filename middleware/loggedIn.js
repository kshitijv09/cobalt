exports.isLoggedIn=(req,res,next)=>
{
    req.user?next():res.send("Not logged in")
}

