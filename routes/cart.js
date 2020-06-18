const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const menuItems = require('../src/menuItem');
const e = require('express');

let cartItems = [];
let cartTotal = '';
let newOrder = [];
const customer = {
    customerInfo: {
        userId: "test123",
        lastName: "Tommy",
        firstName: "Ku",
        street: "999 Test Street",
        city: "Test City",
        state: "CA",
        zip: "91711",
        tel: formatPhoneNumber(Number("9999999999")),
    },
    accountInfo: {
        userName: "Test123",
        email: "test@test.com",
        password: "testtest",
    },
    promotion: true,
    admin: false
}


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
    //check if the cart is empty
    if (cartItems.length === 0) {
        let foundItem = menuItems.find(item => req.body.itemId === item.itemId)
        let newItem = {...foundItem, itemQty: req.body.itemQty};
        cartItems.push(newItem);
    } else {
        //cart is not empty, check if the new item is in the cart
        let itemInCart = cartItems.find(item => item.itemId.includes(req.body.itemId));
        if (itemInCart) {
            //check if user want to add more item to existing item in cart
            if (req.body.itemQty) {
                let ItemIndex = cartItems.findIndex(item => item.itemId === req.body.itemId);
                cartItems[ItemIndex].itemQty = Number(cartItems[ItemIndex].itemQty) + Number(req.body.itemQty);
            //check if user want to update the qty of the item,
            } else if (req.body.updateQty) {
                //check if user want to remove the item
                if (req.body.updateQty === '0') {
                    let remainItems = cartItems.filter(item => item.itemId !== req.body.itemId);
                    cartItems = remainItems;
                    //update the qty of the item in cart
                } else {
                    let ItemIndex = cartItems.findIndex(item => item.itemId === req.body.itemId);
                    cartItems[ItemIndex].itemQty = req.body.updateQty;
                }
            }
            //this is new item add to cart.
        } else {
            let foundItem = menuItems.find(item => req.body.itemId === item.itemId)
            let newItem = {...foundItem, itemQty: req.body.itemQty};
            cartItems.push(newItem);
        }
    }
});

//Edit User Billing Info
router.get('/editBillingInfo', (req, res, next) => {
    res.render('editBillingInfo');
})

router.post('/editBillingInfo', (req, res, next) => {
    newOrder = { ...newOrder, 
                billingInfo: {
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    tel: req.body.tel,
                }
            }
    res.redirect('checkout') 
})

//Edit User Delivery Info
router.get('/editDeliveryInfo', (req, res, next) => {
    res.render('editDeliveryInfo');
})

router.post('/editDeliveryInfo', (req, res, next) => {
    newOrder = { ...newOrder, 
                billingInfo: {
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    tel: req.body.tel,
                }
            }
            console.log(newOrder)
    res.redirect('checkout') 
})

//Checkout Route
router.get('/checkout', (req, res, next) => {

    let total = cartItems.map(item => Number(item.itemQty) * Number(item.price)).reduce((t, c) => t + c, 0).toFixed(2); 
    let tax = (total * 0.09).toFixed(2);
    let deliveryFee = total? 4.99: 0;
    let grandTotal = total > 0? (Number(total) + Number(tax) + Number(deliveryFee)).toFixed(2): "0.00";

    newOrder = { 
        cartItems: cartItems, 
        total: total,
        tax: tax,
        deliveryFee: deliveryFee,
        grandTotal: grandTotal,
        date: Date().toString(),
        customer: customer.customerInfo,
        billingInfo: customer.customerInfo,
        delivery: customer.customerInfo,
    }
    
    res.render('checkout', { newOrder: newOrder });
});

router.post('/checkout', (req, res, next) => {
    console.log(req.body)
})

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

module.exports = router;