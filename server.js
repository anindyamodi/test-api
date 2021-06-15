const express = require('express')
const mongoose = require ('mongoose')
const morgan = require ('morgan')
const bodyParser = require ('body-parser')


const AuthRoute = require('./routes/auth')
const EmployeeRoute = require('./routes/employee')

mongoose.connect('mongodb://localhost:27017/apitest',{bodyParser:true},{ useUnifiedTopology: true },{ useNewUrlParser: true })
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database connection successful')
})

const app = express()
const PORT = 8000
//const PORT = process.env.PORT || 8000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended :true}))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`
     ---------------------------------
     |server is running on port: ${PORT}|
     ---------------------------------
    `)
})


app.use('/api',AuthRoute)
app.use('/employee',EmployeeRoute)