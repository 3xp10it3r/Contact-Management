const mongoose = require("mongoose");
const Joi = require("joi");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  phone: {
    type: String,
    required: [true, "phone number is required."],
  },
  created_at: {
    type: String,
    required: [true, "created at is required"],
  },
});

const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(20).required(),
    created_at: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};
