import getDailyHoroscope from "../services/horoscopeGenerator.js";
import User from "../schema/user.js";

export const getTodaysHoroscope = async (req, res) => {
  const { userId } = req;

  const userData = await User.findById(userId);

  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }

  const { horoscope, index } = getDailyHoroscope(userData.zodiacSign);

  const data = {
    sign: userData.zodiacSign,
    date: new Date().toISOString().split("T")[0],
    horoscope,
    luckyNumber: index + 1,
  };

  res.status(200).json(data);
};
