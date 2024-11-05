import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect("mongodb+srv://Piyush:SlcAzhReC1wU0iY4@cluster0.nifprd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{}).then((data)=>{
        console.log(`MongoDB connected with server ${data.connection.host}`);
    }).catch((err)=>{
        console.log(err)
    })
}
