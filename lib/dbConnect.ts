import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
if(!MONGODB_URI){
    console.log("Please give api key for mongodb in .env file");
    
}

type ConnectionObject= {
    isConnected? : number
}

const connection : ConnectionObject = {}

async function dbConnect() : Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    try {
        const db = await mongoose.connect(MONGODB_URI!)
        console.log("log of db ---> ", db);
        
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)
    }
}

export default dbConnect;