const service = require("../service/csv_service");
const router = require("express").Router();

module.exports = router;
router.get("/:fileName", async (req, res) => {
  res.sendFile(req.params.fileName, { root: "school2/csv/" });
});
// router.get('/hello',(req,res)=>{
//   res.send("kjhgvsd")
// })
// // router.set('base', '/myapp')