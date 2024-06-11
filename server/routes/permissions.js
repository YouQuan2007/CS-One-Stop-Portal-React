import express from "express";
const router = express.Router();
import { Lecturers } from "../models/Lecturers.js";
import { Students } from "../models/Students.js";
import { Resources } from "../models/resourcesDetails.js";

// Grant access to a user
router.put("/grant-access/:id", async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
  
    try {
        // Check if the user exists in either the Lecturers or Students collection
        const existingUser = await Lecturers.findOne({ email }) || await Students.findOne({ email });
  
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        // Check if the resource exists
        const resource = await Resources.findById(id);
  
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
  
        // Check if the user already has access to the resource
        if (resource.permittedUsers.includes(email)) {
            return res.status(400).json({ error: 'User already has access to the resource' });
        }
  
        // Grant access to the user
        resource.permittedUsers.push(email);
        await resource.save();
  
        res.status(200).json({ message: 'Access granted!' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(err);
    }
});

// Remove access from a user
router.put("/remove-access/:id", async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
  
    try {
        // Check if the user exists in either the Lecturers or Students collection
        const existingUser = await Lecturers.findOne({ email }) || await Students.findOne({ email });
  
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        // Check if the resource exists
        const resource = await Resources.findById(id);
  
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
  
        // Check if the user has access to the resource
        if (!resource.permittedUsers.includes(email)) {
            return res.status(400).json({ error: 'User does not have access to the resource' });
        }
  
        // Remove access from the user
        resource.permittedUsers = resource.permittedUsers.filter(userEmail => userEmail !== email);
        await resource.save();
  
        res.status(200).json({ message: 'Access removed' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(err);
    }
});

export { router as permissionsRouter };
