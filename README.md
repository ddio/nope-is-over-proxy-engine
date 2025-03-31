# NOPE - Node.js Over Proxy Engine

A high-performance, configurable proxy rotation engine based on Node.js and proxy-chain that supports intelligent load balancing and seamless switching between different upstream proxy providers.

## Features

- **Proxy Rotation**: Round-robin load balancing across multiple upstream proxies
- **Smart Routing**: Domain-based proxy selection to optimize performance
- **Protocol Support**: Compatible with HTTP, HTTPS, and SOCKS5 proxies
- **Authentication**: Handles upstream proxy authentication securely
- **Lightweight**: Efficient Node.js implementation using proxy-chain
- **Hot Reload**: Update proxy configurations without downtime

## Architecture

NOPE uses the proxy-chain library to efficiently handle proxy connections with custom routing logic:

```
┌─────────┐     ┌───────────────────┐     ┌─────────────────┐
│ Clients │────▶│ NOPE (proxy-chain)│────▶│ Upstream Proxy 1│
└─────────┘     │ - Load Balance    │     └─────────────────┘
                │ - Domain Routing  │     ┌─────────────────┐
                │ - Error Handling  │────▶│ Upstream Proxy 2│
                └───────────────────┘     └─────────────────┘
                                          ┌─────────────────┐
                                         ▶│ Upstream Proxy n│
                                          └─────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/username/nope-is-over-proxy-engine.git
   cd nope-is-over-proxy-engine
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a configuration file (env.json):
   ```json
   {
     "server": {
       "port": 8000
     },
     "proxy": [
       {
         "targetDomain": "target.domain1.com",
         "proxies": [
            {
              "protocol": "https",
              "server": "proxy1.example.com:8080", 
              "username": "user1",
              "password": "pass1"
            },
            {
              "protocol": "socks5",
              "server": "proxy2.example.com:1080"
            }
         ]
       }
     ]
   }
   ```

   See `env.sample.json` for a sample configuration.

4. Start the service:
   ```
   npm start
   ```

## Configuration

### Proxy Configuration Format

Each proxy in the `env.json` should be in the format:
```json
{
  "protocol": "https|http|socks5",
  "server": "hostname:port",
  "username": "optional_username",
  "password": "optional_password"
}
```

## Usage

### Using as HTTP Proxy

Configure your application to use NOPE as an HTTP proxy:

```
Proxy Server: your-server-ip
Port: 8000 (or as configured in env.json)
```

### Development with Hot Reload

For development with hot module reloading:

```bash
npm run dev
```

This uses nodemon to watch for file changes and automatically restart the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.