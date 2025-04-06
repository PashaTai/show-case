# Strapi Cloud Setup Guide

This guide will help you set up your Strapi Cloud instance to work with your blog frontend.

## 1. Create a Strapi Cloud Account

1. Go to [Strapi Cloud](https://cloud.strapi.io) and sign up for an account
2. Verify your email and complete the registration process

## 2. Create a New Project

1. Click on "Create a project"
2. Choose the plan that works for you (Starter plan is good for testing)
3. Follow the project creation wizard
4. Wait for your project to be deployed (this might take a few minutes)

## 3. Set Up Content Types

Your frontend expects specific content types. You need to create the following content-types in Strapi:

### Article Content Type

Navigate to Content-Type Builder and create a "Collection Type" called "Article" with these fields:

| Field Name | Type | Description |
|------------|------|-------------|
| title | Text (Short text) | Title of the blog post |
| slug | Text (UID) | URL slug, generated from title |
| content | Rich Text | Main content of the blog post |
| excerpt | Text (Long text) | Short summary of the blog post |
| featured | Boolean | Whether post should be featured |
| readTime | Number (Integer) | Estimated reading time in minutes |
| metaTitle | Text (Short text) | SEO title (optional) |
| metaDescription | Text (Long text) | SEO description (optional) |
| thumbnail | Media (Single media) | Featured image |
| category | Relation | Relation to Category (many-to-one) |
| author | Relation | Relation to Author (many-to-one) |

### Category Content Type

Create a "Collection Type" called "Category" with these fields:

| Field Name | Type | Description |
|------------|------|-------------|
| name | Text (Short text) | Category name |
| slug | Text (UID) | URL slug, generated from name |
| description | Text (Long text) | Category description |
| image | Media (Single media) | Category image |

### Author Content Type

Create a "Collection Type" called "Author" with these fields:

| Field Name | Type | Description |
|------------|------|-------------|
| name | Text (Short text) | Author's name |
| bio | Text (Long text) | Author biography |
| avatar | Media (Single media) | Author's profile picture |

## 4. Configure Permissions

1. Go to Settings → Users & Permissions Plugin → Roles
2. Edit the "Public" role
3. Enable the following permissions:
   - For Article: find, findOne
   - For Category: find, findOne
   - For Author: find, findOne
   - For Upload: upload
4. Save the changes

## 5. Generate API Token

1. Go to Settings → API Tokens
2. Click "Create new API Token"
3. Name it (e.g., "Blog Frontend")
4. Set Token type to "Full access" or customize permissions as needed
5. Set Token duration according to your needs
6. Save and copy the generated token

## 6. Configure Your Frontend

1. Go to the Admin panel in your frontend app
2. Enter your Strapi URL (e.g., `https://your-project.api.strapi.io`)
3. Enter your API token
4. Click "Save & Test Connection"

## 7. Add Some Content

1. Go back to your Strapi Cloud dashboard
2. Add some sample categories, authors, and articles
3. Make sure to upload images for thumbnails and avatars
4. Publish your content

Your frontend should now be able to fetch and display content from your Strapi Cloud instance!

## Troubleshooting

- If connection fails, double-check your API URL and token
- Make sure your content types match the expected structure
- Check that permissions are properly configured
- Verify that your content is published (not draft) 