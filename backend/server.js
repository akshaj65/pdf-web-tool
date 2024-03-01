import app from './app.js';
import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
});

try{
    await mongoose.connect(process.env.MONGODB_URL).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
}catch(err){
    console.log(`Error connecting to MongoDB: ${err.message}`)
    process.exit(1);
}



const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

//unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(` Error :${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection")
    server.close(() => {
        process.exit(1);
    })
})