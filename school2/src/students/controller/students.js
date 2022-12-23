const router = require("express").Router();
const service = require("../service/students");

module.exports = router;

router.get("/class/:id", async (req, res) => {
  service
    .getStudentsListByClassId(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.post("/", async (req, res) => {
  service
    .findStudentByfirstName(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.post("/register", async (req, res) => {
  service
    .register(req.body, req.query.classid)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.get("/:id", async (req, res) => {
  service
    .findStudentById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateStudentDetailsById(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
router.delete("/:id", async (req, res) => {
  service
    .deleteStudentById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});
