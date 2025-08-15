const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const InventoryLog = require('../models/InventoryLogModel'); 

const getAllOrders = async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = {};
        if (status) query.status = status;
        if (search && search.match(/^[0-9a-fA-F]{24}$/)) query._id = search;
        const orders = await Order.find(query).populate('user', 'username email').populate('products.product', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'username email').populate('products.product', 'name price');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createOrder = async (req, res) => {
    try {
        const { user, products, totalPrice } = req.body;

        if (!user || !products || products.length === 0 || !totalPrice) {
            return res.status(400).json({ message: 'User, products, and totalPrice are required' });
        }

        const lowStockNotifications = [];
        const newOrder = new Order({ user, products, totalPrice, status: 'Pending' });
        const savedOrder = await newOrder.save(); 

        for (const item of products) {
            const productInDB = await Product.findById(item.product);

            if (!productInDB) {
                return res.status(404).json({ message: `Product with ID ${item.product} not found.` });
            }
            if (productInDB.quantity < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${productInDB.name}.` });
            }

            productInDB.quantity -= item.quantity;
            await productInDB.save();

            const logEntry = new InventoryLog({
                product: item.product,
                change: -item.quantity, 
                type: 'OUT',
                reason: `Order #${savedOrder._id.toString().substring(0, 8)}` 
            });
            await logEntry.save();

            if (productInDB.quantity < 5 && productInDB.quantity > 0) {
                lowStockNotifications.push(`Warning: Stock for ${productInDB.name} is low (${productInDB.quantity} remaining).`);
            }
        }
        
        res.status(201).json({ 
            order: savedOrder,
            notifications: lowStockNotifications 
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        await updatedOrder.populate([
            { path: 'user', select: 'username email' },
            { path: 'products.product', select: 'name price' }
        ]);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
