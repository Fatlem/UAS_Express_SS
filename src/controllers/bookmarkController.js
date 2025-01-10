const prisma = require('../db');  // Pastikan Prisma sudah diinisialisasi dengan benar  
  
// Add Bookmark  
const addBookmark = async (req, res) => {  
  const { userId, courseContentId, courseId } = req.body;  
  
  try {  
    // Mengecek apakah bookmark sudah ada  
    const existingBookmark = await prisma.bookmark.findFirst({  
      where: {  
        userId,  
        courseContentId,  
        courseId,  
      },  
    });  
  
    if (existingBookmark) {  
      return res.status(400).json({ message: 'Bookmark sudah ada' });  
    }  
  
    const bookmark = await prisma.bookmark.create({  
      data: {  
        userId,  
        courseContentId,  
        courseId,  
      },  
    });  
    res.status(201).json(bookmark);  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });  
  }  
};  
  
// Show Bookmarks  
const showBookmarks = async (req, res) => {  
  const { userId } = req.query;  
  
  try {  
    const bookmarks = await prisma.bookmark.findMany({  
      where: { userId: parseInt(userId) },  
      include: {  
        courseContent: true,  
        course: true,  
      },  
    });  
    res.status(200).json(bookmarks);  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });  
  }  
};  
  
// Delete Bookmark  
const deleteBookmark = async (req, res) => {  
  const { id } = req.params;  
  
  try {  
    const bookmark = await prisma.bookmark.findUnique({  
      where: { id: parseInt(id) },  
    });  
  
    if (!bookmark) {  
      return res.status(404).json({ message: 'Bookmark tidak ditemukan' });  
    }  
  
    // Hapus bookmark dari database  
    await prisma.bookmark.delete({  
      where: { id: parseInt(id) },  
    });  
  
    res.status(204).send();  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });  
  }  
};  
  
module.exports = {  
  addBookmark,  
  showBookmarks,  
  deleteBookmark,  
};  
