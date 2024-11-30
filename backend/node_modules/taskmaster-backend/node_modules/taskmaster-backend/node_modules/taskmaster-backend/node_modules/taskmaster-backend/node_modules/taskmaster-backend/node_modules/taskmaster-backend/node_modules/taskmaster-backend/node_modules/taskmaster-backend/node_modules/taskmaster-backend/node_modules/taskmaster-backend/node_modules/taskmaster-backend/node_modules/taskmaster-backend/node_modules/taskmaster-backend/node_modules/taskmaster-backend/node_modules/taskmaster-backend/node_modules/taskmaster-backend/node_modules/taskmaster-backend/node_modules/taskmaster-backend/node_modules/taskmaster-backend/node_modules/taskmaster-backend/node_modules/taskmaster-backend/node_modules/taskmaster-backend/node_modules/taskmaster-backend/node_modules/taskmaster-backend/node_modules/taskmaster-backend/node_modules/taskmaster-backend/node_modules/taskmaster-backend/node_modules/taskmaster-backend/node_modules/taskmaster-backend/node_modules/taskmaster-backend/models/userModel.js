const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/.+\@.+\..+/, 'Please enter a valid email address'] 
    },
    password: { 
      type: String, 
      required: true, 
      minlength: 6 
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Pre-save middleware to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password isn't modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
