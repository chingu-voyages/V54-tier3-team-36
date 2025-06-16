import React from 'react';
import FoodCard from './FoodCard.jsx';

const FoodSection = ({foods = []}) => {
    return (
        <div className="w-full">
            {foods.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 p-2">
                    {foods.map(food => (
                        <div key={food.id} className="w-full ">
                            <FoodCard food={food}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-8">
                    No food items available
                </div>
            )}
        </div>
    );
};

export default FoodSection;
