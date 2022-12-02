const router = require("express").Router();
module.exports = router;
const service = require("../service/classes");

router.post("/post", async (req, res) => {
  res.json(service.save(req.body.name, req.body.teacher));
});
router.get('/',async (req,res)=>{
  service.getAll().then(data=>res.json(data))
})
router.put('/:class',async(req,res)=>{

  service.getByClassName(req.params.class).then(data=>res.json(data))
})