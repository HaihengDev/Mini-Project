import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: 'messages' },
);

// --> help mongodb jump directly to find connection between two users chat
MessageSchema.index({ sender: 1, receiver: 1 });
// return newest chat very quick
MessageSchema.index({ createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
