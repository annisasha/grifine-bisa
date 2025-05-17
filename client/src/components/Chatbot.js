import React, { useEffect, useRef } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { sendMessage } from "../api/chatService";
import { FaArrowUp } from "react-icons/fa";
import "./styles.css";

const quickQuestions = [
  { text: "Cara Mengelola Modal", emoji: "💰" },
  { text: "Lembaga Permodalan untuk Usaha Pertanian", emoji: "🌐" },
  { text: "Cara Dapat Modal Usaha", emoji: "💡" },
];

const Chatbot = ({
  setMessages,
  messages,
  isLoading,
  setIsLoading,
  input,
  setInput,
  conversationId,
  isUserLoggedIn,
  refreshConversations,
  isSidebarOpen,
}) => {
  const chatboxRef = useRef(null);

  const handleSendMessage = async (textFromShortcut = "") => {
    const messageToSend = textFromShortcut || input.trim();
    if (!messageToSend) return;

    const userMsg = { text: messageToSend, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Kirim pesan berdasarkan status login
      if (isUserLoggedIn) {
        const response = await sendMessage(messageToSend, conversationId);
        const botReplies = Array.isArray(response.botResponse)
          ? response.botResponse.map((msg) => ({ text: msg, sender: "bot" }))
          : [{ text: response.botResponse, sender: "bot" }];
        setMessages((prev) => [...prev, ...botReplies]);
      } else {
        // Untuk user tamu, hanya kirim pesan tanpa menyimpan riwayat
        const response = await sendMessage(messageToSend);
        const botReply = { text: response.botResponse, sender: "bot" };
        setMessages((prev) => [...prev, botReply]);
        if (refreshConversations) refreshConversations();
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Terjadi kesalahan saat mengirim pesan", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Untuk auto-scroll saat messages berubah
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  // Untuk reset pesan saat conversationId berubah (misal buat percakapan baru)
  useEffect(() => {
    setMessages([]); // ini akan trigger tampilan pertanyaan cepat
  }, [conversationId]);

  return (
    <div
      className={`chatbot-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {messages.length === 0 && (
        <>
          <h2 className="chatbot-title">Mau Tanya Apa Hari Ini?</h2>
          <div className="chat-options">
            {quickQuestions.map((q, i) => (
              <div
                key={i}
                className="option"
                onClick={() => handleSendMessage(q.text)} // Pilih pertanyaan singkat
              >
                {q.emoji} {q.text}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="chatbox" ref={chatboxRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div
        className={`chat-input-container ${
          messages.length > 0 ? "with-margin" : ""
        }`}
      >
        <input
          type="text"
          className="chat-input"
          placeholder="Tanya sesuatu ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={
            (e) => e.key === "Enter" && !isLoading && handleSendMessage() // Kirim pesan saat tekan Enter
          }
          disabled={isLoading}
        />
        <button
          className="chat-send-button"
          onClick={() => !isLoading && handleSendMessage()}
          disabled={isLoading}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
