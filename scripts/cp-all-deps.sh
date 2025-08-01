#!/usr/bin/env bash

# This script copies all dependencies from source-package.json to target-package.json

# Example usage:
# ./cp-all-deps.sh
# ./cp-all-deps.sh target-package.json
# ./cp-all-deps.sh target-package.json source-package.json dependencies
# ./cp-all-deps.sh target-package.json source-package.json devDependencies

target="${1:-apps/enterprise/package.json}"
source="${2:-package.json}"
section="${3:-dependencies}" # or devDependencies

if [ -z "$source" ] || [ -z "$target" ]; then
  echo "Usage: $0 <source-package.json> <target-package.json> [section]"
  exit 1
fi
if [ ! -f "$source" ] || [ ! -f "$target" ]; then
  echo "Source or target file does not exist."
  exit 1
fi

# Read all dependencies from source and copy them to target
dependencies=$(jq -r --arg section "$section" '.[$section] | keys[]' "$source")
for pkg in $dependencies; do
  bash scripts/cp-dep.sh "$pkg" "$target" "$source" "$section"
done

echo "All dependencies from $source copied to $target under section '$section'."
