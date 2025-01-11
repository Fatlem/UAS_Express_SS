const prisma = require('../db');  // Pastikan Prisma sudah diinisialisasi dengan benar    
  
// Add Bookmark    
const addBookmark = async (req, res) => {    
  const { courseContentId } = req.body;    
  const userId = req.user.id;  // Ambil userId dari req.user.id  
  
  try {    
    // Mendapatkan courseId berdasarkan courseContentId  
    const courseContent = await prisma.courseContent.findUnique({  
      where: { id: courseContentId },  
      select: { courseId: true },  // Hanya ambil courseId  
    });  
  
    if (!courseContent) {  
      return res.status(404).json({ message: 'Course content tidak ditemukan' });  
    }  
  
    const courseId = courseContent.courseId;  
  
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
  const userId = req.user.id;  // Ambil userId dari req.user.id    
    
  try {    
    const bookmarks = await prisma.bookmark.findMany({    
      where: { userId },    
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
