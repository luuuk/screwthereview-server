# Screw the Review Server: Experience Something New
CSE 403: Software Engineering  
University of Washington  

&nbsp;  

**Screw the Review:** [https://screwthereview.netlify.app/](https://screwthereview.netlify.app/)

&nbsp; 

**Team Members & Roles**
1. Luke LeVasseur (Backend Developer, Documentation Co-Lead)
2. Mackenzie Leach (Frontend Developer, Documentation Co-Lead)
4. LuLu Pinczower (Full-Stack Developer, 3rd Party Data Lead)
5. Rachel Ye (Full-Stack Developer) 

&nbsp;  

## About this Repository:
This repository contains the server code for Screw the Review. For more information about Screw the Review (overview, code and use cases) and the client code, please visit the repository at <https://github.com/mackenzieleach/screwthereview>. 

&nbsp;  

## Quick Start Guide
This server deploys to Heroku at hidden-mesa-04199.herokuapp.com and has no frontend. This guide will show you two options for utilizing the server. 

&nbsp;

### Option 1: API Call
This option is best for those wanting to understand data returned by the server. This also demonstrated how the server is utilized by the Screw the Review client code. To use this, make an API call to the [endpoint on Heroku](hidden-mesa-04199.herokuapp.com). The parameters for this API Call are:

&nbsp;  

**Name** | **Type** | **Status**
------------ | ------------------------|------------
location | String | Required
categories | String[]| Optional   
price | Int from 1 - 4 | Optional  

To test the API, uers can utilize the CLI (with the `curl` command) and/or make API calls from a GUI service like Postman. Either way, 

&nbsp;  

### Option 2: Local Server
If you would like to spin up the server locally, you can follow the steps below. This is the best option for developers interested in contributing to the code base, or for those that would like to explore the code in-depth.

&nbsp;

#### Prerequisites
In order to complete this option, there are two prerequisites:

&nbsp;

**Create a Github Account:** If you do not have a Github Account, you will need to create one to be able to clone the repository. Navigate to <https://github.com/> and create a repository. You will want to save your username and password as these will be needed later in cloning a repository. 

&nbsp;

**Clone the Repository:** You will need to clone the repository to your local machine. Open the command line and change to the directory you would like the repository code to be placed in. Once in the directory, run the command:

``` *.sh
git clone https://github.com/luuuk/screwthereview-server.git
```
&nbsp;

If this is your first time cloning a repository from Github, you will be prompted to enter your username and password before proceeding. 

&nbsp;

#### Step 1: Heroku CLI: 
To access the server locally, you will need to install the Heroku Command Line Interface (CLI). 
- To install on Mac, use the command `brew tap heroku/brew && brew install heroku`. 
- To install on Windows, visit the [Heroku CLI Page](https://devcenter.heroku.com/articles/heroku-cli), select the appropriate installer for your machine and follow the installation prompts. 

&nbsp;

#### Step 2 API Key
To make changes to this code base, you will need to set an API Key for Heroku locally. There are several steps to obtain the API Key
- Create an account with [Heroku](https://www.heroku.com/)
- In your CLI, run the command `heroku login` to generate the API key. 
- Run the command `heroku auth:token` to obtain your API key
- Run the command `heroku config:set YELP_API_KEY=<YOUR_API_KEY>` from your CLI to configure your API key.  

&nbsp; 

For more information about Heroku CLI Authentication, visit <https://devcenter.heroku.com/articles/authentication>.

&nbsp; 

#### Step 3: Local Development
This repository welcomes pull requests from developers interested in contributing to the code base. To begin, checkout a new branch by running `git checkout -b <branch-name>`. You can now switch to this new branch by running `git checkout <branch-name>` and make changes to the code. 

To view your local changes, you can run `heroku local` to start a local development server. This job will start a server at `localhost:5000` which you can test using Postman, CURL, or Chrome Developer Tools.

Staging, committing, and pushing files can be done with standard Git commands. Heroku and Github Actions will take care of deploying changes to the server when they are merged into main. 

To create a pull request for your branch, navigate to the repository at <https://github.com/luuuk/screwthereview-server> and visit the pull request tab. The pull request must have a descriptive title, detail changes to the code and include tests for the changes. The pull request will be reviewed by a repository maintainer. 

&nbsp; 

### Bug Reporting
If you encounter a bug, you may create a **Github Issue** to report the bug. You issue should include a descriptive title, the exact steps you took to encounter the bug, what operating system and browser you are using, and any applicable screenshots of the bug. 

&nbsp; 

This repository also welcomes pull requests for bug fixes. If you encounter and resolve a bug, you may create a **pull request** with your code. It must include a descriptive title and a description of the specific changes you made and how it resolved the bug. The pull request will be reviewed by a repository maintainer and changes may be requested if needed.
