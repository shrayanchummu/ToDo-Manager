const mongoose = require('mongoose');
// const twilioCall = require('./twilioCall');

const taskSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,"Please enter the TITLE"]
    },
    description: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['TODO','IN_PROGRESS','DONE'],
        required: true,
    },
    priority: {
        type: String,
        enum: ["0", "1", "2"],
        default: "0", // Default priority set to "0"
    },
},{
    timestamps:true
});

// Define a pre-save hook to calculate priority based on user's priority and due date
taskSchema.pre('save', async function (next) {
    try {
        const user = await mongoose.model('User').findOne({ _id: this.user_id });
        if (!user) {
            throw new Error("User not found");
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day

        const dueDate = new Date(this.due_date);
        dueDate.setHours(0, 0, 0, 0);

        const daysDifference = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            this.priority = user.priority;
        } else if (daysDifference <= 2) {
            this.priority = "1";
        } else if (daysDifference <= 4) {
            this.priority = "2";
        } else {
            this.priority = "3";
        }

        // Call the checkAndNotifyUser method from TwilioCall module
        // await twilioCall(this);

        next();
    } catch (error) {
        next(error);
    }
});


module.exports=mongoose.model("Task",taskSchema);