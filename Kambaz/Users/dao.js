import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import * as courseDao from "../Courses/dao.js";

export const createUser = async (user) => {
    const newUser = new model({
        ...user,
        _id: uuidv4(),
        role: user.role || "USER"
    });
    return await newUser.save();
}
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
