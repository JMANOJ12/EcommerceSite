const port = '4000'
const express = require('express'); 
const mongoose = require('mongoose'); 
const jwt = require('jsonwebtoken'); 
const multer = require('multer'); 
const path = require('path'); 
const cors = require('cors'); 

const app = express(); 


app.use(express.json()); 
app.use(cors()); 

// Database Connection
mongoose.connect('mongodb+srv://justin-dev:1234@cluster0.70tl9.mongodb.net/Ecommerce'); 

// API Creation
app.get('/', (req, res) => {
    res.send('GET Request Called.')
})


// Schema for Creating Product 
// Essentially the ProductTable Schema
const Product = mongoose.model("Product", {
    id: {
        type: Number, 
        required: true,
    },

    name: { 
        type: String, 
        required: true,
    },

    image: { 
        type: String, 
        required: true,
    }, 


    category: { 
        type: String, 
        required: true,
    }, 

    newPrice: {
        type: Number, 
        required: true,
    }, 

    oldPrice: { 
        type: Number, 
        required: true,
    }, 

    date: { 
        type: Date, 
        default: Date.now,
    },

    available: { 
        type: Boolean, 
        default: true, 
    }
})



// Add Product Endpoint is currently working
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({}); // Basically find in the products table
    let id; 

    // If the length > 0, then that means product is available in the database
    if (products.length > 0) { 
        let last_product_array = products.slice(-1); // Last Product
        let last_product = last_product_array[0]; 
        id = last_product.id + 1; 

    } else { 
        id = 1; 
    }



    // Pass and object into the product
    const product = new Product({
        id:id, 
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        newPrice: req.body.newPrice, 
        oldPrice: req.body.oldPrice,    
    });

    console.log(product); 
    // Saviing then we use await which will take time 
    await product.save(); // This will save to the database 
    console.log('Product Saved.')
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for Deleting Product
app.post('/remove-product', async (req,res)=> {
    await Product.findOneAndDelete({id: req.body.id}); 
    console.log('Product Sucessfully Removed'); 
    res.json({
        sucess: true, 
        name: req.body.name
    })
})


// Normal Code where the Server is listening on a particular port
app.listen(port, (err) => { 
    if (!err) {
        console.log("Server listening on PORT", port);
    } else { 
        console.log("Error: " + err); 

    }
})


// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images', 
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Creating API For getting all the products 
// Another endpoint for retrieving all of the products

app.get('/allproducts', async(req, res)=> {
    // Retrieves the array full of the items
    let products = await Product.find({});
    console.log('All Products Fetched'); 
    res.send(products); 
})




const upload = multer({
    storage: storage
});


// Creating Upload Endpoint For Images
app.use('/images', express.static('upload/images')); 
app.post('/upload', upload.single('product'), (req, res) => { 
    // This would be the json response that is returned back
    res.json({

        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})




