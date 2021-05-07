# screwthereview-server

This repo hosts the code for the server for screw the review. The client code can be found at https://github.com/mackenzieleach/screwthereview. It deploys to Heroku at hidden-mesa-04199.herokuapp.com/

The server has no frontend! To use it, make an API call to the endpoint above (Required parameter location: String, optional categories: String[], optional price: Int between 1-4

To update the server locally, you need to install the Heroku CLI via homebrew (`brew tap heroku/brew && brew install heroku`)

or another package manager. You still add and commit files to git the same way 
as normal, but when pushing run `git push heroku master` to push and deploy to the site. 

You may also need to set your API key localyl. This can be done by running 
`heroku config:set YELP_API_KEY=<YOUR_API_KEY>`
from your cli within the repo
