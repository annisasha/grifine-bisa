import { sendToDialogflow } from '../config/dialogflow.js'; // Import fungsi dari dialogflow.js
import Conversation from '../models/Conversation.js';
import { v4 as uuidv4 } from 'uuid'; // pastikan uuidv4 di-import

export const chatController = async (req, res) => {
  const { message, conversationId } = req.body;
  const sessionId = uuidv4();

  try {
    const dialogflowResponse = await sendToDialogflow(sessionId, message);

    const botMessages = dialogflowResponse.messages.map((msg) => ({
      sender: 'bot',
      text: msg,
      timestamp: new Date(),
    }));

    if (req.userId) {
      if (conversationId) {
        const conversation = await Conversation.findById(conversationId);
        if (conversation) {
          conversation.messages.push(
            {
              sender: 'user',
              text: message,
              timestamp: new Date(),
            },
            ...botMessages
          );
          await conversation.save();
        } else {
          return res.status(404).json({ error: 'Percakapan tidak ditemukan.' });
        }
      } else {
        await Conversation.create({
          userId: req.userId,
          title: 'Percakapan Baru',
          messages: [
            {
              sender: 'user',
              text: message,
              timestamp: new Date(),
            },
            ...botMessages
          ],
        });
      }
    }

    res.json({ botResponse: dialogflowResponse.messages }); // kirim array ke frontend
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

export const getConversations = async (req, res) => {
  // Jika tidak ada userId (user tamu)
  if (!req.userId) {
    try {
      const conversations = await Conversation.find({ userId: null }); // Mencari percakapan tanpa userId (untuk tamu)
      return res.json(conversations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Gagal mendapatkan percakapan.' });
    }
  }

  // Jika ada userId, cari percakapan berdasarkan userId
  try {
    const conversations = await Conversation.find({ userId: req.userId });
    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan percakapan.' });
  }
};

export const getConversationHistory = async (req, res) => {
  const conversationId = req.params.id;

  try {
    const conversation = await Conversation.findOne({ _id: conversationId, userId: req.userId });
    if (!conversation) {
      return res.status(404).json({ error: 'Percakapan tidak ditemukan.' });
    }

    res.json({ messages: conversation.messages });
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil riwayat percakapan.' });
  }
};


// Fungsi untuk mengedit judul percakapan (untuk user login)
export const editConversationTitle = async (req, res) => {
  const { conversationId, newTitle } = req.body;
  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Percakapan tidak ditemukan.' });
    }

    // Mengubah judul percakapan
    conversation.title = newTitle;
    await conversation.save();

    res.json({ message: 'Judul percakapan berhasil diubah.' });
  } catch (error) {
    console.error('Error editing conversation title:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengubah judul percakapan.' });
  }
};

// Fungsi untuk menghapus percakapan (untuk user login)
export const deleteConversation = async (req, res) => {
  const { conversationId } = req.body;

  try {
    // Mencari dan menghapus percakapan berdasarkan conversationId
    const conversation = await Conversation.findByIdAndDelete(conversationId);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Percakapan tidak ditemukan.' });
    }

    res.json({ message: 'Percakapan berhasil dihapus.' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus percakapan.' });
  }
};

// Fungsi untuk membuat percakapan kosong
export const createEmptyConversation = async (req, res) => {
  if (!req.userId) {
    res.status(201).json({
      message: 'Percakapan baru berhasil dibuat.',
      conversation: newConversation,
    });
  }

  try {
    const newConversation = await Conversation.create({
      userId: req.userId,
      title: "Percakapan Baru",
      messages: [],
    });

    res.status(201).json(newConversation);
  } catch (error) {
    console.error('Gagal membuat percakapan baru:', error);
    res.status(500).json({ message: 'Gagal membuat percakapan baru.' });
  }
};

