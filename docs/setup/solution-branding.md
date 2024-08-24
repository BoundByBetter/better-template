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

