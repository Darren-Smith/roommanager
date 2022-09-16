function isAdmin(req, res, next) {
    if(req.user.isAdmin === true){
        return next();
    }

    res.redirect('/login');
};


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();  
    }
    console.log("Not logged in...");
    res.redirect('/login');
    
};
module.exports = {isAdmin, isLoggedIn};