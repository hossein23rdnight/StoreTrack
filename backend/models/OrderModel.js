const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ 
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
        quantity: { type: Number, required: true } 
    }],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { 
        type: String, 
        enum: ['Pending', 'Sending', 'Canceled', 'Complete'], 
        default: 'Pending' 
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
