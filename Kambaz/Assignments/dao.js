import Database from "../Database/index.js";

export function findAssignmentsForCourses(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const { assignments } = Database;
  const newAssignment = { ...assignment, _id: new Date().getTime().toString() };
  assignments.push(newAssignment);
  return newAssignment;
}

export function updateAssignment(assignmentId, assignment) {
  const { assignments } = Database;
  const index = assignments.findIndex((a) => a._id === assignmentId);
  if (index === -1) return null;
  assignments[index] = { ...assignments[index], ...assignment };
  return assignments[index];
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  const index = assignments.findIndex((a) => a._id === assignmentId);
  if (index === -1) return null;
  assignments.splice(index, 1);
  return { status: "ok" };
} 