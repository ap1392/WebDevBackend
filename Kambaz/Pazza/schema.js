import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  author: { type: String, ref: "UserModel", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const followupSchema = new mongoose.Schema({
  author: { type: String, ref: "UserModel", required: true },
  content: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const answerSchema = new mongoose.Schema({
  author: { type: String, ref: "UserModel", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  _id: String,
  courseId: { type: String, ref: "CourseModel", required: true },
  author: { type: String, ref: "UserModel", required: true },
  type: { type: String, enum: ["QUESTION", "NOTE"], default: "QUESTION" },
  postTo: { type: String, enum: ["CLASS", "INDIVIDUAL"], default: "CLASS" },
  recipients: [{ type: String, ref: "UserModel" }],
  folders: [{ type: String, required: true }],
  summary: { type: String, required: true, maxlength: 100 },
  details: { type: String, required: true },
  studentAnswers: [answerSchema],
  instructorAnswers: [answerSchema],
  followups: [followupSchema],
  views: { type: Number, default: 0 }
}, { collection: "pazza_posts", timestamps: true });

export default postSchema; 