import React from 'react';
import FoodCard from './FoodCard.jsx';


const FoodSection = ({foods = []}) => {
    return (
        <div className="flex space-x-8 p-4 rounded-md">
            {foods.map(food => (
                <FoodCard
                    key={food.id}
                    food={food}

                />
            ))}
        </div>
    );
};

export default FoodSection;
