# 📚 API DOCUMENTATION

**Version:** 1.0  
**Last Updated:** December 6, 2025  
**Base URL:** `https://api.drainpro.com/v1`

---

## 🔑 AUTHENTICATION

All API requests require authentication using Bearer token.

**Header:**
```
Authorization: Bearer YOUR_API_KEY
```

**Get API Key:**
1. Login to Business Owner app
2. Go to Settings → API
3. Generate new API key
4. Copy and store securely

**Example:**
```bash
curl -H "Authorization: Bearer sk_live_abc123..." \
     https://api.drainpro.com/v1/bookings
```

---

## 📞 CONTACTS API

### Create Contact

**Endpoint:** `POST /contacts`

**Description:** Create new customer contact

**Request Body:**
```json
{
    "phone": "+1234567890",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, State 12345",
    "source": "Missed Call",
    "tags": ["new-lead", "drain-cleaning"]
}
```

**Response:**
```json
{
    "success": true,
    "contact": {
        "id": "con_abc123",
        "phone": "+1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "address": "123 Main St, City, State 12345",
        "source": "Missed Call",
        "tags": ["new-lead", "drain-cleaning"],
        "createdAt": "2025-12-06T10:30:00Z"
    }
}
```

**Error Codes:**
- `400` - Invalid phone number format
- `401` - Unauthorized (invalid API key)
- `409` - Contact already exists
- `500` - Internal server error

---

### Get Contact

**Endpoint:** `GET /contacts/:id`

**Description:** Retrieve contact details

**Response:**
```json
{
    "success": true,
    "contact": {
        "id": "con_abc123",
        "phone": "+1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "address": "123 Main St, City, State 12345",
        "source": "Missed Call",
        "tags": ["new-lead", "drain-cleaning"],
        "bookings": [
            {
                "id": "book_xyz789",
                "service": "Drain Cleaning",
                "date": "2025-12-07T14:00:00Z",
                "status": "confirmed"
            }
        ],
        "totalSpent": 150,
        "createdAt": "2025-12-06T10:30:00Z",
        "updatedAt": "2025-12-06T11:00:00Z"
    }
}
```

---

### Update Contact

**Endpoint:** `PATCH /contacts/:id`

**Description:** Update contact information

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "tags": ["vip-customer"]
}
```

**Response:**
```json
{
    "success": true,
    "contact": {
        "id": "con_abc123",
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@example.com",
        "tags": ["new-lead", "drain-cleaning", "vip-customer"],
        "updatedAt": "2025-12-06T12:00:00Z"
    }
}
```

---

### List Contacts

**Endpoint:** `GET /contacts`

**Description:** List all contacts with pagination

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 100)
- `tag` (optional): Filter by tag
- `source` (optional): Filter by source
- `search` (optional): Search by name/phone/email

**Example:**
```bash
GET /contacts?page=1&limit=20&tag=new-lead&search=john
```

**Response:**
```json
{
    "success": true,
    "contacts": [
        {
            "id": "con_abc123",
            "phone": "+1234567890",
            "firstName": "John",
            "lastName": "Doe",
            "tags": ["new-lead"],
            "createdAt": "2025-12-06T10:30:00Z"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 20,
        "total": 150,
        "pages": 8
    }
}
```

---

## 📅 BOOKINGS API

### Create Booking

**Endpoint:** `POST /bookings`

**Description:** Create new service booking

**Request Body:**
```json
{
    "contactId": "con_abc123",
    "service": "Drain Cleaning",
    "date": "2025-12-07T14:00:00Z",
    "address": "123 Main St, City, State 12345",
    "notes": "Kitchen sink clogged",
    "technicianId": "tech_def456"
}
```

**Response:**
```json
{
    "success": true,
    "booking": {
        "id": "book_xyz789",
        "contactId": "con_abc123",
        "service": "Drain Cleaning",
        "date": "2025-12-07T14:00:00Z",
        "address": "123 Main St, City, State 12345",
        "notes": "Kitchen sink clogged",
        "technicianId": "tech_def456",
        "status": "confirmed",
        "price": 150,
        "createdAt": "2025-12-06T11:00:00Z"
    }
}
```

---

### Get Booking

**Endpoint:** `GET /bookings/:id`

**Description:** Retrieve booking details

**Response:**
```json
{
    "success": true,
    "booking": {
        "id": "book_xyz789",
        "contact": {
            "id": "con_abc123",
            "name": "John Doe",
            "phone": "+1234567890"
        },
        "service": "Drain Cleaning",
        "date": "2025-12-07T14:00:00Z",
        "address": "123 Main St, City, State 12345",
        "notes": "Kitchen sink clogged",
        "technician": {
            "id": "tech_def456",
            "name": "Mike Smith",
            "phone": "+0987654321"
        },
        "status": "confirmed",
        "price": 150,
        "payment": {
            "status": "pending",
            "method": null
        },
        "createdAt": "2025-12-06T11:00:00Z",
        "updatedAt": "2025-12-06T11:00:00Z"
    }
}
```

---

### Update Booking Status

**Endpoint:** `PATCH /bookings/:id/status`

**Description:** Update booking status

**Request Body:**
```json
{
    "status": "in-progress",
    "notes": "Technician arrived on site"
}
```

**Status Values:**
- `confirmed` - Booking confirmed
- `in-progress` - Technician working
- `completed` - Job finished
- `cancelled` - Booking cancelled

**Response:**
```json
{
    "success": true,
    "booking": {
        "id": "book_xyz789",
        "status": "in-progress",
        "statusHistory": [
            {
                "status": "confirmed",
                "timestamp": "2025-12-06T11:00:00Z"
            },
            {
                "status": "in-progress",
                "timestamp": "2025-12-07T14:05:00Z",
                "notes": "Technician arrived on site"
            }
        ],
        "updatedAt": "2025-12-07T14:05:00Z"
    }
}
```

---

### List Bookings

**Endpoint:** `GET /bookings`

**Description:** List all bookings with filters

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Results per page
- `status` (optional): Filter by status
- `technicianId` (optional): Filter by technician
- `date` (optional): Filter by date (YYYY-MM-DD)

**Example:**
```bash
GET /bookings?status=confirmed&date=2025-12-07
```

**Response:**
```json
{
    "success": true,
    "bookings": [
        {
            "id": "book_xyz789",
            "contact": {
                "name": "John Doe",
                "phone": "+1234567890"
            },
            "service": "Drain Cleaning",
            "date": "2025-12-07T14:00:00Z",
            "status": "confirmed",
            "price": 150
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 20,
        "total": 45,
        "pages": 3
    }
}
```

---

## 💳 PAYMENTS API

### Create Payment

**Endpoint:** `POST /payments`

**Description:** Process payment for booking

**Request Body:**
```json
{
    "bookingId": "book_xyz789",
    "amount": 150,
    "method": "card",
    "stripeToken": "tok_abc123"
}
```

**Response:**
```json
{
    "success": true,
    "payment": {
        "id": "pay_ghi012",
        "bookingId": "book_xyz789",
        "amount": 150,
        "method": "card",
        "status": "succeeded",
        "stripeChargeId": "ch_abc123",
        "createdAt": "2025-12-07T16:00:00Z"
    }
}
```

---

### Get Payment

**Endpoint:** `GET /payments/:id`

**Description:** Retrieve payment details

**Response:**
```json
{
    "success": true,
    "payment": {
        "id": "pay_ghi012",
        "booking": {
            "id": "book_xyz789",
            "service": "Drain Cleaning"
        },
        "amount": 150,
        "method": "card",
        "status": "succeeded",
        "stripeChargeId": "ch_abc123",
        "receipt": "https://api.drainpro.com/receipts/pay_ghi012.pdf",
        "createdAt": "2025-12-07T16:00:00Z"
    }
}
```

---

## ⭐ REVIEWS API

### Create Review

**Endpoint:** `POST /reviews`

**Description:** Submit customer review

**Request Body:**
```json
{
    "bookingId": "book_xyz789",
    "rating": 5,
    "comment": "Excellent service! Very professional.",
    "photos": [
        "https://cdn.drainpro.com/reviews/photo1.jpg"
    ]
}
```

**Response:**
```json
{
    "success": true,
    "review": {
        "id": "rev_jkl345",
        "bookingId": "book_xyz789",
        "rating": 5,
        "comment": "Excellent service! Very professional.",
        "photos": [
            "https://cdn.drainpro.com/reviews/photo1.jpg"
        ],
        "createdAt": "2025-12-07T18:00:00Z"
    }
}
```

---

### List Reviews

**Endpoint:** `GET /reviews`

**Description:** List all reviews

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Results per page
- `rating` (optional): Filter by rating (1-5)
- `technicianId` (optional): Filter by technician

**Response:**
```json
{
    "success": true,
    "reviews": [
        {
            "id": "rev_jkl345",
            "booking": {
                "id": "book_xyz789",
                "service": "Drain Cleaning"
            },
            "customer": {
                "name": "John Doe"
            },
            "rating": 5,
            "comment": "Excellent service!",
            "createdAt": "2025-12-07T18:00:00Z"
        }
    ],
    "stats": {
        "averageRating": 4.8,
        "totalReviews": 127,
        "distribution": {
            "5": 95,
            "4": 25,
            "3": 5,
            "2": 1,
            "1": 1
        }
    }
}
```

---

## 📊 ANALYTICS API

### Get Dashboard Metrics

**Endpoint:** `GET /analytics/dashboard`

**Description:** Get key business metrics

**Query Parameters:**
- `period` (optional): `today`, `week`, `month`, `year` (default: `today`)

**Response:**
```json
{
    "success": true,
    "metrics": {
        "revenue": {
            "current": 4500,
            "previous": 3800,
            "change": 18.4
        },
        "bookings": {
            "current": 30,
            "previous": 25,
            "change": 20
        },
        "leads": {
            "current": 100,
            "previous": 85,
            "change": 17.6
        },
        "conversionRate": {
            "current": 30,
            "previous": 29.4,
            "change": 2
        },
        "averageRating": {
            "current": 4.8,
            "previous": 4.7,
            "change": 2.1
        }
    },
    "period": "today"
}
```

---

### Get Revenue Chart

**Endpoint:** `GET /analytics/revenue`

**Description:** Get revenue data for charts

**Query Parameters:**
- `period` (required): `week`, `month`, `year`
- `groupBy` (optional): `day`, `week`, `month` (default: auto)

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "date": "2025-12-01",
            "revenue": 450,
            "bookings": 3
        },
        {
            "date": "2025-12-02",
            "revenue": 600,
            "bookings": 4
        }
    ],
    "total": {
        "revenue": 13500,
        "bookings": 90
    }
}
```

---

## 🤖 AI AGENTS API

### Get Agent Status

**Endpoint:** `GET /ai/agents`

**Description:** Get status of all AI agents

**Response:**
```json
{
    "success": true,
    "agents": [
        {
            "name": "Monitor Agent",
            "status": "active",
            "lastRun": "2025-12-06T12:00:00Z",
            "metrics": {
                "checksPerformed": 1440,
                "alertsGenerated": 3,
                "uptime": 99.9
            }
        },
        {
            "name": "Diagnostic Agent",
            "status": "active",
            "lastRun": "2025-12-06T11:30:00Z",
            "metrics": {
                "diagnosticsRun": 3,
                "issuesIdentified": 2,
                "accuracy": 95
            }
        },
        {
            "name": "Optimizing Agent",
            "status": "active",
            "lastRun": "2025-12-06T11:35:00Z",
            "metrics": {
                "optimizationsApplied": 2,
                "successRate": 100,
                "impactScore": 8.5
            }
        }
    ]
}
```

---

### Update Agent Settings

**Endpoint:** `PATCH /ai/agents/:name/settings`

**Description:** Update AI agent configuration

**Request Body:**
```json
{
    "enabled": true,
    "thresholds": {
        "cpl_max": 20,
        "conversion_min": 25,
        "forwarding_min": 95
    },
    "autoFix": true
}
```

**Response:**
```json
{
    "success": true,
    "agent": {
        "name": "Monitor Agent",
        "enabled": true,
        "thresholds": {
            "cpl_max": 20,
            "conversion_min": 25,
            "forwarding_min": 95
        },
        "autoFix": true,
        "updatedAt": "2025-12-06T12:30:00Z"
    }
}
```

---

## 🔔 WEBHOOKS

### Configure Webhook

**Endpoint:** `POST /webhooks`

**Description:** Register webhook endpoint

**Request Body:**
```json
{
    "url": "https://your-domain.com/webhooks/drainpro",
    "events": [
        "booking.created",
        "booking.completed",
        "payment.succeeded",
        "review.created"
    ],
    "secret": "whsec_abc123"
}
```

**Response:**
```json
{
    "success": true,
    "webhook": {
        "id": "wh_mno678",
        "url": "https://your-domain.com/webhooks/drainpro",
        "events": [
            "booking.created",
            "booking.completed",
            "payment.succeeded",
            "review.created"
        ],
        "secret": "whsec_abc123",
        "createdAt": "2025-12-06T13:00:00Z"
    }
}
```

---

### Webhook Events

**Available Events:**
- `booking.created` - New booking created
- `booking.updated` - Booking status changed
- `booking.completed` - Job finished
- `booking.cancelled` - Booking cancelled
- `payment.succeeded` - Payment processed
- `payment.failed` - Payment failed
- `review.created` - New review submitted
- `contact.created` - New contact added
- `alert.triggered` - AI agent alert

**Webhook Payload:**
```json
{
    "event": "booking.created",
    "timestamp": "2025-12-06T11:00:00Z",
    "data": {
        "id": "book_xyz789",
        "contactId": "con_abc123",
        "service": "Drain Cleaning",
        "date": "2025-12-07T14:00:00Z",
        "status": "confirmed"
    }
}
```

---

## 🚨 ERROR CODES

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid API key)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

**Error Response:**
```json
{
    "success": false,
    "error": {
        "code": "invalid_phone",
        "message": "Phone number must be in E.164 format",
        "details": {
            "field": "phone",
            "value": "1234567890",
            "expected": "+1234567890"
        }
    }
}
```

---

## 📈 RATE LIMITS

**Limits:**
- 100 requests per 10 seconds
- 1,000 requests per hour
- 10,000 requests per day

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1638792000
```

**Rate Limit Exceeded:**
```json
{
    "success": false,
    "error": {
        "code": "rate_limit_exceeded",
        "message": "Too many requests. Please try again in 10 seconds.",
        "retryAfter": 10
    }
}
```

---

## 🧪 TESTING

**Test API Key:**
```
sk_test_abc123def456ghi789
```

**Test Mode:**
- All API calls with test key are in test mode
- No real charges processed
- No real SMS sent
- Data isolated from production

**Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Insufficient funds: `4000 0000 0000 9995`

---

## 📚 SDKs

**Official SDKs:**
- JavaScript/Node.js: `npm install drainpro-sdk`
- Python: `pip install drainpro`
- Ruby: `gem install drainpro`
- PHP: `composer require drainpro/sdk`

**Example (Node.js):**
```javascript
const DrainPro = require('drainpro-sdk');
const client = new DrainPro('sk_live_abc123...');

// Create booking
const booking = await client.bookings.create({
    contactId: 'con_abc123',
    service: 'Drain Cleaning',
    date: '2025-12-07T14:00:00Z'
});

console.log(booking.id); // book_xyz789
```

---

**Version:** 1.0  
**Support:** api@drainpro.com  
**Status:** Production Ready

