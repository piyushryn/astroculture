import getDailyHoroscope from "../services/horoscopeGenerator.js";
import User from "../schema/user.js";
import UserHoroscope from "../schema/userHoroscope.js";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
} from "../utils/apiResponse.js";

export const getTodaysHoroscope = async (req, res) => {
  try {
    const { userId } = req;

    const userData = await User.findById(userId);
    if (!userData) {
      return notFoundResponse(res, "User not found");
    }

    const userHoroscope = await UserHoroscope.findOne({
      user: userId,
      // get the horoscope for today if it exists
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

    if (userHoroscope) {
      const data = generateHoroscope({
        sign: userData.zodiacSign,
        date: new Date(userHoroscope.createdAt).toISOString(),
        horoscope: userHoroscope.horoscope,
        luckyNumber: userHoroscope.luckyNumber,
      });
      return successResponse(
        res,
        data,
        "Today's horoscope retrieved successfully"
      );
    }

    const { horoscope, index } = getDailyHoroscope(userData.zodiacSign);

    const newUserHoroscope = new UserHoroscope({
      user: userId,
      horoscope,
      luckyNumber: index + 1,
    });
    await newUserHoroscope.save();

    const data = generateHoroscope({
      sign: userData.zodiacSign,
      date: new Date().toISOString(),
      horoscope,
      luckyNumber: index + 1,
    });

    return successResponse(
      res,
      data,
      "Today's horoscope generated successfully"
    );
  } catch (error) {
    console.error("Get today's horoscope error:", error);
    return errorResponse(res, "Failed to get today's horoscope", 500, error);
  }
};

function generateHoroscope({ sign, date, horoscope, luckyNumber }) {
  return {
    sign,
    date,
    horoscope,
    luckyNumber,
  };
}

export const getHoroscopeHistory = async (req, res) => {
  try {
    const { userId } = req;
    let { days } = req.query;

    if (!days) {
      days = 7;
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return notFoundResponse(res, "User not found");
    }

    const userHoroscope = await UserHoroscope.find({
      user: userId,
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1 - days)),
      },
    });

    const horoscopeHistory = userHoroscope.map((horoscope) =>
      generateHoroscope({
        sign: userData.zodiacSign,
        date: new Date(horoscope.createdAt).toISOString(),
        horoscope: horoscope.horoscope,
        luckyNumber: horoscope.luckyNumber,
      })
    );

    return successResponse(
      res,
      horoscopeHistory,
      "Horoscope history retrieved successfully"
    );
  } catch (error) {
    console.error("Get horoscope history error:", error);
    return errorResponse(res, "Failed to get horoscope history", 500, error);
  }
};
