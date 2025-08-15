const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    change: { 
        type: Number, 
        required: true 
    },
    type: {
        type: String,
        enum: ['IN', 'OUT'],
        required: true
    },
    reason: {
        type: String,
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
});

const InventoryLog = mongoose.model('InventoryLog', inventoryLogSchema);

module.exports = InventoryLog;
