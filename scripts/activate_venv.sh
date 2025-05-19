#!/bin/bash
# Activate the Python virtual environment for the API
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "${SCRIPT_DIR}/../apps/api/.venv/bin/activate"
