import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
      index: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver is required"],
      index: true,
    },

    text: {
      type: String,
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
      default: null,
    },

    image: {
      type: String,
      trim: true,
      maxlength: [2048, "Image URL is too long"],
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

messageSchema.pre("validate", function () {
  const hasText = this.text && this.text.trim().length > 0;

  const hasImage = this.image && this.image.trim().length > 0;

  if (!hasText && !hasImage) {
    this.invalidate("text", "Message must contain either text or an image.");
  }
});

messageSchema.index({
  senderId: 1,
  receiverId: 1,
  createdAt: -1,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
