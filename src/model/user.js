import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:string
    }
})
const user = mongoose.model.user || mongoose.model("user",userSchema)
export default user