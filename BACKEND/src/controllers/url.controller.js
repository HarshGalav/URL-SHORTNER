import { generateShortId } from "../utils/idGenerator.js";
import * as urlService from "../services/url.service.js";

export async function createShortUrl(req, res) {
  const { url, user } = req.body;
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const shortUrl = generateShortId();
    await urlService.createUrl({ fullUrl: url, user, shortUrl });
    console.log("Created:", shortUrl);
    const baseUrl = process.env.BASE_URL;
return res.status(201).json({
  message: "Short URL created",
  short_url: `${baseUrl}/api/${shortUrl}`,
});
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function redirectToFullUrl(req, res) {
  const { id } = req.params;

  try {
    const urlDoc = await urlService.findByShortId(id);
    if (!urlDoc) {
      return res.status(404).send("URL not found");
    }
    await urlService.incrementClicks(urlDoc);
    return res.redirect(urlDoc.full_url);
  } catch (error) {
    console.error("Redirection error:", error);
    return res.status(500).send("Internal server error");
  }
}
