import mongoose from "mongoose";

const URL = new mongoose.Schema({
  originalURL: { type: String, required: true },
  shortCode: { type: Number, required: true, default: 1000 },
});

const UrlSchema = mongoose.model("URL", URL);

export async function incrementShortCode() {
  const first_url = await UrlSchema.findOneAndUpdate(
    { originalURL: "First Url" },
    { $inc: { shortCode: 1 } },
    { new: true }
  );

  return first_url
}

// incrementShortCode();
export default UrlSchema;
