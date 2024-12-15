<img width="1792" alt="Screenshot 2024-12-12 at 23 13 43" src="https://github.com/user-attachments/assets/34bbd81a-cc07-439f-b73f-7787776f7f0b" />

This is an SST + OpenAuth + [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This setup is slightly opinionated—TypeScript (+ the ESLint plugin) and Prettier (+ the TailwindCSS plugin) have been added,
based on the default configuration from `create-next-app`.

## Getting Started

Assuming you have your AWS credentials all set up, start the development server:

```
pnpm sst dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and click on "Sign in".
This will navigate you to the OpenAuth authorizer Lambda function URL.

After registering, you can find your OTP in the SST multiplexed terminal.

## Files

- `src/auth/index.ts` - the AWS Lambda handler function
- `src/auth/client.ts` and `src/auth/subjects.ts` - the OpenAuth client and subject definition
- `src/app/actions.ts` - server actions for signing in, signing out, and checking if a user is authenticated
- `src/app/api/callback/route.ts` - the API route handler for OpenAuth to return to, and sets the access & refresh tokens
