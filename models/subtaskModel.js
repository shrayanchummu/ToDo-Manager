const mongoose = require('mongoose');

const subtaskSchema=mongoose.Schema({
    task_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Task"
    },
    name:{
        type:String,
        required:[true,"Please enter a name for the subtask"]
    },
    status:{
        type:String,
        enum: ["0","1"], // Only allow 0 or 1 as values
        required:[true,"Please enter a valid status (0 for incomplete, 1 for complete)"]
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: {
        type: Date,
        default: null,
    },
});

module.exports=mongoose.model("Subtask",subtaskSchema);