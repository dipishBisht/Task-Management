import mongoose from "mongoose";


//# function for connect to db 

export const connectToDB = async (MONGO_URL_LOCAL: string | undefined) => {
  try {
    await mongoose.connect(MONGO_URL_LOCAL!);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    throw err;
  }
};
