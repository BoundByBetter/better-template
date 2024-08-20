# My Solution

# Solution Architecture


## Objectives
Below are the objectives that drove the design of this solution.

1. **Monorepo** - This repo should contain workspaces for all software needs to deploy an application:
  1. Mobile App (iOS and Android)
  2. Web App
  3. Web Site

1. **Universal App (Mobile, Web, and eventually TV)** - This app uses Expo to enable using a single code base to deploy mobile, web, and tv apps.

2. **Local First** - This app should be capable of running offline as well as online with realtime updates streaming to the app when updates are made in other apps.

3. **Container Based Development** - The development environment is setup to run in a Docker container.

4. **Scalable Development Model** - The solution is designed to support the deployment of multiple environments that would be useful for a team based development model.  This includes individual development environments, preview environments that can be used for external user testing, and a production environment.

5. **Concept to Cash** - While not achieved yet, ultimately the goal is to setup this repo as a starting point that provides a complete development pipeline for you.  Designed to handle standard flows for:
    1. Initial Environment Setup for Local Dev, Shared Preview, and Production
    2. Local, offline development, testing, and debugging
    2. Source Control Management <-- Not Added Yet
    2. Continuous Integration and Continuous Deployment <-- Not Added Yet
    3. Production Monitoring <-- Not Added Yet
    4. Collecting Payments <-- Not Added Yet


## Project Technologies

1. **IDE - VS Code** - The development environment was built assuming the user is using VS Code.  While we have avoided using VS Code specific flows (like using VS Code posts for development activities), we have not explicitly designed the code base or tested it to see if the flows work outside of VS Code.  Instructions on performing setup activities will assume you are working in VS Code.

2. **Containerization - Docker** - Used to enable setting up development environments across multiple platforms: Windows, Mac, or Linux.

3. **Source Code - Git** - Used for source control with remotes hosted on GitHub.

4. **Monorepo - Yarn Workspaces** - Used for manage aspects of working in a monorepo. 

5. **Code - TypeScript** - Used to provide type saftey.

6. **Development Framework - Expo** - Used to provide the universal app development model.

7. **Mobile Framework - React Native** - Foundation for mobile app development.

8. **Transpilation - Babel** - Used for transpiling typescript.

9. **Bundling - Metro** - Used for bundling the web and mobile app.

10. **Static Code Analysis - ESLint & Prettier** - 

11. **Mobile Builds and Deployments - EAS** - Expo's EAS services are used to build and deploy IOS and Andriod mobile apps.

12. **Backend, Web Hosting, & Offline Storage - Automerge** - Used for providing services for data syncing and backup.


# SETUP 
To run the vscode tasks: press cntrl/cmd + shift + p then type "run task" then select the task named in the step.


## SOURCE CODE REPOSITORY
Our approach for establishing the full development ecosystem for your solution starts first with setting up a repository to store you code.
1. [Setup GitHub Account.](https://github.com/)
2. Create a new repo using [this repo](https://github.com/boundbybetter/better-template) as the template.  At the top right of the repo in GitHub click the green 'Use this template' button and select 'Create a new repository'.


## DEVELOPMENT ENVIRONMENT SETUP

### INSTALL PREREQUISITES
1. [Install Docker](https://www.docker.com/get-started/)
2. [Install Visual Studio Code](https://code.visualstudio.com/download)

### PERSONALIZE SOLUTION
1. **Clone Repo** - Clone the repo you created
```
git clone <your repo url>
```
2. **Start IDE** - Open in Visual Studio.
```
cd better-template
code .
```
3. **Open In Container** - Open the workspace in a development container.  
```
Cntrl+Shift+P
"Reopen in Container"
```
4. **Install** - Install the project depdendencies using yarn.
```
yarn install
```
5. **Claim Project** - Run the claim-workspace.js script.  
    * **Argument 1: Solution Name** - This script updates all references from 'my' or 'My' to your solution name.  
    * **Argument 2: Company Slug** - This value will be cast to lower case and inserted into the app identifiers.  Ex. com.stewartarmbrecht.myapp.com.
    * **Argument 3: IP Address** - Sets your host maching IP address in the .env file in the root of the project.  This enables the expo dev build to connect to your metro server hosted in the container.
```
node ./tools/scripts/claim-project Better BoundByBetter 10.24.1.57 19001
```
6. **Rebuild Dev Container** - After you have 'claimed' the project rebuild the container.
```
Cntrl+Shift+P
"Rebuild Container"
```

## SETUP PROD BACKEND (AMPLIFY)

1. Create Amazon account if you don't already have one:  [Sign Up for AWS](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start/email)

2. Initialize Amplify
You need to initialize amplify to create some local files so that you can run the app.
Note: if amplify is not recognized as a command I have found that rebuilding the container will fix this.  Just press Cntrl+Shift+P and then type Rebuild Container and select the Dev Container command.
```
npx nx amplify-init <solutionName>-backend
```
* **Environment Name:** prod
* **Default Editor:** Visual Studio Code
* **Authentication:** AWS Profile
* **New User:** Yes
* **Region:** Your choice.
* **Amplify CLI User:** Click the link and follow the instructions to set a user that your Amplify CLI will use to connect to AWS.  Set a name that will help you identify the cli running in your dev container.  If you are connecting to a shared AWS account consider adding a name like:  mySolutionBackend-<userName>
* **accessKeyId:** Copied from access key created in instructions provided.
* **secretAccessKey:** Copied from access key created in instructions provided.
* **Profile Name:** (default)
* **Profile to Use:** default

3. Create amplify backend resources.
```
npx nx amplify-push <solutionName>-backend
```
  * **✔ Are you sure you want to continue? (Y/n):** Yes
  * **? Do you want to update code for your updated GraphQL API (Y/n):** No

## RUN LOCAL WEB APP

1. Run the app to verify the setup.
To run the app you need to export the ip address of your machine and set the port for the javascript bundle to the value you set above then start the app.  This command will start the app in web mode:

```
vscode task: metro
or
npx nx start my-app
w <- type 'w' to launch a browser and push metro through the first build.
```

## DEBUG LOCAL WEB APP
To debug the web app, just open the browser devTools.
Be sure to install the React Developer Tools and the Redux Developer Tools add ons to help debug the application.

## RUN UNIT TESTS
1. Run all unit tests and verify success.
```
vscode task: test
or
npx nx run-many -t test
```

## BUILD MOBILE DEVELOPMENT APP

1. Create an Expo Account:  [Expo Sign Up](https://expo.dev/signup)
2. Remove eas project id and updates URL.  In the app.config.js, comment out 'updates' and the 'extra.eas' sections so it looks like this:
```
  ...
  // updates: {
  //   url: 'https://u.expo.dev/0b1aa1f3-a7d9-4a39-8bfe-024107fcfbdb',
  // },
  ...
  extra: {
    // This is the project ID from the previous step
    // eas: {
    //   projectId: '0b1aa1f3-a7d9-4a39-8bfe-024107fcfbdb',
    // },
  },
  ...
``` 
2. Create a build:
```
vscode task: build-dev
or
npx nx build-dev my-app
```
* Email or username: [from the EAS account you created]
* Password: [Your EAS password]
* Select Platform: [Select the one you want]
* Would you like to automatically create an EAS project for @stewartoutlook/my-app? Y

You will get an error because the project uses dynamic app configuration.  Follow the instructions to update the app.config.js file with your expo.extra.eas.projectId property.
```
Warning: Your project uses dynamic app configuration, and the EAS project ID can't automatically be added to it.
https://docs.expo.dev/workflow/configuration/#dynamic-configuration-with-appconfigjs

To complete the setup process, set "extra.eas.projectId" in your app.config.js:

{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "[your id]"
      }
    }
  }
}
...
```
3. Edit app.config.js using the directions above.
While you are updating this file from the directions above.  You should also set the updates.url in the file.  
Change the guid in the url to match the value you set for your projectId above.
```
  updates: {
    url: "https://u.expo.dev/fbd799b8-ac94-42ee-83ff-194ce23b9a59"
  },
```
You should also update the owner to match your account:
```
owner: "stewartarmbrecht"
```
4. Rerun the build:
```
vscode task: build-dev
or
npx nx build-dev my-app
```
5. Install development build by scanning the QR Code


## BUILD MOBILE DEVELOPMENT DETOX ANDROID APP
This creates an local instance of the development APK for using Detox to test.
```
vscode task: build-dev-detox
or
npx nx build-dev-detox my-app
```

## RUN MOBILE E2E TESTS
1. Setup Genymotion account:  [Create Account](https://cloud.geny.io/)
2. Log into Genymotion SaaS using a token: [Create Token](https://docs.genymotion.com/saas/10_Public_HTTP_API/)  
```
gmsaas auth token
```
3. Run detox tests:
```
vscode task: test-e2e-mobile
or
npx nx test-e2e-mobile my-app-e2e
```

## RUN MOBILE DEVELOPMENT BUILD ON PHYSICAL DEVICE
After you have installed the development build.  Run the app:
```
vscode task: run
or
npx nx start my-app
```
Then scan the QR Code with your phone.  The app should be running on your phone.
If you have a problem with the preview app being loaded from the dev server QR code, then just enter the URL manually in the dev instance of the app.  The URL should be http://<your IP Address>:<The port you selected>

## RUN MOBILE DEVELOPMENT BUILD ON ANDROID EMULATOR
First you need to build a local instance of the android app:
```
vscode task: local-build-dev-android
or
npx nx local-build-dev-android my-app
```
Once you have built a local dev instance you can deploy it to your android emulator:
```
vscode task: run-android-geny
or
npx nx run-android-geny my-app
``` 

## DEBUG MOBILE APP

### Debugging Code
1. **Start App:**  Start the app use the instructions for Running the development build on a physical device above.
2. **Open Browswer:**  Open Edge or Chrome and enter ```edge://inspect``` or ```chrome://inspect```
3. **Set Network Targets:** Next to Discover network targets click configure and enter your host machines ip address and the port you started the development build on (ex. 19001)
4. **Inspect Hermes React Native:** Click the 'inspect' link under Hermes React Native shown under remote targets.
5. **Find Code:** To find the code hit Cntrl-P and type in the name of the code file.  
//TODO: Load the code into the workspace.
6. **Break Points**: Breakpoints did not work for me.  Instead I added ```debugger;``` into my code to break.
//TODO: Fix code mapping to breakpoints line up to code.
//TODO: Enable code debugging in VS Code.

### Inspecting UI and Performance Tracing (React Dev Tools)
1. **Start App Server:**  Start the app using ```npx nx start my-app```.
2. **Open App on Phone:**  Start the app on your phone.
2. **Open React Dev Tools:**  Hit Shift+M in the terminal where you started the app to open more tools options.  Select ```Open React devtools``` and then hit enter.  Enter yes to option to open the browser page.
3. **Reload the App:** Open the app on your phone.  The browser should then connect to your app and allow you to inspect the UI elements and take performance snapshots.


## DEPLOY MOBILE PREVIEW BUILD
The mobile preview build gives you an instance of the application that will run without the metro server running.  This instance will also accept updates via the preview channel.
1. Create a preview build:
```
vscode task: build-preview
or
npx nx build-preview my-app
```
2. Install Preview.  Scan the QR Code from running the last command and install the app on your phone.

## DEPLOY MOBILE PREVIEW UPDATE
The mobile preview update allows you to push changes to your preview users without having to re-install the app on the phone.
1. Update Main.tsx.  Update the Update number:
```
        <Text>
          v0.0.1 Update 002
        </Text>
```
1. Deploy update.
```
npx nx update-preview my-app
```
2. Test update.
Open and close the app on your phone 2 or more times and you should see the update.

## SETUP CI/CD - PRODUCTION WEB HOSTING AND MOBILE UPDATE DEPLOYMENT

### EAS Build Token
You need to create an EAS Robot token so that Amplify can trigger a build and deployment of your app.  For more information see this:  [Robot users and access tokens](https://docs.expo.dev/accounts/programmatic-access/#personal-access-tokens) 
**Add Robot:** Create a new robot on the ```https://expo.dev/accounts/**your account**/settings/access-tokens``` page.
  * **Name:** Your app name+ "-delpoyment".
  * **Role:** "Developer".
**Create Token:** Click the create token under the new robot you just created.
  * **Token name:** Your app name+"-deployment-token".
**SAVE TOKEN:** Make sure to save your token somewhere safe where you can access it later.

### Setup Prod Amplify Hosting
[AWS Amplify Hosting Guide](https://docs.amplify.aws/javascript/tools/cli/hosting/#using-aws-amplify-console)
```
npx nx amplify-add-hosting backend
```
**Select the plugin module to execute …** ❯ Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
**Choose a type** > Continuous deployment (Git-based deployments)
**Select Repo:** The last selection should launch a browser and take you to your app console.  Select Hosting Environment and then select your repo.  
**Select Branch:** Select your main or master branch.  Do NOT select the option that designated your repo as a monorepo.
**App Build and Test Settings:** Our setup uses an amplify.yaml file in the root of the report to handle the deployment.
  * **Repo:** Select your repo.
  * **Branch:** Select master.
  * **App Name:**  Select the backend we deployed earlier.
  * **Environment:** Select 'prod'.
  * **Service Role:** Select the one you created earlier.  //TODO: Update with when this was created.
  * **Advanced Settings:** Expand this section:
    * **Environment Variables:** Click add under the Environment Variables section and add the following variables:
      * **EXPO_TOKEN:**  Use the EAS robot token you created earlier.

Save and run the deployment.

### Setup Dev Amplify Hosting
1. In the amplify console, go to the 'Backend environments' tab.  
2. On the 'prod' environment click 'Actions' and the choose 'Clone'.
3. Enter 'dev' and click 'Clone'.
4. After the deployment of the new 'dev' environment is complete, go to the 'Hosting environments' tab.
5. Click 'Connect a branch' button.
    * **Branch:** dev
    * **App name:** Select the app we have been working with.
    * **Environment:** Select the branch we just created: 'dev'.  
6. To Develop using the dev environment run the following command:
```
npx nx amplify-pull-dev backend

? Select the authentication method you want to use: AWS profile
? Please choose the profile you want to use: default
? Which app are you working on? <your app id>
✔ Choose the type of app that you're building: javascript
? What javascript framework are you using: react-native
? Source Directory Path:  src
? Distribution Directory Path: /
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you plan on modifying this backend? Yes
```
Then switch to using that environment for development:
```
npx nx amplify-checkout-dev backend
```
Then switch to the dev branch in the repo and merge master into dev:
```
git checkout dev
git merge master
```

Save and run the deployment.


  

## ENABLE OFFLINE DEVELOPMENT
TBD...
### Amplify Local Dev Environment
TBD...


# DEVELOPMENT FLOW
In the code below, replace my-app with the name of your application.
To run the vscode tasks: press cntrl/cmd + shift + p then type "run task" then select the task named in the step.

## New Feature Development

The steps below assume that you have a physical Android device for development.  

Explanation of tags used in the Terminal commands:
* [project-file] = ./path/from/project/root/to/file.ext
* [solution-file] = ./path/from/solution/root/to/file.ext
* [project] = Project Name.  Ex: my-app, features, ui, etc.

### First Time
| V | Step                         | VS Code Task                               | Terminal                                  |
|---|------------------------------|--------------------------------------------|-------------------------------------------|
|   | Install Dependencies         | Install dependencies                       | npm install                               |
|   | Connect Mobile               | Connect mobile device                      | npx nx connect-mobile                     |
|   | Run Mobile                   | Build and run mobile                       | npx nx run-android my-app                 |
|   | Run Mobile Preview           | Build and run mobile (preview)             | npx nx run-android-preview my-app         |

### Every Development Session
| V | Step                         | VS Code Task                               | Terminal                                  |
|---|------------------------------|--------------------------------------------|-------------------------------------------|
|   | Connect Mobile               | Connect mobile device                      | npx nx connect-mobile                     |
|   | Start Server                 | Start mobile server (metro)                | npx nx start [project]                    |
|   | Start Web Test Studio        | Start web test studio (Cypress)            | npx nx start-web-test-studio [project]    |
|   | Start Mobile Test Studio     | Start mobile test studio (Maestro)         | npx nx start-mobile-test-studio [project] |
|   | Create E2E Tests             | Create e2e tests for project               | npx nx create-e2e-tests [project]         |
|   | Create Unit Test             | Create unit test                           | npx nx create-unit-test [project]         |
|   | Run Unit Test                | Test: Run test in current file             | N/A                                       |
|   | Run Web Test                 | Use Cypress Studio                         | N/A                                       |
|   | Run Mobile Test              | Run mobile tests in current file           | npx nx run test-mobile [solution-file]    |
|   | Deploy Preview Update        | Deploy preview update                      | npx nx run deploy-preview-update          |
|   | Run Mobile Test (preview)    | Run mobile tests in current file (preview) | npx nx run test-mobile-preview [project-file]|
|   | Run Proj Unit Tests          | Run unit tests for project                 | npx nx test [project]                     |
|   | Run Proj Unit Tests w Cover  | Run unit tests with coverage for project   | npx nx test-coverage [project]            |
|   | Run Proj Web Tests           | Run web tests for project                  | npx nx test-web [project]                 |
|   | Run Proj Mobile Tests        | Run mobile tests for project               | npx nx test-mobile [project]              |
|   | Run All Unit Tests           | Run all unit tests                         | npx nx run-many -t test                   |
|   | Run All Unit Tests w Cover   | Run all unit tests with coverage           | npx nx run-many -t test-coverage          |
|   | Run All Web Tests            | Run all web tests                          | npx nx run-many test-web                  |
|   | Run All Mobile Tests         | Run all mobile tests                       | npx nx run-many test-mobile               |
|   | Run All Mobile Tests Release | Run all mobile tests (preview)             | npx nx run-many test-mobile-preview       |

### Cloud Services
| V | Step                         | VS Code Task                               | Terminal                                  |
|---|------------------------------|--------------------------------------------|-------------------------------------------|
|   | View Amplify Project         | View Amplify project                       | npx nx run view-amplify-project           |
|   | View Expo.dev Project        | View Expo.dev project                      | npx nx run view-expodev-project           |
|   | View Github Project          | View Github project                        | npx nx run view-github-project            |
|   | View Discord                 | View Discord                               | npx nx run view-discord                   |

### Dependency Management
| V | Step                         | VS Code Task                               | Terminal                                  |
|---|------------------------------|--------------------------------------------|-------------------------------------------|
|   | Install Dependencies         | Install dependencies                       | npm install                               |
|   | Install New Dependencies     | Install new dependencies                   | npx nx install [project] dependency1,dep2 |
|   | Check Dependencies           | Check dependencies                         | npx nx deps-check                         |
|   | Sort Dependencies            | Sort dependencies                          | npx nx deps-sort                          |
|   | Migrate Nx                   | Migrate NX dependencies                    | npx nx migrate latest --run-migrations    |

### Additional Build Tasks
| V | Step                         | VS Code Task                               | NX Project & Task                         |
|---|------------------------------|--------------------------------------------|-------------------------------------------|
|   | Build Dev App Android Cloud  | build-dev-myapp-android-cloud              | |
|   | Build Dev App Cloud          | build-dev-myapp-android-cloud              | |
|   | Build Prev App Android Local | build-preview-myapp-android-local          | |
|   | Build Production App         |


1. **Start Expo**: This starts an instance of the metro bundler that listens on your hosts ip and port 19001.  This enables your physical device to connect using the debug build.  It also serves up the web app.
2. **Connect Android Device:**:  Connect to your Android device over wifi.
I have found that the most efficient testing is performed on a baseline Android device.  Either get a used Android phone or buy a cheap one off Amazon. I am using this one:  [UMIDIGI G3 Max](https://www.amazon.com/dp/B083DPKVRV?ref=ppx_yo2ov_dt_b_product_details&th=1). If you have not already built and deployed a dev version of your app see above.
3. **Open Cypress:** Use this interface to run your web E2E tests.  
4. **Open Maestro:** Use this interface to write steps for E2E mobile testing.
5. **Create E2E Tests:** Creates both a test.spec.ts file for Cypress plus a test.yaml file for Maestro.


3. **Write End-to-End (E2E) Web Test:** Write a cypress test that performs the new feature you want to build.  This test should be located in the 'my-app-e2e/cypress/e2e' folder.
4. **Verify E2E Web Test Fails:** Start the app and the Cypress test runner:
Navigate to the test spec you created in the Cypress interface from the "Open Cypress E2E Tester" step and run the spec you created.
Or if you do not want to use the Cypress interface you can run the following command in a new terminal:
```
vscode task: test-e2e-web-current-spec 
(make sure to view the spec file you want to run in the editor before running the task.)
or
npx nx test-e2e-web my-app-e2e --spec /path/to/your/test.cy.ts
```
5. **Write E2E Mobile Test:** Write a detox test that performs the new feature you want to build.  This test should be located in the 'my-app-e2e/detox' folder.  Use an AI to convert the test from cypress to detox.
6. **Verify E2E Mobile Test Fails:** Run the new E2E test you wrote for mobile.
In a new terminal run the following command.  This assumes you have already built your detox android apk in the setup.  It will launch an instance of android in the cloud, deploy your app to the device, then run your test.
```
vscode task: test-e2e-mobile-current-spec 
(make sure to view the spec file you want to run in the editor before running the task.)
or
npx nx test-e2e-mobile my-app-e2e /path/to/your/test.spec.ts
```
7. **Write Unit Test:** Write a unit test that requires the new code you need to write.  Create a .test.ts or .test.tsx file that has the name of the function you need to write.  Stub the actual code file so that your test compiles.
8. **Verify Unit Test Fails:** Run your unit test and verify it fails:
```
Cntrl/Cmd+Shift+P
Test: Run Test at Cursor
```
9. **Write Code and Rerun:** Write your code and rerun the unit tests until they pass.
```
Cntrl/Cmd+Shift+P
Test: Run Tests in Current File
```
10. **Verify in Web App:** Manually verify your new feature in the web browser that you started in the first step.
11. **Verify in Mobile App:** Manually verify your new feature in the dev app on your mobile device connected to the metro service you started in the "Start the App for Web and Mobile" step (first step).
12. **Verify Unit Test Passes:** If you need to debug a test:
```
Cntrl/Cmd+Shift+P
Test: Debug Test at Cursor
```
13. **Verify E2E Web Test Passes:** Rerun your test that you created through the Cypress UI or via the CLI using the command listed in Verify E2E Web Test Fails step.
14. **Verify E2E Mobile Test Passes:** Rerun your test that you created via the CLI using the command listed in Verify E2E Mobile Test Fails step.
15. **Debug Web App:** Set breakpoints in the browser devtools and execute your feature in the app.
Once the app is started.  Open the dev tools.  In the sources tab you can find files using Cmd/Cntrl+Shift+P and typing the file name.  You can also set breakpoints.  Install the redux tools as well as the React Native tools and you can inspect redux, the UI elements, and the UI performance.
16. **Debug Mobile App:** Set breakpoints in VSCode and execute your feature in the mobile app.
//TODO: Add steps and commands.

17. **Run All Unit Tests:** Run all unit tests to verify all are still passing:
```
vscode task: test
or
npx nx run-many -t test
```
Alternatively, you can run all unit tests in a single project (ex. my-app) using:
```
vscode task: test-my-app
(Replace my-app with the name of the project:  backend, features, shared, or state)
or
npx nx test my-app
```
18. **Verify 100% Unit Test Code Coverage:** After you completed building your feature and have all tests passing, verify you have 100% code coverage.
```
vscode task: test-coverage
or
npx nx run-many -t test-coverage
```
Alternatively, you can check code coverage for a single project (ex. my-app) using:
```
vscode task: test-coverage-my-app
(Replace my-app with the name of the project:  backend, features, shared, or state)
or
npx nx test-coverage my-app
```
19. **Run All E2E Web Tests:** Run all the cypress tests to verify the web app is working.
```
vscode task: test-e2e-web
or
npx nx test-e2e-web my-app-e2e
```
20. **Run All e2e Mobile Tests:** Run all the detox tests to verify the mobile app is working.
```
vscode task: test-e2e-mobile
or
npx nx test-e2e-mobile my-app-e2e
```

## Adding Dependencies
1. **Check If Package Versions Are Outdated:** Check if your install dependencies are outdated.
```
vscode task: check-dependencies
or
npx npm-check-updates
```
1. **Upgrading Individual NPM Depencies:** Execute npm install from the root of the solution.
```
npm install expo@latest
```
2. **Upgradeing All NPM Dependencies:** Upgrade all dependencies to their latest version.
```
npx npm-check-updates -u
```
2. **Install Expo Modules:** Use the following command to install expo modules in your app project:
```
npx nx install my-app package1,package2,package3
```
3. **Upgrade/Correct Expo Modules:** Use the following command to install expo modules in your app project:
```
npx nx install my-app --fix
```
4. **Sort Package Dependencies:** Use the following command to sort the dependencies in a package.json
```
cd to-directory-with-package-json
npx sort-package-json
```
5. **Build Android Mobile App Locally:** You can build the android version of the app and run it in genymotion to check that the mobile app compiles and can run on a device.
```
npx nx build-local-dev-android my-app
```
6. **Run Android Mobile App in Genymotion:** After you have built a new version of the app, you can launch an emulator in genymotion and deploy the build using the following commands:
```
```
7. **Build Android and IOS Using EAS:** If you install modules that require updating the development build that is deployed to devices:
```
npx nx build-dev my-app
```
After you run the build, you will need to scan the QR code on all devices to update your development build.
8. **Install EAS Build on Device:** 


# OTHER NOTES
## Slow Http Connections
If you are experiencing slow initial connections from the host or external device to your metro bundler just change the nameserver lines in /etc/resolv.conf to:
```
nameserver 8.8.8.8
nameserver 8.8.4.4
```
https://stackoverflow.com/questions/41923522/why-is-network-internet-in-my-docker-container-so-slow