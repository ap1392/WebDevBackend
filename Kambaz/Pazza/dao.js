import { v4 as uuidv4 } from "uuid";
import postModel from "./model.js";
import courseModel from "../Courses/model.js";

// Posts
export const findPostsForCourse = (courseId) =>
  postModel.find({ courseId }).sort({ createdAt: -1 });

export const findPostById = (postId) => postModel.findById(postId);

export function createPost(post) {
  const newPost = { ...post, _id: uuidv4() };
  return postModel.create(newPost);
}

export const updatePost = (postId, updates) =>
  postModel.updateOne({ _id: postId }, { $set: updates });

export const deletePost = (postId) => postModel.deleteOne({ _id: postId });

// Answers
export function addStudentAnswer(postId, answer) {
  // let Mongoose generate the subdocument _id automatically
  return postModel.updateOne(
    { _id: postId },
    { $push: { studentAnswers: answer } }
  );
}

export function addInstructorAnswer(postId, answer) {
  // let Mongoose generate the subdocument _id automatically
  return postModel.updateOne(
    { _id: postId },
    { $push: { instructorAnswers: answer } }
  );
}

// Followups
export function addFollowup(postId, followup) {
  // strip any incoming _id so mongoose will auto-generate subdocument _id
  const { _id, ...followupData } = followup;
  const newFollowup = { ...followupData, replies: [] };
  return postModel.updateOne(
    { _id: postId },
    { $push: { followups: newFollowup } }
  );
}

export function addReply(postId, followupId, reply) {
  // strip any incoming _id so mongoose will auto-generate reply subdocument _id
  const { _id, ...replyData } = reply;
  return postModel.updateOne(
    { _id: postId, "followups._id": followupId },
    { $push: { "followups.$.replies": replyData } }
  );
}

// Manage course folders
export const getFoldersForCourse = (courseId) =>
  courseModel.findById(courseId, { pazzaFolders: 1, _id: 0 });

export const addFolderToCourse = (courseId, folderName) =>
  courseModel.updateOne(
    { _id: courseId },
    { $addToSet: { pazzaFolders: folderName } }
  );

export const deleteFolderFromCourse = (courseId, folderName) =>
  courseModel.updateOne(
    { _id: courseId },
    { $pull: { pazzaFolders: folderName } }
  );

export const renameFolderForCourse = (courseId, oldName, newName) =>
  courseModel.updateOne(
    { _id: courseId, pazzaFolders: oldName },
    { $set: { "pazzaFolders.$": newName } }
  ); 