const express=require('express');
const {getSubtasks,createSubtask,updateSubtask,deleteSubtask}=require('../controllers/subtaskController');
const validateToken = require('../middleware/validTokenHandler');
const router=express.Router();

router.use(validateToken);
// everything becomes PRIVATE

router.route('/:id').get(getSubtasks); // of current user respect to task ID

router.route('/').post(createSubtask); 

router.route('/:id').put(updateSubtask);

router.route('/:id').delete(deleteSubtask);

module.exports=router;