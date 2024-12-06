const router = require("express").Router();
const User = require("./models/Users.js");
const users = require('./data/Users.js');
const Product = require("./models/Product.js");
const products = require('./data/Products.js');


router.post("/users", async (req, res) => {
    try {
        await User.deleteMany({});
        const UserSeeder = await User.insertMany(users);
        res.send({ UserSeeder });
    } catch (error) {
        res.status(500).send({ message: "Error seeding users", error });
    }
});

router.post("/products", async (req, res) => {
    try {
        await Product.deleteMany({});
        const ProductSeeder = await Product.insertMany(products);
        res.send({ ProductSeeder });
    } catch (error) {
        res.status(500).send({ message: "Error seeding products", error });
    }
});

module.exports = router;
