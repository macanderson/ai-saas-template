#!/bin/bash
set -e

# Get the root directory of the project
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Install Node dependencies
cd "$ROOT_DIR" && pnpm install

# Set up Python virtual environment
bash "$SCRIPT_DIR/setup_venv.sh"
source "$ROOT_DIR/apps/api/.venv/bin/activate"

# Install Python dependencies for API
pip install -r "$ROOT_DIR/apps/api/requirements.txt"

echo "Python virtual environment ready at $ROOT_DIR/apps/api/.venv"
