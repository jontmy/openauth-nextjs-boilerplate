This is an SST + OpenAuth + [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Assuming you have your AWS credentials all set up, start the development server:

```
pnpm sst dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Files
- `src/auth/index.ts` - the AWS Lambda handler function
- `src/auth/client.ts` and `src/auth/subjects.ts` - the OpenAuth client and subject definition
- `src/app/actions.ts` - server actions for signing in, signing out, and checking if a user is authenticated
- `src/app/api/callback/route.ts` - the API route handler for OpenAuth to return to, and sets the access & refresh tokens
