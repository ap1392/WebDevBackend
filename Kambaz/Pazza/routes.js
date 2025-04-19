import * as dao from "./dao.js";

export default function PazzaRoutes(app) {
  // Posts CRUD
  app.get("/api/courses/:courseId/pazza/posts", async (req, res) => {
    const posts = await dao.findPostsForCourse(req.params.courseId);
    res.json(posts);
  });

  app.get("/api/pazza/posts/:postId", async (req, res) => {
    const post = await dao.findPostById(req.params.postId);
    res.json(post);
  });

  app.post("/api/courses/:courseId/pazza/posts", async (req, res) => {
    const post = { ...req.body, courseId: req.params.courseId };
    const newPost = await dao.createPost(post);
    res.json(newPost);
  });

  app.put("/api/pazza/posts/:postId", async (req, res) => {
    const status = await dao.updatePost(req.params.postId, req.body);
    res.json(status);
  });

  app.delete("/api/pazza/posts/:postId", async (req, res) => {
    const status = await dao.deletePost(req.params.postId);
    res.json(status);
  });

  // Answers
  app.post("/api/pazza/posts/:postId/studentAnswers", async (req, res) => {
    const status = await dao.addStudentAnswer(req.params.postId, req.body);
    res.json(status);
  });

  app.post("/api/pazza/posts/:postId/instructorAnswers", async (req, res) => {
    const status = await dao.addInstructorAnswer(req.params.postId, req.body);
    res.json(status);
  });

  // Followups & replies
  app.post("/api/pazza/posts/:postId/followups", async (req, res) => {
    const status = await dao.addFollowup(req.params.postId, req.body);
    res.json(status);
  });

  app.post("/api/pazza/posts/:postId/followups/:followupId/replies", async (req, res) => {
    const status = await dao.addReply(
      req.params.postId,
      req.params.followupId,
      req.body
    );
    res.json(status);
  });

  // Folder management for instructors
  app.get("/api/courses/:courseId/pazza/folders", async (req, res) => {
    const folders = await dao.getFoldersForCourse(req.params.courseId);
    res.json(folders?.pazzaFolders || []);
  });

  app.post("/api/courses/:courseId/pazza/folders", async (req, res) => {
    const status = await dao.addFolderToCourse(req.params.courseId, req.body.name);
    res.json(status);
  });

  app.delete("/api/courses/:courseId/pazza/folders/:name", async (req, res) => {
    const status = await dao.deleteFolderFromCourse(req.params.courseId, req.params.name);
    res.json(status);
  });

  app.put("/api/courses/:courseId/pazza/folders/:oldName", async (req, res) => {
    const status = await dao.renameFolderForCourse(
      req.params.courseId,
      req.params.oldName,
      req.body.newName
    );
    res.json(status);
  });
} 