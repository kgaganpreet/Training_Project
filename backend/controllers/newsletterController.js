import validator from "validator";
import subscriberModel from "../models/subscriberModel.js";

const subscribeToNewsletter = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    const existingSubscriber = await subscriberModel.findOne({ email });
    if (existingSubscriber) {
      return res.json({ success: true, message: "This email is already subscribed" });
    }

    await subscriberModel.create({ email });
    return res.status(201).json({ success: true, message: "Thanks for subscribing!" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({ success: false, message: "Unable to subscribe right now. Please try again." });
  }
};

export { subscribeToNewsletter };
