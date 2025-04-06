# Connecting GitHub to Strapi Cloud

This guide outlines how to deploy your Strapi project to Strapi Cloud using GitHub integration.

## Prerequisites

- A GitHub account
- Your project pushed to a GitHub repository
- A Strapi Cloud account

## Step 1: Push Your Project to GitHub

1. Create a new repository on GitHub
2. Add the GitHub repository as a remote to your local project:
   ```
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   ```
3. Push your code to GitHub:
   ```
   git push -u origin main
   ```

## Step 2: Connect Strapi Cloud to GitHub

1. Log in to your [Strapi Cloud account](https://cloud.strapi.io)
2. Click "Create a project"
3. Select the "GitHub" deployment option
4. Connect your GitHub account if not already connected
5. Select the repository containing your Strapi project
6. Configure the deployment settings:
   - **Branch**: Choose the branch to deploy (usually `main`)
   - **Root Directory**: Specify the directory containing your Strapi project (if it's in a subdirectory)
   - **Node.js Version**: Choose the appropriate Node.js version
   
## Step 3: Configure Environment Variables

In the Strapi Cloud dashboard, add necessary environment variables:

1. Go to your project settings
2. Click on "Environment Variables"
3. Add variables required by your application
   - Database connection details (if using an external database)
   - API keys
   - Admin JWT secret
   - App keys
   - Any other variables your Strapi project needs

## Step 4: Deploy Your Project

1. Click "Deploy" to start the deployment process
2. Strapi Cloud will pull your code from GitHub and build the project
3. Once deployed, you'll receive a URL for your Strapi instance

## Step 5: Configure Continuous Deployment

1. By default, Strapi Cloud will redeploy your project whenever you push changes to your selected branch
2. You can configure deployment settings in the Strapi Cloud dashboard:
   - Auto-deploy toggle
   - Preview environments for pull requests
   - Branch-specific environments

## Step 6: Connect Your Frontend

1. Use the Strapi Cloud URL in your frontend application
2. Generate an API token in your Strapi Cloud admin panel
3. Update your frontend configuration with the Strapi Cloud URL and API token

## Troubleshooting

- **Deployment Failures**: Check the build logs in Strapi Cloud dashboard
- **Permission Issues**: Ensure your GitHub account has the necessary permissions
- **Missing Environment Variables**: Verify all required environment variables are set
- **API Connection Issues**: Check CORS settings in your Strapi configuration

For more details, refer to the [official Strapi Cloud documentation](https://docs.strapi.io/cloud/getting-started/introduction). 