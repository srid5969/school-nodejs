const router = require("express").Router();
module.exports = router;
const service = require("../service/classes");

router.post("/post", async (req, res) => {
  res.json(service.save(req.body.name, req.body.teacher));
});
