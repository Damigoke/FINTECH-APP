import mongoose from 'mongoose';
import { DB_URL } from './appConfig';

function dbConnection() {
     const database = mongoose
        .connect(DB_URL)
        .then(() => {
            console.log("Database Connection Successfull");
        })
        .catch((err) => {
            console.error("Error connecting to Database:", err);
        });
    return database
}

export default dbConnection