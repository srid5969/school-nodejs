const router = require("express").Router();
module.exports = router;
const service = require("../service/classes");

router.post("/", async (req, res) => {
  service
    .registerClass(req.body.name, userDetail)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
router.post("/assign", async (req, res) => {
  service
    .assignTeacher(req.body.name, req.body.classTeacherId)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
router.get("/all", async (req, res) => {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.get("/:class", async (req, res) => {
  service
    .getByClassName(req.params.class)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.delete("/:class", async (req, res) => {
  service
    .deleteByClassName(req.params.class)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.patch("/:class", async (req, res) => {
  service
    .updateClassTeacherByClassName(req.params.class, userDetail)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
