const mongoose = require('mongoose');

const { Schema } = mongoose;
const statusSchema = new Schema({
  status: { type: String, required: true, unique: true },
  describe: String,
  active: { type: Boolean, default: 1 },
}, { collection: 'status', timestamps: true });

const status = mongoose.model('status', statusSchema);

const input = {
  status: 'teststs',
  describe: 'asdfasf',
};

const addStatus = (body) => status.create(body);

addStatus(input, reject => console.log(reject));
