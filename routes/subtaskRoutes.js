const express=require('express');
const {getSubtasks,createSubtasks,updateSubtasks,deleteSubtasks}=require('../controllers/subtaskController');
const validateToken = require('../middleware/validTokenHandler');
const router=express.Router();

router.use(validateToken);
// everything becomes PRIVATE

router.route('/:id').get(getSubtasks); // of current user respect to task ID

router.route('/').post(createSubtasks); 

router.route('/:id').put(updateSubtasks);

router.route('/:id').delete(deleteSubtasks);

module.exports=router;