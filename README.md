# How to User the Auth0 Management API Node Client

This is an example of how you can request data from the Auth0 Management API using an Express and Vue application. 

If you'd like an in-depth explanation of how to build this, check out the tutorial - [Build a User Management Dashboard with Express and Vue]()

**Topics covered in the tutorial/app:**

- Set up Auth0 authentication in a Vue and Express app
- Authorize your Express app to use the Auth0 Management API
- Get a Management API token from Auth0
- Implement client credentials grant
- Make a request to the Auth0 Management API
- Protect your Express endpoints
- Authorize your Vue client to make a request to your Express API
- Display data in your Vue app
- Delete users from your Vue app

It uses Auth0 to secure the Express API and also to allow users to register and login to the Vue application. It then uses the client credentials grant on the Express side to

You can clone this project and follow the directions below or [check out the tutorial]() where I cover everything step by step!

![Auth0 user dashboard Management API](https://cdn.auth0.com/blog/express-management-api/auth0-user-management-api-dashboard.png)
![Vue events app](https://cdn.auth0.com/blog/vue-meetup/vue-event-app-home.png)

## Project setup

First, clone this repo:

```bash
git clone https://github.com/auth0-blog/vue-express-management-api.git
```

Now you need to install the dependencies for the client and server code and get everything running. It won't run properly until you fill in the Auth0 values, but you can still start everything up now.

### Set up the Express server

```bash
cd server
npm install
npm start
```

Server is running at [http://localhost:8000](http://localhost:8000).

### Set up the Vue client

```bash
cd ../client
npm install
npm run serve
```

View it in the browser at [http://localhost:8080](http://localhost:8080).

## Configuring Auth0

We're going to use Auth0 to add authentication to the app.

First, [sign up for a free Auth0 account](https://auth0.com/signup). Once you're registered, you'll be taken to the [Auth0 management dashboard](https://manage.auth0.com/dashboard/).

### Create the Auth0 application

Click on the big red button that says "Create Application". 

Name it "Vue Events" (or anything you'd like), click on "Single Page Web Applications" for "application type", and press "Create".

![Auth0 Dashboard](https://cdn.auth0.com/blog/vue-meetup/auth0-create-app.png)

Now click into "Settings" and fill in some information that Auth0 needs to configure authentication:

**Allowed Callback URLs** &mdash; `http://localhost:8080`

**Allowed Logout URLs** &mdash; `http://localhost:8080`

**Allowed Web Origins** &mdash; `http://localhost:8080`

### Create the Auth0 API

Next, click on "APIs" on the left menu. Click "Create API" and call it "Vue Express API" (or anything you'd like). For "Identifier", we recommend a URL such as `https://vue-express-api.com`. It doesn't have to be a publicly available URL and we'll never call it, it's just for naming purposes. You can leave "Signing algorithm" as is and the press "Create".

While you're here, set up the API to make calls to the Auth0 Management API.

### Auth0 Management API setup

On this same page, scroll down to "RBAC Settings" and click the switch for "Enable RBAC" and "Add Permissions in the Access Token".

Next, click on "Permissions" and add a new permission called `manage:users`.

Now in the left hand menu, click on "APIs" and find "Auth0 Management API". Click on "Machine to Machine Applications" and find your Vue Express API that you just created. Click the switch to authorize it. Then click the dropdown arrow and you'll see a list of permissions. Select `read:users`, `delete:users`, and `read:user_idp_tokens` and press "Update".

Now your Express API is authorized to make requests to the Auth0 Management API. 

That's all we need from the dashboard for now, but don't click out yet. We'll need to pull some of these values from the dashboard into our application soon.

### Integrating Auth0 into Vue

Create a file (and add to `.gitignore`) for the config values:

```bash
touch client/auth_config.json
```

Now open up `client/auth_config.json` and paste in:

```js
{
  "domain": "your-domain.auth0.com",
  "clientId": "your-client-id",
  "audience": "https://your-identifier.com"
}
```

**Finding your `auth_config` values:**

* Head to the [Auth0 dashboard](https://manage.auth0.com/dashboard)
* Click on "APIs" and select your API
* Copy the value for "Identifier" and past it into `audience` in `auth_config.json`
* Click on "Applications" and select your application
* Click on "Settings"
* Copy the value for "Domain" and paste it into `domain` in `auth_config.json`
* Copy the value for "Client ID" and paste it into `clientId` in `auth_config.json`

Now you should be able to sign in to the application, but you still won't be able to access single event details or Management API because you need to add this information to the server side where the API access token is validated.

### Integrating Auth0 into Vue

Open `server/.env.example` and rename it to `.env`.

Replace the `AUTH0_DOMAIN` and `AUTH0_AUDIENCE` placeholders with the values for `domain` and `audience` from `auth_config`.

```
AUTH0_DOMAIN = your-app.auth0.com
AUTH0_AUDIENCE = https://your-api.com
CLIENT_ID = yourclientid
CLIENT_SECRET = yourclientsecret
```

The `CLIENT_ID` AND `CLIENT_SECRET` here are different than the ones used for the Vue application. In this case, it's asking for the client id & secret in relation to the Management API, which is going to be your Express API.

Back in the Auth0 dashboard, click "APIs" > "Auth0 Management API" > "Test". Click on the dropdown and select your Vue Express API. Then underneath the dropdown you'll see a `cURL` command. Copy the `client_id` and `client_secret` from here and paste those values into `.env`.

Now you can sign in, receive an API access token, and view an event's details page at [http://localhost:8080/event/1](http://localhost:8080/event/1). However, you don't have the necessary permissions to view the admin dashboard at [http://localhost:8080/dashboard](http://localhost:8080/dashboard). 

### Add permissions to your user account

Back in the Auth0 dashboard, click on "Users & Roles" > "Users". Find your user account that you want to assign permissions to and click on it. At the top, click on the "Permissions" tab. Click "Assign permissions" and then find the Vue Express API from the dropdown. Under "Scopes", find `manage:users`, select it, and click "Add". 

Now go back to your application, log out, and log back in. You should now have full administrator permissions to view the dashboard and delete a user! When you test the Delete button, make sure you make a new test user in the Auth0 dashboard first so you don't accidentally delete your admin account. Enjoy!

Be sure to [check out the full tutorial]() to see how this process works.