# SSH Tunnels Guide

## Understanding SSH Tunnels

### Key Components: Source vs Endpoint

#### **Source (Local/Client Side)**
- **What it is**: This is where you initiate the tunnel connection from
- **Role**: Acts as the "client" that establishes the connection and forwards local traffic
- **Traffic direction**: Sends traffic OUT through the tunnel
- **Port binding**: Binds to a local port that applications can connect to

#### **Endpoint (Remote/Server Side)**
- **What it is**: This is the destination where the tunnel terminates
- **Role**: Acts as the "server" that receives the tunneled traffic and forwards it to its final destination
- **Traffic direction**: Receives traffic IN from the tunnel and forwards it to the target service
- **Port binding**: Connects to the target service on the remote network

### How Traffic Flows

```
[Your Application] → [Local Port (Source)] → [SSH Tunnel] → [Remote Port (Endpoint)] → [Target Service]
```

## SSH Tunnel Configuration

This guide explains how to configure and manage SSH tunnels in Termix's SSH Manager, allowing you to port forwarding between local and remote systems.

## Prerequisites

Before configuring SSH tunnels, ensure you have:

1. **SSH Access**: Valid SSH credentials for both source and destination hosts
2. **Network Connectivity**: Both hosts must be reachable from your Termix instance
3. **SSH Server Configuration**: Proper SSH server settings on both ends
4. **Required Software**: `sshpass` for password-based authentication (if using passwords)

## Accessing SSH Tunnel Configuration

1. Navigate to **Host Manager** in Termix
2. Click **Add Host** or edit an existing host
3. Go to the **Tunnel** tab in the host configuration
4. Enable the **Enable Tunnel** switch to access tunnel configuration options

## SSH Server Requirements

### Required SSH Server Settings

For reverse SSH tunnels to work properly, the endpoint SSH server must have these settings in `/etc/ssh/sshd_config`:

```bash
# Allow port forwarding
AllowTcpForwarding yes

# Bind remote ports (required for reverse tunnels)
GatewayPorts yes

# Allow root login (if using root user)
PermitRootLogin yes

# Allow public key authentication
PubkeyAuthentication yes

# Allow password authentication (if using passwords)
PasswordAuthentication yes
```

After making changes, restart the SSH service:
```bash
sudo systemctl restart sshd
```

### Installing sshpass

For password-based authentication, install `sshpass` on both local and remote systems:

**Debian/Ubuntu:**
```bash
sudo apt install sshpass
```

**CentOS/RHEL/Fedora:**
```bash
sudo yum install sshpass
# or
sudo dnf install sshpass
```

**macOS:**
```bash
brew install hudochenkov/sshpass/sshpass
```

**Windows:**
Use WSL or consider SSH key authentication instead.

## Tunnel Configuration Fields

### Basic Tunnel Settings

#### Enable Tunnel
- **Purpose**: Master switch to enable/disable tunnel functionality for this host
- **Type**: Toggle switch
- **Default**: Enabled

### Tunnel Connections

Each tunnel connection has the following configuration fields:

#### 1. Source Port
- **Purpose**: Port on the source machine (current connection you are editing/adding) to forward traffic from
- **Type**: Number input (1-65535)
- **Default**: 22
- **Example**: 22, 80, 3306, 8080

#### 2. Endpoint Port
- **Purpose**: Port on the destination machine to forward traffic to
- **Type**: Number input (1-65535)
- **Default**: 224
- **Example**: 22, 80, 3306, 8080

#### 3. Endpoint SSH Configuration
- **Purpose**: SSH connection details for the destination machine
- **Type**: Text input with dropdown suggestions
- **Format**: Hostname or IP address
- **Example**: `192.168.1.100`, `server.example.com`

#### 4. Max Retries
- **Purpose**: Maximum number of retry attempts if the tunnel connection fails
- **Type**: Number input (0-100)
- **Default**: 3
- **Example**: 3, 5, 10
- **Note**: Set to 0 to disable retries

#### 5. Retry Interval
- **Purpose**: Time to wait between retry attempts in seconds
- **Type**: Number input (1-3600)
- **Default**: 10
- **Example**: 10, 30, 60

#### 6. Auto Start on Container Launch
- **Purpose**: Automatically start this tunnel when the Termix container launches
- **Type**: Toggle switch
- **Default**: Disabled

## Step-by-Step Tunnel Setup

### Step 1: Configure Source Host
1. In Host Manager, create or edit your source host
2. Ensure SSH credentials are properly configured
3. Go to the **Tunnel** tab
4. Enable the **Enable Tunnel** switch

### Step 2: Add Tunnel Connection
1. Click **Add Tunnel Connection**
2. Configure the tunnel parameters:
    - **Source Port**: Port on source machine to forward from
    - **Endpoint Port**: Port on destination machine to forward to
    - **Endpoint SSH Configuration**: Destination host details
    - **Max Retries**: Number of retry attempts
    - **Retry Interval**: Time between retries
    - **Auto Start**: Whether to start automatically

### Step 3: Configure Endpoint Host
1. Ensure the endpoint host is also configured in Termix
2. Verify SSH connectivity to the endpoint
3. Check that the endpoint SSH server allows port forwarding

### Step 4: Test Tunnel
1. Save the host configuration
2. Go to the **Tunnel** tab in the main interface
3. Start the tunnel manually or wait for auto-start
4. Verify connectivity to the forwarded service

## Troubleshooting

### Common Issues

#### 1. "Connection Refused" Error
- **Cause**: Endpoint service is not running or not accessible
- **Solution**: Verify service is running and SSH server allows forwarding

#### 2. "Permission Denied" Error
- **Cause**: SSH server doesn't allow port forwarding
- **Solution**: Check `AllowTcpForwarding` setting in sshd_config

#### 3. "Address Already in Use" Error
- **Cause**: Port is already bound by another service
- **Solution**: Use a different source port or stop conflicting service

#### 4. Tunnel Drops Frequently
- **Cause**: Network instability or SSH connection issues
- **Solution**: Increase retry attempts and retry interval

### Debug Steps

1. **Check SSH Connectivity**
   ```bash
   ssh username@endpoint-host
   ```

2. **Verify Port Availability**
   ```bash
   netstat -tlnp | grep :port
   ```

3. **Check SSH Server Logs**
   ```bash
   sudo tail -f /var/log/auth.log
   ```

4. **Test Port Forwarding Manually**
   ```bash
   ssh -R source-port:endpoint-host:endpoint-port username@source-host
   ```