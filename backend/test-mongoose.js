import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./models/userModel.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const test = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    console.log("DB Connected");

    // Create a temp user
    const email = `test-${Date.now()}@example.com`;
    const user = await userModel.create({
      name: "Test User",
      email,
      password: "password123",
      cartData: {}
    });
    console.log("User created:", user._id);

    const userId = user._id;

    // Simulate first add to cart
    let itemId1 = "prod_1";
    let size1 = "S";
    let userData1 = await userModel.findById(userId);
    let cartData1 = await userData1.cartData;
    cartData1[itemId1] = {};
    cartData1[itemId1][size1] = 1;
    await userModel.findByIdAndUpdate(userId, { cartData: cartData1 });
    console.log("After 1st add:", (await userModel.findById(userId)).cartData);

    // Simulate second add to cart (different item)
    let itemId2 = "prod_2";
    let size2 = "M";
    let userData2 = await userModel.findById(userId);
    let cartData2 = await userData2.cartData;
    if (cartData2[itemId2]) {
      cartData2[itemId2][size2] = 1;
    } else {
      cartData2[itemId2] = {};
      cartData2[itemId2][size2] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData: cartData2 });
    console.log("After 2nd add (prod_2):", (await userModel.findById(userId)).cartData);

    // Clean up
    await userModel.findByIdAndDelete(userId);
    console.log("User deleted");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

test();
