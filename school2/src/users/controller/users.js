const router = require("express").Router();
const service = require("../service/users");

module.exports = router;
router.get("/csv", async (req, res) => {
  service.generateCsvReportForAllUser().then(() => res.send({message:"Successfully Generated"})) .catch((err) => res.status(409).json(err));
});
router.get("/all", async (req, res) => {
  service.getAll().then((data) => res.json(data));
});
router.post("/signup", async (req, res) => {
  // console.log(req.body);
  service
    .register(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(409).json(err));
});
router.post("/login", async (req, res) => {
  // const data=service.userlogin(userDeatail)
  res.json(usersToken);
});
router.post("/logout", (req, res) => {
  res.json({ message: "Thank you" });
});
router.post("/", async (req, res) => {
  const user = req.headers.username;
});
router.delete("/", async (req, res) => {
  service
    .deleteByEmail(req.headers.username)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.patch("/", async (req, res) => {
  service
    .update(req.headers.username)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.post("/", async (req, res) => {
  res.json("Thank You");
});
