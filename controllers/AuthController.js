const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const bodyParser = require ('body-parser')

 const register = (req,res,next) =>{
     bcrypt.hash(req.body.password,10 ,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        else{
         let user = new User ({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            password : hashedPass
        })
        user.save()
        .then(user=>{
            res.status(200).json({
                message : 'User Added Successfully'
            })
        })
        .catch(error=>{
            res.status(500).json({
                message : "error occured!"
            })
        })
    }
     })
    
    
 }

 const login =(req,res,next) => {
     var username = req.body.username 
     var password = req.body.password

     user.findOne({$or:[{email : username},{phone:username}]}) 
     .then(user =>{
            if(user){
                bcrypt.compare(password,user.password,function(err,result){
                    if(err){
                        res.json({
                            error : err
                        })
                    } 
                    if(result){
                        let token = jwt.sign({name : user.name},'secret',{expiresIn : '1h'})
                        res.status(200).json({
                            message : 'login successfull',
                            token : token
                        })
                    }else{
                        res.status(500).json({
                            message : 'password does not match'
                        })
                    }
                })
            }else{
                res.status(404).json({
                    message : 'No user found!!'
                })
            }
        })
 }
 module.exports ={
     register,login
    } 