const router = require("express").Router();
const service = require("../service/students");

module.exports = router;

router.get("/as", async (req, res) => {
  service.getAll().then((data) => res.json(data));
});
router.post('/sa',async(req,res)=>{
  const r=req.body
  service.get((r.ClassId,r.StudentId,r.Status,r.Dates,r.Createdate))
  .then(data=>res.json(data))
})