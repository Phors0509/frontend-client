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
      server: {
        edge: {
          viewerRequest: {
            injection: `
              const cookies = event.request.headers.cookie || [];
              // Access specific cookies
              const myCookie = cookies.find(cookie => cookie.startsWith('myCookieName='));
              if (myCookie) {
                // Do something with the cookie
                event.request.headers['x-my-cookie'] = myCookie.split('=')[1];
              }
            `
          },
          viewerResponse: {
            injection: `
              // Modify response headers or cookies here
            `
          }
        }
      },
      cdk: {
        distribution: {
          defaultBehavior: {
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicy: {
              cachePolicyId: "CACHING_DISABLED",
            },
          },
        },
      },
    });
    return site;
  },
});