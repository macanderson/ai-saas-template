#!/bin/bash
set -e

# Install Node dependencies
pnpm install

# Install Python dependencies for API
pip install -r apps/api/requirements.txt
