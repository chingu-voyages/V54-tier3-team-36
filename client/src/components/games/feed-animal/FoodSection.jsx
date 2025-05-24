import React from 'react';
import FoodCard from './FoodCard.jsx';


const FoodSection = ({foods = [], onDragStart}) => {
    return (
        <div className="flex space-x-8 p-4 rounded-md">
            {foods.map(food => (
                <FoodCard
                    key={food.id}
                    food={food}
                    onDragStart={onDragStart}
                />
            ))}
        </div>
    );
};

export default FoodSection;
