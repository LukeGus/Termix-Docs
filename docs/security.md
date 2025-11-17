# Security
Please report any vulnerabilities to [GitHub Security](https://github.com/Termix-SSH/Termix/security/advisories).


## Authentication

### Password-based Login

- **Password Hashing**: User passwords are not stored in plaintext in the DB. They are hashed using `bcrypt` before being stored in the `users` table.
- **Login Flow**: During login, the provided password is sent over to the backend, where it is compared against the stored hash.
- **Password Reset**: A password reset option is available. It requires generating a temporary code that is logged by the server, which the user must provide to prove ownership before setting a new password. Resetting a password without being logged in will result in the deletion of all user-encrypted data as the encryption key is derived from the password.

### OIDC (External Provider)

- Termix supports authentication via an external OIDC-compliant provider (e.g., Google, Okta, Authentik).
- When configured, users are redirected to the external provider to authenticate. Upon successful authentication, a session is created in Termix.
- OIDC client secrets are encrypted in the database.

### Two-Factor Authentication (TOTP)

- Users can enable Time-based One-Time Password (TOTP) as a second factor of authentication.
- When enabled, after a successful password login, the user must provide a valid TOTP code from their authenticator app.
- TOTP secrets are encrypted in the `users` table.

### Rate Limiting

- To prevent brute-force attacks, login attempts are rate-limited per IP address and per username.
- Exceeding the rate limit results in a temporary lockout. The lockout lasts for 10 minutes.

## Session Management

- Upon successful authentication, a JSON Web Token (JWT) is generated and signed with a system-wide `JWT_SECRET`. This secret is stored inside an auto-generated `.env`.
- This JWT is sent to the client (stored in cookies) and must be included in subsequent API requests.
- The backend validates the JWT signature and expiration for every middleware protected API request.
- All logged in devices create sessions which are tracked in the `sessions` database table and can be invalidated in the Admin Settings. Restarting Termix will also clear the `sessions` table.

## Data Encryption

Modeled partially after [Nextcloud](https://docs.nextcloud.com/server/21/admin_manual/configuration_files/encryption_details.html).

### Overview

It consists of two main parts:
1.  **Database File Encryption**: The entire SQLite database file is encrypted on your disk.
2.  **Field-Level Encryption**: Specific sensitive fields within the database are individually encrypted using a user-specific key.

### Database File Encryption

- The entire `db.sqlite` database file is encrypted using AES-256-GCM.
- This encryption is handled by the `DatabaseFileEncryption` class within the backend.
- The encryption key (`DATABASE_KEY`) is stored in the application's `.env` file.
- On application startup, the database file is decrypted into memory. It is periodically re-encrypted and saved back to disk.

### Field-Level Encryption

- **User-Specific Keys**: Each user has their own Data Encryption Key (DEK). This DEK is what encrypts the sensitive data.
- **KEK/DEK Architecture**:
    1.  A user's password is used to derive a Key-Encrypting Key (KEK) via PBKDF2.
    2.  This KEK is used to encrypt the user's DEK.
    3.  The encrypted DEK is stored in the database.
    4.  When a user logs in, their password unlocks the KEK, which decrypts the DEK. The DEK is then held securely in memory for the duration of the session.
- **Field Encryption**: Sensitive fields (defined in `field-crypto.ts`) are encrypted with the user's DEK using AES-256-GCM. A unique key is derived for each specific field using HKDF, incorporating the user's DEK, a random salt, the record's ID, and the field name.

### Keys

- **`JWT_SECRET`**: A system-wide secret used to sign JWTs. Stored in the `.env` file.
- **`DATABASE_KEY`**: A system-wide secret used for the whole-database-file encryption. Stored in the `.env` file.
- **Key-Encrypting Key (KEK)**: Derived from a user's password at runtime. Not stored.
- **Data-Encryption Key (DEK)**: A per-user key, encrypted by the KEK, and stored in the database. Held in memory only when the user is logged in.

## API Security

- All backend API routes, except for public ones like login/registration, are protected and require a valid JWT.
- Administrative routes require a JWT from a user with admin privileges.
- CORS is in place, but the default configuration is very permissive. It is recommended to run the application behind a reverse proxy that can enforce a stricter CORS policy.

## Flaws

- **Password Transmission**: During login/registration, the user's password is sent in the body of an HTTP request. The security of this transmission depends entirely on the deployment environment using TLS (HTTPS). The [SSL](https://docs.termix.site/ssl) utility is provided to fix this, it's highly recommended to serve ovr HTTPS in production.
- **`.env` File Security**: The `JWT_SECRET` and `DATABASE_KEY` are stored in the `.env` file within the application's data directory. Filesystem access to this file could compromise the security of the database file and all sessions.
- **In-Memory Data**: Because the database is decrypted and held in memory, an attacker with the ability to dump the application's process memory could potentially access sensitive data.
- **Data Export**: The data export feature decrypts user data and provides it as an unencrypted SQLite file. This exported file is highly sensitive and must be stored securely.

## Support

If you need help or want to request a feature with Termix, visit the [Issues](https://github.com/Termix-SSH/Support/issues) page, log in, and press `New Issue`.
Please be as detailed as possible in your issue, preferably written in English. You can also join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support
channel, however, response times may be longer.
