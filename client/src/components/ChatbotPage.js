import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getConversations,
  getConversationHistory,
  createConversation,
} from "../api/chatService";
import Chatbot from "./Chatbot";
import ChatHistorySidebar from "./ChatHistorySidebar";
import "./styles.css";

const ChatbotPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    if (user) {
      getConversations()
        .then((response) => {
          setConversations(response.data || []);
          if (response.data && response.data.length > 0) {
            const firstId = response.data[0]._id;
            setConversationId(firstId);
            getConversationHistory(firstId).then((res) => {
              const rawMessages = res.data.messages || [];
              const mappedMessages = rawMessages.map((msg) => ({
                text: msg.text, // atau msg.content kalau dari API
                sender: msg.sender, // pastikan format ini konsisten
              }));
              setMessages(mappedMessages);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching conversations:", error);
        });
    }
  }, [user]);

  const handleConversationSelected = (conversationId) => {
    setConversationId(conversationId);
    console.log("Percakapan ID yang dipilih:", conversationId);

    getConversationHistory(conversationId)
      .then((res) => {
        const rawMessages = res.data.messages || [];
        const mappedMessages = rawMessages.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
        }));        
        setMessages(mappedMessages);
      })
      .catch((error) => {
        console.error("Error fetching conversation history:", error);
      });
  };

const fetchConversations = async () => {
  const response = await getConversations();
  setConversations(response.data || []);
};

const handleCreateConversation = async () => {
  try {
    const response = await createConversation(); // buat percakapan
    const newConversation = response.data;
    await fetchConversations(); // ⬅️ Tambahkan ini untuk update sidebar
    handleConversationSelected(newConversation._id); // pindah ke percakapan baru
  } catch (error) {
    console.error("Gagal membuat percakapan:", error);
  }
};

  return (
    <div className="chatbot-layout">
      {user && !user.guest && (
        <ChatHistorySidebar
        conversations={conversations}
        onSelectConversation={handleConversationSelected}
        onCreateConversation={handleCreateConversation}
        selectedConversationId={conversationId}
        refreshConversations={fetchConversations}
      />      
      )}
      <Chatbot
        setMessages={setMessages}
        messages={messages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        input={input}
        setInput={setInput}
        conversationId={conversationId}
        isUserLoggedIn={!!user}
        refreshConversations={fetchConversations} 
      />
    </div>
  );
};

export default ChatbotPage;
