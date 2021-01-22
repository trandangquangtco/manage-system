import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6 },
  refreshToken: String,
  status: String,
}, { collection: 'user', timestamps: true });

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) { return next(); }
  try {
    const salt = bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = function comparePassword(data) {
  return bcrypt.compare(data, this.password);
};

const user = mongoose.model('user', userSchema);

// eslint-disable-next-line import/prefer-default-export
export { user };
