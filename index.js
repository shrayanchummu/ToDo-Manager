const express=require('express');
const dotenv=require('dotenv').config();
const connectDb = require('./config/dbConnection');
const app=express();

connectDb();
app.use(express.json());

app.use('/api/tasks',require('./routes/taskRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/subtasks',require('./routes/subtaskRoutes'));


const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Listening Server on port ${port}`);
});