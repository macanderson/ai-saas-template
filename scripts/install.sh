#!/bin/bash
set -e

# Install Node dependencies
pnpm install

# Set up Python virtual environment
bash "$(dirname "$0")/setup_venv.sh"
source apps/api/.venv/bin/activate

# Install Python dependencies for API
pip install -r apps/api/requirements.txt

echo "Python virtual environment ready at apps/api/.venv"
