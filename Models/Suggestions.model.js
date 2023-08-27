const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: Number,
  content: String,
  user: {
    image: String,
    name: String,
    username: String,
  },
  replies: [
    {
      content: String,
      replyingTo: String,
      user: {
        image: String,
        name: String,
        username: String,
      },
    },
  ],
});

const SuggestionSchema = new mongoose.Schema({
  title: String,
  category: String,
  upvotes: Number,
  status: String,
  description: String,
  comments: [commentSchema],
});

const Suggestion = mongoose.model("Suggestion", SuggestionSchema);

module.exports = Suggestion;
