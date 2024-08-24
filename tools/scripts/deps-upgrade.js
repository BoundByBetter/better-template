const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get the list of dependencies to check and upgrade from command-line arguments
const dependenciesToCheck = process.argv.slice(2);

if (dependenciesToCheck.length === 0) {
  console.error(
    'Please provide one or more dependencies to check and upgrade.',
  );
  process.exit(1);
}

// Path to the root package.json file
const packageJsonPath = path.resolve('package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get the list of workspaces from the package.json file
const workspaces = packageJson.workspaces;

if (!workspaces) {
  console.error('No workspaces found in package.json.');
  process.exit(1);
}

// Resolve workspace paths using glob patterns
const workspacePaths = workspaces.flatMap((workspacePattern) =>
  glob.sync(workspacePattern),
);

// Function to check and upgrade dependencies in a given package.json path
const checkAndUpgradeDependencies = (packageJsonPath, workspaceName) => {
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    dependenciesToCheck.forEach((dependencyWithVersion) => {
      const [dependency, version] = dependencyWithVersion.split('@');
      if (dependencies[dependency] || devDependencies[dependency]) {
        const installCommand = version
          ? `${dependency}@${version}`
          : dependency;
        console.log(
          `Upgrading ${dependency} in ${workspaceName} to version ${version || 'latest'} using expo install...`,
        );
        execSync(`npx expo install ${installCommand}`, {
          stdio: 'inherit',
          cwd: path.dirname(packageJsonPath), // Set the working directory to the workspace
        });
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
