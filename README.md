This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

I used yarn during the development process, but you should be able to run the project with any of the commands.

```bash
npm run dev
# or
yarn dev 
# or
pnpm dev
# or
bun dev
```
## Viewing/running the app

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result assuming ngrok is setup on your device.

You can also see this site through a Vercel deployment [The Pic-tionary](https://image-search-puce.vercel.app)

## Environment key considerations

The client key is NOT hardcoded so it will need to be added as .env.local {NEXT_PUBLIC_CLIENT_ID: key...}

