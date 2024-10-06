## Dependencies

Prefix: 'Dependencies:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| Install                                                         | Runs yarn install to install all dependencies. Included for completeness. |
| Check                                                           | Uses npm-check-updates and expo install --check to help identify available updates. Beware, npm-check-updates will return updates that you should not install because of Expo. |
| Fix                                                             | Uses expo to update mismatched dependencies across all projects. |
| Add dev                                                         | Uses expo to add new dev dependencies to a workspace. |
| Add                                                             | Uses expo to add new dependencies to a workspace. |
| Upgrade                                                         | Upgrades the specified dependency in the root and each workspace where it exists |

## Code

Prefix: 'Code:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| Lint                                                            | Lints all ts, tsx, js, and jsx files. |
| Lint and watch                                                  | Lints all ts, tsx, js, and jsx files on change. |
| Compile                                                         | Compiles all ts, tsx, js, and jsx files. |
| Compile Clean                                                   | Compiles all ts, tsx, js, and jsx files with the --clean flag. |
| Compile and watch                                               | Compiles all ts, tsx, js, and jsx files on change. |

## Mobile

Prefix: 'Mobile:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| List Android devices                                            | Lists all android devices connected to the computer. |
| Switch Android device to wireless                               | Switches the android device to using a tcpip connection. |
| Connect to Android device wirelessly                            | Connects to the android device wirelessly. |
| Disconnect from Android device                                  | Disconnects the named android device. |
| Build app for Android with EAS locally                          | Builds the selected app for android for the selected profile. |
| Install EAS locally built APK                                   | Installs the selected app for android for the selected profile. |
| Build and install Android app using Expo                        | Starts the app for android. |

## Testing

Prefix: 'Testing:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| Run all tests                                                   | Runs all tests in the project. Use the jest runner when you want to watch. |
| Run all tests with coverage                                     | Starts the app using yarn start:app:web command. |
| Run workspace tests                                             | Runs all unit tests in the selected workspace. |
| Run workspace tests with coverage                               | Runs all unit tests in the selected workspace. |
| View code coverage                                              | Serves the code coverage report using npx serve. |

## Development

Prefix: 'Dev:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| Start dev server for web                                        | Starts metro bundler for the web app you specify. |
| Export and serve a web app                                      | Exports and serves the web app you specify. |
| Start dev server for Android app                                | Starts the selected app for android. |
| Start dev server for Sync                                       | Starts the sync server. |

## E2E Web

Prefix: 'E2E Web:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| Open Cypress for E2E test development                           | Opens cypress for developing e2e tests for the app you specify. |
| Start Dev Server and Open Cypress for E2E test development      | Starts the dev server for the app you specify and opens cypress for e2e test development. |
| Export and Serve App and Run Cypress E2E tests                  | Exports and serves the app you specify and runs the e2e tests. |
| Run all tests                                                   | Exports and serves each web app and then runs the e2e tests. |

## E2E Mobile

Prefix: 'E2E Mobile:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| Run for selected app                                            | Starts the app you specify and runs the e2e tests. |
| Run all tests                                                   | Starts the app you specify and runs the e2e tests. |
| Build, Install, and Run all tests                               | Builds the app you specify, installs it, and runs the e2e tests. |

## Pipeline

Prefix: 'Pipeline:'

| Task Label                                                      | Description |
|-----------------------------------------------------------------|-------------|
| Pre-Commit                                                      | Runs the pre-commit pipeline. |
