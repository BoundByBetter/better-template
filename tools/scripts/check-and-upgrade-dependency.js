const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const dependenciesToCheck = process.argv.slice(2);

if (dependenciesToCheck.length === 0) {
  console.error(
    'Please provide one or more dependencies to check and upgrade.',
  );
  process.exit(1);
}

const packageJsonPath = path.resolve('package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const workspaces = packageJson.workspaces;

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
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    dependenciesToCheck.forEach((dependencyWithVersion) => {
      const [dependency, version] = dependencyWithVersion.split('@');
      if (dependencies[dependency] || devDependencies[dependency]) {
        const upgradeCommand = version
          ? `${dependency}@${version}`
          : dependency;
        console.log(
          `Upgrading ${dependency} in ${workspaceName} to version ${version || 'latest'}...`,
        );
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
