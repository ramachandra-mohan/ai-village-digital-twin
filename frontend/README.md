React dashboard starter for AI Village Digital Twin.

## Local development

Use Node.js 22.12 or newer (or Node.js 20.19 or newer).

From this directory, run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).
Keep the terminal running and press Ctrl+C to stop the server.

If npm reports `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` on macOS and your
organization's certificate is already trusted by the system, use Node.js
22.19 or newer and run `export NODE_USE_SYSTEM_CA=1` before installing.
Do not disable TLS certificate verification.
