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

## Screw the Review: Overview
Screw the Review is a web application designed to provide the user with new experiences by randomly generating an activity based on their preferences and filters. We refer to the random generation as an “experience” throughout this document. The user may provide some information regarding the type of experience they are seeking in the form of filters and will be provided a random experience that fits those constraints. These constraints may include price, location and type of experience. The user will also have the ability to generate a completely random experience with no filters or have an experience tailored to them based on their previous experiences, interests and dislikes. Screw the Review will be offered as a web-application with support for both desktop and mobile phone users.

&nbsp;  

## About this repo
This repo hosts the code for the server for screw the review. The client code can be found at https://github.com/mackenzieleach/screwthereview (For a functional overview of the entire project, including use cases and build instructions, look at the client project's README). This server deploys to Heroku at hidden-mesa-04199.herokuapp.com/

The server has no frontend! To use it, make an API call to the endpoint above (Required parameter location: String, optional categories: String[], optional price: Int between 1-4

&nbsp;  

## Local Usage and Deployment
To update the server locally, you need to install the Heroku CLI via homebrew (`brew tap heroku/brew && brew install heroku`)

or another package manager. You still add and commit files to git the same way 
as normal, but when pushing run `git push heroku main` to push and deploy to the site. 

You may also need to set your API key locally. This can be done by running 
`heroku config:set YELP_API_KEY=<YOUR_API_KEY>`
from your cli within the repo
