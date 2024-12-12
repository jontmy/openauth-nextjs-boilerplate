import { createClient } from "@openauthjs/openauth/client";

export const client = createClient({
    clientID: "openauth-nextjs",
    issuer: "https://f2bcubcwnuxphmn5utb434io7i0kqknq.lambda-url.ap-southeast-1.on.aws",
});
