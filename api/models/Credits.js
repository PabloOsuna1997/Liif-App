const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  Cod: { type: String, required: true },
  Name: { type: String, required: true },
  LastName: { type: String, required: true },
  IdNumber: { type: String, required: true  }, 
  Gender: { type: String, required: true },
  Income: { type: Number, required: true  },
  Address: { type: String, required: true },
  Country: { type: String, required: true },
});
const collectionName = "Credit";
module.exports = mongoose.model("Credit", userSchema, collectionName);
