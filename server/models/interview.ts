import * as mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  // _id: {type: String, unique: true, auto: true, required: true, index: true},
  sourceUrl: { type: String, default: "", required: true },
  title: { type: String, default: "" },
  sourceLang: { type: String, default: "en" },
  textOriginal: String,
  textRu: { type: String, default: "" },
  addedBy: { type: String, default: "" },
  addedDate: { type: Date, default: Date.now },
  isVideo: { type: Boolean, default: false },
  isAudio: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false }
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;