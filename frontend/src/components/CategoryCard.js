import React from 'react';

const CategoryCard = ({ category, onDelete }) => {


    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Name: {category.name}</h2>

        </div>
    );
};

export default CategoryCard;
