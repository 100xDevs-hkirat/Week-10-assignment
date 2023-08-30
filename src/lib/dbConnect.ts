import mongoose from 'mongoose';

// Function to connect to the database
export default function connectToDB() {
    return mongoose.connect(process.env.MONGO_URL!, { dbName: "courses" }).then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}