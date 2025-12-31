#!/bin/bash

set -e

echo "🚀 start Officesdk design development environment..."

# check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ error: need Node.js >= 20.0.0"
  echo "current version: $(node -v)"
  exit 1
fi

# start corepack
echo "📦 start Corepack..."
corepack enable

# check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "📥 install dependencies..."
  yarn install
fi

# start Storybook
echo "🎨 start Storybook..."
yarn dev

