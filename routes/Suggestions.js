const express = require("express");
const router = express.Router();
const Suggestion = require("../Models/Suggestions.model");

router.get("/", async (req, res) => {
  try {
    const suggestion = await Suggestion.find();
    res.send(suggestion);
  } catch (error) {
    console.log(error.message);
    res.send({
      message: "Some error",
      success: false,
    });
  }
});

router.get("/:suggestionId", async (req, res) => {
  try {
    const suggestionId = req.params.suggestionId;

    const suggestion = await Suggestion.findById(suggestionId);

    if (!suggestion) {
      return res.status(404).send("Suggestion not found");
    }

    res.send({ suggestion });
    console.log(`data : ${suggestion}`);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", (req, res) => {
  const suggestion = new Suggestion({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
  });

  suggestion
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("error");
    });
});

router.delete("/:id", (req, res) => {
  const suggestionId = req.params.id;

  Suggestion.findByIdAndDelete(suggestionId)
    .then((deletedSuggestion) => {
      if (!deletedSuggestion) {
        return res.status(404).send("Suggestion not found");
      }
      console.log("Deleted suggestion:", deletedSuggestion);
      res.send("Suggestion deleted");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

router.patch("/:suggestionId", async (req, res) => {
  try {
    const { suggestionId } = req.params;
    const { comment, upvotes, category, status, description, title } = req.body;

    const newComment = {
      id: Math.floor(Math.random() * 10000),
      content: comment,
      user: {
        image: "/user-images/image-zena.jpg",
        name: "Zena Kelley",
        username: "velvetround",
        replies: [],
      },
    };

    const suggestion = await Suggestion.findById(suggestionId);

    if (!suggestion) {
      return res.status(404).json({ error: "Suggestion not found" });
    }

    if (comment !== undefined);
    {
      suggestion.comments.push(newComment);
    }

    if (upvotes !== undefined) {
      suggestion.upvotes = upvotes;
    }

    if (title !== undefined) {
      suggestion.title = title;
    }

    if (status !== undefined) {
      suggestion.status = status;
    }

    if (description !== undefined) {
      suggestion.description = description;
    }

    if (category !== undefined) {
      suggestion.category = category;
    }

    await suggestion.save();

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:suggestionId/comments/:commentId", async (req, res) => {
  try {
    const { suggestionId, commentId } = req.params;
    const { replies } = req.body;

    const suggestion = await Suggestion.findById(suggestionId);

    if (!suggestion) {
      return res.status(404).json({ error: "Suggestion not found" });
    }

    // const comment = suggestion.comments.id(commentId);
    const comment = suggestion.comments.findb(
      (comment) => comment.id === commentId
    );

    if (comment) {
      console.log(comment);
    } else {
      console.log("Comment not found");
    }

    console.log(comment);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (replies !== undefined) {
      (comment.replies.content = replies),
        (comment.replies.replyingTo = comment.username),
        (comment.replies.user.image = "/user-images/image-zena.jpg"),
        (comment.replies.user.name = "Zena Kelley"),
        (comment.replies.user.username = "velvetround"),
        (comment.replies.user.replies = []);
    }

    await suggestion.save();

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
