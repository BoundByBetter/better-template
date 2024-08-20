require('dotenv').config();
const shell = require('shelljs');

const solutionName = process.argv[2];
const companySlug = process.argv[3];
const ipAddress = process.argv[4];
const port = process.argv[5];

//const cmdPush = 'npx renamer --dry-run --find my- --replace ' + process.argv[2] + '- **/*';
const cmdPush = './tools/scripts/claim-project.sh ' + solutionName;

shell.exec('chmod +x ./tools/scripts/claim-project.sh');

if (shell.exec(cmdPush).code !== 0) {
  shell.echo('Error replacing file and directory names.');
  shell.exit(1);
}

const replace = require('replace-in-file');
let options = {
  files: [
    '**/*',
    '.gitignore',
    '.easignore',
    '.devcontainer/devcontainer.json',
    '.vscode/launch.json',
    '**/.config/project-config.json',
  ],
  from: /my/g,
  to: solutionName.toLowerCase(),
  ignore: '**/package-lock.json',
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log(
    `Replacment solutionName results "my" to "${solutionName.toLowerCase()}":`,
    results.filter((result) => result.hasChanged).map((result) => result.file),
  );
} catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: [
    '**/*',
    '.gitignore',
    '.easignore',
    '.devcontainer/devcontainer.json',
    '.vscode/launch.json',
    '**/.config/project-config.json',
  ],
  from: /My/g,
  to: solutionName,
  ignore: '**/package-lock.json',
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log(
    `Replacement solutionName results "My" to "${solutionName}":`,
    results.filter((result) => result.hasChanged).map((result) => result.file),
  );
} catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: [
    '**/*',
    '.gitignore',
    '.easignore',
    '.devcontainer/devcontainer.json',
    '.vscode/launch.json',
    '**/.config/project-config.json',
  ],
  from: /stewartarmbrecht/g,
  to: companySlug.toLowerCase(),
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log(
    `Replacement companySlug results "stewartarmbrecht" to "${companySlug}":`,
    results.filter((result) => result.hasChanged).map((result) => result.file),
  );
} catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: [
    '**/*',
    '.gitignore',
    '.easignore',
    '.devcontainer/devcontainer.json',
    '.vscode/launch.json',
    '**/.config/project-config.json',
  ],
  from: /10\.24\.1\.57/g,
  to: ipAddress.toLowerCase(),
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log(
    `Replacement port ipAddress "10.24.1.57" to "${ipAddress.toLowerCase()}":`,
    results.filter((result) => result.hasChanged).map((result) => result.file),
  );
} catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: [
    '**/*',
    '.gitignore',
    '.easignore',
    '.devcontainer/devcontainer.json',
    '.vscode/launch.json',
    '**/.config/project-config.json',
  ],
  from: /19001/g,
  to: port.toLowerCase(),
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log(
    `Replacement port results "19001" to "${port}":`,
    results.filter((result) => result.hasChanged).map((result) => result.file),
  );
} catch (error) {
  console.error('Error occurred:', error);
}
