const { execSync } = require('child_process');

const dependencies = process.argv[2];

if (!dependencies) {
  console.error('Please provide dependencies to install.');
  process.exit(1);
}

execSync(`npx expo install ${dependencies} -- --dev`, { stdio: 'inherit' });
