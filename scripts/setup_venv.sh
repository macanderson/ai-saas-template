#!/bin/bash
set -e

# Get the root directory of the project
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Create Python virtual environment for the API if it does not exist
if [ ! -d "$ROOT_DIR/apps/api/.venv" ]; then
  python3 -m venv "$ROOT_DIR/apps/api/.venv"
  echo "Created Python virtual environment at $ROOT_DIR/apps/api/.venv"
fi
