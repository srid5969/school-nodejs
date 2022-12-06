const router = require("express").Router();
module.exports = router;
const service = require("../service/classes");

router.post("/post", async (req, res) => {
  res.json(service.register(req.body.name, req.body.teacher));
});
router.get("/", async (req, res) => {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.put("/:class", async (req, res) => {
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
router.put("/:class", async (req, res) => {
  service
    .updateClassTeacherByClassName(req.params.class)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
