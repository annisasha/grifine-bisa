import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    messages: [
      {
        sender: { type: String, enum: ["user", "bot"], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ]
  },
  { timestamps: true } // ✅ ini tempat yang benar
);


export default mongoose.model("Conversation", ConversationSchema);
