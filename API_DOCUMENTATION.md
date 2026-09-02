# API Documentation - Food Delivery App

## Base URL
```
http://localhost:5000/api
```

## Health Check
### GET /health
Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Food Delivery API is running"
}
```

---

## Foods

### GET /foods
Get all food items (with optional filtering).

**Query Parameters:**
- `category` (optional) - Filter by category
- `search` (optional) - Search by name

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Margherita Pizza",
    "category": "Pizza",
    "price": 18.5,
    "rating": 4.8,
    "time": "25 min",
    "description": "Fresh mozzarella, basil, and tomato sauce...",
    "image": "🍕",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### POST /foods
Create a new food item (Admin only).

**Request Body:**
```json
{
  "name": "Margherita Pizza",
  "category": "Pizza",
  "price": 18.5,
  "rating": 4.8,
  "time": "25 min",
  "description": "Fresh mozzarella, basil, and tomato sauce baked to perfection.",
  "image": "🍕"
}
```

**Response:** 201 Created
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Margherita Pizza",
  ...
}
```

---

## Authentication (To Be Implemented)

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}
```

### POST /auth/login
Login and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** 200 OK
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Orders (To Be Implemented)

### POST /orders
Create a new order.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "items": [
    {
      "foodId": "507f1f77bcf86cd799439011",
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit-card"
}
```

### GET /orders
Get user's orders.

### GET /orders/:id
Get order details.

### PUT /orders/:id
Update order status (Admin only).

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "message": "Permission denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Testing with cURL

### Get all foods
```bash
curl http://localhost:5000/api/foods
```

### Create food item
```bash
curl -X POST http://localhost:5000/api/foods \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vegetarian Pizza",
    "category": "Pizza",
    "price": 16.5,
    "description": "Loaded with fresh vegetables"
  }'
```

### Health check
```bash
curl http://localhost:5000/api/health
```

---

**Last Updated**: 2026-08-31
