import express from "express";
import jobApplicationModel from "../models/jobApplicationModel.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/analytics", protect, async (req, res) => {
  try {
    const applications = await jobApplicationModel.find({ user: req.user._id });

    const monthlyData = {};
    const yearlyData = {};

    applications.forEach((app) => {
      const date = new Date(app.dateOfApplication);
      const month = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const year = `${date.getFullYear()}`;

      if (!monthlyData[month]) {
        monthlyData[month] = {
          applied: 0,
          interview: 0,
          inReview: 0,
          rejected: 0,
        };
      }
      if (!yearlyData[year]) {
        yearlyData[year] = {
          applied: 0,
          interview: 0,
          inReview: 0,
          rejected: 0,
        };
      }

      if (app.status === "Applied") {
        monthlyData[month].applied++;
        yearlyData[year].applied++;
      } else if (app.status === "In Review") {
        monthlyData[month].inReview++;
        yearlyData[year].inReview++;
      } else if (app.status === "Interview") {
        monthlyData[month].interview++;
        yearlyData[year].interview++;
      } else if (app.status === "Rejected") {
        monthlyData[month].rejected++;
        yearlyData[year].rejected++;
      }
    });

    const monthlySorted = Object.entries(monthlyData)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const yearlySorted = Object.entries(yearlyData)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    res.json({
      total: applications.length,
      applied: applications.filter((app) => app.status === "Applied").length,
      inReview: applications.filter((app) => app.status === "In Review").length,
      interview: applications.filter((app) => app.status === "Interview")
        .length,
      rejected: applications.filter((app) => app.status === "Rejected").length,
      monthly: monthlySorted,
      yearly: yearlySorted,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "We could not fetch analytics data" });
  }
});

export default router;
