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
