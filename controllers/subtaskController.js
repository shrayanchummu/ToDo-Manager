const asyncHandler = require('express-async-handler');
const Subtask = require('../models/subtaskModel');
const Task = require('../models/taskModel');


// @desc Get all subtasks with respect to task ID
// @route GET /api/subtasks
// @access PRIVATE
const getSubtasks = asyncHandler(async (req, res) => {
    const taskId = req.params.id;

    // Check if the task exists and belongs to the current user
    const task = await Task.findOne({ _id: taskId, user_id: req.user._id });
    if (!task) {
        res.status(404);
        throw new Error("Task not found or does not belong to the current user");
    }

    // Retrieve subtasks for the specified task
    const subtasks = await Subtask.find({ task_id: taskId });
    res.status(200).send(subtasks);
});

// @desc Create subtask
// @route POST /api/subtasks
// @access PRIVATE
const createSubtask = asyncHandler(async (req, res) => {
    const { task_id, name, status } = req.body;
    // console.log("taskid", task_id);
    // console.log("name", name);
    // console.log("status", status);

    if (!task_id || !name || status === undefined) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if the associated task exists
    const task = await Task.findById(task_id);
    if (!task) {
        res.status(404);
        throw new Error("Task with the given ID not found");
    }

    const newSubtask = await Subtask.create({
        task_id,
        name,
        status,
    });

    res.status(201).send(newSubtask);
});


// @desc Update subtask
// @route PUT /api/subtasks/:id
// @access PRIVATE
const updateSubtask = asyncHandler(async (req, res) => {
    const oldSubtask = await Subtask.findById(req.params.id);

    if (!oldSubtask) {
        res.status(404);
        throw new Error("Subtask with the given ID is not found");
    }

    const updatedSubtask = await Subtask.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).send(updatedSubtask);
});

// @desc Delete subtask
// @route DELETE /api/subtasks/:id
// @access PRIVATE
const deleteSubtask = asyncHandler(async (req, res) => {
    const oldSubtask = await Subtask.findById(req.params.id);

    if (!oldSubtask) {
        res.status(404);
        throw new Error("Subtask with the given ID is not found");
    }

    await Subtask.findByIdAndDelete(req.params.id);
    res.status(200).send(oldSubtask);
});

module.exports = {
    getSubtasks,
    createSubtask,
    updateSubtask,
    deleteSubtask
};
