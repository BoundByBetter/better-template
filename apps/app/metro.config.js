/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Only list the packages within your monorepo that your app uses. No need to add anything else.
// If your monorepo tooling can give you the list of monorepo workspaces linked
// in your app workspace, you can automate this list instead of hardcoding them.
const monorepoPackages = {
  '@boundbybetter/auth': path.resolve(monorepoRoot, 'packages/auth'),
  '@boundbybetter/features': path.resolve(monorepoRoot, 'packages/features'),
  '@boundbybetter/state': path.resolve(monorepoRoot, 'packages/state'),
  '@boundbybetter/shared': path.resolve(monorepoRoot, 'packages/shared'),
  '@boundbybetter/ui': path.resolve(monorepoRoot, 'packages/ui'),
};

// 1. Watch the local app directory, and only the shared packages (limiting the scope and speeding it up)
// Note how we change this from `monorepoRoot` to `projectRoot`. This is part of the optimization!
config.watchFolders = [projectRoot, ...Object.values(monorepoPackages)];

// Add the monorepo workspaces as `extraNodeModules` to Metro.
// If your monorepo tooling creates workspace symlinks in the `node_modules` directory,
// you can either add symlink support to Metro or set the `extraNodeModules` to avoid the symlinks.
// See: https://metrobundler.dev/docs/configuration/#extranodemodules
config.resolver.extraNodeModules = monorepoPackages;

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// 3. Add configuration to handle SVG files
config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer',
);
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'mjs'];

// Setup metro caching.

const { FileStore } = require('metro-cache');
config.cacheStores = [
  new FileStore({
    root: path.join(projectRoot, 'node_modules', '.cache', 'metro'),
  }),
];

// config.transformer.enableBabelRCLookup = false;
// config.transformer.enableBabelRuntime = false;

module.exports = config;
