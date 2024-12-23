/// <reference path="./sst-env.d.ts" />

export default $config({
  app(input) {
    return {
      name: "frontend-client",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("MyFrontendClient");
  },
});