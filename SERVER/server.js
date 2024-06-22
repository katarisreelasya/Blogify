const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./Models/BlogPost');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const db = "mongodb+srv://katarisreelasya25:7981933042@cluster0.fh2e3no.mongodb.net/blogposts";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => console.log(err));

// Get blog posts with search functionality
app.get("/getbgposts", async (req, res) => {
  try {
    const { query } = req.query;

    let searchQuery = [];
    if (query) {
      searchQuery = [
        {
          $search: {
            index: "default",
            text: {
              query: query,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ];
    }

    const blogPosts = await BlogPost.aggregate(searchQuery.length ? searchQuery : [{ $match: {} }]);
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog post by id
app.get("/blogposts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blogPost = await BlogPost.findById(id);
    if (blogPost) {
      res.json(blogPost);
    } else {
      res.status(404).send("Blog post not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update blog post by id
app.put("/blogposts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBlogPost = req.body;

    const blogPost = await BlogPost.findByIdAndUpdate(id, updatedBlogPost, { new: true });
    if (blogPost) {
      res.json(blogPost);
    } else {
      res.status(404).send("Blog post not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog post by id
app.delete("/blogposts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BlogPost.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).send("Blog post deleted");
    } else {
      res.status(404).send("Blog post not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create blog post
app.post("/blogposts", async (req, res) => {
  try {
    const newBlogPost = new BlogPost(req.body);
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
