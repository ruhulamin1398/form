#!/bin/bash

# Start the client in the current terminal
cd client || exit
gnome-terminal --tab --title="Client" -- bash -c "npm run dev; exec bash"

# Open a new terminal tab and start the server
gnome-terminal --tab --title="Server" -- bash -c "
  cd ../Server || exit;
  npm run dev;
  exec bash
"
