# EzeeCart-Backend

## Overview
This project is a microservices-based system designed for a supermarket using Spring Boot. The system is aimed at providing a seamless shopping experience for customers while efficiently managing inventory and order fulfillment. The architecture is designed to be scalable, modular, and resilient.

## Features
**Customer Management:**

Customers can register and sign in to the system.
Customers can browse the available items and add them to their shopping cart.
A secure authentication mechanism is implemented for customer accounts.

**Inventory Management:**

Inventory keepers can add new items to the inventory.
Each item in the inventory has attributes such as name, price, and quantity.

**Order Processing:**

Customers can place orders for the items in their shopping cart.
Inventory keepers receive orders and update the inventory accordingly.
Order status is tracked from placement to preparation.

**Delivery:**

Once an order is prepared, it is assigned to a delivery person.
Delivery persons pick up orders and deliver them to customers.
Customers can track the progress of their orders in real-time.

## Microservices
The system is divided into the following microservices:

**Authentication Service:**
Manages customer registration, authentication, and shopping cart.

**Inventory Service:**
Handles the addition of items to the inventory and provides information on available items.

**Order Service:**
Manages order placement, processing, and tracking.

**Delivery Service:**
Coordinates the assignment of orders to delivery persons and order delivery.

## Technologies Used
-> Spring Boot: The microservices are developed using the Spring Boot framework.
<!--Spring Security: Ensures secure authentication and authorization.
Spring Data JPA: For interacting with the database.-->
-> RESTful APIs: Used for communication between microservices.
-Details coming soon-

#How to Run

1. **Prerequisites:** Ensure you have Java 8 or later installed.

2. **Clone the Repository:**
```bash
git clone https://github.com/nimash3eshan/EzeeCart-Backend.git
cd EzeeCart-Backend```

4. **Build and Run Microservices:**

Each microservice has its setup. Build and run each microservice.
cd auth-service
-Details coming soon-

**Repeat the above steps for other microservices**

## Access Services:

Microservices will be accessible at the following ports:
Authentication Service: http://localhost:8084
Inventory Service 1: http://localhost:8082
Inventory Service 2: http://localhost:8086
Order Service: http://localhost:8081
Delivery Service: http://localhost:8083

**Optional: Frontend Development:**
If you want to develop a frontend, you can connect it to the microservices using the provided RESTful APIs.

## Future Enhancements
Implement frontend for a complete end-to-end shopping experience.
Integrate payment gateway for online transactions.
Implement caching and load balancing for improved performance.

## Contributors
Nimash 
Krishantha 
Chinthana  
Janith
Devin
Shenal
