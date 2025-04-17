import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  }); 
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourses(courseId);
    res.json(assignments);
  });
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.json(newAssignment);
  });
  app.put("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const status = assignmentsDao.updateAssignment(assignmentId, updates);
    res.json(status);
  });
  app.delete("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = assignmentsDao.deleteAssignment(assignmentId);
    res.json(status);
  });
  app.post("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });
  app.delete("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const status = enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  });
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = enrollmentsDao.getEnrollmentsForUser(userId);
    res.json(enrollments);
  });
}
