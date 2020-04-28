import { Schema, model, Document } from 'mongoose'

interface ChannelInterface extends Document{
    idVideo?: string;
    country?: string;
    rank?: string;
    title?: string;
    description?: string;
    publishedAt?: string;
    viewCount?: string;
    likeCount?: string;
    dislikeCount?: string;
    favoriteCount?: string;
    commentCount?: string;
    collectionAt?: Date;
}

const ChannelSchema = new Schema({
  idVideo: String,
  channel: String,
  country: String,
  rank: String,
  title: String,
  description: String,
  publishedAt: String,
  viewCount: String,
  likeCount: String,
  dislikeCount: String,
  favoriteCount: String,
  commentCount: String,
  collectionAt: Date
}, {
  timestamps: true
})
export default model<ChannelInterface>('Video', ChannelSchema)
