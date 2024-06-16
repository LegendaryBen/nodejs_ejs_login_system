const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();



module.exports.sign_up_get = async function(req,res){

    if(req.query.error && req.query.color){

        res.render('sign-up',{block:true,data:req.query.error});

    }else{

        res.render('sign-up',{block:false});

    }

}


module.exports.sign_up_post = async function(req,res){

    if(!req.body.submit){
        return res.redirect('/sign-up');
    }

    if(req.body.email === '' || req.body.password === ''){

        return res.redirect('/sign-up?error=Inputs should not be empty&color=red');

    }

    try {
        
        const user = await User.find({email:req.body.email})

        if(user.length === 0){
            
            const pass = await bcrypt.hash(req.body.password,10);

            await User.create({
                email:req.body.email,
                password:pass
            })

            return res.redirect('/sign-up?error=user has been created&color=green');

        }else{

            return res.redirect('/sign-up?error=Email already exists in the database&color=red');

        }


    } catch (error) {
        
        res.status(500);
        return res.redirect("/sign-up?error=Internal server error&color=red");

    }
    
}


module.exports.login_post = async function(req,res){

    if(!req.body.submit){
       return  res.redirect('/login');
    }

    if(req.body.email === '' || req.body.password === ''){
       return res.redirect('/login?error=Inputs fields should not be empty&color=red');
    }


    try {
        
        const user = await User.findOne({
            email:req.body.email
        })


        if(!user){

            return res.redirect('/login?error=User was not found&color=red');

        }else{

            
            const isMatch = await bcrypt.compare(req.body.password,user.password);

            if(isMatch){

                const token = jwt.sign({id:user._id}, process.env.SECRET, { expiresIn: '7d' })

                const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

                res.cookie('benjamin', token, { maxAge:oneWeekInMilliseconds, httpOnly: true });

                return res.redirect('/dashboard');

            }else{

                return res.redirect('/login?error=Incorrect password&color=red');

            }

            
        }


    } catch (error) {
        
        return res.redirect('/login?error=Internal server error&color=red');

    }


}


module.exports.login_get = async function(req,res){
    
    if(req.query.error && req.query.color){

        res.render('login',{block:true,data:req.query.error});

    }else{

        res.render('login',{block:false});

    }


}


module.exports.dashboard = function(req,res){
    
    return res.render("dashboard");

}


module.exports.logout = function(req,res){

    res.cookie('benjamin', '', { expiresIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), httpOnly:true });
    
    return res.redirect('/login');

}