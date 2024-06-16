const jwt = require('jsonwebtoken');
const dotnenv = require('dotenv').config();


module.exports.check_guest_users = function(req,res,next){

    if(req.cookies.benjamin){

       return res.redirect('/dashboard');

    }else{

        next();

    }

}


module.exports.check_auth_users = function(req,res,next){

    if(!req.cookies.benjamin){

       return res.redirect('/login');

    }else if(req.cookies.benjamin){
        
        jwt.verify(req.cookies.benjamin, process.env.SECRET , (err, decoded) => {

            if (err) {

                res.cookie('benjamin', '', { expiresIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), httpOnly:true });
                return res.redirect('/login');

            }
            
            next();
        });

    }

}