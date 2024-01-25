const express=require('express');
const {getTasks,createTask,updateTask,deleteTask,getTasksFilter}=require('../controllers/taskController');
const validateToken = require('../middleware/validTokenHandler');
const router=express.Router();

router.use(validateToken);
// everything becomes PRIVATE

router.route('/').get(getTasks);

router.route('/').post(createTask);

router.route('/:id').put(updateTask);

router.route('/:id').delete(deleteTask);

router.route('/filter').get(getTasksFilter);

module.exports=router;