import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const mongodbUrl = process.env.MONGODB_URL;
  await mongoose.connect(mongodbUrl);
  // .then(() => {
  //   console.log("DATABASE CONNECTED!");
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  const conn = await mongoose.connect(mongodbUrl);
  if (conn) {
    console.log("DATABASE CONNECTED!");
  } else {
    console.log("Error conecting to the server");
  }
};
