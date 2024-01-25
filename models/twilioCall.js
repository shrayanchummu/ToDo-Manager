const twilio = require('twilio');
const UserModel = require('./userModel'); 
const dotenv=require('dotenv').config(); 

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function checkAndNotifyUser(task) {
    try {
        const user = await UserModel.findOne({ _id: task.user_id });

        if (!user) {
            throw new Error("User not found");
        }

        const phoneNumber = user.phoneNumber; 

        // Check if the task is overdue
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day

        const dueDate = new Date(task.due_date);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate < currentDate){
            // Implementing Twilio calling logic
            const call = await client.calls.create({
                url: 'http://demo.twilio.com/docs/voice.xml', 
                to: phoneNumber,
                from: 'your_twilio_phone_number',
            });

            console.log(`Calling user ${user.username} about the overdue task: ${task.title}`);
            console.log('Call SID:', call.sid);
        }

    } catch (error) {
        console.error('Error checking and notifying user:', error.message);
    }
}

module.exports = checkAndNotifyUser;
