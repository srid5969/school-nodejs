const router = require("express").Router();
const service = require("../service/users");

module.exports = router;
router.get("/all", async (req, res) => {
  service.getAll().then((data) => res.json(data));
});
router.post("/signup", async (req, res) => {
  // console.log(req.body);
  service
    .register(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(409).json(err);
      console.log(err);
    });
});
router.post("/login", async (req, res) => {
  // const data=service.userlogin(userDeatail)
  res.status(201).json(usersToken);
});
router.post("/logout", (req, res) => {
  res.json({ message: "Thank you" });
});
router.delete("/:id", async (req, res) => {
  service
    .deleteByEmail(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.patch("/:id", async (req, res) => {
  service
    .updateById(req.params.id,req.body)
    .then((data) => res.json({message:"Successfully Updated"}))
    .catch((err) => res.json(err));
});
router.get("/:id", async (req, res) => {
  service
    .getById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.get("/all/:role", async (req, res) => {
  service.getByRole(req.params.role).then((data) => res.json(data));
});


router.get('/demo',async(req,res)=>{
  res.json(req.query.id)
})