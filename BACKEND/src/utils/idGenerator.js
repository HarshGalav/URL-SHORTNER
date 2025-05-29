import { nanoid } from "nanoid";

/**
 * Generate a unique short ID.
 * @param {number} length
 * @returns {string}
 */
export function generateShortId(length = 7) {
  return nanoid(length);
}
