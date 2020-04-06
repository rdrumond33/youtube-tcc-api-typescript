import { Schema, model, Document } from 'mongoose'

interface ChannelInterface extends Document{
    id?: string;
    channel?: string;
    country?: string;
    title?: string;
    description?: string;
    publishedAt?: string;
    viewCount?: string;
    likeCount?: string;
    dislikeCount?: string;
    favoriteCount?: string;
    commentCount?: string;
}

const ChannelSchema = new Schema({
  idVideo: String,
  channel: String,
  country: String,
  title: String,
  description: String,
  publishedAt: String
}, {
  timestamps: true
})
export default model<ChannelInterface>('Channel', ChannelSchema)
