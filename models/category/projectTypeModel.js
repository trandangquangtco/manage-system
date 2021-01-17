import mongoose from 'mongoose';

const { Schema } = mongoose;

const prjSchema = new Schema({
  projectType: { type: String, unique: true, required: true },
  describe: String,
  important: { type: Number, default: 1 },
  active: Boolean,
}, { collection: 'projectType', timestamps: true });

const projectType = mongoose.model('projectType', prjSchema);

// eslint-disable-next-line import/prefer-default-export
export { projectType };
