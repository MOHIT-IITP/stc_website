import mongoose, { Schema } from "mongoose";

const EventsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: String,
  imageFileId: String,
  club: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  eventDate: { type: Date, required: true },
  isImportant: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  status: { type: String },
  redirectLink: String,
  redirectLabel: String,
  resourcesLink: String,
  resourcesLabel: String,
  showNotification: { type: Boolean, default: false },
  expireAt: Date,
});

const Events = mongoose.models.Events || mongoose.model("Events", EventsSchema);
export default Events;
