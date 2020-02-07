import mongoose from 'mongoose';

const ProblemsSchema = new mongoose.Schema(
  {
    delivery_id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Problems', ProblemsSchema);
