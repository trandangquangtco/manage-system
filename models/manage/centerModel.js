import mongoose from 'mongoose';

const { Schema } = mongoose;

const centerSchema = new Schema({
  center: { type: String, unique: true, required: true },
  describe: String,
  techStack: [{ type: Schema.Types.ObjectId, ref: 'techStack' }],
  project: [{ type: Schema.Types.ObjectId, ref: 'project' }],
  staff: [{ type: Schema.Types.ObjectId, ref: 'staff' }],
}, { collection: 'center', timestamps: true });

const center = mongoose.model('center', centerSchema);

// eslint-disable-next-line import/prefer-default-export
export { center };
