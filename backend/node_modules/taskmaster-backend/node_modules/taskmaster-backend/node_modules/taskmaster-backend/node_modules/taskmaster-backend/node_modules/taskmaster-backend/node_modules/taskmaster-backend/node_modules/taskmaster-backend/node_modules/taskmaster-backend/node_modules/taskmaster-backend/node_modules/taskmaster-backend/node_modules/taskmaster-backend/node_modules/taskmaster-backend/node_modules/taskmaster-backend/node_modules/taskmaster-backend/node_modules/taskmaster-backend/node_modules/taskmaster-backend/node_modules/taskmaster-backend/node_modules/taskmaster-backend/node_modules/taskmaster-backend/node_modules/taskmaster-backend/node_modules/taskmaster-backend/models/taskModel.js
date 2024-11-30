const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, 'Title must be at least 3 characters long'], // Validation for title length
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'], // Limit description length
    },
    deadline: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending', // Track task status
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save middleware or custom methods can be added here if needed

module.exports = mongoose.model('Task', taskSchema);
