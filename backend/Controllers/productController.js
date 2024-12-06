const  Product = require("../models/Product.js");


const getProducts = async (request, response) => {
  try {
    const products = await Product.find();
    if (products && products.length > 0) {
      response.status(200).json({ products: products });
    } else {
      response.status(404).json({ msg: "No products found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on getting products" });
  }
}; 

const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const foundProduct= await Product.findById(id);
    if (foundProduct) {
      res.status(200).json({ product: foundProduct });
    } else {
      res.status(404).json({ msg: "No product found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the product" });
  }
};

// Create a new product
const postProduct = async (req, res) => {
    const { name, image, description, rating, numReview, price, countInStock } = req.body;
  
    try {
      // Create the product without any reviews
      const newProduct = new Product({
        name,
        image,
        description,
        rating,
        numReview,
        price,
        countInStock,
        review: [], 
      });
  
      await newProduct.save();
      res.status(201).json({ product: newProduct, msg: "Product created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error creating product" });
    }
  };
  

const putProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  try {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    
    await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ msg: "product updated successfully" });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error on updating products" });
  }
};


const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting products" });
  }
};
const addReview = async (req, res) => {
    const { id } = req.params;
    const { name, rating, comment, user } = req.body;
    try {
      const product = await Product.findById(id);
      if (product) {
        const newReview = { name, rating, comment, user };
        product.review.push(newReview);
  
        // Recalculate the rating
        const totalRating = product.review.reduce((sum, rev) => sum + parseFloat(rev.rating), 0);
        product.rating = (totalRating / product.review.length).toFixed(1);
        product.numReview = product.review.length;
  
        await product.save();
        res.status(201).json({ msg: "Review added successfully", product });
      } else {
        res.status(404).json({ msg: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error adding review" });}
    };

module.exports = { getProducts, postProduct, putProduct, deleteProduct, getOneProduct,addReview };
