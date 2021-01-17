import mongoose from 'mongoose';

const { Schema } = mongoose;

const statusSchema = new Schema({
  status: { type: String, required: true, unique: true },
  describe: String,
  active: { type: Boolean, default: 1 },
}, { collection: 'status', timestamps: true });

const status = mongoose.model('status', statusSchema);

// eslint-disable-next-line import/prefer-default-export
export { status };
