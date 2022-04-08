
// For rendering home page
module.exports.home = async function(req, res){
    try{
        return res.render('home',{
            title: "Home"
        })
    }catch(err){
        console.log("Error in rendering home page", err);
        return res.redirect('back');
    }
}