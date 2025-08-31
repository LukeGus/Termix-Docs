# API Reference

Welcome to the API Reference section. Here you can find detailed information about the API endpoints, their parameters,
and responses.

To obtain a JWT (bearerAuth Token) for authentication, use `F12` on a logged in browser for Termix and copy the `Value` of the `jwt` cookie.

Servers:
- `http://localhost:8081` - Main database and authentication server
- `http://localhost:8083` - SSH tunnel management server
- `http://localhost:8084` - SSH file manager server
- `http://localhost:8085` - Server statistics and monitoring server