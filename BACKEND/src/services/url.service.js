import urlSchema from "../models/short_url.model.js";

export async function createUrl({ fullUrl, user, shortUrl }) {
  const newUrl = new urlSchema({
    full_url: fullUrl,
    short_url: shortUrl,
    clicks: 0,
    user,
  });
  return newUrl.save();
}

export async function findByShortId(id) {
  return urlSchema.findOne({ short_url: id });
}

export async function incrementClicks(urlDoc) {
  urlDoc.clicks += 1;
  return urlDoc.save();
}
