import mongoose from 'mongoose';

const { Schema } = mongoose;

const centerSchema = new Schema({
  center: { type: String, unique: true, required: true },
  describe: String,
  techStack: [{ type: Schema.Types.ObjectId, ref: 'techStack', _id: false }],
  project: [{ type: Schema.Types.ObjectId, ref: 'project', _id: false }],
  staff: [{ type: Schema.Types.ObjectId, ref: 'staff', _id: false }],
}, { collection: 'center', timestamps: true });

const center = mongoose.model('center', centerSchema);

// eslint-disable-next-line import/prefer-default-export
export { center };
