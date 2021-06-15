const { response } = require('express')
const Employee = require ('../models/Employee')
//show employee list
const list = (req,res,next) =>{
    Employee.find()
    .then(response =>{
            res.status(200).json({
                response
            })
    })
    .catch(error => {
        res.status(500).json({
            message : "An error Occured!"
        })
    })
}

//find single employee
const show =(req,res,next ) =>{
    let employeeId = req.body.employeeId
    Employee.findById(employeeId)
        .then(response =>{
            res.status(200).json({
                response
            })
        })
        .catch(error => {
            res.status(500).json({
                message : 'An error occured!'
            })
        })
}

//save employee details
const store = (req,res,next) =>{
    let employee = new Employee ({
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age :req.body.age
    })
    if(req.file){
        employee.image = req.file.path
    }
    employee.save()
    .then(response =>{
        res.status(200).json({
            message : 'Employee Added sucecssfully'
        })
    })
    .catch(error =>{
        res.status(500).json({
            messgae : 'An error Occured'
        })
    })
}

//update employee

const update = (req,res,next) =>{
    let employeeId = req.body.employeeId

    let updatedData ={
        name: req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age :req.body.age
    }
    Employee.findByIdAndUpdate(employeeId,{$set :updatedData})
    .then(()=> {
        res.status(200).json({
            message : 'Employee updated Successfully'
        })
    })
    .catch(error => {
        res.status(500).json({
            message : 'An error Occured!'
        })
    })
}

//delete employee
const del = ( req,res,next)=>{
    let employeeId = req.body.employeeId

    Employee.findByIdAndDelete(employeeId)
    .then(()=>{
        res.status(200).json({
            messgae : 'Employee deleted Successfully'
        })
    })
    .catch(error => {
        res.status(500).json({
        message : 'An error Occured!'
        })
    })
}

module.exports ={
    list,show,store,update,del
}


