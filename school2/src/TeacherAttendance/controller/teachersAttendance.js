const router = require("express").Router();
const service = require("../service/teachersAttendance");

module.exports = router;

router.get("/all", async (req, res) => {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.post("/", async (req, res) => {
  const r = req.body;
  service
    .get((r.UserId, r.Status, r.Dates, r.Createdate))
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateTeachersById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.get("/:id", async (req, res) => {
  service
    .findTeachersById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
router.delete("/", async (req, res) => {
  service
    .deleteTeachersById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
