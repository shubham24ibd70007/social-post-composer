# REST API Experiment Summary

This project implements a Spring Boot RESTful API for managing social posts.

## Features implemented
- CRUD endpoints for posts
- Bean Validation for request payloads
- Standardized success and error response structure
- Global exception handling
- CORS configuration for frontend integration
- Layered architecture using controller, service, repository, and model classes

## Key backend files
- `backend/backend/src/main/java/com/socialcomposer/controller/PostController.java`
- `backend/backend/src/main/java/com/socialcomposer/service/PostService.java`
- `backend/backend/src/main/java/com/socialcomposer/dto/PostRequest.java`
- `backend/backend/src/main/java/com/socialcomposer/dto/ApiResponse.java`
- `backend/backend/src/main/java/com/socialcomposer/exception/GlobalExceptionHandler.java`
- `backend/backend/src/main/java/com/socialcomposer/config/CorsConfig.java`

## Verification
- Backend tests pass with Maven.
- Frontend build passes with Vite.
- API endpoints successfully respond on `http://localhost:9090`.
- Frontend app serves on `http://localhost:5173`.
