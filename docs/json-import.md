# SSH JSON Import Format Guide

Use this guide to create JSON files for bulk importing SSH hosts. All examples are copyable.

## Required Fields

- **`ip`** - Host IP address (string)
- **`port`** - SSH port (number, 1-65535)
- **`username`** - SSH username (string)
- **`authType`** - Authentication type: `"password"`, `"key"`, `"credential"`, or `"none"`

## Authentication Fields

### Password Authentication

- **`password`** - Required if authType is "password" (string)

### Key-Based Authentication

- **`key`** - SSH private key content (string) - Required if authType is "key"
- **`keyPassword`** - Optional key passphrase (string)
- **`keyType`** - Key type (string): `"auto"` (default), `"ssh-rsa"`, `"ssh-ed25519"`, `"ecdsa-sha2-nistp256"`, `"ecdsa-sha2-nistp384"`, `"ecdsa-sha2-nistp521"`, `"ssh-dss"`, `"ssh-rsa-sha2-256"`, `"ssh-rsa-sha2-512"`

### Credential Authentication

- **`credentialId`** - ID of existing credential (number) - Required if `authType` is `"credential"`
  - Note: Credentials must be created in Termix before importing hosts that reference them. Find the ID in the `ID:` text inside the credentials viewer.

### None Authentication

- No additional fields required. Used for hosts with certificate-based authentication or when authentication is handled externally.

## Organization Fields

- **`name`** - Display name (string, auto-generated as `username@ip` if not provided)
- **`folder`** - Organization folder (string, default: "Default")
- **`tags`** - Array of tag strings (array, default: [])
- **`pin`** - Pin to top of host list (boolean, default: false)

## Feature Toggles

- **`enableTerminal`** - Enable terminal access (boolean, default: true)
- **`enableTunnel`** - Enable SSH tunneling (boolean, default: true)
- **`enableFileManager`** - Enable file manager access (boolean, default: true)
- **`defaultPath`** - Default directory path for file manager (string, default: "/")

## Tunnel Configuration

Configure SSH port forwarding tunnels for this host:

- **`tunnelConnections`** - Array of tunnel objects (array, default: [])
  - **`sourcePort`** - Local port on Termix server (number, 1-65535)
  - **`endpointPort`** - Remote port on target server (number, 1-65535)
  - **`endpointHost`** - Target host name (string) - Must match an existing host's name or `username@ip` format
  - **`maxRetries`** - Number of retry attempts on failure (number, 0-100, default: 3)
  - **`retryInterval`** - Delay between retries in seconds (number, 1-3600, default: 10)
  - **`autoStart`** - Auto-start tunnel on Termix launch (boolean, default: false)

## Advanced Configuration

### Statistics Configuration

Configure host monitoring and statistics collection:

- **`statsConfig`** - Statistics configuration object
  - **`enabledWidgets`** - Array of enabled widget types (array, default: ["cpu", "memory", "disk", "network", "uptime", "system", "login_stats"])
    - Available widgets: `"cpu"`, `"memory"`, `"disk"`, `"network"`, `"uptime"`, `"processes"`, `"system"`, `"login_stats"`
  - **`statusCheckEnabled`** - Enable periodic status checks (boolean, default: true)
  - **`statusCheckInterval`** - Status check interval in seconds (number, 5-3600, default: 30)
  - **`metricsEnabled`** - Enable metrics collection (boolean, default: true)
  - **`metricsInterval`** - Metrics collection interval in seconds (number, 5-3600, default: 30)

### Jump Hosts (Bastion/Proxy Hosts)

Configure multi-hop SSH connections through intermediate servers:

- **`jumpHosts`** - Array of jump host objects (array, default: [])
  - **`hostId`** - ID of existing Termix host to use as jump host (number)
  - Find the ID in the `ID:` text inside the host viewer.

### Quick Actions

Configure one-click commands using saved snippets:

- **`quickActions`** - Array of quick action objects (array, default: [])
  - **`name`** - Display name for the action (string)
  - **`snippetId`** - ID of existing snippet to execute (number)
  - Note: Snippets must be created in Termix before importing hosts that reference them. Find the ID in the `ID:` text inside the SSH tool bar.

## Example JSON Structure

### Basic Structure

The import file must be a JSON object containing a `"hosts"` array, or the file can be an array of host objects directly.

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
      ],
      "statsConfig": {
        "enabledWidgets": ["cpu", "memory", "disk", "network", "uptime"],
        "statusCheckEnabled": true,
        "statusCheckInterval": 30,
        "metricsEnabled": true,
        "metricsInterval": 30
      }
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
    },
    {
      "name": "Private Network Server",
      "ip": "10.0.0.50",
      "port": 22,
      "username": "sysadmin",
      "authType": "password",
      "password": "secure_password",
      "folder": "Infrastructure",
      "tags": ["bastion", "jump-host"],
      "jumpHosts": [
        {
          "hostId": 1
        }
      ],
      "quickActions": [
        {
          "name": "System Update",
          "snippetId": 5
        },
        {
          "name": "Check Disk Space",
          "snippetId": 12
        }
      ]
    },
    {
      "name": "Certificate-Based Server",
      "ip": "192.168.1.200",
      "port": 22,
      "username": "certuser",
      "authType": "none",
      "folder": "Secure Hosts",
      "tags": ["cert-auth", "secure"],
      "enableTerminal": true,
      "enableTunnel": false,
      "enableFileManager": false
    }
  ]
}
```

## Import Validation Rules

The bulk import endpoint validates each host entry with the following rules:

1. **Required Fields Validation**
   - `ip` must be a non-empty string
   - `port` must be a number between 1 and 65535
   - `username` must be a non-empty string

2. **Authentication Validation**
   - `authType` must be one of: `"password"`, `"key"`, `"credential"`, or `"none"`
   - For `password` auth: `password` field is required and must be non-empty
   - For `key` auth: `key` field is required and must be non-empty
   - For `credential` auth: `credentialId` must reference an existing credential
   - For `none` auth: no additional authentication fields required

3. **Import Limitations**
   - Maximum 100 hosts per import operation
   - File must be valid JSON containing a `"hosts"` array, or be an array of host objects directly

4. **Dependencies**
   - **Credentials**: Must be created in Termix before importing hosts that reference them via `credentialId`
   - **Jump Hosts**: The `hostId` in `jumpHosts` array must reference existing hosts in your Termix instance
   - **Snippets**: The `snippetId` in `quickActions` must reference existing snippets in your Termix instance
   - **Tunnel Endpoints**: The `endpointHost` in `tunnelConnections` must match an existing host's name or `username@ip` format

### Using the Export Feature

- You can export existing hosts from Termix to see the exact JSON structure
- Navigate to Host Manager → Select a host → Export
- The exported JSON shows all available fields and their current values
- Use exported files as templates for creating new imports

## Import Process

1. **Prepare Your JSON File**
   - Follow the format described in this guide
   - Validate your JSON syntax using a [JSON validator](https://jsonlint.com/)
   - Ensure all referenced credentials, hosts, and snippets exist

2. **Import via Host Manager**
   - Navigate to Host Manager in Termix
   - Use the bulk import button
   - Select your prepared JSON file

3. **Review Import Results**
   - The system will report successful imports and any failures
   - Failed imports include specific error messages
   - Successfully imported hosts appear in the host list

If you need help or want to request a feature with Termix, visit the [Issues](https://github.com/Termix-SSH/Support/issues) page, log in, and press `New Issue`.
Please be as detailed as possible in your issue, preferably written in English. You can also join the [Discord](https://discord.gg/jVQGdvHDrf) server and visit the support
channel, however, response times may be longer.
