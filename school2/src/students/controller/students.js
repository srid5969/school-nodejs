const router = require("express").Router();
const service = require("../service/students");

module.exports = router;

router.get("/", async (req, res) => {
  service.getAll().then((data) => res.json(data));
});
router.post('/',async(req,res)=>{
  const r=req.body
  service.get((r.FirstName,r.LastName,r.Classid,r.Dob,r.Fathername,r.Mothername,r.Address1,r.Address2,r.City,r.State,r.Pincode,r.Createdate))
  .then(data=>res.json(data))
})
