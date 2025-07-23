# Environment Variables Usage

The backend reads configuration from environment variables using the `.env` file (loaded via dotenv).

## Variables

- `PORT`: The port number for the Express server (default: `3001`)
- `HOST`: Host address for the server (default: `0.0.0.0`)
- `NODE_ENV`: Node.js environment (default: `development`)

**To run with custom port/host:**

```
PORT=3001
HOST=127.0.0.1
NODE_ENV=production
```
Place this in a `.env` file at the root (`product_management_backend/`).
