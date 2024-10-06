#!/bin/bash

# Run linting
yarn code:lint-all

# Run type checking
yarn code:compile-all

# Run unit tests with coverage
yarn test:cover-all

# Build, export, and run E2E web tests
yarn e2e:web

# Build, Install and Run E2E mobile tests on the preview build
yarn e2e:mobile
