import express from 'express';
import { chatController, getConversations, editConversationTitle, deleteConversation, createEmptyConversation, getConversationHistory } from '../controllers/chatController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route untuk chat
// Bisa diakses oleh tamu dan pengguna yang login
// router.post('/chat', chatController);  // Pastikan ada route ini tanpa middleware untuk user tamu
router.post('/chat', authMiddleware, chatController); // Sekarang bisa deteksi user login

router.post('/conversation', authMiddleware, createEmptyConversation); // endpoint untuk buat percakapan kosong

// Route untuk mendapatkan daftar percakapan
// Hanya dapat diakses oleh pengguna yang sudah login
router.get('/conversations', authMiddleware, getConversations);

// Route untuk mengedit judul percakapan
// Hanya dapat diakses oleh pengguna yang sudah login
router.put('/conversation/title', authMiddleware, editConversationTitle);

// Route untuk menghapus percakapan
// Hanya dapat diakses oleh pengguna yang sudah login
router.delete('/conversation', authMiddleware, deleteConversation);

router.get('/conversations/:id/history', authMiddleware, getConversationHistory);

export default router;
