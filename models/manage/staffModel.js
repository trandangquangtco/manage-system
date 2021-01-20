import mongoose from 'mongoose';

const { Schema } = mongoose;

const staffSchema = new Schema({
  staffName: { type: String, required: true },
  birth: { type: Date, min: '1900-12-31', max: '2003-01-01' },
  ID: String,
  phone: {
    type: String,
    validate: {
      validator(numb) {
        return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(numb);
      },
      message: (props) => `${props.value} không phải là số điện thoại hợp lệ`,
    },
  },
  certificate: Array,
  language: Array,
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
