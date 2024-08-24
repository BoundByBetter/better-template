const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get the dependencies to check and upgrade from command line arguments
const dependenciesToCheck = process.argv.slice(2);

// Check if any dependencies were provided
if (dependenciesToCheck.length === 0) {
  console.error(
    'Please provide one or more dependencies to check and upgrade.',
  );
  process.exit(1);
}

// Get the path to the package.json file
const packageJsonPath = path.resolve('package.json');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get the workspaces from package.json
const workspaces = packageJson.workspaces;

// Check if workspaces are defined
if (!workspaces) {
  console.error('No workspaces found in package.json.');
  process.exit(1);
}

// Resolve workspace paths using glob
const workspacePaths = workspaces.flatMap((workspacePattern) =>
  glob.sync(workspacePattern),
);

// Function to check and upgrade dependencies in a given package.json path
const checkAndUpgradeDependencies = (packageJsonPath, workspaceName) => {
  // Check if the package.json file exists
  if (fs.existsSync(packageJsonPath)) {
    // Read the package.json file
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    // Iterate over the dependencies to check and upgrade
    dependenciesToCheck.forEach((dependencyWithVersion) => {
      const [dependency, version] = dependencyWithVersion.split('@');
      // Check if the dependency exists in either dependencies or devDependencies
      if (dependencies[dependency] || devDependencies[dependency]) {
        const upgradeCommand = version
          ? `${dependency}@${version}`
          : dependency;
        console.log(
          `Upgrading ${dependency} in ${workspaceName} to version ${version || 'latest'}...`,
        );
        // Execute the upgrade command using yarn
        execSync(`yarn upgrade ${upgradeCommand}`, { stdio: 'inherit' });
      } else {
        console.log(`${dependency} not found in ${workspaceName}.`);
      }
    });
  } else {
    console.log(`package.json not found in ${workspaceName}.`);
  }
};

// Check and upgrade dependencies in the root package
checkAndUpgradeDependencies(packageJsonPath, 'root');

// Check and upgrade dependencies in each workspace
workspacePaths.forEach((workspacePath) => {
  const workspacePackageJsonPath = path.resolve(workspacePath, 'package.json');
  checkAndUpgradeDependencies(workspacePackageJsonPath, workspacePath);
});
