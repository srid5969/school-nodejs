const router = require("express").Router();
const service = require("../service/teachersAttendance");

module.exports = router;

router.get("/all", async (req, res) => {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.post("/", async (req, res) => {
  const r = req.body;
  service
    .register((req.body))
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateTeachersById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.get("/:id", async (req, res) => {
  service
    .findTeachersById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.delete("/", async (req, res) => {
  service
    .deleteTeachersById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
// git clone --branch School2 https://sridhar073:ATBBbEgvkumqSN25LZFHS7AVVXes168F6C10@bitbucket.org/innovixtech-admin/innovix_web_backend.git