const prisma = require('../db');    
    
// Create Feedback    
const createFeedback = async (req, res) => {    
    const courseId = parseInt(req.params.courseId);    
    const { feedback } = req.body;    
    const { id: userId } = req.user; // Ambil id dari autentikasi yang sudah diverifikasi    
    
    // Validasi input    
    if (!feedback || feedback.trim() === "") {    
        return res.status(400).json({ message: 'Feedback cannot be empty' });    
    }    
    
    try {    
        // Mengecek apakah user sudah terdaftar dalam kursus ini    
        const courseMember = await prisma.courseMember.findFirst({    
            where: {    
                courseId,    
                userId,    
            },    
        });    
    
        if (!courseMember) {    
            return res.status(400).json({ message: 'User is not enrolled in this course' });    
        }    
    
        // Mengecek apakah peran pengguna adalah student    
        if (courseMember.roles !== 'STUDENT') {    
            return res.status(403).json({ message: 'Only students can give feedback' });    
        }    
    
        // Menambahkan feedback baru    
        const newFeedback = await prisma.courseFeedback.create({    
            data: {    
                courseId,    
                userId,    
                feedback,    
            },    
        });    
    
        return res.status(201).json({ message: 'Feedback created successfully', feedback: newFeedback });    
    } catch (error) {    
        console.error('Error creating feedback:', error);    
        return res.status(500).json({ message: 'Server error', error: error.message });    
    }    
};    
    
// Update Feedback    
const updateFeedback = async (req, res) => {    
    const { feedbackId } = req.params;    
    const { feedback } = req.body;    
    const { id: userId } = req.user; // Ambil id dari autentikasi    
    
    // Validasi input    
    if (!feedback || feedback.trim() === "") {    
        return res.status(400).json({ message: 'Feedback cannot be empty' });    
    }    
    
    try {    
        const existingFeedback = await prisma.courseFeedback.findUnique({    
            where: {    
                id: Number(feedbackId),    
                userId,    
            },    
        });    
    
        if (!existingFeedback) {    
            return res.status(404).json({ message: 'Feedback not found or you are not authorized' });    
        }    
    
        // Mengupdate feedback    
        const updatedFeedback = await prisma.courseFeedback.update({    
            where: { id: existingFeedback.id },    
            data: { feedback },    
        });    
    
        return res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });    
    } catch (error) {    
        console.error('Error updating feedback:', error);    
        return res.status(500).json({ message: 'Server error', error: error.message });    
    }    
};    
    
// Get All Feedback for a Course    
const getAllFeedback = async (req, res) => {    
    const { courseId } = req.params;    
    
    try {    
        const feedbacks = await prisma.courseFeedback.findMany({    
            where: {    
                courseId: Number(courseId),    
            },    
            include: {    
                user: true, // Mengambil informasi pengguna yang memberikan feedback    
            },    
        });    
    
        if (feedbacks.length === 0) {    
            return res.status(404).json({ message: 'No feedback found for this course' });    
        }    
    
        return res.status(200).json(feedbacks);    
    } catch (error) {    
        console.error('Error fetching feedback:', error);    
        return res.status(500).json({ message: 'Server error', error: error.message });    
    }    
};    
    
// Delete Feedback    
const deleteFeedback = async (req, res) => {    
    const { feedbackId } = req.params;    
    const { id: userId } = req.user; // Ambil id dari autentikasi    
    
    try {    
        const existingFeedback = await prisma.courseFeedback.findUnique({    
            where: {    
                id: Number(feedbackId),    
                userId,    
            },    
        });    
    
        if (!existingFeedback) {    
            return res.status(404).json({ message: 'Feedback not found or you are not authorized' });    
        }    
    
        // Menghapus feedback    
        await prisma.courseFeedback.delete({    
            where: { id: existingFeedback.id },    
        });    
    
        return res.status(200).json({ message: 'Feedback deleted successfully' });    
    } catch (error) {    
        console.error('Error deleting feedback:', error);    
        return res.status(500).json({ message: 'Server error', error: error.message });    
    }    
};    
    
module.exports = {    
    createFeedback,    
    updateFeedback,    
    getAllFeedback,    
    deleteFeedback,    
};    
