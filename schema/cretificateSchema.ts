import mongoose, {Schema} from "mongoose";

const certificateSchema = new Schema({
    CertificateId: {type: String, required: true, unique: true},
    name: {type: String}, // Standard Name or Winner Name
    position: {type: String}, // Standard Position or Event Position (e.g. Winner, Runner Up)
    club: {type: String},
    joinedFrom: {type: Date},
    joinedTo: {type: Date},
    description: {type: String},
    isHackathon: {type: Boolean, default: false},
    teamName: {type: String},
    teamMembers: [{
        name: {type: String},
        email: {type: String}
    }],
    projectName: {type: String},
    eventName: {type: String}, // Used for both hackathon and events
    organizedBy: {type: String, default: "STC"},
    eventVenue: {type: String, default: "Phoenix"},
    isEvent: {type: Boolean, default: false},
    winnerEmail: {type: String},
    createdAt: {type: Date, default: Date.now}
});

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
export default Certificate;