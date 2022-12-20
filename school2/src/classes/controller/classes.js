const router = require("express").Router();
const students = require("../../students/service/students");

module.exports = router;
const service = require("../service/classes");
// students.getStudentsListByClassId
router.get("/students/:id", async (req, res) => {
  students
    .getStudentsListByClassId(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.post("/", async (req, res) => {
  service
    .registerClass(req.body.name, userDetail)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.post("/assign", async (req, res) => {
  service
    .assignTeacher(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.get("/all", async (req, res) => {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.get("/:id", async (req, res) => {
  service
    .getByClassId(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.delete("/:id", async (req, res) => {
  service
    .deleteByClassId(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateClassTeacherByClassId(req.params.id, userDetail)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
