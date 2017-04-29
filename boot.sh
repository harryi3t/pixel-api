#!/bin/bash -e

cd /home/harry/pixel-api

echo forever is watching file changes
forever -w -v --minUptime 1000 --spinSleepTime 1000 server.js
