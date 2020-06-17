const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const menuItems = require('../src/menuItem');
const e = require('express');

let cartItems = [];
let cartTotal = '';

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
    if (cartItems.length > 0) { 
        cartTotal = "Total in Cart: $" + cartItems.map(item => Number(item.itemQty) * Number(item.price)).reduce((t, c) => t + c, 0).toFixed(2); 
    } else { 
        cartTotal = "Cart is Empty";
    };
  res.render('cart', {cartItems: cartItems, cartTotal: cartTotal});
});

router.post('/', (req, res, next) => {
    console.log(req.body)
    if (cartItems.length === 0) {
        let foundItem = menuItems.find(item => req.body.itemId === item.itemId)
        let newItem = {...foundItem, itemQty: req.body.itemQty};
        cartItems.push(newItem);
    } else {
        let itemInCart = cartItems.find(item => item.itemId.includes(req.body.itemId));
        if (itemInCart) {
            if (req.body.itemQty) {
                let ItemIndex = cartItems.findIndex(item => item.itemId === req.body.itemId);
                cartItems[ItemIndex].itemQty = Number(cartItems[ItemIndex].itemQty) + Number(req.body.itemQty);
            } else if (req.body.updateQty) {
                if (req.body.updateQty === '0') {
                    let remainItems = cartItems.filter(item => item.itemId !== req.body.itemId);
                    cartItems = remainItems;
                } else {
                    let ItemIndex = cartItems.findIndex(item => item.itemId === req.body.itemId);
                    cartItems[ItemIndex].itemQty = req.body.updateQty;
                }
            }
        } else {
            let foundItem = menuItems.find(item => req.body.itemId === item.itemId)
            let newItem = {...foundItem, itemQty: req.body.itemQty};
            cartItems.push(newItem);
        }
    }
});

module.exports = router;