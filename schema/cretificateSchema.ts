import mongoose, {Schema} from "mongoose";

const certificateSchema = new Schema({
    CertificateId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    position: {type: String, required: true},
    club: {type: String},
    joinedFrom: {type: Date},
    joinedTo: {type: Date},
    description: {type: String},
    createdAt: {type: Date, default: Date.now}
});

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
export default Certificate;