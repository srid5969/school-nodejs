const router = require("express").Router();
const service = require("../service/studentsAttendance");

module.exports = router;

router.get("/", async (req, res) => {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.post("/", async (req, res) => {
  service
    .register(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.get("/:id", async (req, res) => {
  service
    .findStudentsAttendanceByStudentId(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.delete("/:id", async (req, res) => {
  service
    .deleteStudentsAttendance(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateStudentsAttendance(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
