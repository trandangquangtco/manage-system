import mongoose from 'mongoose';

const { Schema } = mongoose;

const techSchema = new Schema({
  techStack: { type: String, unique: true, required: true },
  describe: String,
  active: Boolean,
}, { collection: 'techStack', timestamps: true });

const techStack = mongoose.model('techStack', techSchema);

// eslint-disable-next-line import/prefer-default-export
export { techStack };
