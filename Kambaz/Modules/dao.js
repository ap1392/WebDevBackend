import moduleModel from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const findModulesForCourse = (courseId) => moduleModel.find({ course: courseId });
export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return moduleModel.create(newModule);
}
export const deleteModule = (moduleId) => moduleModel.deleteOne({ _id: moduleId });
export const updateModule = (moduleId, module) => moduleModel.updateOne({ _id: moduleId }, { $set: module });