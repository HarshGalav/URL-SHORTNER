import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shorturl.model.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create short URL
app.post("/api/create", async (req, res) => {
  try {
    const { url, user } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const shortUrl = nanoid(7);

    const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
      clicks: 0,
      user,
    });

    await newUrl.save();

    console.log("Created:", newUrl);
    return res.status(201).json({ message: "Short URL created", short_url: shortUrl });

  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Redirect to original URL
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const url = await urlSchema.findOne({ short_url: id });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.full_url);
  } catch (error) {
    console.error("Redirection error:", error);
    return res.status(500).send("Internal server error");
  }
});

// Start server
app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
