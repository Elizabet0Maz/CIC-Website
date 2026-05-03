require('dotenv').config(); //grabs password from .env file
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// connect to the Cloud
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Not Connected To The Database:", err));

// settngs and reading the data from middleware
app.set('view engine', 'ejs');
app.use(express.static('Sources'));
app.use('/css', express.static('css'));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));


const Product = mongoose.model('Product', { 
    name: String, 
    category: String, // Category ID
    subCategory: String,// subcategory ID
    description: String,
    price: Number,
    images: [String] // A list to add multiple image links
});


// Homepage
app.get('/', (req, res) => {
    res.render('index');
});

// idea of the code was taken from Route Parameters Setion: https://expressjs.com/en/guide/routing.html
app.get('/shop/Accessories', async (req, res) => {
    //grabs products in the Accessories category
    const items = await Product.find({ category: 'Accessories' });
    res.render('accessories', { products: items });
});
//reference for Route Parameters: https://www.geeksforgeeks.org/node-js/how-to-handle-route-parameters-in-express/
app.get('/product/:id', async (req, res) => { // Uses async/await to ensure the database responds before the page renders
  const productId = req.params.id;

  const item = await Product.findById(productId);
  res.render('single-product', { product: item });
});

app.get('/theadmitaccess27483-087', (req, res) => {
    res.render('theadmitaccess27483-087'); 
});

app.post('/theadmitaccess27483-087', async (req, res) => {
    const { name, category, subCategory, price, description, image1, image2, image3, image4 } = req.body;
    const imagesArray = [image1, image2, image3, image4].filter(img => img !== "" && img !== undefined);

    await new Product({ 
        name, 
        category, 
        subCategory, 
        price, 
        description, 
        images: imagesArray 
    }).save();
    
    // takes the admin back to the category which just got added
    res.redirect(`/shop/${category}`); 
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});