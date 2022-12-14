const router = require("express").Router();
const service = require("../service/studentsAttendance");

module.exports = router;

router.get("/", async (req, res) => {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.post("/", async (req, res) => {
  service
    .register(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.get("/:id", async (req, res) => {
  service
    .findStudentsAttendanceByStudentId(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.delete("/:id", async (req, res) => {
  service
    .deleteStudentsAttendance(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateStudentsAttendance(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.post("/submit", async (req, res) => {
  service
    .updateOrInsertBulkStudentsAttendance(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.get("/", async (req, res) => {
  service
    .getClassAttendanceByClassId((req.query.classId))
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
