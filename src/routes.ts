import express, { Router } from 'express';
import login from './controller/authController/login';
import register from './controller/authController/register';
import verifyToken from './controller/authController/verifyToken';
import createCategories from './controller/categories/createCategory';
import Multer from 'multer';
import imageUploader from './middleware/imageUploader';
import createProducts from './controller/products/createProducts';
import fetchProducts from './controller/products/fetchProducts';
import editProducts from './controller/products/editProducts';
import fetchCategories from './controller/categories/fetchCategories';
import fetchProductDetails from './controller/products/fetchProductDetails';
import fetchCategoriesDetails from './controller/categories/fetchCategoryDetails';
import auth from './middleware/auth';
import editCategories from './controller/categories/editCategories';
import addReview from './controller/products/addReview';
import createDelivery from './controller/delivery/createDelivery';
import addDeliveryOptions from './controller/delivery/addDeliveyOptions';
import getSubCategories from './controller/categories/getSubCategories';
import productsByCategories from './controller/products/productsByCategories';
import uploadPrescription from './controller/prescription/uploadPrescription';
import createPrescription from './controller/prescription/createPrescrition';
import getPrescribed from './controller/prescription/getPrescribed';
import getPrescribedDetails from './controller/prescription/getPrescribedDetails';
import saveReminder from './controller/prescription/saveReminder';
import createOrder from './controller/orders/createOrder';
import createCarts from './controller/products/carts';
import fetchCart from './controller/products/fetchCarts';
import deleteCart from './controller/products/deleteCart';
import updateCart from './controller/products/updateQuantity';
import createPost from './controller/selfAdvice/createPost';
import fetchPosts from './controller/selfAdvice/fetchPosts';
import fetchPublishedPosts from './controller/selfAdvice/fetchPublishedPost';
import updatePost from './controller/selfAdvice/updatePost';
import createAdviceCategories from './controller/selfCareCategories/createCategory';
import editCareCategories from './controller/selfCareCategories/editCategories';
import fetchCareCategories from './controller/selfCareCategories/fetchCategories';
import fetchCareCategoriesDetails from './controller/selfCareCategories/fetchCategoryDetails';
import fetchPostDetails from './controller/selfAdvice/fetchPostDetails';
import { getAvailableTimeSlots } from './controller/consultation/getAvailableTimeSlots';
import createConsultationCategories from './controller/consultation/createCategory';
import fetchConsultationCategories from './controller/consultation/fetchCategories';
import editConsultationCategories from './controller/consultation/editCategories';
import consult from './controller/consultation/consult';

const router: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
  const storage = new Multer.memoryStorage();
	// const upload = multer({ dest: 'uploads/' });
  const upload = Multer({
    storage,
  });

router.post('/register', register);
router.post('/login', login);
router.post('/verifyOtp', verifyToken);
router.post('/createCategory',auth, upload.single('image'), imageUploader, createCategories);
router.post('/createProduct',auth, upload.single('image'), imageUploader, createProducts);
router.get('/getProducts', auth,  fetchProducts);
router.get('/getSubCategories', auth, getSubCategories);
router.get('/getProductsByCategories', auth, productsByCategories);
router.patch('/editProduct/:id', auth, upload.none(), editProducts);
router.get('/getProduct/:id', auth, fetchProductDetails);
router.get('/getCategory/:id', auth, fetchCategoriesDetails);
router.get('/getCategories', auth, fetchCategories);
router.patch('/editCategory/:id', auth, upload.none(), editCategories);
router.patch('/addReview/:id', auth, addReview);
router.post('/delivery', auth, upload.single('logo'), imageUploader, createDelivery);
router.post('/uploadPrescription', auth, upload.single('image'), imageUploader, uploadPrescription);
router.patch('/prescribeDrugs/:id', auth, createPrescription);
router.patch('/addDeliveryOptions/:id', auth, addDeliveryOptions);
router.get('/fetchPrescriptions', auth, getPrescribed);
router.get('/fetchPrescriptions/:id', auth, getPrescribedDetails);
router.post('/setReminder/:id', auth, saveReminder);
router.get('/createOrder', auth, createOrder);
router.post('/addToCart', auth, createCarts);
router.get('/fetchCart', auth, fetchCart);
router.delete('/deleteCartItem', auth, deleteCart);
router.patch('/updateCartItem', auth, updateCart);
router.post('/createPost', auth, upload.single('image'), imageUploader, createPost);
router.get('/fetchPost', auth, fetchPosts);
router.get('/fetchPublishedPosts', auth, fetchPublishedPosts);
router.patch('/updatePosts/:id', auth, updatePost);
router.post('/createPostCategories', auth, upload.single('image'), imageUploader, createAdviceCategories);
router.patch('/editPostCategories', auth, editCareCategories);
router.get('/fetchPostCategories', auth, fetchCareCategories);
router.get('/fetchPostDetail/:id', auth, fetchCareCategoriesDetails);
router.get('/fetchPostDetails/:id', auth, fetchPostDetails);
router.get('/getAvailableDates/:appointmentDate', auth,getAvailableTimeSlots);
router.post('/createConsultationCategories', auth, upload.single('image'), imageUploader, createConsultationCategories);
router.get('/getConsultationCategories', auth, fetchConsultationCategories);
router.patch('/editConsultationCategories/:id', auth, editConsultationCategories);
router.post('/consult', auth, consult);

// router.patch('/editConsultationCategories', auth, editConsultationCategories);


export default router;


