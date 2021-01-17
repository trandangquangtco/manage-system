import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
  customer: { type: String, unique: true, required: true },
  describe: String,
  important: { type: Number, default: 1 },
  active: Boolean,
}, { collection: 'customer', timestamps: true });

const customer = mongoose.model('customer', customerSchema);

// eslint-disable-next-line import/prefer-default-export
export { customer };
