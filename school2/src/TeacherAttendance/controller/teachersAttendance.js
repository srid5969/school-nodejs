const router = require("express").Router();
const service = require("../service/students");

module.exports = router;

router.get("/", async (req, res) => {
  service.getAll().then((data) => res.json(data));
});
router.post('/',async(req,res)=>{
  const r=req.body
  service.get((r.UserId,r.Status,r.Dates,r.Createdate))
  .then(data=>res.json(data))
})