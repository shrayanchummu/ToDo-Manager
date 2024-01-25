// const {ObjectId} = require('mongoose').Types;
const asyncHandler=require('express-async-handler');
// used instead of try catch statements in async blocks
const Task=require('../models/taskModel');

// @desc Gets all tasks
// @route GET /api/tasks
// @access PRIVATE

const getTasks=asyncHandler(async(req,res)=>{
    const tasks=await Task.find({user_id: req.user._id});
    res.status(200).send(tasks);
});


// @desc Create task
// @route POST /api/tasks/
// @access PRIVATE

const createTask=asyncHandler(async(req,res)=>{
    console.log('The Request Body is:',req.body);
    const {title,description,due_date,status}=req.body;
    if(!title || !description || !due_date){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const newTask=await Task.create({
        user_id:req.user._id,
        title,
        description,
        due_date,
        status: status || 'TODO',
    });

    res.status(201).send(newTask);
});

// @desc Update Task of given id
// @route PUT /api/tasks/:id
// @access PRIVATE

const updateTask=asyncHandler(async(req,res)=>{
    const oldTask=await Task.findById(req.params.id);
    if(!oldTask){
        res.status(404);
        throw new Error("Task with the given ID is not found");
    }
    if(oldTask.user_id.toString()!==req.user._id){
        res.status(403);
        throw new Error("User doesn't have permission to update other User's Tasks")
    }
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).send(updatedTask);
});

// @desc Deletes Task of given id
// @route DELETE /api/tasks/:id
// @access PRIVATE

const deleteTask=asyncHandler(async(req,res)=>{
    const oldTask=await Task.findById(req.params.id);
    if(!oldTask){
        res.status(404);
        throw new Error("Task with the given ID is not found");
    }
    if(oldTask.user_id.toString()!==req.user._id){
        res.status(403);
        throw new Error("User doesn't have permission to delete other User's Tasks")
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send(oldTask);
});

// @desc Get all user tasks with filters (priority, due date)
// @route GET /api/tasks/filter
// @access PRIVATE

const getTasksFilter = asyncHandler(async (req, res) => {
    const { due_date } = req.query;
    // console.log("duedate :",due_date);
    const filter = { };
  
    if (due_date) {
        const parsedDate = new Date(due_date);

        // Check if the parsed date is a valid date
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid due_date format' });
        }

        filter.due_date = parsedDate;
    }
  
    const tasks = await Task.find(filter);
    res.status(200).send(tasks);
});

module.exports={
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksFilter
}