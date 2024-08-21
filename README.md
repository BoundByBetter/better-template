# BETTER TEMPLATE
This project provides a template for developing universal apps that run on mobile and web with a common code base.

## OBJECTIVES
Below are the objectives that drove the design of this solution.

1. **Universal Access (Mobile, Web, and eventually TV)** - Uses Expo to enable using a single code base to deploy mobile, web, and tv apps.

2. **Concept to Cash** - While not achieved yet, ultimately the goal is to setup this repo as a starting point that provides a complete development pipeline for you.  Designed to handle standard flows for:
    1. Initial Environment Setup for Local Dev, Shared Preview, and Production
    2. Local, offline development, testing, and debugging
    2. Source Control Management Procedures <-- Not Added Yet
    2. Continuous Integration and Deployment <-- Not Added Yet
    3. Production Monitoring <-- Not Added Yet
    4. Collecting Payments <-- Not Added Yet

3. **Low Cost Initiation** - Focused on selecting technologies and platforms that provide a low barrier to entry by providing services that start free and scale with your usage.  We also focus on 

4. **Low Maintenance Production** - Focused on technologies and platforms that reduce the overhead for maintaining your production environment (code first development, simplified deployment, auto scaling, monitoring, etc.).

5. **Local First** - Design follows the principals of [localfirst development](https://localfirstweb.dev/).

6. **Container Based Development** - Development environment is setup to run in a Docker container.

7. **Trunk Based Development** - Minimize the complexity of deployment by reducing the number of steps required to push a code change into production.  Leverages feature flags to help manage risk. 

## TECHNOLOGIES

1. **IDE - VS Code** - The development environment was built assuming the user is using VS Code.  While we have avoided using VS Code specific flows (like using VS Code posts for development activities), we have not explicitly designed the code base or tested it to see if the flows work outside of VS Code.  Instructions on performing setup activities will assume you are working in VS Code.

2. **Dev Container - Docker** - Used to enable setting up development environments across multiple platforms: Windows, Mac, or Linux.

3. **Dev OS - Debian** - Used as the OS for the development machine.

4. **Source Code - Git** - Used for source control with remotes hosted on GitHub.

5. **Project Structure - Yarn Workspaces** - Used for separating code into packages shared between apps. 

6. **Code - TypeScript** - Used to provide type saftey.

7. **Development Framework - Expo** - Used to provide the universal app development model.

8. **Mobile Framework - React Native** - Foundation for mobile app development.

9. **Transpilation - Babel** - Used for transpiling typescript.

10. **Bundling - Metro** - Used for bundling the web and mobile app.

11. **Static Code Analysis - ESLint & Prettier** - Used for code formatting and checking.

12. **State Management - Redux** - Used for managing state. (Still need to figure out integration between Redux and Automerge.)

13. **Data Syncing - Automerge** - Used for providing services for data syncing and backup.

14. **UI Design System - Tamagui** - Used to provide a common design system across both mobile and web.  Also provides a component library.

15. **Layout and Navigation - Expo Router** - Used to layout and navigation in the apps.

16. **Unit Testing - Jest** - Runs unit tests using @testing-library/react-native api for testing components.

17. **E2E Testing Web - Cypress** - Develop and run automated tests for the web interface.

18. **E2E Testing Mobile - Maestro** - Develop and run automated tests for mobile.

19. **Continuous Integration and Deployment - GitHub Actions** - Triggers builds, tests, and deployment from commits.

20. **Mobile Builds and Deployments - EAS** - Expo's EAS services are used to build and deploy IOS and Andriod mobile apps.

21. **Web Site Hosting - Netlify** - Hosts the product marketing, documentation, blog and end user support site.


## PROJECT STRUCTURE
This repo will contain workspaces for all software solutions needed to deploy an application.  This includes:
  
  1. **apps/app** - The product you plan to sell.  Built for iOS, Android, and web using Expo.  Contains components to control layout and navigation.
  
  2. **apps/admin** - Used to manage the product.  Includes turning on and off features, managing users and apps, monitoring application usage, etc. Also uses Expo.
  
  3. **apps/site** - Provides product marketing pages, a blog, and functionality for providing user support.  Uses Expo.
  
  4. **packages/features** - Includes all screens and data driven components used by the apps.
  
  5. **packages/state** - Includes all classes and functions for managing state used by the screens and components.  The goal is to have all state used by each app in a single state tree for that app with slices shared between apps.  Uses redux.
  
  6. **packages/shared** - Includes all common types and utilities shared between the apps, features, and state packages.
  
  7. **packages/ui** - Includes all basic components used to build the screens and components.  Also includes a design system from tamagui.

## SETUP 
Below outlines the steps to take for setting up various enviroments and services used by the solution.

### SOURCE CODE SETUP (GitHub)
Our approach for establishing the full development ecosystem for your solution starts first with setting up a repository to store you code.
1. [Setup GitHub Account.](https://github.com/)
2. Create a new repo using [this repo](https://github.com/boundbybetter/better-template) as the template.  At the top right of the repo in GitHub click the green 'Use this template' button and select 'Create a new repository'.


### DEVELOPMENT MACHINE SETUP (Docker, VS Code)

1. [Install Docker](https://www.docker.com/get-started/)
2. [Install Visual Studio Code](https://code.visualstudio.com/download)

### SOLUTION BRANDING (Code Find & Replace)
1. **Clone Repo** - Clone the repo you created
```
git clone <your repo url>
```
2. **Start IDE** - Open in Visual Studio.
```
cd better-template # Replace with your repo name.
code .
```
3. **Open In Container** - Open the workspace in a development container.  
```
# Cntrl+Shift+P
# "Reopen in Container"
```
4. **Install** - Install the project depdendencies using yarn.
```
yarn install
```
5. **Claim Project** - Run the claim-workspace.js script.  
    * **Argument 1: Solution Name** - This script updates all references from 'better' or 'Better' to your solution name.  
    * **Argument 2: Company Slug** - This value will be cast to lower case and inserted into the app identifiers.  Ex. com.boundbybetter.betterapp.com.
```
node ./tools/scripts/claim-project YourSolutionName YourCompanySlug
```

### BACKEND SETUP (TBD)
TBD. Still working on a design for the back-end.  Waiting for Automerge team to provide a recommended solution for hosting a production caliber sync server.

### SITE HOSTING SETUP (Netlify)
...need to document Netlify setup for hosting the product site (marketing, docs, end user support, etc.)

### AUTHENTICATION SETUP (Google, Microsoft, Facebook)
TBD.  Targeting using standard services like Google, Microsoft, and Facebook for authentication.  Authorization will be managed in the Admin app and will focus on admin authorization only.  All else should be user level security.

### MOBILE DEPLOYMENT SETUP (Expo EAS)
...need to document steps for creating an Expo account and setting up a project for creating and deploying mobile builds and updates.

## DEVELOPMENT FLOW (Still developing...)
All development commands are defined as VS code tasks in the .vscode/tasks.json file.  Some listed below might not be built yet.
1. **Install Dependencies** - just runs yarn install.  Included for completeness.
2. **Check Dependencies** - Uses npm-check-updates and expo install --check to help identify available updates.  Beware, npm-check-updates will return updates that you should not install because of Expo.
3. **Update Dependencies** - Runs 
4. Compile - Runs all 
5. Build and Watch
6. Lint
7. Lint and Watch
8. Test
9. Test and Watch <- Not needed, VS Code Jest plugin configured to automatically run tests while you code.
10. Test with Coverage
11. View Coverage