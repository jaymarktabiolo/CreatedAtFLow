# Deployment Instructions

Quick options to deploy the app.

1) Render (recommended)
  - Create a new Web Service in Render and connect your GitHub repo.
  - Use the provided `render.yaml` (update the `repo` value first).
  - Set service to use Dockerfile (automatic when `env: docker`).
  - Add two repository secrets in GitHub Settings → Secrets:
    - `RENDER_API_KEY` (for triggering deploys via the API)
    - `RENDER_SERVICE_ID` (the Render service ID, e.g., `srv-xxxxx`)
  - On push to `main`, the included GitHub Actions workflow will build, push image to GHCR, and trigger Render.

2) Local Docker (quick test)
  - Build image: `docker build -t blossom-greetings:local .`
  - Run: `docker run -p 5000:5000 --env PORT=5000 blossom-greetings:local`
  - Visit: `http://localhost:5000`

Notes
- The Dockerfile is a multi-stage build that runs `npm run build` then copies `dist` into a runtime image.
- The server listens on `PORT` (defaults to 5000).
- If you prefer Fly or other providers, I can add `fly.toml` or provider-specific CI.
