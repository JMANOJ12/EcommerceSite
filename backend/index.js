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

app.post('/addproduct', async (req, res) => {
    // Pass and object into the product
    const product = new Product({
        id: req.body.id, 
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        newPrice: req.body.newPrice, 
        oldPrice: req.body.oldPrice,
        

    });

    console.log(product); 
    // Saviing then we use await which will take time 
    await product.save(); 
    console.log('Product Saved.')
    res.json({
        success: true,
        name: req.body.name,
    })
})





app.listen(port, (err) => { 
    if (!err) {
        console.log("Server listening on PORT", port);
    } else { 
        console.lo("Error: " + err); 

    }
})


// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images', 
    fileName: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); 

    }

}); 

const upload = multer({
    storage: storage
});


// Creating Upload Endpoint For Images
app.use('/images', express.static('upload/images')); 
app.post('/upload', upload.single('product'), (req, res) => { 
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.fileName}`
    })
})




