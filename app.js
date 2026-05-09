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
    images: [String] // A list to add multiple image links
});


// Homepage
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contactus', (req, res) => {
    res.render('contactus'); 
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus'); 
});

// idea of the code was taken from Route Parameters Setion: https://expressjs.com/en/guide/routing.html
app.get('/shop/Accessories', async (req, res) => {
    //grabs products in the Accessories category
    const items = await Product.find({ category: 'Accessories' });
    res.render('accessories', { products: items });
});

app.get('/shop/Handmade', async (req, res) => {
    //grabs products in the Accessories category
    const items = await Product.find({ category: 'Handmade' });
    res.render('handmade', { products: items });
});

app.get('/shop/Fragrances', async (req, res) => {
    //grabs products in the Accessories category
    const items = await Product.find({ category: 'Fragrances' });
    res.render('fragrances', { products: items });
});

app.get('/shop/Cosmetics', async (req, res) => {
    //grabs products in the Accessories category
    const items = await Product.find({ category: 'Cosmetics' });
    res.render('cosmetics', { products: items });
});


//SUB CATEGORIES

app.get('/shop/Accessories/Earrings', async (req, res) => {
    //grabs only the bracelets from the database
    const items = await Product.find({ 
        category: 'Accessories', 
        subCategory: 'Earrings' 
    });
    //renders bracelets.ejs
    res.render('earrings', { products: items });
});

app.get('/shop/Accessories/Necklaces', async (req, res) => {
    
    const items = await Product.find({ 
        category: 'Accessories', 
        subCategory: 'Necklaces' 
    });
    
    res.render('necklaces', { products: items });
});

app.get('/shop/Handmade/Soaps', async (req, res) => {
  
    const items = await Product.find({ 
        category: 'Handmade', 
        subCategory: 'Soaps' 
    });
   
    res.render('soaps', { products: items });
});

app.get('/shop/Fragrances/Perfumes', async (req, res) => {

    const items = await Product.find({ 
        category: 'Fragrances', 
        subCategory: 'Perfumes' 
    });
  
    res.render('perfumes', { products: items });
});

app.get('/shop/Fragrances/Perfumed-Oils', async (req, res) => {
    const items = await Product.find({ 
        category: 'Fragrances', 
        subCategory: 'Perfumed Oils' 
    });
    res.render('perfumed-oils', { products: items });
});

app.get('/shop/Fragrances/Home-Fragrances', async (req, res) => {
    const items = await Product.find({ 
        category: 'Fragrances', 
        subCategory: 'Home Fragrances' 
    });
    res.render('home-fragrances', { products: items });
});

app.get('/shop/Fragrances/Deodarants', async (req, res) => {
    const items = await Product.find({ 
        category: 'Fragrances', 
        subCategory: 'Deodarants' 
    });
    res.render('deodarants', { products: items });
});

app.get('/shop/Fragrances/Face-Care', async (req, res) => {
    const items = await Product.find({ 
        category: 'Cosmetics', 
        subCategory: 'Face Care' 
    });
    res.render('face-care', { products: items });
});

app.get('/shop/Fragrances/Body-Care', async (req, res) => {
    const items = await Product.find({ 
        category: 'Cosmetics', 
        subCategory: 'Body Care' 
    });
    res.render('body-care', { products: items });
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
    const { name, category, subCategory, description, image1, image2, image3, image4 } = req.body;
    const imagesArray = [image1, image2, image3, image4].filter(img => img !== "" && img !== undefined);

    await new Product({ 
        name, 
        category, 
        subCategory,
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