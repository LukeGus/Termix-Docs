# SSH JSON Import Format Guide

Use this guide to create JSON files for bulk importing SSH hosts. All examples are copyable.

## Required Fields

- **`ip`** - Host IP address (string)
- **`port`** - SSH port (number, 1-65535)
- **`username`** - SSH username (string)
- **`authType`** - Authentication type: `"password"`, `"key"`, or `"credential"`

## Authentication Fields

- **`password`** - Required if authType is "password"
- **`key`** - SSH private key content (string) if authType is "key"
- **`keyPassword`** - Optional key passphrase
- **`keyType`** - Key type: `"auto"`, `"ssh-rsa"`, `"ssh-ed25519"`, `"ecdsa-sha2-nistp256"`, `"ecdsa-sha2-nistp384"`, `"ecdsa-sha2-nistp521"`, `"ssh-dss"`, `"ssh-rsa-sha2-256"`, `"ssh-rsa-sha2-512"`
- **`credentialId`** - ID of existing credential (number) if `authType` is `"credential"`


## Optional Fields

- **`name`** - Display name (string)
- **`folder`** - Organization folder (string)
- **`tags`** - Array of tag strings
- **`pin`** - Pin to top (boolean)
- **`enableTerminal`** - Show in Terminal tab (boolean, default: true)
- **`enableTunnel`** - Show in Tunnel tab (boolean, default: true)
- **`enableFileManager`** - Show in File Manager tab (boolean, default: true)
- **`defaultPath`** - Default directory path (string)

## Tunnel Configuration

- **`tunnelConnections`** - Array of tunnel objects
    - **`sourcePort`** - Local port (number)
    - **`endpointPort`** - Remote port (number)
    - **`endpointHost`** - Target host name (string)
    - **`maxRetries`** - Retry attempts (number, default: 3)
    - **`retryInterval`** - Retry delay in seconds (number, default: 10)
    - **`autoStart`** - Auto-start on launch (boolean, default: false)

## Example JSON Structure

```json
{
  "hosts": [
    {
      "name": "Web Server - Production",
      "ip": "192.168.1.100",
      "port": 22,
      "username": "admin",
      "authType": "password",
      "password": "your_secure_password_here",
      "folder": "Production",
      "tags": ["web", "production", "nginx"],
      "pin": true,
      "enableTerminal": true,
      "enableTunnel": false,
      "enableFileManager": true,
      "defaultPath": "/var/www"
    },
    {
      "name": "Database Server",
      "ip": "192.168.1.101",
      "port": 22,
      "username": "dbadmin",
      "authType": "key",
      "key": "-----BEGIN OPENSSH PRIVATE KEY-----\nYour SSH private key content here\n-----END OPENSSH PRIVATE KEY-----",
      "keyPassword": "optional_key_passphrase",
      "keyType": "ssh-ed25519",
      "folder": "Production",
      "tags": ["database", "production", "postgresql"],
      "pin": false,
      "enableTerminal": true,
      "enableTunnel": true,
      "enableFileManager": false,
      "tunnelConnections": [
        {
          "sourcePort": 5432,
          "endpointPort": 5432,
          "endpointHost": "Web Server - Production",
          "maxRetries": 3,
          "retryInterval": 10,
          "autoStart": true
        }
      ]
    },
    {
      "name": "Development Server",
      "ip": "192.168.1.102",
      "port": 2222,
      "username": "developer",
      "authType": "credential",
      "credentialId": 1,
      "folder": "Development",
      "tags": ["dev", "testing"],
      "pin": false,
      "enableTerminal": true,
      "enableTunnel": false,
      "enableFileManager": true,
      "defaultPath": "/home/developer"
    }
  ]
}
```

## Notes

- Maximum 100 hosts per import
- File must contain a "hosts" array or be an array of host objects
- Use the Download Sample button in the Host Manager to get a complete example file
- Credential authentication requires existing credentials to be created first before importing
- Sensitive data (passwords/keys) is excluded from exports

## Support

If you need help with Termix, you can join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support channel. You can also open an issue or open a pull request on the [GitHub](https://github.com/LukeGus/Termix/issues) repo.