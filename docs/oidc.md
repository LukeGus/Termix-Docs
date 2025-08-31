# OIDC (OpenID Connect) Setup Guide

This guide explains how to configure OpenID Connect (OIDC) authentication in Termix's admin settings to enable external identity provider authentication.

## Overview

OIDC allows users to authenticate using external identity providers (like Google, Microsoft, Okta, Auth0, etc.) instead of local accounts. This provides enhanced security, single sign-on capabilities, and centralized user management.

## Prerequisites

Before configuring OIDC, you need:

1. **Admin Access**: You must be an administrator in Termix
2. **OIDC Provider Account**: An account with an OIDC-compliant identity provider
3. **Application Registration**: A registered application in your OIDC provider

## Accessing OIDC Settings

1. Navigate to **Admin Settings** in Termix
2. Click on the **OIDC** tab
3. You'll see the OIDC configuration form with all required fields

## Required Configuration Fields

### 1. Client ID
- **Purpose**: Unique identifier for your application in the OIDC provider
- **Where to find**: Provided by your OIDC provider when you register your application
- **Example**: `myapp-client-id-12345`

### 2. Client Secret
- **Purpose**: Secret key used to authenticate your application with the OIDC provider
- **Where to find**: Provided by your OIDC provider when you register your application
- **Example**: `myapp-secret-key-abcdef123456`

### 3. Authorization URL
- **Purpose**: Endpoint where users are redirected to authenticate
- **Format**: HTTPS URL provided by your OIDC provider
- **Example**: `https://your-provider.com/application/o/authorize/`

### 4. Issuer URL
- **Purpose**: Base URL that identifies your OIDC provider
- **Format**: HTTPS URL that uniquely identifies your provider
- **Example**: `https://your-provider.com/application/o/termix/`

### 5. Token URL
- **Purpose**: Endpoint where your application exchanges authorization codes for access tokens
- **Format**: HTTPS URL provided by your OIDC provider
- **Example**: `https://your-provider.com/application/o/token/`

## Optional Configuration Fields

### 6. User Identifier Path
- **Purpose**: JSON path to extract the unique user identifier from the ID token
- **Default**: `sub` (standard OIDC field)
- **Common values**: `sub`, `user_id`, `id`, `email`
- **Example**: If your ID token has `{"user": {"id": "12345"}}`, use `user.id`

### 7. Display Name Path
- **Purpose**: JSON path to extract the user's display name from the ID token
- **Default**: `name` (standard OIDC field)
- **Common values**: `name`, `display_name`, `full_name`, `username`
- **Example**: If your ID token has `{"profile": {"display_name": "John Doe"}}`, use `profile.display_name`

### 8. Scopes
- **Purpose**: Permissions requested from the OIDC provider
- **Default**: `openid email profile`
- **Common scopes**:
    - `openid`: Required for OIDC authentication
    - `email`: Access to user's email address
    - `profile`: Access to basic profile information
    - `groups`: Access to user group memberships (if supported)
- **Example**: `openid email profile groups`

## Step-by-Step Configuration

### Step 1: Register Your Application
1. Log into your OIDC provider's admin console
2. Create a new application or client
3. Set the application type to "Web Application" or "Public Client"
4. Note down the Client ID and Client Secret

### Step 2: Get Provider URLs
1. In your OIDC provider, find the discovery endpoints
2. Note down the Authorization URL, Token URL, and Issuer URL

### Step 3: Configure Termix
1. Open Termix Admin Settings → OIDC tab
2. Fill in all required fields with the information from your provider
3. Adjust optional fields based on your provider's token structure
4. Click "Save Configuration"

### Step 4: Test Configuration
1. Log out
2. You should see an option to use your OIDC provider
3. The authentication flow should redirect to your provider and back

## Common OIDC Providers

### Google
- **Authorization URL**: `https://accounts.google.com/o/oauth2/v2/auth`
- **Token URL**: `https://oauth2.googleapis.com/token`
- **Issuer URL**: `https://accounts.google.com`
- **Scopes**: `openid email profile`

### Microsoft (Azure AD)
- **Authorization URL**: `https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/authorize`
- **Token URL**: `https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token`
- **Issuer URL**: `https://login.microsoftonline.com/{tenant-id}/v2.0`
- **Scopes**: `openid email profile`

### Auth0
- **Authorization URL**: `https://{your-domain}.auth0.com/authorize`
- **Token URL**: `https://{your-domain}.auth0.com/oauth/token`
- **Issuer URL**: `https://{your-domain}.auth0.com/`
- **Scopes**: `openid email profile`

### Okta
- **Authorization URL**: `https://{your-domain}.okta.com/oauth2/v1/authorize`
- **Token URL**: `https://{your-domain}.okta.com/oauth2/v1/token`
- **Issuer URL**: `https://{your-domain}.okta.com/oauth2/default`
- **Scopes**: `openid email profile`

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
    - Ensure the redirect URI in your OIDC provider matches exactly
    - Check for trailing slashes or protocol mismatches

2. **"Client authentication failed" error**
    - Verify your Client ID and Client Secret are correct
    - Ensure the Client Secret hasn't expired or been regenerated

3. **"Invalid scope" error**
    - Check that all requested scopes are supported by your provider
    - Ensure the `openid` scope is always included

4. **"Invalid issuer" error**
    - Verify the Issuer URL matches your provider's issuer identifier
    - Check for protocol mismatches (http vs https)

### Debug Steps

1. Check the browser's developer console for error messages
2. Verify all URLs are accessible from your network
3. Test the OIDC provider's discovery endpoint
4. Ensure your provider supports the OIDC standard

## Advanced Configuration

### Custom Claims Mapping
If your OIDC provider uses custom claim names, you can map them using the identifier and name path fields:

```json
// Example ID token with custom claims
{
  "sub": "user123",
  "custom_user_id": "12345",
  "custom_display_name": "John Doe"
}

// Configuration
Identifier Path: custom_user_id
Display Name Path: custom_display_name
```

### Multiple OIDC Providers
Currently, Termix supports one OIDC provider at a time. To switch providers, update the configuration with the new provider's details.

## Support

If you encounter issues with OIDC configuration:

1. Check this guide for common solutions
2. Verify your OIDC provider's documentation
3. Ensure all URLs and credentials are correct
4. Test with a simple OIDC client first to verify provider configuration

Remember that OIDC configuration is provider-specific, so always refer to your specific provider's documentation for the most accurate information.
