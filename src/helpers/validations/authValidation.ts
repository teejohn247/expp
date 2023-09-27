import Joi from 'joi';


export const validateRegisterUser = Joi.object({
  fullNames: Joi.string().empty().required(),
  mophethPremium: Joi.boolean().empty().required(),
  mophethPremiumCardNumber: Joi.string(),
  verificationChannel: Joi.string().empty().required(),
  phoneNumber: Joi.string().empty().required(),
  email: Joi.string().empty().email().required(),
  password: Joi.string().empty().required()
});

export const validateProducts = Joi.object({
  productName: Joi.string().empty().required(),
  description: Joi.string().empty().required(),
  price: Joi.number().empty().required(),
  category: Joi.string().empty().required(),
  brand: Joi.string(),
  image: Joi.string().required(),
  stockQuantity: Joi.string(),
  shippingWeight: Joi.string(),
  dimensions: Joi.string(),
  isAvailable: Joi.boolean(),
  manufacturerDetails: Joi.string(),
  warranty: Joi.string(),
  sku: Joi.string(),
  tags: Joi.array(),
  reviews: Joi.string(),
  isFeatured: Joi.boolean()
});

export const validateLogin = Joi.object({
  email: Joi.string().empty().email().required(),
  password: Joi.string().empty().required().min(8).max(30)
});


export const validateReviews = Joi.object({
  rating: Joi.number().empty().required().max(5),
  comment: Joi.string().empty().required()
});

export const validateOtp = Joi.object({
  serviceSid: Joi.string().empty().required(),
  code: Joi.string().empty().required(),
  phoneNumber: Joi.string().empty().required()
});


export const validateCategory = Joi.object({
  categoryName: Joi.string().empty().required(),
  parent: Joi.string(),
  image: Joi.string().empty().required(),
  description: Joi.string().empty().required()
});

export const validateDelivery = Joi.object({
  name: Joi.string().empty().required(),
  image: Joi.string().required(),
  deliveryOptions: Joi.array()
});

export const validateDeliveryOptions = Joi.object({
  optionName: Joi.string().empty().required(),
  deliveryDate: Joi.string().required(),
  price: Joi.string().required()
});

export const validateUploadPrescription = Joi.object({
  image: Joi.string().empty().required()
});

export const validatePrescription = Joi.object({
  prescribedDrugs: Joi.array().empty().required(),
  morningReminder: Joi.array().empty().required(),
  eveningReminder: Joi.array().empty().required(),

});

export const validateOrders= Joi.object({
  products: Joi.array().empty().required(),
  totalAmount: Joi.number().empty().required(),
  delivery: Joi.string().empty().required(),
	referenceId: Joi.string().empty().required(),
  paymentTransferRef: Joi.string().empty().required(),


});

export const validateCart= Joi.object({
  productId: Joi.string().empty().required(),
  quantity: Joi.number().empty().required(),
});


// orderNumber?: string;

// products?: string;
// totalAmount?: number;
// delivery?: string;
// status?: string;
// referenceId?: string;
// paymentTransferRef?: string;
