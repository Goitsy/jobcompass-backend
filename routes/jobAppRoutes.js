import express from "express";
import jobApplicationModel from "../models/jobApplicationModel.js";
import dotenv from "dotenv";
import protect from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

router.post("/", protect, async (req, res) => {
    const { jobUrl, jobTitle, dateOfApplication, company, location, status } =
        req.body;

    try {
        const newApplication = new jobApplicationModel({
            jobUrl,
            jobTitle,
            dateOfApplication,
            company,
            location,
            status,
            user: req.user._id,
        });

        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Server error in creating application", error });
    }
});

router.get("/", protect, async (req, res) => {
    try {
        const applications = await jobApplicationModel
            .find({ user: req.user._id })
            .populate("user", "name");

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Server error when getting applications" });
    }
});

router.put("/update-status", protect, async (req, res) => {
    const { id, status } = req.body;

    try {
        console.log("Finding application with ID:", id);
        const application = await jobApplicationModel.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: false } // Skip validation for updates
        );

        if (!application) {
            console.log("Application not found");
            return res.status(404).json({ message: "Job application doesn't exist" });
        }

        console.log("Application status updated:", application);
        res.status(200).json({
            message: "Status updated successfully.",
            application,
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({
            message: "Server experienced error updating status",
            error,
        });
    }
});

router.put("/:id", protect, async (req, res) => {
    const { jobUrl, jobTitle, dateOfApplication, company, location, status } =
        req.body;

    try {
        console.log("Finding application with ID:", req.params.id);
        const application = await jobApplicationModel.findById(req.params.id);

        if (!application) {
            console.log("Application not found");
            return res.status(404).json({ message: "Job application doesn't exist" });
        }

        console.log("Checking user authorization");
        if (application.user.toString() !== req.user._id.toString()) {
            console.log("Unauthorized access");
            return res.status(401).json({ message: "User Not Authorized" });
        }

        console.log("Updating application fields");
        application.jobUrl = jobUrl;
        application.jobTitle = jobTitle;
        application.dateOfApplication = dateOfApplication;
        application.company = company;
        application.location = location;
        application.status = status;

        console.log("Saving updated application");
        await application.save();

        res.json(application);
    } catch (error) {
        console.error("Error during PUT request:", error);
        res.status(500).json({
            message: "Server experienced error updating application",
            error,
        });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        const application = await jobApplicationModel.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Job application not found" });
        }

        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not an authorized user" });
        }
        await jobApplicationModel.deleteOne({ _id: application._id });
        res.json({ message: "Job application has been deleted" });
    } catch (error) {
        console.error("Error during DELETE request:", error);
        res.status(500).json({
            message: "Server experienced error deleting application",
            error,
        });
    }
});

export default router;
