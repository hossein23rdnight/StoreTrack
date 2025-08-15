require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./config/dbConnection');

const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/UserRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const inventoryRoutes = require('./routes/InventoryRoutes');
const inventoryLogRoutes = require('./routes/InventoryLogRoutes'); // <-- ADD THIS LINE


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/inventory-log', inventoryLogRoutes); 

app.get('/', (req, res) => {
    res.send('Hello, Express Backend is Running!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});