import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  information: String,
  projectType: [{ type: Schema.Types.ObjectId, ref: 'projectType' }],
  status: [{ type: Schema.Types.ObjectId, ref: 'status', _id: false }],
  techStack: [{ type: Schema.Types.ObjectId, ref: 'techStack', _id: false }],
  center: { type: Schema.Types.ObjectId, ref: 'center', _id: false },
  staff: [{ type: Schema.Types.ObjectId, ref: 'staff', _id: false }],
}, { collection: 'project', timestamps: true });

const project = mongoose.model('project', projectSchema);

// eslint-disable-next-line import/prefer-default-export
export { project };
