import React from "react";

const RestaurantOptions = () => {
    return (
        <div className="restaurant-options">
            <h2 className="restaurant-header">Healthy Dine-In/Take-Out Meal Options</h2>
            <div className="restaurant-info">
                <img 
                    src="./src/logos/chipotle.jpg" 
                    alt="Chipotle Logo" 
                    className="chipotle-logo"
                    style={{width: "80px", height: "80px"}}
                />
                <div className="menu-description">
                    <h3>Burrito Bowl</h3>
                    <p>Any protein, black beans, double fajita veggies, and salsa. </p>
                </div>
                
                <img 
                    src="./src/logos/panera-bread.png" 
                    alt="Panera Bread Logo" 
                    className="panera-bread-logo"
                    style={{width: "80px", height: "80px"}}
                />
                <div className="menu-description">
                    <h3>Grilled Chicken & Avocado BLT</h3>
                    <p>With an apple or fruit cup as the side. </p>
                </div>

                <img 
                    src="./src/logos/panda-express.jpg" 
                    alt="Panda Express Logo" 
                    className="panda-express-logo"
                    style={{width: "80px", height: "80px"}}
                />
                <div className="menu-description">
                    <h3>Grilled Teriyaki Chicken and Black Pepper Angus Steak Plate</h3>
                    <p>With 1/2 super greens and 1/2 brown rice as the side. </p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantOptions;

