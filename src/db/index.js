import mongoose  from "mongoose";

// const mongoURL = "";


const DbConnection = async ()=>{

    try {
        
        const connected =  await mongoose.connect(`${process.env.MONGO_URL}personal-finance`);
        console.log(`DB is connected! and on port ${connected.connection.port} `);
        

    } catch (error) {
        console.error("the error"+ error);
        process.exit(1);
        
    }
}

export default DbConnection;