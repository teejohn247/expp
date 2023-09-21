// // import { Application } from 'express';

// import express, { Router } from 'express';
// import login from './controller/authController/login';
// import register from './controller/authController/register';
// import verifyToken from './controller/authController/verifyToken';
// import createCategories from './controller/categories/createCategory';
// // import multer from 'multer';
// import imageUploader from './middleware/imageUploader';

// const router: Router = express.Router();

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const cloudinary = require('cloudinary').v2;
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const multer = require('multer');
// const mult = multer({ dest: 'uploads/' });
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const Multer = require('multer');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
//   });
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //@ts-ignore
//   // const storage = new Multer.memoryStorage() ;
//   // const upload = Multer({
//   //   storage,
//   // });

//   const storage = new Multer.memoryStorage();
//   const upload = Multer({
//     storage,
//   });


// // const upload = multer({ storage });

// router.post('/register', register);
// router.post('/login', login);
// router.post('/verifyOtp', verifyToken);
// router.post('/createCategory', mult.single('catImage'), imageUploader, createCategories);



// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// router.post('/upload-csv', mult.single('csv'), (req, res) => {
//  console.log(req.file);
// });

// export default router;


// import { Application } from 'express';

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
router.post('/createCategory', upload.single('image'), imageUploader, createCategories);
router.post('/createProduct', upload.single('image'), imageUploader, createProducts);
router.get('/getProducts', auth,  fetchProducts);
router.patch('/editProduct/:id', auth, upload.none(), editProducts);
router.get('/getProduct/:id', auth, fetchProductDetails);
router.get('/getCategory/:id', auth, fetchCategoriesDetails);
router.get('/getCategories', auth, fetchCategories);
router.patch('/editCategory/:id', auth, upload.none(), editCategories);
router.patch('/addReview/:id', auth, addReview);








export default router;


