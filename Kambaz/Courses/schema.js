import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
   _id: String,
   name: String,
   number: String,
   credits: Number,
   description: String,
   pazzaFolders: {
     type: [String],
     default: [
       "hw1",
       "hw2",
       "hw3",
       "project",
       "exam",
       "logistics",
       "other",
       "office_hours",
     ],
   },
 },
 { collection: "courses" }
);
export default courseSchema;