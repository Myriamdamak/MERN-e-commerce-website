const express = require("express");

const Order = require("../models/Order");

/*Post a New Order
  const postOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      totalPrice,
      
    } = req.body;

    // Check if order items are provided
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ msg: "No order items found" });
    }

    // Create a new order
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      totalPrice,
      user: req.user.id
    });

    // Save the order to the database
    const createdOrder = await order.save();

    // Respond with the created order
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating order" });
  }
};*/
const postOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      isPaid,
    } = req.body;

    // Check if required fields are present
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ msg: "No order items found" });
    }
    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      return res.status(400).json({ msg: "Incomplete shipping address" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ msg: "Payment method is required" });
    }

    // Create and save the order
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      isPaid,
      user: req.user.id,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating order" });
  }
};





     

      

//order detail
const getOneOrder = async (req, res) => {
    try {
      // Fetch order by ID and populate user details (name and email)
      const order = await Order.findById(req.params.id).populate("user", "userName email");
      
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ msg: "Order Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error retrieving the order" });
    }
  };


//Update Payment for an Order
  const updateOrderPayment = async (req, res) => {
    try {
      // Find the order by ID
      const order = await Order.findById(req.params.id);
  
      if (order) {
        // Update payment details
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.create_time,
          email: req.body.email,
        };
  
        const updatedOrder = await order.save();
  
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).json({ msg: "Order Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error updating payment for the order" });
    }
  };
  
 
  

// Get List of Orders for a User
const getOrders = async (req, res) => {
    try {
      // Find orders for the authenticated user and sort them by creation date
      
      const orders = await Order.find({ user: req.user.id }).sort({ _id: -1 });;
  
      if (orders && orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.status(404).json({ msg: "No Orders Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error retrieving orders" });
    }
  };





module.exports = { getOrders, postOrder, getOneOrder,updateOrderPayment };

