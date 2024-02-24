# QuickPick E-commerce Application

## Overview

QuickPick is a full-fledged e-commerce application developed using the MERN (MongoDB, Express, React, Node.js) stack. This repository contains the source code for the project.

## Features

- **Full-Featured Shopping Cart:** Easily manage and purchase items with our comprehensive shopping cart.

- **Product Reviews and Ratings:** Gain insights into product quality through user reviews and ratings.

- **Top Products Carousel:** Explore trending and top-rated products showcased in an engaging carousel.

- **Product Pagination:** Effortlessly navigate through an extensive product catalog with efficient pagination.

- **Smart Product Search/filtering:** Quickly find products using our intelligent search/filtering system based on categories, brands, prices, and reviews.

- **User Profiles with Order History:** Create user profiles and track order history for a personalized experience.

- **Admin Product and User Management:** Admins can efficiently manage products and users through dedicated admin panels.

- **Order Management for Admins:** Dive into detailed order information, mark orders as delivered, and optimize order fulfillment.

- **Smooth Checkout Process:** Experience a secure and seamless checkout process, including shipping details and payment method selection.

- **Integrated PayPal/Credit Card Payments:** Benefit from secure payment processing with integrated PayPal and credit card options.

- **Database Seeder for Quick Setup:** Use convenient commands to set up the database with sample users and products or clear all data.

## Getting Started Locally

### Clone the Repository


git clone https://github.com/your-username/quickpick.git
cd quickpick


### Setup Environment Variables

Create a .env file in the root directory and add your configuration details:

NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://your-mongodb-uri
JWT_SECRET=your-secret-key
PAYPAL_CLIENT_ID=your-paypal-client-id


### Install Dependencies

npm install
cd frontend
npm install


### Run the Application

Run both frontend and backend concurrently:
npm run dev

#Run only the backend:

npm run server

### Database Operations

-**Import sample data:

npm run data:import

-**Destroy all data:

npm run data:destroy
 
## Live Demo

Explore the live demo of QuickPick [here](https://quickpick-aill.onrender.com/).

# Contributing

Feel free to report issues, or provide feedback to help us enhance QuickPick.





