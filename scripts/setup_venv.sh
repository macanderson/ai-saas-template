#!/bin/bash
set -e

# Create Python virtual environment for the API if it does not exist
if [ ! -d "apps/api/.venv" ]; then
  python3 -m venv apps/api/.venv
  echo "Created Python virtual environment at apps/api/.venv" 
fi

