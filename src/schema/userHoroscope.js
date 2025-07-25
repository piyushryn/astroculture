import mongoose from "mongoose";

const userHoroscopeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    horoscope: { type: String, required: true },
    luckyNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserHoroscope", userHoroscopeSchema);
