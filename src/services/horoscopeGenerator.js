import horoscopeList from "./predefinedHoroscopes.js";

/**
 * Generates a consistent daily horoscope for a given zodiac sign.
 * The same zodiac sign will always return the same horoscope on the same date,
 * but it may return a different one on a different day.
 *
 * @param {string} zodiacSign - The zodiac sign (e.g. "Gemini", "Aries", etc.)
 * @returns {string,index} - One deterministic horoscope for that zodiac sign on that day and the index of the horoscope in the list
 */
const getDailyHoroscope = (zodiacSign) => {
  if (!Array.isArray(horoscopeList) || horoscopeList.length === 0) {
    throw new Error("Horoscope list must be a non-empty array.");
  }

  const today = new Date().toISOString().slice(0, 10);

  // Create a unique key by combining zodiac sign and today's date
  // Example: "leo-2025-07-25"
  const key = `${zodiacSign.toLowerCase()}-${today}`;

  // Hash the key to get a deterministic number
  const hash = hashCode(key);
  // Use modulo to keep the index within the bounds of horoscopeList
  const index = Math.abs(hash) % horoscopeList.length;
  // Return the horoscope at the computed index
  return { horoscope: horoscopeList[index], index };
};

/**
 * Hashes a string to a 32-bit positive integer using djb2 algorithm (variant).
 *
 * How it works:
 * - Starts with an initial hash (5381, common seed in djb2).
 * - For each character in the string:
 *    - Multiplies current hash by 33 (left shift and add)
 *    - XORs with the ASCII value of the character.
 * - Ensures non-negative output using >>> 0 (unsigned right shift).
 *
 * This produces a repeatable "random-like" number for any string.
 *
 * @param {string} str - The input string to hash
 * @returns {number} - A consistent 32-bit unsigned integer hash
 */
const hashCode = (str) => {
  let hash = 5381; // Initial seed

  for (let i = 0; i < str.length; i++) {
    // Multiply hash by 33 and XOR with current char code
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  // Convert to unsigned 32-bit integer (avoids negative numbers)
  return hash >>> 0;
};

export default getDailyHoroscope;
