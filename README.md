# Code Alpha – Intelligent Data Redundancy Removal System

## Overview

Pristine Code Alpha is a cloud-native data validation and redundancy removal system designed to improve data quality by detecting duplicate records, identifying potential false positives, validating incoming data, and ensuring that only unique and verified records are stored in the database.

The system provides a modern React frontend, a Node.js/Express backend, PostgreSQL database storage, Docker containerization, and automated CI/CD deployment to AWS EC2 using GitHub Actions.

## Problem Statement

Organizations often receive large amounts of data from multiple sources. This can lead to:

* Duplicate records
* Inconsistent information
* Data redundancy
* False positive matches
* Reduced database efficiency
* Poor data quality

This project solves these problems by validating incoming records, detecting duplicates, and preventing redundant information from entering the database.

## Features

### Data Validation

Before storing data, the system validates:

* Required fields
* Email format
* Data completeness
* Data consistency

### Duplicate Detection

The system:

* Generates a unique hash for each record
* Compares incoming data against existing records
* Rejects exact duplicates

### False Positive Detection

The system identifies cases where:

* Names are identical
* Emails differ

Example:

Record A:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com"
}
```

Record B:

```json
{
  "name": "John Doe",
  "email": "johndoe@yahoo.com"
}
```

Instead of automatically inserting the record, the system flags it as a potential false positive.

### Data Storage

Only validated and unique records are inserted into PostgreSQL.

### Dashboard

The frontend provides:

* Record submission form
* Real-time validation feedback
* Record listing table
* Statistics dashboard

### Containerized Deployment

All services run in Docker containers:

* Frontend Container
* Backend Container
* PostgreSQL Container

### CI/CD Automation

GitHub Actions automatically:

1. Detects code pushes
2. Connects to AWS EC2
3. Pulls latest code
4. Rebuilds containers
5. Deploys updated application

## System Architecture

```text
User Browser
      |
      v
React Frontend (Nginx)
      |
      v
Node.js / Express Backend
      |
      v
PostgreSQL Database
```

## Technology Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### DevOps & Cloud

* Docker
* Docker Compose
* GitHub Actions
* AWS EC2
* Nginx

## Project Structure

```text
Data-redundancy-removal-system/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── backend/
│   ├── routes/
│   │   └── records.js
│   │
│   ├── services/
│   │   ├── validator.js
│   │   ├── dedupe.js
│   │   └── classifier.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── docker-compose.yml
├── .env
└── README.md
```

## Database Schema

```sql
CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    hash VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Pristine-Code-Alpha.git

cd Pristine-Code-Alpha
```

## Environment Variables

Create a `.env` file in the project root.

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=codealpha

DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=codealpha
DB_PORT=5432

PORT=5000
```

Frontend environment file:

```env
VITE_API_URL=http://MY_IP:5000
```

## Running with Docker

Build and start all services:

```bash
docker compose up --build -d
```

Check running containers:

```bash
docker ps
```

Stop services:

```bash
docker compose down
```

## API Endpoints

### Get All Records

```http
GET /records
```

Response:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@gmail.com",
    "phone": "08012345678"
  }
]
```

### Create Record

```http
POST /records
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone": "08012345678"
}
```

Success Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone": "08012345678"
}
```

Duplicate Response:

```json
{
  "message": "Duplicate record"
}
```

False Positive Response:

```json
{
  "message": "Potential false positive: same name but different email"
}
```

## CI/CD Pipeline

The project uses GitHub Actions for automated deployment.

### Workflow Process

1. Push code to GitHub
2. GitHub Actions triggers deployment
3. Connects to AWS EC2 using SSH
4. Pulls latest repository changes
5. Rebuilds Docker containers
6. Deploys updated application

### Required GitHub Secrets

| Secret       | Description           |
| ------------ | --------------------- |
| EC2_HOST     | EC2 Public IP Address |
| EC2_USERNAME | EC2 SSH Username      |
| EC2_SSH_KEY  | Private SSH Key       |

## AWS Deployment

### EC2 Security Group

Open the following ports:

| Port | Purpose     |
| ---- | ----------- |
| 22   | SSH         |
| 80   | Frontend    |
| 443  | HTTPS       |
| 5000 | Backend API |

## Future Improvements

* JWT Authentication
* User Management
* CloudWatch Monitoring
* Record Search & Filtering
* Analytics Dashboard
* Audit Logging
* Data Export (CSV/PDF)
* Machine Learning Based Similarity Detection

## Learning Outcomes

This project demonstrates:

* Full-Stack Development
* REST API Design
* Data Validation
* Duplicate Detection Algorithms
* PostgreSQL Integration
* Docker Containerization
* Docker Compose Orchestration
* CI/CD Automation
* AWS Cloud Deployment
* GitHub Actions

## Author

Uzoagwa Bethel Boniface

Code Alpha – Data Redundancy Removal System
