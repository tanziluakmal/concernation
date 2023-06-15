const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const buyerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
});

const paymentInformationSchema = mongoose.Schema({
  base64Image: {
    type: String,
    required: true,
    trim: true,
  },
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  bankAccountName: {
    type: String,
    required: true,
    trim: true,
  },
});

const orderSchema = mongoose.Schema(
  {
    eventId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    buyerId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    buyerInformation: buyerSchema,
    paymentInformation: paymentInformationSchema,
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
