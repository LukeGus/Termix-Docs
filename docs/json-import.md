# SSH JSON Import Format Guide

Use this guide to create JSON files for bulk importing SSH hosts. All examples are copyable.

## Required Fields

- **`ip`** - Host IP address (string)
- **`port`** - SSH port (number, 1-65535)
- **`username`** - SSH username (string)
- **`authType`** - "password" or "key"

## Authentication Fields

- **`password`** - Required if authType is "password"
- **`key`** - SSH private key content (string) if authType is "key"
- **`keyPassword`** - Optional key passphrase
- **`keyType`** - Key type (auto, ssh-rsa, ssh-ed25519, etc.)

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
      "name": "Web Server",
      "ip": "192.168.1.100",
      "port": 22,
      "username": "admin",
      "authType": "password",
      "password": "your_password",
      "folder": "Production",
      "tags": ["web", "production"],
      "pin": true,
      "enableTerminal": true,
      "enableTunnel": false,
      "enableFileManager": true,
      "defaultPath": "/var/www"
    }
  ]
}
```

## Notes

- Maximum 100 hosts per import
- File should contain a "hosts" array or be an array of host objects
- Use the Download Sample button in the Host Manager to get a complete example file