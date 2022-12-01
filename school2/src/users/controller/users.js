const router = require("express").Router();
const service = require("../service/users");

module.exports = router;

router.get("/", async (req, res) => {
  service.getAll().then((data) => res.json(data));
});
router.post("/", async (req, res) => {
  const r = req.body;
  service.save(
    r.FirstName,
    r.LastName,
    r.Phone,
    r.PhoneCode,
    r.Email,
    r.Password,
    r.Gender,
    r.DOB,
    r.Role,
    r.Address1,
    r.Address2,
    r.City,
    r.State,
    r.Pincode,
    r.Status
  ).then(data=>res.json(data))
  .catch(err=>res.send(err));
});



router.post('/login',(req,res)=>{
  const {username,password} = req.body;
 service.login(username,password)
 .then(data=>res.send(data))
})
