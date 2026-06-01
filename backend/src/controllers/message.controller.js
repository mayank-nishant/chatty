import mongoose from "mongoose";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).lean();

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllContacts:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID." });
    }

    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error in getMessagesByUserId:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ success: false, message: "Invalid receiver ID." });
    }

    const sanitizedText = typeof text === "string" ? text.trim() : null;
    const sanitizedImage = typeof image === "string" && image.trim() ? image.trim() : null;

    if (!sanitizedText && !sanitizedImage) {
      return res.status(400).json({ success: false, message: "Text or image is required." });
    }

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ success: false, message: "You cannot message yourself." });
    }

    const receiverExists = await User.exists({ _id: receiverId });

    if (!receiverExists) {
      return res.status(404).json({ success: false, message: "Receiver not found." });
    }

    let imageUrl = null;

    if (sanitizedImage) {
      const uploadResponse = await cloudinary.uploader.upload(sanitizedImage, {
        folder: "chatty/messages",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: sanitizedText || null,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const partnerIds = await Message.distinct("senderId", { receiverId: loggedInUserId }).then(async (senderIds) => {
      const receiverIds = await Message.distinct("receiverId", { senderId: loggedInUserId });
      return [...new Set([...senderIds, ...receiverIds].map(String))];
    });

    const chatPartners = await User.find({ _id: { $in: partnerIds } }).lean();

    return res.status(200).json({ success: true, chatPartners });
  } catch (error) {
    console.error("Error in getChatPartners:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
