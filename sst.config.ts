/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "frontend-client-dashboard",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const site = new sst.aws.Nextjs("frontend-client-dashboard", {
      // Add specific CloudFront configurations
      cdk: {
        distribution: {
          defaultBehavior: {
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"],
            cachedMethods: ["GET", "HEAD", "OPTIONS"],
          }
        }
      }
    });
  },
});