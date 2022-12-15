const router = require("express").Router();
const service = require("../service/csv_service");

module.exports = router;
router.get("/teachers", service.generateListOfTeachers);

router.get("/all", async (req, res) => {
  service
    .generateCsvReportForAllUser()
    .then(() => res.send({ message: "Successfully Generated" }))
    .catch((err) => res.status(409).json(err));
});
router.get("/teachers/bio/", async (req, res) => {
  service
    .generate_a_Report_For_Particular_Teacher(req.query.id)
    .catch((data) => res.json(data))
    .then((data) => res.json(data));
});
router.get("/teacher/attendance/:id", async (req, res) => {
  service
    .generate_a_Report_For_Particular_Teacher_attendance_for_yesterday(
      req.params.id
    )
    .catch((data) => res.json(data))
    .then((data) => res.json(data));
});
