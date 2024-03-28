# Online Shopping Store

Welcome to the Online Shopping Store project! This project aims to create an e-commerce platform where users can browse products, add them to their cart, and make purchases.

## Features

- Browse through a wide range of products
- Add products to the shopping cart
- Remove products from the shopping cart
- View detailed product information
- Checkout process for purchasing products
- Admin Dashboard:
  - View, add, edit, and delete products
  - View, edit, and delete users
  - View and delete orders

## Technologies Used

- Frontend: [React](https://reactjs.org/)
- Backend: [Laravel](https://laravel.com/)
- Database: [MySQL](https://www.mysql.com/)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Composer installed on your machine
- MySQL database server

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RiviniKavindaya/online-shopping-store.git
   
2.Navigate to the project directory:
  
    cd online-shopping-store

2.Install backend dependencies:

    composer install

3.Copy the .env.example file to .env and update the database configuration with your MySQL credentials.

    cp .env.example .env

4. Migrate the database and seed it with initial data:

       php artisan migrate --seed
   

6. Navigate to the frontend directory:

       cd frontend

7.Install frontend dependencies:

          npm install

### Usage

Start the Laravel development server:

        php artisan serve

Start the React development server:

      npm start

Open your browser and visit http://localhost:3000 to view the application.

### Admin Dashboard
To access the Admin Dashboard:
Visit the login page and use the following credentials:
Email: admin@gmail.com
Password: admin123
Once logged in, you will have access to the Admin Dashboard features.
