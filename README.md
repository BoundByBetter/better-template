# BETTER TEMPLATE
This project provides a template for developing universal apps that run on mobile and web with a common code base.

## OBJECTIVES
Below are the objectives that drove the design of this solution.

<table>
  <tr><th>OBJECTIVE</th><th>DESCRIPTION</th></tr>
  <tr>
    <td><strong>Universal Access (Mobile, Web, and eventually TV)</strong></td>
    <td>Uses Expo to enable using a single code base to deploy mobile, web, and tv apps.</td>
  </tr>
  <tr>
    <td><strong>Concept to Cash</strong></td>
    <td>While not achieved yet, ultimately the goal is to setup this repo as a starting point that provides a complete development pipeline for you. Designed to handle standard flows for:
      <ol>
        <li>Initial Environment Setup for Local Dev, Shared Preview, and Production</li>
        <li>Local, offline development, testing, and debugging</li>
        <li>Source Control Management Procedures &lt;-- Not Added Yet</li>
        <li>Continuous Integration and Deployment &lt;-- Not Added Yet</li>
        <li>Production Monitoring &lt;-- Not Added Yet</li>
        <li>Collecting Payments &lt;-- Not Added Yet</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td><strong>Low Cost Initiation</strong></td>
    <td>Focused on selecting technologies and platforms that provide a low barrier to entry by providing services that start free and scale with your usage.</td>
  </tr>
  <tr>
    <td><strong>Low Maintenance Production</strong></td>
    <td>Focused on technologies and platforms that reduce the overhead for maintaining your production environment (code first development, simplified deployment, auto scaling, monitoring, etc.).</td>
  </tr>
  <tr>
    <td><strong>Local First</strong></td>
    <td>Design follows the principals of <a href="https://localfirstweb.dev/">localfirst development</a>.</td>
  </tr>
  <tr>
    <td><strong>Container Based Development</strong></td>
    <td>Development environment is setup to run in a Docker container.</td>
  </tr>
  <tr>
    <td><strong>Trunk Based Development</strong></td>
    <td>Minimize the complexity of deployment by reducing the number of steps required to push a code change into production. Leverages feature flags to help manage risk.</td>
  </tr>
</table>

## TECHNOLOGIES

| TYPE | TECHNOLOGY | DESCRIPTION |
|-|-|-|
| **IDE** | **VS Code** | The development environment was built assuming the user is using VS Code.  While we have avoided using VS Code specific flows (like using VS Code posts for development activities), we have not explicitly designed the code base or tested it to see if the flows work outside of VS Code.  Instructions on performing setup activities will assume you are working in VS Code. |
| **Dev Container** | **Docker** | Used to enable setting up development environments across multiple platforms: Windows, Mac, or Linux. |
| **Dev OS** | **Debian** | Used as the OS for the development machine. |
| **Source Code** | **Git** | Used for source control with remotes hosted on GitHub. |
| **Project Structure** | **Yarn Workspaces** | Used for separating code into packages shared between apps. |
| **Code** | **TypeScript** | Used to provide type saftey. |
| **Development Framework** | **Expo** | Used to provide the universal app development model. |
| **Mobile Framework** | **React Native** | Foundation for mobile app development. |
| **Transpilation** | **Babel** | Used for transpiling typescript. |
| **Bundling** | **Metro** | Used for bundling the web and mobile app. |
| **Static Code Analysis** | **ESLint & Prettier** | Used for code formatting and checking. |
| **State Management** | **Redux** | Used for managing state. (Still need to figure out integration between Redux and Automerge.) |
| **Data Syncing** | **Automerge** | Used for providing services for data syncing and backup. |
| **UI Design System** | **Tamagui** | Used to provide a common design system across both mobile and web.  Also provides a component library. |
| **Layout and Navigation** | **Expo Router** | Used to layout and navigation in the apps. |
| **Unit Testing** | **Jest** | Runs unit tests using @testing-library/react-native api for testing components. |
| **E2E Testing Web** | **Cypress** | Develop and run automated tests for the web interface. |
| **E2E Testing Mobile** | **Maestro** | Develop and run automated tests for mobile. |
| **Continuous Integration and Deployment** | **GitHub Actions** | Triggers builds, tests, and deployment from commits. |
| **Mobile Builds and Deployments** | **EAS** | Expo's EAS services are used to build and deploy IOS and Andriod mobile apps. |
| **Web Site Hosting** | **Netlify** | Hosts the product marketing, documentation, blog and end user support site. |


## PROJECT STRUCTURE
This repo will contain workspaces for all software solutions needed to deploy an application.  This includes:

| FOLDER | DESCRIPTION |
|-|-|
| **apps/app** | The product you plan to sell.  Built for iOS, Android, and web using Expo.  Contains components to control layout and navigation. |
| **apps/admin** | Used to manage the product.  Includes turning on and off features, managing users and apps, monitoring application usage, etc. Also uses Expo. |
| **apps/site** | Provides product marketing pages, a blog, and functionality for providing user support.  Uses Expo. |
| **packages/features** | Includes all screens and data driven components used by the apps. |
| **packages/state** | Includes all classes and functions for managing state used by the screens and components.  The goal is to have all state used by each app in a single state tree for that app with slices shared between apps.  Uses redux. |
| **packages/shared** | Includes all common types and utilities shared between the apps, features, and state packages. |
| **packages/ui** | Includes all basic components used to build the screens and components.  Also includes a design system from tamagui. |

## SETUP 
Below outlines details for setting all environments.

1. [Hardware and OS Setup](./docs/setup/hardware-os.md)
1. [Source Code Setup](./docs/setup/source-code.md)
1. [Dev Machine Setup](./docs/setup/dev-machine.md)
1. [Docker Setup](./docs/setup/docker.md)
1. [Mobile Setup](./docs/setup/mobile.md)
1. [Solution Branding](./docs/setup/solution-branding.md)
1. [Backend Setup](./docs/setup/backend.md)
1. [Site Hosting Setup](./docs/setup/site-hosting.md)
1. [Identity Providers Setup](./docs/setup/identity-providers.md)
1. [Mobile Deployment Setup](./docs/setup/mobile-deployment.md)


## DEVELOPMENT FLOW

All development commands are defined as VS code tasks in the [Tasks.json](.vscode/tasks.json) file.

