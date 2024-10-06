#!/bin/bash

# Function to kill process using port 8081
kill_port_8081() {
  PORT_PID=$(lsof -t -i:8081)
  if [ -n "$PORT_PID" ]; then
    kill -9 $PORT_PID
    echo "Process using port 8081 (PID: $PORT_PID) terminated."
  else
    echo "No process using port 8081."
  fi
}

# Kill any process using port 8081
kill_port_8081

# Export the app
EXPO_USE_METRO_WORKSPACE_ROOT=1 npx expo export --platform web

# Serve the app in the background
npx serve -s dist -p 8081 &

# Store the Expo process ID
EXPO_PID=$!

# Wait for Expo to start (adjust the sleep duration as needed)
# sleep 45

# Run the tests
yarn cypress run --config-file e2e/cypress.config.ts

# Check if the Expo process is still running and kill it
if ps -p $EXPO_PID > /dev/null
then
   kill $EXPO_PID
   echo "Expo process $EXPO_PID terminated."
else
   echo "Expo process $EXPO_PID not found."
fi

# Kill any process using port 8081 again to ensure cleanup
kill_port_8081