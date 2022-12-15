const router = require("express").Router();
const service = require("../service/csv_service");


module.exports = router;
router.get("/all", async (req, res) => {
  service
    .generateCsvReportForAllUser()
    .then(() => res.send({ message: "Successfully Generated" }))
    .catch((err) => res.status(409).json(err));
});
router.get("/teachers", service.generateListOfTeachers);
router.get("/teachers/bio");
