import React, { useState, useEffect } from "react";
import {
  deleteConversation,
  updateConversationTitle,
} from "../api/chatService";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import "./ChatHistorySidebar.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function ChatHistorySidebar(props) {
  const {
    conversations,
    onSelectConversation,
    onCreateConversation,
    selectedConversationId,
    refreshConversations,
  } = props;

  const { user } = useAuth();
  const [editingTitle, setEditingTitle] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const handleEditTitle = (id, title) => {
    setEditingTitle(id);
    setNewTitle(title);
  };

  const handleSaveTitle = async (id) => {
    try {
      await updateConversationTitle(id, newTitle);
      setEditingTitle(null);
      if (refreshConversations) refreshConversations();
    } catch (error) {
      console.error("Gagal mengedit judul:", error);
    }
  };

  const handleConversationDelete = async (id) => {
    try {
      await deleteConversation(id);
      if (refreshConversations) refreshConversations();
    } catch (error) {
      console.error("Gagal menghapus percakapan:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const formatLastUpdated = (updatedAt) => {
    const now = dayjs();
    const updated = dayjs(updatedAt);

    if (updated.isSame(now, "day")) {
      return "Hari ini";
    } else if (updated.isSame(now.subtract(1, "day"), "day")) {
      return "Kemarin";
    } else {
      return updated.fromNow();
    }
  };

  return (
    <div className="chathistory-sidebar">
      <div className="sidebar-header">
        <h4>Riwayat Percakapan</h4>
        <button className="new-chat-btn" onClick={onCreateConversation}>
          <FaPlus /> Buat Percakapan Baru
        </button>
      </div>

      <div className="conversation-list">
        {user && (!conversations || conversations.length === 0) ? (
          <div className="no-conversations">Belum ada percakapan</div>
        ) : (
          conversations
            .slice()
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((conversation) => {
              if (!conversation || !conversation._id) return null;

              return (
                <div
                  key={conversation._id}
                  className={`conversation-item ${
                    conversation._id === selectedConversationId ? "active" : ""
                  }`}
                  onClick={() => onSelectConversation(conversation._id)}
                >
                  {editingTitle === conversation._id ? (
                    <div className="edit-title-container">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveTitle(conversation._id);
                          }
                        }}
                        placeholder="Edit judul percakapan"
                      />
                    </div>
                  ) : (
                    <div className="conversation-title-wrapper">
                      <div className="conversation-title-block">
                        <span className="conversation-title">
                          {conversation.title || "Percakapan Baru"}
                        </span>
                        <span className="conversation-updated">
                          {formatLastUpdated(conversation.updatedAt)}
                        </span>
                      </div>

                      <div
                        className="menu-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="menu-toggle"
                          onClick={() =>
                            setActiveMenu(
                              activeMenu === conversation._id
                                ? null
                                : conversation._id
                            )
                          }
                        >
                          &#8942;
                        </button>

                        {activeMenu === conversation._id && (
                          <div className="menu-dropdown">
                            <button
                              className="menu-item"
                              onClick={() =>
                                handleEditTitle(
                                  conversation._id,
                                  conversation.title
                                )
                              }
                            >
                              <FaEdit style={{ marginRight: "8px" }} /> Edit
                              Judul
                            </button>
                            <button
                              className="menu-item delete"
                              onClick={() =>
                                handleConversationDelete(conversation._id)
                              }
                            >
                              <FaTrash style={{ marginRight: "8px" }} /> Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default ChatHistorySidebar;
