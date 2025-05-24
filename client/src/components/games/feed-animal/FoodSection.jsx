import React from 'react';
import FoodItem from './FoodItem';


const FoodSection = ({foods = [], onDragStart}) => {
    return (
        <div className="flex space-x-4 p-4 bg-gray-100 rounded-md">
            {foods.map(food => (
                <FoodItem
                    key={food.id}
                    food={food}
                    onDragStart={onDragStart}
                />
            ))}
        </div>
    );
};

export default FoodSection;
