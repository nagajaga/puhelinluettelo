const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength: 3,
    required: true
  } ,
  number:{
    type: String,
    validate: {
      validator: v => /^(\d{2}-\d{6,}|\d{3}-\d{5,})/.test(v),
      message: "Incorrect phone number formatting. Examples of valid numbers: 12-345678 or 123-45678"
    },
    required: true
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
