import React from 'react'

const ProductCard = ({ product, onDelete }) => {
    

    return (
        <div className="border border-gray-200 rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">Quantity: {product.quantity}</p>

        </div>
    );
};

export default ProductCard
