const service = require("../service/csv_service");
const router = require("express").Router();

module.exports = router;
router.get("/allUsers", async (req, res) => {
  res.sendFile("allUsers.csv", { root: "school2/csv/" });
});
// router.get('/hello',(req,res)=>{
//   res.send("kjhgvsd")
// })
// // router.set('base', '/myapp')