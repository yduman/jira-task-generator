# JIRA Task Generator

This app generates tasks for a specific story automatically. The app was originally designed for the specific needs of our former team, but changes can be made really quick!

## Secrets

The `backend` and `frontend` folder contain a file called `config.js`. You can see the necessary env variables needed there.
Besides, make sure to also visit the documentation of Atlassian regarding [Basic Auth for REST APIs](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/), since they mention incoming deprecations.

## Run the app

- You need Node.js to run the app
- Run `yarn` or `npm i` on `backend` and `frontend`
- Run `yarn build` or `npm run build` in the `frontend` folder and copy the build output into the `backend/public` folder
- Finally, inside the `backend` folder run:
  - `yarn start` or `npm run start`. This will run the server at `http://localhost:3001`

## Using the app

- Provide the Story-ID inside the first textfield (e.g. `PROJECT_KEY-12345`)
- Provide your tasks on the next textfield, e.g.
  - ```
    TI My first test idea
    T First task for this testidea
    T Second task for this testidea
    T Third task for this testidea

    TI My second test idea
    T First task for this testidea
    T Second task for this testidea
    ```
- This will generate 5 Subtasks in Jira
- Validate your input before generating via the `Check Input` Button

## Maintaining the app

This project is essentially a one time push and will not be actively maintained. If you want changes, you are free to clone a copy of this project and make changes accordingly.