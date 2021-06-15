const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')
const upload = require("../middleware/img")

router.get('/',EmployeeController.list)
router.post('/list',EmployeeController.show)
router.post('/store',upload.single('image'),EmployeeController.store)
router.post('/update',EmployeeController.update)
router.post('/delete',EmployeeController.del)

module.exports = router;