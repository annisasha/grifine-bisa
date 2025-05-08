import api from './index';

// Fungsi untuk mengirim pesan
export const sendMessage = async (message, conversationId) => {
  const response = await api.post('/api/chat', { message, conversationId });
  return response.data;
};

// Fungsi untuk mengambil daftar percakapan
export const getConversations = () => {
  return api.get('/api/conversations');
};

// Fungsi untuk menghapus percakapan
export const deleteConversation = (conversationId) => {
  return api.delete('/api/conversation', {
    data: { conversationId },
  });
};

// Fungsi untuk memperbarui judul percakapan
export const updateConversationTitle = (conversationId, newTitle) => {
  return api.put('/api/conversation/title', { conversationId, newTitle });
};

// Fungsi untuk mengambil riwayat percakapan berdasarkan ID
export const getConversationHistory = (conversationId) => {
  return api.get(`/api/conversations/${conversationId}/history`);
};

// Fungsi untuk membuat percakapan baru
export const createConversation = async () => {
  const response = await api.post('/api/conversation');
  return response.data;
};
