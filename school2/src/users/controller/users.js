const router = require("express").Router();
const service = require("../service/users");

module.exports = router;

router.get("/", async (req, res) => {
  service.getAll().then((data) => res.json(data));
});
router.post('/',async(req,res)=>{
  const r=req.body
  service.get((r.FirstName,r.LastName,r.Phone,r.PhoneCode,r.Email,Password,Gender,DOB,Role,Address1,Address2,City,State,Pincode,Status))
  .then(data=>res.json(data))
})