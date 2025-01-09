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
    const site = new sst.NextjsSite(this, "frontend-client-dashboard", {
      customDomain: "https://d9xtr9j58bdbz.cloudfront.net/", // Replace with your domain
      cdk: {
        distribution: {
          defaultBehavior: {
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            originRequestPolicy: sst.aws.cloudfront.OriginRequestPolicy.ALL_VIEWER,
            cookies: { forward: "all" }, // Forward all cookies
            headers: { forward: "all" }, // Forward headers if necessary
          },
        },
      },
    });
    this.addOutputs({
      URL: site.url,
    });
  },
});