# Joke API Documentation

Welcome to the Joke API! This API allows you to retrieve random jokes and one-liners from two different databases. Below is the documentation to help you understand how to use the API effectively.

## Base URL

The base URL for the API is `http://localhost:3000`. Make sure to prefix all endpoint paths with this base URL.

## Authentication

To access certain features of the API, you need to provide a password in the request. This password is set as an environment variable and is required for security. Make sure to include it as a query parameter when necessary.

## Endpoints

### 1. Get Random Singleliner Joke

- **Endpoint:** `/api/singleliner`
- **Method:** `GET`
- **Parameters:**
  - `result` (optional): Number of jokes to retrieve (default is 1).
  - `id` (optional): Retrieve a specific joke by ID.
  - `password` (optional but required for `result` > `MAX_RESULTS`): Password for secure access.
- **Response:**
  - Success: Returns an array of single-liner jokes.
  - Failure: Returns an error message.

### 2. Get Random Joke

- **Endpoint:** `/api/jokes`
- **Method:** `GET`
- **Parameters:**
  - `result` (optional): Number of jokes to retrieve (default is 1).
  - `id` (optional): Retrieve a specific joke by ID.
  - `password` (optional but required for `result` > `MAX_RESULTS`): Password for secure access.
- **Response:**
  - Success: Returns an array of jokes.
  - Failure: Returns an error message.

### 3. Get Random Joke from Either Database

- **Endpoint:** `/api/random`
- **Method:** `GET`
- **Response:**
  - Success: Returns a single joke object.
  - Failure: Returns an error message.

## Example Usage

### Fetch a Random Singleliner Joke

```bash
curl http://localhost:3000/api/singleliner
```

### Fetch 3 Random Jokes

```bash
curl http://localhost:3000/api/jokes?result=3
```

### Fetch a Random Joke Without Authentication

```bash
curl http://localhost:3000/api/random
```

### Fetch a Joke by ID

```bash
curl http://localhost:3000/api/jokes?id=42&password=your_password
```

## Error Handling

In case of an error, the API will return a JSON response with a `success` field set to `false` and an `error` field providing a descriptive error message.

## Important Notes

- Ensure proper authentication by including the `password` parameter when required.
- Respect rate limiting to avoid getting blocked.

Feel free to experiment with the API and integrate it into your projects. If you encounter any issues or have questions, please refer to the [GitHub repository](https://github.com/your-username/joke-api) or open an [issue](https://github.com/your-username/joke-api/issues). Happy joking!