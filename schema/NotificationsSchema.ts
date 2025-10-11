import mongoose, {Schema} from 'mongoose';

const NotificationsSchema = new Schema({
   title: { type: String, required: true },
   content: { type: String, required: true },
   imageUrl: String,
   createdAt: { type: Date, default: Date.now },
   uploadedBy: { type: String, required: true },
   isImportant: { type: Boolean, default: false },
   expireAt: Date
});

const Notifications = mongoose.models.Notifications || mongoose.model('Notifications', NotificationsSchema);
export default Notifications;