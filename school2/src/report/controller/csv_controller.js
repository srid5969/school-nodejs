const router = require("express").Router();
const service = require("../service/csv_service");

module.exports = router;
router.get("/teachers", service.generateListOfTeachers); //1

router.get("/all", async (_req, res) => {
  service
    .generateCsvReportForAllUser(userDetail.email)
    .then(() => res.send({ message: "The Mail has been successfully sended" }))
    .catch((err) => res.status(409).json(err));
}); //2
router.get("/teachers/bio/", async (req, res) => {
  service
    .generate_a_Report_For_Particular_Teacher(req.query.id)
    .catch((data) => res.json(data))
    .then((data) => res.json(data));
}); //3
router.get("/teacher/attendance/:id", async (req, res) => {
  service
    .generate_a_Report_For_Particular_Teacher_attendance_for_yesterday(
      req.params.id,userDetail.email
    )
    .catch((data) => res.json(data))
    .then((data) => res.json(data));
}); //4
router.get("/teacher/attendance/:id/month/:month", async (req, res) => {
  service
    .get_monthly_report_for_a_teacher(req.params.id, req.params.month,userDetail.email)
    .then(() => res.json({ message: "Successfully Generated" }));
}); //5
router.get("/teacher/attendance/:id", async (req, res) => {
  service
    .generate_a_Report_For_Particular_Teacher_attendance_for_yesterday(
      req.params.id,userDetail.email
    )
    .catch((data) => res.json(data))
    .then((data) => res.json(data));
}); //6
router.get("/student/attendance/:id/month/:month", async (req, res) => {
  service
    .get_monthly_report_for_a_student(req.params.id, req.params.month,userDetail.email)
    .then(() => res.json({ message: "Successfully Generated" }));
}); //7
router.get("/student/attendance/:id/year/:year", async (req, res) => {
  service
    .get_yearly_report_for_a_student(req.params.id, req.params.year,userDetail.email)
    .then(() => res.json({ message: "Successfully Generated" }));
}); //8
router.get("/teacher/attendance/:id", async (req, res) => {
  service
    .generate_a_Report_For_Particular_Teacher(req.params.id,userDetail.email)
    .then(() => res.json({ message: "Success" }));
});
// router.get("/allUsers", async (_req, res) => {
//   res.sendFile("allUsers.csv", { root: "school2/csv/" });
// });
