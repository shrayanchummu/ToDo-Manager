// const {ObjectId} = require('mongoose').Types;
const asyncHandler=require('express-async-handler');
const Task = require('../models/taskModel')
const Subtask=require('../models/subtaskModel');

// @desc Gets all tasks
// @route GET /api/tasks
// @access PRIVATE

const getSubtasks=asyncHandler(async(req,res)=>{
    const subtasks=await Subtask.find({task_id: req.params.id});
    // console.log('The req.params.task_id is:',req.params.id);
    // console.log('The subtasks is:',subtasks);
    res.status(200).send(subtasks);
});


// @desc Create task
// @route POST /api/tasks/
// @access PRIVATE

const createSubtasks=asyncHandler(async(req,res)=>{
    // console.log('The Request Body is:',req.body);
    const {task_id,name,status}=req.body;
    if(!task_id || !name || !status){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const oldTask=await Task.findById(req.body.task_id);
    // console.log('The req.params.task_id is:',req.body.task_id);
    // console.log('The Old Task is:',oldTask);
    if(!oldTask){
        res.status(404);
        throw new Error("Task with the given ID is not found");
    }
    const newSubtask=await Subtask.create({
        task_id:req.body.task_id,
        name,
        status
    });

    res.status(201).send(newSubtask);
});

// @desc Update Task of given id
// @route PUT /api/tasks/:id
// @access PRIVATE

const updateSubtasks=asyncHandler(async(req,res)=>{
    const oldSubtask=await Subtask.findById(req.params.id);
    if(!oldSubtask){
        res.status(404);
        throw new Error("Subtask with the given ID is not found");
    }
 
    const updatedSubtask = await Subtask.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).send(updatedSubtask);
});

// @desc Deletes Task of given id
// @route DELETE /api/tasks/:id
// @access PRIVATE

const deleteSubtasks=asyncHandler(async(req,res)=>{
    const oldSubtask=await Subtask.findById(req.params.id);
    if(!oldSubtask){
        res.status(404);
        throw new Error("Task with the given ID is not found");
    }
    await Subtask.findByIdAndDelete(req.params.id);
    res.status(200).send(oldSubtask);
});


module.exports={
    getSubtasks,
    createSubtasks,
    updateSubtasks,
    deleteSubtasks
}