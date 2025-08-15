const InventoryLog = require('../models/InventoryLogModel');

const getAllLogs = async (req, res) => {
    try {
        const logs = await InventoryLog.find({})
            .sort({ date: -1 })
            .populate('product', 'name'); 

        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLogs,
};
