import exp from "constants";
import mongoose from "mongoose";
function connect(url) {
  mongoose.set({ strictQuery: true });
  mongoose
    .connect(url)
    .then((res) => {
      // console.log(res);
      console.log("connected to mongodb")
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;