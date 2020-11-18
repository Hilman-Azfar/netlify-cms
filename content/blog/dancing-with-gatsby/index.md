---
title: Dancing with Gatsby
date: 2020-11-18T06:40:35.865Z
description: Gatsby? Static Site Generator? CMS? Diving into new tech! Let's go!
---
I started out my coding journey with creating React apps and using Express and MongoDB/ Postgres for my backend. I was introduced to the idea of headless CMS by an acquaintance. From a quick google search, I realised it was part of a bigger ecosystem. Here comes **JAMstack**! Acronym for Javascript, Api and Markup. For more info, head over here: <https://jamstack.org/>

### What

The beauty of this stack is that it is serverless. As there are many solutions we can use, I chose to use Gatsby with netlify-cms. There is no particular reason for choosing these. 

**Gatsby:** Gatsby is a React-based open source framework for creating websites and apps. <https://www.gatsbyjs.com/>

**Netlify-CMS:** A tool for content editors to make commits to your site repository without touching code or learning Git.<https://www.netlifycms.org/>

**Netlify:**[](https://www.netlify.com/) Netlify is a platform you can use to automatically build, deploy, serve, and manage your frontend sites and web apps. It also provides a variety of other features like form processing, serverless functions, and split testing.

### Why

This is not an exhaustive list of reasons why I choose the technology. Just a compilation of reasons which attracted me to pick it up.

**Gatsby**

* Fast. The people at Gatsby will explain it better than I could: <https://www.gatsbyjs.com/blog/2017-09-13-why-is-gatsby-so-fast/>
* Lots of starter code. I can focus making what I actually need instead of writing boilerplate code.
* Utilises React. Coming from React, the syntax is the same. So getting the code optimisation and using React is a win-win for me.

**Netlify-CMS**

* A SPA which lets you to commit to your git repo. This is great cause I can keep my version control and have a single source of truth.
* Having the same pull request and merge workflow for my content edits.
* Integrated OAuth2. Since I can use netlify identities, I don't have to worry about authentication and authorization.
* Works well with Gatsby since it generates markdown which Gatsby uses to generate pages.

**Netlify**

* Continuous integration. The generous free tier for netlify allows me to automatically build a new version of my site with a new commit to the git repo.



## **Learning** 

### Prerequisites:

* Have a git remote and local repo with the gatsby blog starter.
* Netlify account. Create a free account if you don't have.

### **Goal:**

Create a blog with a headless cms. 

#### Build process:

* Setting up the blog site
* Integrating with Netlify-CMS

  * Setting config
* Deploying to netlify

  * Setting up continuous integration
  * Authenticating who can edit



##### Setting up the blog site

I used the blog starter for this project. There is good tutorial which covers on how to build the blog site from scratch on the Gatsby docs: <https://www.gatsbyjs.com/blog/2017-07-19-creating-a-blog-with-gatsby/> Since the learning goal is to utilise the JAMstack, I will save the trouble and use the starter. 

The routes and pages in the blog site are generated from the markdown files in the repo.  Netlify-cms will make use of the feature later on.

##### Integrating with Netlify-CMS

This is where the magic happens.

Firstly, install the dependencies required.

```bash
npm install --save netlify-cms-app gatsby-plugin-netlify-cms
```

[](https://www.netlifycms.org/docs/gatsby/#configuration)Create a new directory "/static/admin" and a file "config.yml".

An example for a configuration is a shown.

```
backend:
  name: git-gateway
  branch: master

media_folder: static/img
public_folder: /img

collections:
  - name: 'blog'
    label: 'Blog'
    folder: 'content/blog'
    create: true
    slug: 'index'
    media_folder: ''
    public_folder: ''
    path: '{{title}}/index'
    editor:
      preview: false
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Publish Date', name: 'date', widget: 'datetime' }
      - { label: 'Description', name: 'description', widget: 'string' }
      - { label: 'Body', name: 'body', widget: 'markdown' }
```

**Backend**: A backend is JavaScript code that allows Netlify CMS to communicate with a service that stores content - typically a Git host like GitHub or GitLab. It provides functions that Netlify CMS can use to do things like read and update files using API's provided by the service.

**Media Folder**:  This option specifies the folder path where uploaded files should be saved, relative to the base of the repo.

**Public Folder**: This option specifies the folder path where the files uploaded by the media library will be accessed, relative to the base of the built site.

**Collections**: This setting is the heart of the Netlify CMS configuration, as it determines how content types and editor fields in the UI generate files and content in your repository.

For a deeper understanding refer to this: <https://www.netlifycms.org/docs/configuration-options/>

Lastly, add the plugin to the plugin array in "gatsby-config.js". Git commit the changes and push it to your remote repo.

##### Deploying to Netlify

Go to Netlify and select 'New Site from Git'. Select GitHub and the repository you just pushed to. Click Configure Netlify on GitHub and give access to your repository. Finish the setup by clicking Deploy Site. Netlify will begin reading your repository and starting building your project. Netlify will automatically build new version of the site when a new commit is pushed.

##### Authentication

Netlify's Identity and Git Gateway services allow you to manage CMS admin users for your site without requiring them to have an account with your Git host or commit access on your repo. From your site dashboard on Netlify:

1. Go to **Settings > Identity**, and select **Enable Identity service**.
2. Under **Registration preferences**, select **Open** or **Invite only**. In most cases, you want only invited users to access your CMS, but if you're just experimenting, you can leave it open for convenience.
3. If you'd like to allow one-click login with services like Google and GitHub, check the boxes next to the services you'd like to use, under **External providers**.
4. Scroll down to **Services > Git Gateway**, and click **Enable Git Gateway**. This authenticates with your Git host and generates an API access token. In this case, we're leaving the **Roles** field blank, which means any logged in user may access the CMS.

##### Complete!

To create new posts, login to the /admin/ page and create a new post by clicking on the "New Blog". Fill up the fields required. Click on "Publish" when you are done and a new commit will be pushed in the remote repo. Then Netlify will detect that there was a commit in your repo, and will start rebuilding your project. When your project is deployed you'll be able to see the post you created.

If you want to have the updated copies in your local repo, perform a git pull to fetch the latest changes.