import mongoose from 'mongoose';

const { Schema } = mongoose;

const staffSchema = new Schema({
  staffName: { type: String, required: true },
  birth: { type: Date, min: '1900-12-31', max: '2003-01-01' },
  ID: String,
  certificate: Array,
  language: Array,
  phone: String,
  techStack: [{
    _id: false,
    techStack: { type: Schema.Types.ObjectId, ref: 'techStack' },
    experience: String,
  }],
  project: [{ type: Schema.Types.ObjectId, ref: 'project' }],
}, { collection: 'staff', timestamps: true });

const staff = mongoose.model('staff', staffSchema);

// eslint-disable-next-line import/prefer-default-export
export { staff };
