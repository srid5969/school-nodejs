const router = require("express").Router();
const students = require("../../students/service/students");
module.exports = router;
const service = require("../service/classes");


router.get("/students/:id", async (req, res) => {
  students
    .getStudentsListByClassId(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.post("/", async (req, res) => {
  service
    .registerClass(req.body.name, userDetail)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.post("/assign", async (req, res) => {
  service
    .assignTeacher(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.get("/all", async (req, res) => {
  service
    .getAll(userDetail.role, userDetail._id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.get("/:id", async (req, res) => {
  service
    .getByClassId(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.delete("/:id", async (req, res) => {
  service
    .deleteByClassId(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateClassTeacherByClassId(req.params.id, userDetail)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
});
