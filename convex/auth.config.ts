// Convex configuration with authentication - private enterprise access only
const authConfig = {
  providers: [
    {
      domain: "your-domain.com", // Replace with your actual domain
      applicationID: "your-convex-app-id", // This will be configured via Convex CLI
    }
  ],
};

export default authConfig;

