// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: "openauth-nextjs",
            removal: input?.stage === "production" ? "retain" : "remove",
            protect: ["production"].includes(input?.stage),
            home: "aws",
            providers: {
                aws: {
                    region: "ap-southeast-1",
                },
            },
        };
    },
    async run() {
        new sst.aws.Nextjs("Web");
        new sst.aws.Auth("Auth", {
            authorizer: "src/auth/index.handler",
        });
    },
});
